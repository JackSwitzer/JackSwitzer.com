#!/bin/bash
# Launch sandboxed agent for this project

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Starting Claude Code in Docker sandbox..."
echo "Project: $(basename "$PROJECT_DIR")"
echo ""

docker run -it --rm \
    -v "$PROJECT_DIR:/workspace" \
    -w /workspace \
    claude-sandbox-custom \
    claude \
    --dangerously-skip-permissions \
    "$@"
