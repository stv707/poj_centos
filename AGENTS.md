# AI Agent Guidelines: Unified BetaLab Course Package Template

You are an AI Coding Agent (Codex, Hermes, Antigravity, Claude, or similar) tasked with developing a complete, self-contained **BetaLab Training Course Package**.

This repository is the official **BetaLab Course Monorepo Template**. It packages both the **Courseware (What the student learns)** and the **Infrastructure Automation (Where the lab runs)** in a single unified Git repository.

---

## 🚨 MANDATORY AI DIRECTIVE #1: EDUCATES WORKSHOP AUTHORING & COURSEWARE CONTRACTS

When authoring or modifying the courseware inside `workshop/`, `exercises/`, and `resources/`:
1. **Check for AI Skill:** Check if you have the **`educates-workshop-authoring`** skill installed or available in your environment.
   * **If Available:** Activate and follow `educates-workshop-authoring` skill instructions for creating workshop definitions, configuring `resources/workshop.yaml`, organizing exercise files, and writing interactive markdown instructions.
   * **If Missing:** Adhere strictly to the technical rules detailed in `SPECIFICATION.md` in this repository.

2. **Standard 4-Tab Workarea Contract:**
   Every course package MUST expose the standard 4 tabs in `resources/workshop.yaml`:
   * **Terminal 1**: `applications.terminal: { enabled: true, layout: default }` (Primary shell to Droplet).
   * **Terminal 2**: `dashboards: [{ name: "Terminal 2", url: "terminal:second" }]` (Secondary shell to Droplet).
   * **Editor**: `applications.editor: { enabled: true }` (Droplet-native VS Code Web bridged on 10085/10011).
   * **Slides**: `applications.slides: { enabled: true }` (Embedded HTML5 presentation viewer in `workshop/slides/`).
   * **Files**: `applications.files: { enabled: true }`.

3. **Strict Root-Level Directory Layout (No Nested `workshop/workshop`):**
   * `exercises/`: Place all student starter files here. Educates unpacks this to `~/exercises` and auto-syncs them to `droot@droplet:~/exercises`.
   * `resources/workshop.yaml`: The Educates Workshop CR (v1beta1).
   * `workshop/content/`: All Markdown guides rendered by Hugo.
   * `workshop/setup.d/`: Container boot scripts (e.g. `00-student-vars.sh`).
   * `workshop/slides/`: HTML5 viewer (`index.html`) and slide presentation (`presentation.pdf`).

4. **Strict Unix LF Line Endings (`\n`) for Shell Scripts:**
   Any script running inside Linux containers (e.g. `workshop/setup.d/*.sh`) MUST use Unix LF line endings. Windows CRLF causes `\r: bad interpreter` and triggers Educates container crash: *"The execution of the workshop setup scripts failed"*. Enforced by `.gitattributes`.

---

## 🚨 MANDATORY AI DIRECTIVE #2: ANSIBLE AUTOMATION CONTRACTS

When implementing the cloud automation inside the `automation/` directory:
1. **Only Modify Developer Roles:**
   * ✅ Implement cloud VM/cluster creation in: `automation/roles/cloud_provision/tasks/main.yml`
   * ✅ Implement cloud cleanup/teardown in: `automation/roles/cloud_teardown/tasks/main.yml`
   * ✅ Configure cloud sizing and variables in: `automation/group_vars/all.yml`
   * ❌ **DO NOT MODIFY** `automation/roles/common_os_setup/` (Standardizes student `droot` user, sudoers, SSH keys, update-motd).
   * ❌ **DO NOT MODIFY** `automation/roles/dns_registration/` (Registers prefix-scoped DNS records in Azure DNS).
   * ❌ **DO NOT MODIFY** `automation/roles/export_nodes_json/` (Generates the `/ansible/output/nodes_{{ job_id }}.json` contract).

