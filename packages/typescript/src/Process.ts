import {
  Command,
  ExecuteResponse,
  Session,
  SessionExecuteRequest,
  SessionExecuteResponse,
  ToolboxApi,
  Workspace,
} from '@daytonaio/api-client'
import { WorkspaceCodeToolbox } from './Workspace'
import { parseApiError } from './utils/errors';

/**
 * Handles process and code execution within a workspace
 * @class Process
 */
export class Process {
  constructor(
    private readonly codeToolbox: WorkspaceCodeToolbox,
    private readonly toolboxApi: ToolboxApi,
    private readonly instance: Workspace,
  ) {}

  /**
   * Executes a shell command in the workspace
   * @param {string} command - Command to execute
   * @returns {Promise<ExecuteResponse>} Command execution results
   */
  public async executeCommand(
    command: string,
    cwd?: string,
    timeout?: number
  ): Promise<ExecuteResponse> {
    let response;
    try {
      response = await this.toolboxApi.executeCommand(this.instance.id, {
        command,
        timeout,
        cwd,
    })
    } catch (error) {
      throw new Error(`Failed to execute command: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Executes code in the workspace using the appropriate language runtime
   * @param {string} code - Code to execute
   * @returns {Promise<ExecuteResponse>} Code execution results
   */
  public async codeRun(code: string): Promise<ExecuteResponse> {
    const runCommand = this.codeToolbox.getRunCommand(code)

    let response;
    try {
      response = await this.toolboxApi.executeCommand(this.instance.id, {
        command: runCommand,
      })
    } catch (error) {
      throw new Error(`Failed to execute code: ${parseApiError(error)}`)
    }

    return response.data
  }

  /**
   * Creates a new exec session in the workspace
   * @param {string} sessionId - Unique identifier for the session
   * @returns {Promise<ExecuteResponse>} Code execution results
   */
  public async createSession(sessionId: string): Promise<void> {
    try {
      await this.toolboxApi.createSession(this.instance.id, {
        sessionId,
      })
    } catch (error) {
      throw new Error(`Failed to create session: ${parseApiError(error)}`)
    }
  }

  /**
   * Executes a command in the session
   * @param {string} sessionId - Unique identifier for the session
   * @param {SessionExecuteRequest} req - Command to execute and async flag
   * @returns {Promise<SessionExecuteResponse>} Command execution results
   */
  public async executeSessionCommand(sessionId: string, req: SessionExecuteRequest): Promise<SessionExecuteResponse> {
    let response;
    try {
      response = await this.toolboxApi.executeSessionCommand(this.instance.id, sessionId, req)
    } catch (error) {
      throw new Error(`Failed to execute session command: ${parseApiError(error)}`)
    }

    return response.data
  }

  /**
   * Gets the logs for a command in the session
   * @param {string} sessionId - Unique identifier for the session
   * @param {string} commandId - Unique identifier for the command
   * @returns {Promise<string>} Command logs
   */
  public async getSessionCommandLogs(sessionId: string, commandId: string): Promise<string> {
    let response;
    try {
      response = await this.toolboxApi.getSessionCommandLogs(this.instance.id, sessionId, commandId)
    } catch (error) {
      throw new Error(`Failed to get session command logs: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Gets the session
   * @param {string} sessionId - Unique identifier for the session
   * @returns {Promise<Session>} Session
   */
  public async getSession(sessionId: string): Promise<Session> {
    let response;
    try {
      response = await this.toolboxApi.getSession(this.instance.id, sessionId)
    } catch (error) {
      throw new Error(`Failed to get session: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Gets the session command
   * @param {string} sessionId - Unique identifier for the session
   * @param {string} commandId - Unique identifier for the command
   * @returns {Promise<Command>} Session command
   */
  public async getSessionCommand(sessionId: string, commandId: string): Promise<Command> {
    let response;
    try {
      response = await this.toolboxApi.getSessionCommand(this.instance.id, sessionId, commandId)
    } catch (error) {
      throw new Error(`Failed to get session command: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Lists all sessions in the workspace
   * @returns {Promise<Session[]>} List of sessions
   */
  public async listSessions(): Promise<Session[]> {
    let response;
    try {
      response = await this.toolboxApi.listSessions(this.instance.id)
    } catch (error) {
      throw new Error(`Failed to list sessions: ${parseApiError(error)}`)
    }
    return response.data
  }

  /**
   * Deletes a session in the workspace
   * @param {string} sessionId - Unique identifier for the session
   */
  public async deleteSession(sessionId: string): Promise<void> {
    try {
      await this.toolboxApi.deleteSession(this.instance.id, sessionId)
    } catch (error) {
      throw new Error(`Failed to delete session: ${parseApiError(error)}`)
    }
  }
}
