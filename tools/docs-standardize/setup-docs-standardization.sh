#!/bin/bash

# SDK Documentation Standardization Setup Script
# This script installs and configures the documentation standardization tools

# Get the absolute path of the SDK root directory
SDK_ROOT=$(cd "$(dirname "$0")/../.." && pwd)
TOOLS_DIR="$SDK_ROOT/tools/docs-standardize"
PYTHON_SDK_PATH="$SDK_ROOT/packages/python"
TS_SDK_PATH="$SDK_ROOT/packages/typescript"

echo "Setting up SDK documentation standardization tools..."
echo "SDK root: $SDK_ROOT"

# Install dependencies
echo "Installing dependencies..."
cd "$TOOLS_DIR"
npm install

# Configure TypeScript SDK
echo "Configuring TypeScript SDK..."
cp "$TOOLS_DIR/typedoc-config.json" "$TS_SDK_PATH/typedoc-standardized.json"
mkdir -p "$TS_SDK_PATH/hooks"
cp "$TOOLS_DIR/typedoc-custom-updated.mjs" "$TS_SDK_PATH/hooks/typedoc-custom-standardized.mjs"

# Configure Python SDK
echo "Configuring Python SDK..."
cp "$TOOLS_DIR/pydoc-markdown-updated.yml" "$PYTHON_SDK_PATH/pydoc-markdown-standardized.yml"

# Create integration script for the main SDK package.json
cat > "$SDK_ROOT/standardize-docs.js" << 'EOF'
#!/usr/bin/env node

/**
 * SDK Documentation Standardization Integration Script
 * This script runs the standardization tools on the SDK documentation
 */

const { execSync } = require('child_process');
const path = require('path');

// Run standardization
console.log('Standardizing SDK documentation...');
try {
  execSync('node tools/docs-standardize/sdk-docs-standardize.js', {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('Documentation standardization complete!');
} catch (error) {
  console.error('Error during standardization:', error);
  process.exit(1);
}
EOF

# Make the integration script executable
chmod +x "$SDK_ROOT/standardize-docs.js"

# Add standardization script to SDK package.json if it exists
if [ -f "$SDK_ROOT/package.json" ]; then
  echo "Adding standardization script to SDK package.json..."
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$SDK_ROOT/package.json', 'utf8'));
    if (!pkg.scripts) pkg.scripts = {};
    pkg.scripts['standardize-docs'] = 'node standardize-docs.js';
    fs.writeFileSync('$SDK_ROOT/package.json', JSON.stringify(pkg, null, 2));
  "
fi

echo "
========================================================
SDK Documentation Standardization Setup Complete!
========================================================

To standardize your documentation, run:
  cd $SDK_ROOT
  npm run standardize-docs

TypeScript SDK: Update your build process to use:
  typedoc-standardized.json
  hooks/typedoc-custom-standardized.mjs

Python SDK: Update your build process to use:
  pydoc-markdown-standardized.yml

For more information, see:
  $TOOLS_DIR/README.md
" 