2. **In-Memory Inventory & Jump Host Contract:**
   In `automation/roles/cloud_provision/tasks/main.yml`, as you provision each student machine, you MUST register it into Ansible's in-memory `student_vms` group. If your training creates multiple VMs (e.g. 1 jumpbox and 2 victim targets), you MUST tag `is_jump_host: true` and `role: "jumpbox"` on the machine Educates should connect to:
   ```yaml
   ansible.builtin.add_host:
     name: "{{ prefix }}-stu{{ '%02d' | format(student_id) }}"
     ansible_host: "{{ public_ip }}"
     ansible_user: "root"
     groups: student_vms
     jump_host_ip: "{{ public_ip }}"
     is_jump_host: true        # <-- REQUIRED: Marks this machine as the Educates connection endpoint
     role: "jumpbox"           # <-- Role: 'jumpbox' (or 'victim', 'worker')
     vm_name: "{{ prefix }}-stu{{ '%02d' | format(student_id) }}"
     student_tag: "stu{{ '%02d' | format(student_id) }}"
   ```

3. **Multi-Region & Quota Awareness:**
   If the training requires high-compute or nested virtualization (e.g. 8 vCPU / 64 GB RAM on Azure) and your cloud subscription has regional vCPU quotas (e.g. 10 vCPUs/region), you MUST distribute VMs round-robin across regions:
   ```yaml
   assigned_region: "{{ azure_regions[(student_id | int - 1) % (azure_regions | length)] }}"
   ```

4. **Dynamic Domain Names (Zero Hardcoding):**
   * **In Ansible:** Use prefix-scoped names: `ssh.{{ prefix }}-stu{{ '%02d' | format(student_id) }}.{{ dns_zone_name }}`.
   * **In Markdown (`workshop/`):** Always use the dynamic session variable `$(STUDENT_DOMAIN)` (e.g. `http://dashboard.apps.$(STUDENT_DOMAIN)`). Never hardcode student IPs or domain names!

5. **Ansible 2.19 Strict Boolean Conditionals:**
   Ansible 2.19 strictly enforces boolean types on `when:` conditionals. If a boolean variable is injected from an environment variable or extra-vars (where it arrives as a string `"true"` or `"false"`), Ansible will crash with:
   `[ERROR]: Conditional result (True) was derived from value of type 'str'`
   **Rule:** You MUST always cast conditionals using `| bool`:
   * ✅ `when: (use_golden_image | default(true)) | bool`
   * ✅ `when: (teardown_dns | default(false)) | bool`
   * ❌ `when: use_golden_image | default(true)` (Will crash at runtime)

6. **Resilient `student_count` Loop Protection:**
   In Ansible, extra-vars have the highest precedence (precedence 22) and override `group_vars`. Tasks using `loop: "{{ student_count }}"` will crash if `student_count` is passed as an integer (`student_count: 1`). Always use the standardized Jinja resolver in `group_vars/all.yml` that checks `student_count is iterable` or coerces integers into `range(1, (student_count | int) + 1) | list`.

---

## 🚨 MANDATORY AI DIRECTIVE #3: BETALAB.YAML MANIFEST & VARIABLE CONTRACTS

BetaLab operates on a **Zero Manual Configuration** philosophy for instructors.
Whenever you add, rename, or adapt environment variables in `automation/group_vars/all.yml`, you **MUST** synchronize `betalab.yaml`:

1. **Quote Manifest Titles (`title:`):**
   If the course title contains colons, dashes, or quotes (e.g. `title: "Age of Containers: Docker Mastery"`), you **MUST** enclose the title in quotes. Unquoted colons cause syntax parsing errors in `yaml.parse`.

2. **Declare Required Secrets (`requiredVars`):**
   List all cloud provider credentials that Ansible requires from the BetaLab Secrets Vault:
   * DigitalOcean compute: `DO_TOKEN`
   * Azure DNS / compute: `AZURE_CLIENT_ID`, `AZURE_SECRET`, `AZURE_TENANT`, `AZURE_SUBSCRIPTION_ID`
   * AWS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
   * Mark each with `secret: true`.
   * *Why:* The BetaLab Admin UI pre-flight engine (Step 2) cross-checks these against the instructor's bound cloud credentials to guarantee zero runtime missing-token errors.

3. **Declare Custom Extra-Vars (`optionalVars`):**
   List every custom parameter used in `group_vars/all.yml` with its default value and clear description:
   * Snapshot names (`DO_GOLDEN_IMAGE: "ckadlab-golden-image-v3"`)
   * Snapshot toggle (`USE_GOLDEN_IMAGE: "true"`)
   * SSH key IDs (`DO_SSH_KEYS: "58950506,48486622,48486618"`)
   * Regions (`DO_REGION: "sgp1"`)
   * Apex DNS zones (`AZURE_DNS_ZONE_NAME: "steven.asia"`, `AZURE_DNS_ZONE_RG: "training-dns-zone-rg"`)
   * *Why:* When the instructor clicks **"Audit Course Monorepo"** in Step 2 of the Admin UI, BetaLab **AUTOMATICALLY POPULATES** all `optionalVars` into Step 3's "Dynamic Environment & Ansible Extra-Vars" table. The instructor will never need to type them manually!

