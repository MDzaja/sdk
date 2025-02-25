import {
  CompletionList,
  LspSymbol,
  Workspace as WorkspaceInstance,
  ToolboxApi,
} from '@daytonaio/api-client'
import { parseApiError } from './utils/errors'

/**
 * Supported language server types
 * @typedef {('typescript')} LspLanguageId
 */
export type LspLanguageId = 'typescript'

/**
 * Position in a text document
 * @interface Position
 */
export type Position = {
  /** Zero-based line number */
  line: number
  /** Zero-based character offset */
  character: number
}

/**
 * Provides Language Server Protocol (LSP) functionality
 * @class LspServer
 */
export class LspServer {
  constructor(
    private readonly languageId: LspLanguageId,
    private readonly pathToProject: string,
    private readonly toolboxApi: ToolboxApi,
    private readonly instance: WorkspaceInstance,
  ) {}

  /**
   * Starts the language server
   * @returns {Promise<void>}
   */
  public async start(): Promise<void> {
    try {
      await this.toolboxApi.lspStart(
        this.instance.id,
        {
          languageId: this.languageId,
          pathToProject: this.pathToProject,
        },
      )
    } catch (error) {
      throw new Error(`Failed to start language server: ${parseApiError(error)}`)
    }
  }

  /**
   * Stops the language server
   * @returns {Promise<void>}
   */
  public async stop(): Promise<void> {
    try {
      await this.toolboxApi.lspStop(
        this.instance.id,
        {
          languageId: this.languageId,
          pathToProject: this.pathToProject,
        },
      )
    } catch (error) {
      throw new Error(`Failed to stop language server: ${parseApiError(error)}`)
    }
  }

  /**
   * Notifies the server that a file has been opened
   * @param {string} path - Path to the opened file
   * @returns {Promise<void>}
   */
  public async didOpen(path: string): Promise<void> {
    try {
      await this.toolboxApi.lspDidOpen(
        this.instance.id,
        {
          languageId: this.languageId,
        pathToProject: this.pathToProject,
          uri: 'file://' + path,
        },
      )
    } catch (error) {
      throw new Error(`Failed to open file: ${parseApiError(error)}`)
    }
  }

  /**
   * Notifies the server that a file has been closed
   * @param {string} path - Path to the closed file
   * @returns {Promise<void>}
   */
  public async didClose(path: string): Promise<void> {
    try {
      await this.toolboxApi.lspDidClose(
        this.instance.id,
        {
        languageId: this.languageId,
        pathToProject: this.pathToProject,
          uri: 'file://' + path,
        },
      )
    } catch (error) {
      throw new Error(`Failed to close file: ${parseApiError(error)}`)
    }
  }

  /**
   * Gets document symbols (functions, classes, etc.)
   * @param {string} path - Path to the file
   * @returns {Promise<LspSymbol[]>} Array of document symbols
   */
  public async documentSymbols(path: string): Promise<LspSymbol[]> {
    let response;
    try {
      response = await this.toolboxApi.lspDocumentSymbols(
        this.instance.id,
        this.languageId,
        this.pathToProject,
        'file://' + path,
      )
    } catch (error) {
      throw new Error(`Failed to get document symbols: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Searches for symbols across the workspace
   * @param {string} query - Search query
   * @returns {Promise<LspSymbol[]>} Array of matching symbols
   */
  public async workspaceSymbols(query: string): Promise<LspSymbol[]> {
    let response;
    try {
      response = await this.toolboxApi.lspWorkspaceSymbols(
        this.instance.id,
        this.languageId,
        this.pathToProject,
        query,
      )
    } catch (error) {
      throw new Error(`Failed to get workspace symbols: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Gets code completion suggestions
   * @param {string} path - Path to the file
   * @param {Position} position - Cursor position
   * @returns {Promise<CompletionList>} List of completion suggestions
   */
  public async completions(
    path: string,
    position: Position,
  ): Promise<CompletionList> {
    let response;
    try {
      response = await this.toolboxApi.lspCompletions(
        this.instance.id,
        {
          languageId: this.languageId,
          pathToProject: this.pathToProject,
          uri: 'file://' + path,
          position,
        },
      )
    } catch (error) {
      throw new Error(`Failed to get completions: ${parseApiError(error)}`)
    }
    return response.data
  }
}
