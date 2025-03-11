# SDK Documentation Standardization

This project provides tools to standardize documentation across Python and TypeScript SDK docs to ensure a consistent format and style.

## Features

- Converts TypeScript parameter tables to list format (similar to Python docs)
- Standardizes section headings and formats (Examples, Arguments, Returns, etc.)
- Applies consistent formatting for code blocks
- Standardizes method signatures across both languages
- Handles frontmatter preservation

## Installation

1. Run the setup script to configure the tools:

```bash
cd tools/docs-standardize
./setup-docs-standardization.sh
```

## Usage

After installation, you can standardize your documentation by running:

```bash
npm run standardize-docs
```

### Command Line Options

The standardization script can also be used with these options:

**Standardize only Python SDK docs:**

```bash
node tools/docs-standardize/sdk-docs-standardize.js docs/python-sdk
```

**Standardize only TypeScript SDK docs:**

```bash
node tools/docs-standardize/sdk-docs-standardize.js docs/typescript-sdk
```

**Standardize a specific file:**

```bash
node tools/docs-standardize/sdk-docs-standardize.js path/to/file.mdx
```

## Configuration

### TypeScript SDK

The configuration adds these settings to TypeDoc:

- Uses list format for parameters instead of tables
- Standardizes section headings and formats
- Ensures consistent heading levels

### Python SDK

The pydoc-markdown configuration:

- Adds post-processing step for standardization
- Maintains consistent heading structure
- Standardizes code block formatting

## Example: Before and After

### Before (TypeScript)

```markdown
### Parameters

| Parameter | Type     | Description            |
| --------- | -------- | ---------------------- |
| `path`    | `string` | Directory to search in |
| `pattern` | `string` | Search pattern         |
```

### After (Standardized)

```markdown
#### Arguments

- `path` _string_ - Directory to search in
- `pattern` _string_ - Search pattern
```
