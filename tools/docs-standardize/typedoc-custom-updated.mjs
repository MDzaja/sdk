// @ts-check

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  const titleMap = {
    Daytona: "Sandbox Management",
    FileSystem: "File System Operations",
    LspServer: "Language Server Protocol",
    Git: "Git Operations",
    Process: "Process and Code Execution",
    Workspace: "Sandbox",
    // Add other model.name to title mappings here as needed
  };

  const filenameMap = {
    Workspace: "sandbox",
    // Add other model.name to filename mappings here as needed
  };

  // --- SET TITLE HACK ---
  app.renderer.markdownHooks.on("page.begin", (ctx) => {
    let title = titleMap[ctx.page.model.name] || ctx.page.model.name;
    title = title.replace(/([A-Z])/g, ' $1').trim();

    return `---\ntitle: ${title}\n---\n`
  });

  // --- A LOT OF LITTLE HACKS ---
  app.renderer.on('markdownObject', (obj) => {
    if (obj.type === 'member' && obj.declaration && obj.context) {
      // Convert Parameters to Arguments format for consistency with Python docs
      obj.title = obj.title.replace(/Parameters/g, 'Arguments');
      
      // Format parameter lists to match Python docs style
      if (obj.parameters) {
        obj.parameters.forEach((param) => {
          // Format to: `name` _type_ - description
          param.title = `\`${param.name}\` _${param.type}_ - ${param.description}`;
        });
      }
    }
  });

  app.renderer.on('markdown', (evt) => {
    if (evt.text) {
      // Replace "Defined in: filename.ts:line" with "[view_source]"
      evt.text = evt.text.replace(/Defined in: \[([^\]]+)]\(([^)]+)\)/g, "[[view_source]]($2)");

      // Remove all internal links
      evt.text = evt.text.replace(/\[([^\]]+)]\([^)]+\)/g, "$1");

      // Ensure `Promise<T>` is correctly wrapped
      evt.text = evt.text.replace(/`Promise`\s*\\<((?:`?[^`<>]+`?|<[^<>]+>)*?)>/g, (match, typeContent) => {
          return "`Promise<" + typeContent.replace(/[`\\]/g, '') + ">`";
      });

      // Convert "Example" and "Examples" with < 3 hashtags to "### Example" / "### Examples"
      evt.text = evt.text.replace(/^(#{1,2})\s*(Example|Examples)$/gm, "### $2");
      
      // Convert "Parameters" to "Arguments" for consistency with Python docs
      evt.text = evt.text.replace(/^#{3,4}\s*Parameters$/gm, "#### Arguments");
      
      // Convert "Returns" sections to h4
      evt.text = evt.text.replace(/^#{3,4}\s*Returns$/gm, "#### Returns");
      
      // Convert "Throws" sections to h4
      evt.text = evt.text.replace(/^#{3,4}\s*Throws$/gm, "#### Throws");
    }
  });

  // --- HACK FOR DUPLICATE "THROWS" HEADERS (LEVEL 2 TO 7) ---
  app.renderer.on('end', (page) => {
    if (page.contents) {
      // Process "Throws" headers from level 2 to level 7
      for (let level = 2; level <= 7; level++) {
        const throwsHeader = "#".repeat(level) + " Throws"; // Generate header (e.g., ## Throws, ### Throws)
        const sectionHeaderRegex = new RegExp(`(?=^#{${level - 1}} .+)`, "gm"); // Regex for section start (parent level)
        const throwsRegex = new RegExp(`(\n${throwsHeader}\n)`, "g"); // Matches only the "Throws" header itself

        if (!page.contents) continue;

        // Split document into sections at parent level
        const sections = page.contents.split(sectionHeaderRegex);

        page.contents = sections
          .map((section) => {
            if (!section.includes(`\n${throwsHeader}`)) return section; // Skip if no "Throws" found at this level

            // Capture all occurrences of "Throws" headers at this specific level
            let throwsMatches = [...section.matchAll(throwsRegex)];

            if (throwsMatches.length <= 1) return section; // No duplicates, leave as is

            // Keep the first "Throws" header and remove only subsequent ones
            let headerRemovedCount = 0;
            let cleanedSection = section.replace(throwsRegex, (match) => {
              return headerRemovedCount++ === 0 ? match : ""; // Remove all except the first one
            });

            return cleanedSection;
          })
          .join("");
      }
      
      // Set all output files to .mdx extension
      if (page.filename) {
        if (filenameMap[page.model.name]) {
          page.filename = page.filename.replace(/\/([^\/]+)\.md$/, (match, fileName) => {
            return `/${filenameMap[page.model.name]}.mdx`;
          });
        } else {
          // Convert CamelCase filename to lowercase with hyphens
          page.filename = page.filename.replace(/\/([^\/]+)\.md$/, (match, fileName) => {
            let formattedName = fileName
            .replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between lowercase & uppercase
            .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Add hyphen between uppercase followed by lowercase
            .replace(/([0-9])([A-Za-z])/g, "$1-$2") // Add hyphen between number & letter
            .toLowerCase(); // Convert to lowercase
            return `/${formattedName}.mdx`; // Change extension to .mdx
          });
        }
      }
    }
  });
} 