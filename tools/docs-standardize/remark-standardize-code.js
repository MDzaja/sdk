/**
 * Remark plugin to standardize code blocks and method signatures
 */
export function remarkStandardizeCode() {
  return (tree) => {
    const visit = (node) => {
      // Standardize code blocks
      if (node.type === 'code') {
        // Standardize language tags in code blocks
        if (node.lang === 'ts' || node.lang === 'typescript') {
          node.lang = 'typescript';
        } else if (node.lang === 'py' || node.lang === 'python') {
          node.lang = 'python';
        }
        
        // Clean up code content - remove extra indentation
        if (node.value) {
          const lines = node.value.split('\n');
          
          // Find minimum indentation level (excluding empty lines)
          const nonEmptyLines = lines.filter(line => line.trim().length > 0);
          const indentLevels = nonEmptyLines.map(line => {
            const match = line.match(/^(\s*)/);
            return match[1].length;
          });
          
          const minIndent = Math.min(...indentLevels);
          
          // Remove common indentation
          if (minIndent > 0) {
            node.value = lines.map(line => {
              if (line.trim().length === 0) return '';
              return line.substring(minIndent);
            }).join('\n');
          }
        }
      }
      
      // Standardize method signatures
      if (node.type === 'code' && (node.lang === 'python' || node.lang === 'typescript')) {
        if (node.value && node.value.includes('(') && node.value.includes(')')) {
          // For TypeScript, ensure method signatures use consistent format
          if (node.lang === 'typescript') {
            // Look for function/method declarations in TypeScript
            const tsMethodRegex = /^(async\s+)?([a-zA-Z0-9_]+)\((.+)?\)(\s*:\s*(.+))?$/;
            const lines = node.value.split('\n');
            
            const updatedLines = lines.map(line => {
              const match = line.trim().match(tsMethodRegex);
              if (match) {
                const asyncPrefix = match[1] || '';
                const methodName = match[2];
                const params = match[3] || '';
                const returnType = match[5] || 'void';
                
                // Standardize to format: methodName(params): returnType
                return `${asyncPrefix}${methodName}(${params}): ${returnType}`;
              }
              return line;
            });
            
            node.value = updatedLines.join('\n');
          }
          
          // For Python, ensure method signatures use consistent format
          if (node.lang === 'python') {
            // Look for function/method declarations in Python
            const pyMethodRegex = /^def\s+([a-zA-Z0-9_]+)\((.+)?\)(\s*->\s*(.+))?:$/;
            const lines = node.value.split('\n');
            
            const updatedLines = lines.map(line => {
              const match = line.trim().match(pyMethodRegex);
              if (match) {
                const methodName = match[1];
                const params = match[2] || '';
                const returnType = match[4] || '';
                
                // Standardize to format: def method_name(params) -> return_type:
                if (returnType) {
                  return `def ${methodName}(${params}) -> ${returnType}:`;
                } else {
                  return `def ${methodName}(${params}):`;
                }
              }
              return line;
            });
            
            node.value = updatedLines.join('\n');
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