# Table of Contents

* [daytona\_sdk.lsp\_server](#daytona_sdk.lsp_server)
  * [Position](#daytona_sdk.lsp_server.Position)
  * [LspServer](#daytona_sdk.lsp_server.LspServer)
    * [start](#daytona_sdk.lsp_server.LspServer.start)
    * [stop](#daytona_sdk.lsp_server.LspServer.stop)
    * [did\_open](#daytona_sdk.lsp_server.LspServer.did_open)
    * [did\_close](#daytona_sdk.lsp_server.LspServer.did_close)
    * [document\_symbols](#daytona_sdk.lsp_server.LspServer.document_symbols)
    * [workspace\_symbols](#daytona_sdk.lsp_server.LspServer.workspace_symbols)
    * [completions](#daytona_sdk.lsp_server.LspServer.completions)

<a id="daytona_sdk.lsp_server"></a>

# Module daytona\_sdk.lsp\_server

Language Server Protocol (LSP) support for Daytona workspaces.

This module provides LSP functionality for code intelligence features like
completions, symbols, and diagnostics.

<a id="daytona_sdk.lsp_server.Position"></a>

## Position Objects

```python
class Position()
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L19)

Represents a position in a text document.

**Arguments**:

- `line` - Zero-based line number
- `character` - Zero-based character offset

<a id="daytona_sdk.lsp_server.LspServer"></a>

## LspServer Objects

```python
class LspServer()
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L31)

Provides Language Server Protocol functionality.

**Arguments**:

- `language_id` - The language server type
- `path_to_project` - Path to the project root
- `toolbox_api` - API client for workspace operations
- `instance` - The workspace instance

<a id="daytona_sdk.lsp_server.LspServer.start"></a>

#### start

```python
def start() -> None
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L53)

Starts the language server.

<a id="daytona_sdk.lsp_server.LspServer.stop"></a>

#### stop

```python
def stop() -> None
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L64)

Stops the language server.

Should be called when the LSP server is no longer needed to free up resources.

<a id="daytona_sdk.lsp_server.LspServer.did_open"></a>

#### did\_open

```python
def did_open(path: str) -> None
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L78)

Notifies the language server that a file has been opened.

**Arguments**:

- `path` - Path to the opened file
  
  This method should be called when a file is opened in the editor to enable
  language features like diagnostics and completions for that file.

<a id="daytona_sdk.lsp_server.LspServer.did_close"></a>

#### did\_close

```python
def did_close(path: str) -> None
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L97)

Notifies the language server that a file has been closed.

**Arguments**:

- `path` - Path to the closed file
  
  This method should be called when a file is closed in the editor to allow
  the language server to clean up any resources associated with that file.

<a id="daytona_sdk.lsp_server.LspServer.document_symbols"></a>

#### document\_symbols

```python
def document_symbols(path: str) -> List[LspSymbol]
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L116)

Gets symbol information from a document.

**Arguments**:

- `path` - Path to the file to get symbols from
  

**Returns**:

  List of symbols (functions, classes, variables, etc.) in the document

<a id="daytona_sdk.lsp_server.LspServer.workspace_symbols"></a>

#### workspace\_symbols

```python
def workspace_symbols(query: str) -> List[LspSymbol]
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L133)

Searches for symbols across the workspace.

**Arguments**:

- `query` - Search query to match against symbol names
  

**Returns**:

  List of matching symbols from all files in the workspace

<a id="daytona_sdk.lsp_server.LspServer.completions"></a>

#### completions

```python
def completions(path: str, position: Position) -> CompletionList
```

[[view_source]](https://github.com/daytonaio/daytona-client/blob/b45168f061cd6be86cb18d4f6da11d28c59292bf/packages/python/src/daytona_sdk/lsp_server.py#L150)

Gets completion suggestions at a position in a file.

**Arguments**:

- `path` - Path to the file
- `position` - Cursor position to get completions for
  

**Returns**:

  List of completion suggestions including items like:
  - Variable names
  - Function names
  - Class names
  - Property names
  - etc.

