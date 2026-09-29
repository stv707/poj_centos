from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'workshop' / 'slides' / 'presentation.pdf'
W, H = 13.333 * inch, 7.5 * inch
NAVY = colors.HexColor('#0B1320')
NAVY2 = colors.HexColor('#13263A')
TEAL = colors.HexColor('#17A398')
CYAN = colors.HexColor('#70D6D0')
WHITE = colors.HexColor('#F7FBFF')
MUTED = colors.HexColor('#B7C9D9')
GOLD = colors.HexColor('#F4C95D')
RED = colors.HexColor('#F07B72')
CARD = colors.HexColor('#173149')

slides = [
    ('title', 'MariaDB Administration', ['POJ Putrajaya', 'Two-hour instructor-led demonstration', 'From server structure to safe daily operations']),
    ('agenda', 'What we will do in two hours', ['01  Understand the MariaDB structure', '02  Inspect the running service and data directory', '03  Demonstrate accounts, grants, and least privilege', '04  Use transactions, indexes, and EXPLAIN', '05  Back up, restore, and verify persistence', '06  Perform first-line operational checks']),
    ('architecture', 'The administrator\'s map', ['HOST  Linux VM and Docker runtime', 'SERVICE  MariaDB server process', 'SCHEMA  Database / tables / indexes / rows', 'SECURITY  Accounts, hosts, roles, grants', 'DATA  Named volume, backups, restore tests'], ['A database is a logical namespace. It is not a separate server.']),
    ('container', 'The POJ demonstration topology', ['VM: CKAD golden image with Docker already installed', 'Container: poj-mariadb', 'Image: mariadb:11.4', 'Network: poj-mariadb-net', 'Volume: poj-mariadb-data', 'Endpoint: 127.0.0.1:3306'], ['The service is local to the VM; the demo is not an internet-facing database.']),
    ('health', 'First response: is the service healthy?', ['Container state: docker ps', 'Readiness: mariadb-admin ping', 'Identity: VERSION(), @@hostname, @@datadir', 'Workload: SHOW FULL PROCESSLIST', 'Signals: logs, connections, threads, resource usage'], ['Health is a set of signals, not a single green light.']),
    ('access', 'Accounts and least privilege', ['Identity includes username AND host', 'Root is for administration, not applications', 'Application account: access to poj_demo', 'Reporting account: SELECT only', 'Review with SHOW GRANTS', 'Test the boundary: a denied INSERT is useful evidence'], ['Grant the smallest practical scope and review it regularly.']),
    ('transactions', 'Safe change: transaction first', ['START TRANSACTION', 'Read the current state', 'Make a controlled change', 'COMMIT when correct', 'ROLLBACK when the outcome is wrong', 'Use EXPLAIN before changing a slow query'], ['A transaction is a unit of work. An index is a trade-off, not a free performance switch.']),
    ('persistence', 'Persistence is separate from the container', ['Container writable layer: disposable', 'Named volume: database files survive container replacement', 'Logical dump: portable SQL representation', 'Backup policy: retention, encryption, off-host copy', 'Restore test: proof that the backup is useful'], ['Never confuse “the container restarted” with “the database is protected.”']),
    ('backup', 'Backup and restore demonstration', ['Create: mariadb-dump --single-transaction', 'Inspect: schema, tables, inserts, routines, triggers', 'Remove a demo object', 'Restore into the database', 'Verify the object and rows are back'], ['A successful backup command is not the same as a tested recovery procedure.']),
    ('ops', 'Daily operational checks', ['Availability: mariadb-admin ping', 'Sessions: SHOW FULL PROCESSLIST', 'Connections: Threads_connected / Connections', 'Storage: information_schema.tables', 'Logs: docker logs --tail 30', 'Safe restart: restart service, keep volume'], ['Every action should have an owner, a change record, and a rollback path.']),
    ('runbook', 'Instructor click-and-run runbook', ['1  Welcome and predict the result', '2  Inspect container, server, schemas, and data', '3  Create reporting account and prove access boundary', '4  Commit/rollback and inspect an index', '5  Dump, remove, restore, verify', '6  Run health and cleanup checks'], ['Pause after each command and connect the result to a production responsibility.']),
    ('close', 'The POJ administration mindset', ['Know where the service runs', 'Know who can do what', 'Know where data lives', 'Know how to recover it', 'Know which signals show trouble', 'Replace workshop credentials before any real deployment'], ['MariaDB administration is disciplined operation: access, change, protection, observation, recovery.']),
]


