// @ts-check

import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  const titleMap = {
    LspServer: "Language Server Protocol",
    // Add other model.name to title mappings here as needed
  };

  app.renderer.markdownHooks.on("page.begin", (ctx) => {
    let title = titleMap[ctx.page.model.name] || ctx.page.model.name;
    title = title.replace(/([A-Z])/g, ' $1').trim();

    return `---\ntitle: ${title}\ndescription: ${title}\n---\n`
  });

  app.renderer.on(MarkdownPageEvent.END, (page) => {
    if (page.contents) {
      // Replace "Defined in: filename.ts:line" with "[view_source]"
      page.contents = page.contents.replace(/Defined in: \[([^\]]+)]\(([^)]+)\)/g, "[[view_source]]($2)");

      // Remove all internal links
      page.contents = page.contents.replace(/\[([^\]]+)]\([^)]+\)/g, "$1");

      // Ensure params and types in tables are formatted correctly
      page.contents = page.contents.replace(/\| ([^|`]*`[^|]+`[^|]*(?:\\\|[^|`]*`[^|]+`)*) (?=\|)/g, (match, cellContent) => {
        // If the cell contains backticks, remove <a> elements entirely (including their content)
        if (cellContent.includes("`")) {
          cellContent = cellContent.replace(/<a [^>]*>.*?<\/a>/g, '');
          cellContent = ` \`${cellContent.replace(/`/g, '').replace(/\\(?!\|)/g, '').trim()}\` `;
        } else {
          cellContent = ` ${cellContent.trim()} `;
        }

        return `|${cellContent}`;
      });

      // Ensure `Promise<T>` is correctly wrapped
      page.contents = page.contents.replace(/`Promise`\s*\\<((?:`?[^`<>]+`?|<[^<>]+>)*?)>/g, (match, typeContent) => {
          return "`Promise<" + typeContent.replace(/[`\\]/g, '') + ">`";
      });    
    }
  });
}