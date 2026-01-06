#!/bin/bash
# Resume previous sandbox session

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Resuming Claude Code sandbox..."
echo ""

docker run -it --rm \
    -v "$PROJECT_DIR:/workspace" \
    -w /workspace \
    claude-sandbox-custom \
    claude \
    --dangerously-skip-permissions \
    -c
