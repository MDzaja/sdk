#!/usr/bin/env node
/**
 * SDK Documentation Standardization Tool
 * 
 * This script standardizes documentation formats between Python and TypeScript SDKs.
 * It can be used as a standalone script or integrated into a build process.
 * 
 * Usage:
 *   - To process a specific file: node sdk-docs-standardize.js path/to/file.mdx
 *   - To process all files in a directory: node sdk-docs-standardize.js path/to/directory
 *   - To process both SDK docs: node sdk-docs-standardize.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { glob } from 'glob';
import { remarkStandardizeCode } from './remark-standardize-code.js';

// Get the SDK root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SDK_ROOT = path.resolve(__dirname, '../..');

// Paths to the SDK documentation folders
const DEFAULT_PYTHON_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/python-sdk');
const DEFAULT_TYPESCRIPT_SDK_DOCS_PATH = path.join(SDK_ROOT, 'docs/typescript-sdk');

/**
 * Plugin to convert parameter tables to list format
 */
function remarkParametersToLists() {
  return (tree) => {
    const visit = (node, parent) => {
      // If we have a heading with "Parameters"
      if (node.type === 'heading' && 
          node.children?.[0]?.value?.includes('Parameters')) {
        
        // Find the next table after this heading
        let foundTable = false;
        let tableIndex = -1;
        
        if (parent && parent.children) {
          const nodeIndex = parent.children.indexOf(node);
          
          for (let i = nodeIndex + 1; i < parent.children.length; i++) {
            if (parent.children[i].type === 'table') {
              foundTable = true;
              tableIndex = i;
              break;
            } else if (parent.children[i].type === 'heading') {
              // Stop if we hit another heading
              break;
            }
          }
          
          // If we found a table, convert it to a list
          if (foundTable && tableIndex !== -1) {
            const table = parent.children[tableIndex];
            const listItems = [];
            
            // Skip the header row
            for (let j = 1; j < table.children.length; j++) {
              const row = table.children[j];
              const cells = row.children;
              
              if (cells.length >= 3) {
                // Extract parameter name, type, and description
                const paramName = cells[0]?.children?.[0]?.value || '';
                const paramType = cells[1]?.children?.[0]?.value || '';
                const paramDesc = cells[2]?.children?.[0]?.value || '';
                
                // Create a list item with the parameter information
                listItems.push({
                  type: 'listItem',
                  spread: false,
                  children: [{
                    type: 'paragraph',
                    children: [{
                      type: 'text',
                      value: `\`${paramName}\` _${paramType}_ - ${paramDesc}`
                    }]
                  }]
                });
              }
            }
            
            // Create a new list node to replace the table
            const list = {
              type: 'list',
              ordered: false,
              spread: false,
              children: listItems
            };
            
            // Replace the table with the list
            parent.children[tableIndex] = list;
            
            // Also update the heading to "Arguments" for consistency
            node.children[0].value = 'Arguments';
          }
        }
      }
      
      // Visit all children
      if (node.children) {
        for (let child of node.children) {
          visit(child, node);
        }
      }
    };
    
    visit(tree, null);
  };
}

/**
 * Plugin to standardize section headings
 */
function remarkStandardizeSections() {
  return (tree) => {
    const visit = (node) => {
      // Standardize headings
      if (node.type === 'heading') {
        const headingText = node.children?.[0]?.value;
        
        // Standardize common section names
        if (headingText) {
          // Convert "Returns" section formats
          if (/^returns$/i.test(headingText)) {
            node.children[0].value = 'Returns';
            node.depth = 4; // Consistent depth for Returns sections
          }
          
          // Convert "Example" section formats
          if (/^example$/i.test(headingText)) {
            node.children[0].value = 'Example';
            node.depth = 4; // Consistent depth for Examples sections
          }
          
          // Convert "Examples" section formats
          if (/^examples$/i.test(headingText)) {
            node.children[0].value = 'Examples';
            node.depth = 3; // Consistent depth for Examples sections
          }
          
          // Handle Parameters/Arguments/Attributes consistently
          if (/^parameters$/i.test(headingText)) {
            node.children[0].value = 'Arguments';
            node.depth = 4; // Consistent depth for Arguments sections
          }
          
          if (/^arguments$/i.test(headingText)) {
            node.depth = 4; // Ensure consistent depth
          }
          
          if (/^attributes$/i.test(headingText)) {
            node.depth = 4; // Ensure consistent depth
          }
          
          // Convert "Throws" section formats
          if (/^throws$/i.test(headingText)) {
            node.children[0].value = 'Throws';
            node.depth = 4; // Consistent depth for Throws sections
          }
        }
      }
      
      // Visit all children
      if (node.children) {
        for (let child of node.children) {
          visit(child);
        }
      }
    };
    
    visit(tree);
  };
}

/**
 * Standardize documentation for a file
 */
async function standardizeDoc(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that don't exist
    if (!content) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    // Parse the frontmatter separately
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
    const markdownContent = frontmatterMatch 
      ? content.substring(frontmatterMatch[0].length)
      : content;
    
    // Process the markdown content
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkParametersToLists)
      .use(remarkStandardizeSections)
      .use(remarkStandardizeCode)
      .use(remarkStringify, {
        bullet: '-',
        emphasis: '_',
        strong: '**',
        fence: '```',
        fences: true,
        incrementListMarker: true,
        listItemIndent: 'one',
        tightDefinitions: true
      })
      .process(markdownContent);
    
    // Combine the frontmatter and processed content
    const result = frontmatter + processedContent.toString();
    
    // Write the result back to the file
    fs.writeFileSync(filePath, result);
    console.log(`Standardized: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
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
      await standardizeDoc(file);
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
  console.log('Starting documentation standardization...');
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
        await standardizeDoc(absolutePath);
      } else {
        console.error(`Invalid path: ${absolutePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${absolutePath}:`, error);
    }
  }
  
  console.log('Documentation standardization complete!');
}

// Execute the script
main().catch(err => {
  console.error('Error during execution:', err);
  process.exit(1);
}); 