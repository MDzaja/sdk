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
