#!/bin/bash
cd /root/ponscandy-vite
echo "=== READ test ==="
git ls-remote origin 2>&1 | head -3
echo "read_exit=$?"
