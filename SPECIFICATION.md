# BetaLab Course Package Technical Specification

This document defines the technical contracts, schemas, and runtime environment specifications for the BetaLab Course Package.

---

## 1. Courseware Contract (`exercises/`, `resources/`, `workshop/`)

The courseware is powered by the Educates training platform and runs as a containerized session pod in the BetaLab cluster.

### A. Standard Courseware Directory Structure
Educates expects files in precise root-level paths. **NEVER create a nested `workshop/workshop` folder**:

```
<repo-root>/
├── exercises/                   # Student exercises (copied to ~/exercises on pod & Droplet)
│   └── README.md
├── resources/
│   └── workshop.yaml            # Educates Workshop CR (v1beta1)
└── workshop/
    ├── content/                 # Interactive Markdown instructions rendered by Hugo
    │   ├── 00-welcome.md
    │   └── ...
    ├── setup.d/                 # Container initialization scripts (MUST use Unix LF line endings)
    │   └── 00-student-vars.sh
    └── slides/                  # Slides tab HTML5 viewer and PDF deck
        ├── index.html
        ├── presentation.pdf
        └── README.md
```

### B. Educates Workshop Custom Resource (`resources/workshop.yaml`)
Every course package MUST declare the standard 4-tab dashboard (`Terminal 1`, `Terminal 2`, `Editor`, `Slides`):

```yaml
apiVersion: training.educates.dev/v1beta1
kind: Workshop
metadata:
  name: {workshop-slug}
spec:
  title: "{Course Title}"
  description: "{Course Description}"
  vendor: "cognitoz"
  authors:
    - "Cognitoz BetaLab"
  difficulty: "beginner"
  duration: 180m

  publish:
    image: "$(image_repository)/{workshop-slug}-files:$(workshop_version)"
    files:
      - directory:
          path: .
        includePaths:
          - /workshop/**
          - /exercises/**
          - /README.md

  workshop:
    image: quay.cognitoz.com/cognitoznet/betalab-base-environment:latest
    files:
      - git:
          url: https://github.com/organization/{repo}.git
          ref: origin/main
        includePaths:
          - /workshop/**
          - /exercises/**
          - /README.md
        path: .

  session:
    resources:
      memory: 512Mi
    namespaces:
      budget: medium
      security:
        token:
          enabled: false
    applications:
      terminal:
        enabled: true
        layout: default         # 'default' allows Terminal 1 + Terminal 2 tabs
      editor:
        enabled: true           # Connects to remote Droplet code-server
      slides:
        enabled: true           # Renders workshop/slides/index.html
      files:
        enabled: true

    dashboards:
      - name: "Terminal 2"
        url: "terminal:second"  # Provides the second terminal tab
```

### C. Dynamic Environment Resolution (`workshop/setup.d/00-student-vars.sh`)
At session startup, the student container executes this hook to extract the cloud host assigned by the BetaLab API and inject dynamic session variables:
* `$(STUDENT_ID)`: The student tag (e.g. `stu01`).
* `$(STUDENT_NUM)`: The numeric student index (e.g. `01`).
* `$(STUDENT_DOMAIN)`: The parent domain without the `ssh.` prefix (e.g. `openstack-stu01.steven.asia`).

> [!CAUTION]
> **Strict Unix LF Line Endings (`\n`):** Setup scripts in `workshop/setup.d/` run inside a Linux container. If committed with Windows CRLF (`\r\n`), bash execution fails immediately with `\r: bad interpreter` and Educates crashes with: *"The execution of the workshop setup scripts failed and workshop content may not be setup correctly."* Always enforce LF using `.gitattributes` (`*.sh text eol=lf`).
> Also, **DO NOT overwrite `DROPLET_HOST`** in this script; let the base environment's `01-setup-ssh.sh` dynamically resolve the host.

### C. Clickable Markdown Syntax
* Execute in terminal:
  ````markdown
  ```execute
  command-to-run
  ```
  ````
* Open file in embedded editor:
  ````markdown
  ```editor:open-file
  file: ~/exercises/config.yaml
  line: 10
  ```
  ````

---

## 2. Infrastructure Automation Contract (`automation/`)

The infrastructure automation runs inside the containerized `cognitoz-ansible-runner`.

### A. Guaranteed Environment Variables
BetaLab automatically injects the following variables into every execution:

| Variable | Type | Description |
| :--- | :--- | :--- |
| `JOB_ID` | `string` | Unique UUID of the job |
| `LAB_PREFIX` | `string` | Unique cohort prefix for DNS and resource names |
| `STUDENT_COUNT` | `int` | Number of student seats to provision |
| `TARGET_STUDENT_INDICES`| `string` | Comma-separated seat indices (e.g. `1,2,3`) |
| `DROOT_PASSWORD` | `string` | Password for student `droot` user |
| `SSH_PUB_KEY` | `string` | Public key to inject for automated student pod SSH access |
| `DNS_ZONE_NAME` | `string` | Azure DNS zone (default: `steven.asia`) |
| `DNS_ZONE_RG` | `string` | Azure Resource Group hosting the DNS zone |

### B. Standard Output File (`/ansible/output/nodes_{{ job_id }}.json`)
The `automation/roles/export_nodes_json` role MUST write this JSON format at the end of `site.yml`:

