#!/usr/bin/env node
/**
 * Selective SDK Documentation Standardization Tool
 * 
 * This script standardizes only specific parts of the documentation without altering
 * the overall document structure.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';

// Get the SDK root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SDK_ROOT = path.resolve(__dirname, '../..');

// Paths to the SDK documentation folders
const PYTHON_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/python-sdk');
const TYPESCRIPT_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/typescript-sdk');

/**
 * Convert parameter tables to arguments lists
 */
function convertParameterTablesToLists(content) {
  // Find Parameters sections with tables
  const regex = /(#{1,4}\s+Parameters\s*\n+)(\|[^\n]*\|\s*\n\|\s*[-:]+\s*\|\s*[-:]+\s*\|\s*[-:]+\s*\|\s*\n)((?:\|[^\n]*\|\s*\n)+)/g;
  
  return content.replace(regex, (match, heading, tableHeader, tableRows) => {
    // Convert heading to "Arguments"
    const newHeading = heading.replace('Parameters', 'Arguments');
    
    // Parse table rows
    const rows = tableRows.split('\n').filter(row => row.trim().length > 0);
    
    // Convert to list items
    let list = '';
    for (const row of rows) {
      const cells = row.split('|').filter(cell => cell.trim().length > 0);
      if (cells.length >= 3) {
        const paramName = cells[0].trim();
        const paramType = cells[1].trim();
        const paramDesc = cells[2].trim();
        
        // Create list item in format: `name` _type_ - description
        list += `- \`${paramName}\` _${paramType}_ - ${paramDesc}\n`;
      }
    }
    
    return `${newHeading}\n${list}`;
  });
}

/**
 * Standardize section headings
 */
function standardizeSectionHeadings(content) {
  // Standardize heading levels
  return content
    // Standardize "Parameters" headings to "Arguments" at level 4
    .replace(/^(#{1,4})\s+Parameters\s*$/gm, '#### Arguments')
    // Standardize "Returns" sections to level 4
    .replace(/^(#{1,4})\s+Returns\s*$/gm, '#### Returns')
    // Standardize "Example" sections to level 4
    .replace(/^(#{1,4})\s+Example\s*$/gm, '#### Example')
    // Keep "Examples" sections at level 3
    .replace(/^(#{1,3})\s+Examples\s*$/gm, '### Examples')
    // Standardize "Throws" sections to level 4
    .replace(/^(#{1,4})\s+Throws\s*$/gm, '#### Throws');
}

/**
 * Process a file selectively
 */
async function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // First pass - convert parameter tables to lists
    let processedContent = convertParameterTablesToLists(content);
    
    // Second pass - standardize section headings
    processedContent = standardizeSectionHeadings(processedContent);
    
    // Write the result back only if it changed
    if (processedContent !== content) {
      fs.writeFileSync(filePath, processedContent);
      console.log(`Standardized: ${path.basename(filePath)}`);
    } else {
      console.log(`No changes needed: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

/**
 * Process all documentation files in a directory
 */
async function processDirectory(dirPath) {
  try {
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory not found: ${dirPath}`);
      return;
    }
    
    const files = await glob(`${dirPath}/**/*.mdx`);
    
    if (files.length === 0) {
      console.log(`No .mdx files found in ${dirPath}`);
      return;
    }
    
    for (const file of files) {
      await processFile(file);
    }
    
    console.log(`Processed ${files.length} files in ${dirPath}`);
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting selective documentation standardization...');
  console.log(`SDK root: ${SDK_ROOT}`);
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // No arguments provided, use default paths
    await processDirectory(DEFAULT_PYTHON_SDK_DOCS_PATH);
    await processDirectory(DEFAULT_TYPESCRIPT_SDK_DOCS_PATH);
  } else {
    // Process the provided path (file or directory)
    const targetPath = args[0];
    
    // If the path is relative, make it absolute from the SDK root
    const absolutePath = path.isAbsolute(targetPath) 
      ? targetPath
      : path.join(SDK_ROOT, targetPath);
    
    // Check if it's a directory or file
    try {
      const stats = fs.statSync(absolutePath);
      
      if (stats.isDirectory()) {
        await processDirectory(absolutePath);
      } else if (stats.isFile()) {
        await processFile(absolutePath);
      } else {
        console.error(`Invalid path: ${absolutePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${absolutePath}:`, error);
    }
  }
  
  console.log('Selective documentation standardization complete!');
}

main().catch(err => {
  console.error('Error during execution:', err);
  process.exit(1);
}); 