def wrap(text, font, size, max_width):
    words = text.split()
    lines, cur = [], ''
    for word in words:
        test = word if not cur else cur + ' ' + word
        if stringWidth(test, font, size) <= max_width:
            cur = test
        else:
            if cur: lines.append(cur)
            cur = word
    if cur: lines.append(cur)
    return lines


def footer(c, n):
    c.setStrokeColor(colors.HexColor('#28445D'))
    c.setLineWidth(0.5)
    c.line(0.65*inch, 0.48*inch, W-0.65*inch, 0.48*inch)
    c.setFont('Helvetica', 8.5)
    c.setFillColor(MUTED)
    c.drawString(0.68*inch, 0.27*inch, 'Cognitoz BetaLab  |  MariaDB Administration for POJ Putrajaya')
    c.drawRightString(W-0.68*inch, 0.27*inch, f'{n:02d}')


def draw_title(c, title, kicker='POJ PUTRAJAYA  /  MARIADB ADMINISTRATION'):
    c.setFillColor(MUTED)
    c.setFont('Helvetica-Bold', 10)
    c.drawString(0.7*inch, H-0.72*inch, kicker)
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 29)
    c.drawString(0.7*inch, H-1.35*inch, title)


def add_bullets(c, items, x, y, width, size=16, leading=0.38*inch, color=WHITE):
    c.setFillColor(color)
    c.setFont('Helvetica', size)
    yy = y
    for item in items:
        lines = wrap(item, 'Helvetica', size, width-0.33*inch)
        c.setFillColor(TEAL)
        c.circle(x+0.08*inch, yy+0.06*inch, 0.045*inch, fill=1, stroke=0)
        c.setFillColor(color)
        for i, line in enumerate(lines):
            c.drawString(x+0.25*inch, yy-i*0.25*inch, line)
        yy -= max(leading, len(lines)*0.25*inch + 0.08*inch)
    return yy


def card(c, x, y, w, h, label, value, accent=TEAL):
    c.setFillColor(CARD)
    c.roundRect(x, y, w, h, 10, fill=1, stroke=0)
    c.setFillColor(accent)
    c.setFont('Helvetica-Bold', 10)
    c.drawString(x+0.18*inch, y+h-0.28*inch, label.upper())
    c.setFillColor(WHITE)
    c.setFont('Helvetica-Bold', 16)
    lines = wrap(value, 'Helvetica-Bold', 16, w-0.36*inch)
    yy = y+h-0.62*inch
    for line in lines[:3]:
        c.drawString(x+0.18*inch, yy, line)
        yy -= 0.25*inch