4. **Triple-Sync Guarantee:**
   Every variable defined in `automation/group_vars/all.yml` MUST be reflected in:
   * `betalab.yaml` (`requiredVars` or `optionalVars`)
   * `automation/.env.example` (for local Docker testing)

---

## Repository Structure at a Glance

```
betalab-course-template/
├── .gitattributes             # Enforces Unix LF line endings for *.sh
├── AGENTS.md                  # 🤖 This master instruction file
├── SPECIFICATION.md           # Complete technical contract & variable reference
├── README.md                  # Human developer overview
├── betalab.yaml               # Course manifest (metadata, duration, required/optional vars)
│
├── exercises/                 # 💻 Working directory mounted to ~/exercises in the pod & Droplet
│   └── README.md
├── resources/
│   └── workshop.yaml          # Educates Workshop CRD (v1beta1 with 4-tab workarea)
├── workshop/                  # 📚 SOURCE 1: Courseware (Educates)
│   ├── content/               # Step-by-step markdown guides rendered by Hugo
│   │   ├── index.md
│   │   ├── exercises/
│   │   └── finish.md
│   ├── setup.d/               # Container startup hooks (Strict LF line endings required!)
│   │   └── 00-student-vars.sh # Auto-resolves $(STUDENT_DOMAIN) from DROPLET_HOST
│   └── slides/                # Slides tab HTML5 viewer and PDF deck
│       ├── index.html
│       ├── presentation.pdf
│       └── README.md
│
└── automation/                # ⚙️ SOURCE 2: Infrastructure Automation (Ansible)
    ├── ansible.cfg            # Pre-tuned settings (pipelining, host key checking off)
    ├── site.yml               # Provisioning entrypoint
    ├── tear.yml               # Teardown entrypoint
    ├── group_vars/all.yml     # Cloud configuration variables
    └── roles/
        ├── cloud_provision/   # 🛠️ AI IMPLEMENTS THIS
        ├── cloud_teardown/    # 🛠️ AI IMPLEMENTS THIS
        ├── common_os_setup/   # 🔒 PRE-PACKAGED PLATFORM ROLE
        ├── dns_registration/  # 🔒 PRE-PACKAGED PLATFORM ROLE
        └── export_nodes_json/ # 🔒 PRE-PACKAGED PLATFORM ROLE
```

---

## AI Agent Workflow: Step-by-Step

When asked to generate or modify a training course:
1. **Update Manifest (`betalab.yaml`):**
   * Edit title, slug, version, description, duration, and cloudProvider.
   * Populate `requiredVars` with all credentials required from Secrets Vault.
   * Populate `optionalVars` with all customizable parameters and their defaults.
2. **Build Infrastructure:**
   * Configure `automation/group_vars/all.yml` to read `lookup('env', 'VAR') | default(...)`.
   * Update `automation/.env.example` with local test values.
   * Open `automation/roles/cloud_provision/tasks/main.yml` and implement tasks to spin up VMs/clusters.
   * Open `automation/roles/cloud_teardown/tasks/main.yml` and implement cleanup tasks.
3. **Build Courseware:**
   * Open `resources/workshop.yaml` and configure workshop portals and titles. Ensure 4 tabs are active: `Terminal 1` (default), `Terminal 2` (`url: terminal:second`), `Editor`, `Slides`.
   * Populate `exercises/` with starter configs, scripts, or manifests (these sync to the student Droplet).
   * Write step-by-step interactive exercises in `workshop/content/exercises/`.
   * Place slide deck in `workshop/slides/presentation.pdf`.
4. **Verification:**
   * Check YAML syntax across all files.
   * Ensure `betalab.yaml`, `group_vars/all.yml`, and `.env.example` have matching variable names.
   * Ensure no hardcoded IP addresses or domain names exist.
   * Verify `site.yml` and `tear.yml` follow the input/output variable contracts.
   * Verify all `*.sh` scripts have strict Unix LF (`\n`) line endings.