```json
[
  {
    "vmName": "openstack-stu01",
    "studentTag": "stu01",
    "studentIndex": 1,
    "publicIp": "20.198.112.5",
    "sshDomain": "ssh.openstack-stu01.steven.asia",
    "username": "droot",
    "password": "Cangetin51085108",
    "port": 22,
    "isJumpHost": true,
    "role": "jumpbox",
    "ingressIp": null,
    "k8sClusterName": null,
    "status": "online"
  }
]
```
The BetaLab backend ingests this file directly into the `Host` and `HostPool` tables to bind the student session pod to the cloud VM.

#### Topology Flexibility & Jump Host Contract
* **Ansible 100% Single Source of Truth:** Ansible has complete flexibility to provision any infrastructure topology needed for the training (e.g. single VM, VM + managed Kubernetes DOKS cluster, or multi-VM topologies like 1 attacker jumpbox + 2 victim targets).
* **Educates 1-Machine Connection Rule:** Regardless of how many compute nodes or clusters are provisioned for a student, the Educates browser console / IDE requires exactly **1 machine** to connect to as the student interactive terminal.
* **Jump Host Marker:** Ansible identifies this machine by tagging `"isJumpHost": true` and `"role": "jumpbox"` (set via `is_jump_host: true` and `role: "jumpbox"` in `add_host` or `hostvars`). BetaLab automatically discovers this tag, tags `connectionTypes: ['ssh', 'jumpbox']`, and points Educates directly to this designated machine. Any additional machines (victims, secondary workers) have `"isJumpHost": false` and `"role": "victim"|"worker"` and are accessible from the jumpbox.

### C. Ansible 2.19 Strict Typing & Boolean Filter Contract
Ansible 2.19 strictly enforces boolean types on `when:` conditionals. If a boolean variable is passed as a string (such as from environment variables or `--extra-vars`), Ansible will crash with:
`Conditional result (True) was derived from value of type 'str'. Conditionals must have a boolean result.`

**Rule:** You MUST always cast conditionals using `| bool`:
* `when: (use_golden_image | default(true)) | bool`
* `when: (teardown_dns | default(false)) | bool`

### D. Resilient `student_count` Precedence Contract
In Ansible, extra-vars passed via the CLI (`--extra-vars`) have highest precedence (Precedence 22) and override `group_vars`. If extra-vars passes `student_count: 1` as an integer or string, tasks iterating with `loop: "{{ student_count }}"` will fail (`loop value must resolve to a list, not int`).
Always use the defensive resolver pattern in `automation/group_vars/all.yml` that coerces numbers, comma-delimited strings, or integer lists into a valid iterable list.

---

## 3. Course Manifest Specification (`betalab.yaml`)

The `betalab.yaml` file is the machine-readable manifest at the root of the course repository. It dictates how the BetaLab Admin UI and Lab Provisioner interact with the course.

> [!IMPORTANT]
> **YAML Quoting for Manifest Titles:** If the `title` contains a colon (`:`), it **MUST** be enclosed in quotes (e.g. `title: "Age of Containers: Docker Mastery"`). An unquoted colon is parsed as a nested mapping key and will cause `yaml.parse` to fail during pre-flight audit.

### A. Manifest Schema

```yaml
apiVersion: betalab.cognitoz.com/v1alpha1
kind: TrainingPackage
metadata:
  name: string                 # Package identifier
  title: string                # Display title (ALWAYS quote if containing colons!)
  slug: string                 # URL slug (e.g. "aoc-docker-workshop")
  version: string              # Semantic version
  description: string          # Course summary
  category: string             # "containers" | "cloud-engineering" | "devops"
  difficulty: string           # "beginner" | "intermediate" | "advanced"

spec:
  courseware:
    directory: "workshop"
    workshopDefinition: "resources/workshop.yaml"
    durationMinutes: int       # Total lab duration in minutes
    durationDays: int          # Display duration in days

  infrastructure:
    directory: "automation"
    entrypoint: "site.yml"     # Provisioning entrypoint
    teardown: "tear.yml"       # Teardown entrypoint
    cloudProvider: string      # "digitalocean" | "azure" | "aws" | "gcp"
    defaultPax: int            # Default student capacity
    vmSpecs:
      cpu: int
      memoryGb: int
      nestedVirtualization: bool
      recommendedSku: string

    # Required Cloud Credentials (Validated in Admin UI Step 2)
    requiredVars:
      - name: string           # Environment variable name (e.g. DO_TOKEN, AZURE_CLIENT_ID)
        description: string
        secret: true

    # Custom Extra-Vars (Auto-populated into Admin UI Step 3 table)
    optionalVars:
      - name: string           # Variable name (e.g. DO_GOLDEN_IMAGE, DO_SSH_KEYS)
        default: string        # Default value
        description: string
```

### B. Multi-Cloud Pattern (Compute + Public DNS)
When a course provisions compute droplets or VMs on one cloud (e.g. DigitalOcean) but registers student A-records on another (e.g. Azure DNS for `steven.asia`):
1. **Compute Provider:** Set `cloudProvider: "digitalocean"`.
2. **Required Secrets:** Declare both `DO_TOKEN` (for compute) and `AZURE_CLIENT_ID`, `AZURE_SECRET`, `AZURE_TENANT`, `AZURE_SUBSCRIPTION_ID` (for DNS).
3. **Admin UI Binding:** In Step 2, the instructor binds both the primary cloud credential and secondary DNS credential. BetaLab decrypts and injects both sets of secrets into the Ansible runner container.
