#!/bin/bash
# =============================================================================
# POJ Putrajaya - Skrip Sandaran Dokumen Kehakiman
# =============================================================================
SRC_DIR="/opt/poj/dokumen_kehakiman"
DEST_DIR="/backup"
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
ARCHIVE_FILE="$DEST_DIR/backup_kes_$TIMESTAMP.tar.gz"

mkdir -p "$DEST_DIR"
if [ -d "$SRC_DIR" ]; then
    tar -czf "$ARCHIVE_FILE" -C "$SRC_DIR" .
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Sandaran berjaya dihasilkan: $ARCHIVE_FILE ($(du -h "$ARCHIVE_FILE" | cut -f1))" >> /var/log/poj-backup.log
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [RALAT] Direktori sumber $SRC_DIR tidak wujud!" >> /var/log/poj-backup.log
    exit 1
fi
