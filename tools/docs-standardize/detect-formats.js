#!/usr/bin/env node
/**
 * Format Detection Tool
 * 
 * This script analyzes the existing documentation to detect formatting patterns.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the SDK root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SDK_ROOT = path.resolve(__dirname, '../..');

// Paths to the SDK documentation folders
const PYTHON_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/python-sdk');
const TYPESCRIPT_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/typescript-sdk');

async function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\nAnalyzing: ${path.basename(filePath)}`);
    
    // Check for code fence style
    const codeFenceMatches = content.match(/^```/gm);
    if (codeFenceMatches) {
      console.log(`- Code fence count: ${codeFenceMatches.length}`);
    }
    
    // Check for emphasis style (italics)
    const emphasisUnderscoreMatches = content.match(/_[^_]+_/g);
    const emphasisAsteriskMatches = content.match(/\*[^\*]+\*/g);
    console.log(`- Emphasis style: _ (${emphasisUnderscoreMatches?.length || 0}) vs * (${emphasisAsteriskMatches?.length || 0})`);
    
    // Check for strong style (bold)
    const strongDoubleUnderscoreMatches = content.match(/__[^_]+__/g);
    const strongDoubleAsteriskMatches = content.match(/\*\*[^\*]+\*\*/g);
    console.log(`- Strong style: __ (${strongDoubleUnderscoreMatches?.length || 0}) vs ** (${strongDoubleAsteriskMatches?.length || 0})`);
    
    // Check for list markers
    const dashListMarkers = content.match(/^-\s+/gm);
    const asteriskListMarkers = content.match(/^\*\s+/gm);
    console.log(`- List markers: - (${dashListMarkers?.length || 0}) vs * (${asteriskListMarkers?.length || 0})`);
    
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
  }
}

async function main() {
  try {
    console.log('Analyzing Python SDK Docs:');
    const pythonFiles = await glob(`${PYTHON_SDK_DOCS_PATH}/**/*.mdx`);
    for (const file of pythonFiles.slice(0, 2)) { // Just analyze a couple of files
      await analyzeFile(file);
    }
    
    console.log('\n\nAnalyzing TypeScript SDK Docs:');
    const tsFiles = await glob(`${TYPESCRIPT_SDK_DOCS_PATH}/**/*.mdx`);
    for (const file of tsFiles.slice(0, 2)) { // Just analyze a couple of files
      await analyzeFile(file);
    }
  } catch (error) {
    console.error('Error during analysis:', error);
  }
}

main(); 