def draw_slide(c, index, kind, title, items, note=None):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    if kind == 'title':
        c.setFillColor(TEAL)
        c.circle(W-1.7*inch, H-1.45*inch, 0.68*inch, fill=1, stroke=0)
        c.setFillColor(CYAN)
        c.circle(W-2.55*inch, H-2.25*inch, 0.22*inch, fill=1, stroke=0)
        c.setFillColor(colors.HexColor('#21506A'))
        c.circle(W-1.2*inch, H-2.55*inch, 0.35*inch, fill=1, stroke=0)
        c.setFillColor(MUTED)
        c.setFont('Helvetica-Bold', 12)
        c.drawString(0.75*inch, H-1.0*inch, 'COGNITOZ BETALAB  /  INSTRUCTOR DECK')
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 39)
        c.drawString(0.75*inch, H-2.05*inch, title)
        c.setFillColor(CYAN)
        c.setFont('Helvetica-Bold', 21)
        c.drawString(0.78*inch, H-2.62*inch, items[0])
        c.setFillColor(WHITE)
        c.setFont('Helvetica', 16)
        c.drawString(0.78*inch, H-3.24*inch, items[1])
        c.setFillColor(MUTED)
        c.setFont('Helvetica', 13)
        c.drawString(0.78*inch, H-3.75*inch, items[2])
        c.setFillColor(CARD)
        c.roundRect(0.78*inch, 0.92*inch, 2.05*inch, 0.48*inch, 8, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.setFont('Helvetica-Bold', 10)
        c.drawCentredString(1.8*inch, 1.1*inch, '2 HOURS  /  LIVE DEMO')
        footer(c, index)
        return

    draw_title(c, title)
    if kind == 'agenda':
        add_bullets(c, items, 0.85*inch, H-2.0*inch, 6.1*inch, size=15)
        card(c, 8.0*inch, 3.55*inch, 3.8*inch, 1.25*inch, 'Audience', 'POJ IT personnel', GOLD)
        card(c, 8.0*inch, 1.95*inch, 3.8*inch, 1.25*inch, 'Style', 'Instructor-led', TEAL)
        card(c, 8.0*inch, 0.75*inch, 3.8*inch, 0.9*inch, 'Outcome', 'Operational confidence', CYAN)
    elif kind == 'architecture':
        y = H-2.05*inch
        labels = [('HOST', 'Linux VM + Docker'), ('SERVICE', 'MariaDB server'), ('SCHEMA', 'DB / tables / rows'), ('SECURITY', 'Users + grants'), ('DATA', 'Volume + backups')]
        for i, (lab, val) in enumerate(labels):
            card(c, 0.85*inch + (i%3)*4.05*inch, y - (i//3)*1.55*inch, 3.55*inch, 1.05*inch, lab, val, [TEAL,CYAN,GOLD,RED,TEAL][i])
        c.setFillColor(MUTED); c.setFont('Helvetica-Oblique', 14); c.drawString(0.9*inch, 1.05*inch, items[-1])
    elif kind == 'container':
        card(c, 0.85*inch, 3.5*inch, 3.7*inch, 1.55*inch, 'VM', items[0].replace('VM: ', ''), TEAL)
        card(c, 4.85*inch, 3.5*inch, 3.7*inch, 1.55*inch, 'CONTAINER', items[1].replace('Container: ', ''), CYAN)
        card(c, 8.85*inch, 3.5*inch, 3.7*inch, 1.55*inch, 'IMAGE', items[2].replace('Image: ', ''), GOLD)
        card(c, 2.85*inch, 1.35*inch, 3.7*inch, 1.35*inch, 'VOLUME', items[4].replace('Volume: ', ''), TEAL)
        card(c, 6.85*inch, 1.35*inch, 3.7*inch, 1.35*inch, 'ENDPOINT', items[5].replace('Endpoint: ', ''), RED)
        c.setFillColor(MUTED); c.setFont('Helvetica-Oblique', 14); c.drawCentredString(W/2, 0.87*inch, note[0])
    elif kind in ('health','access','transactions','persistence','backup','ops','runbook','close'):
        add_bullets(c, items, 0.85*inch, H-2.0*inch, 7.0*inch, size=15)
        c.setFillColor(CARD)
        c.roundRect(8.25*inch, 1.15*inch, 3.9*inch, 3.95*inch, 14, fill=1, stroke=0)
        c.setFillColor(TEAL if kind != 'close' else GOLD)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(8.65*inch, 4.65*inch, 'ADMINISTRATOR\'S LENS')
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 18 if kind == 'close' else 16)
        text = note[0] if note else 'Ask: what does this result mean operationally?'
        yy = 4.15*inch
        for line in wrap(text, 'Helvetica-Bold', 18 if kind == 'close' else 16, 3.1*inch):
            c.drawString(8.65*inch, yy, line)
            yy -= 0.32*inch
        c.setFillColor(MUTED)
        c.setFont('Helvetica', 12)
        c.drawString(8.65*inch, 1.62*inch, 'Use the Educates command')
        c.drawString(8.65*inch, 1.38*inch, 'then pause for discussion.')
    footer(c, index)


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(W,H))
    c.setTitle('MariaDB Administration for POJ Putrajaya')
    for i, slide in enumerate(slides, 1):
        draw_slide(c, i, *slide)
        c.showPage()
    c.save()
    print(f'Wrote {OUT} ({len(slides)} slides)')

if __name__ == '__main__':
    main()
