#!/bin/bash
# workshop/setup.d/00-student-vars.sh
# =============================================================================
# COGNITOZ BETALAB - DYNAMIC STUDENT ENVIRONMENT VARIABLE RESOLVER
# =============================================================================

TARGET="${DROPLET_HOST:-ssh.stuXX.steven.asia}"
STUDENT_ID=$(echo "$TARGET" | grep -oE 'stu[0-9]+' || echo "stuXX")
STUDENT_NUM=$(echo "$STUDENT_ID" | grep -oE '[0-9]+' || echo "XX")
STUDENT_DOMAIN=$(echo "$TARGET" | sed 's/^ssh\.//')

if [ -z "$STUDENT_DOMAIN" ]; then
    STUDENT_DOMAIN="stuXX.steven.asia"
fi

if [ -n "$WORKSHOP_ENV" ]; then
    echo "STUDENT_ID=${STUDENT_ID}" >> "$WORKSHOP_ENV"
    echo "STUDENT_NUM=${STUDENT_NUM}" >> "$WORKSHOP_ENV"
    echo "STUDENT_DOMAIN=${STUDENT_DOMAIN}" >> "$WORKSHOP_ENV"
fi
