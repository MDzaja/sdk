---
title: Process Reference
description: Process Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / Process

# Class: Process

Handles process and code execution within a workspace
 Process

## Table of contents

### Constructors

- [constructor](Process.md#constructor)

### Methods

- [codeRun](Process.md#coderun)
- [createSession](Process.md#createsession)
- [deleteSession](Process.md#deletesession)
- [executeCommand](Process.md#executecommand)
- [executeSessionCommand](Process.md#executesessioncommand)
- [getSession](Process.md#getsession)
- [getSessionCommand](Process.md#getsessioncommand)
- [getSessionCommandLogs](Process.md#getsessioncommandlogs)
- [listSessions](Process.md#listsessions)

## Constructors

### constructor

• **new Process**(`codeToolbox`, `toolboxApi`, `instance`): [`Process`](Process.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `codeToolbox` | [`WorkspaceCodeToolbox`](../interfaces/WorkspaceCodeToolbox.md) |
| `toolboxApi` | `ToolboxApi` |
| `instance` | `Workspace` |

#### Returns

[`Process`](Process.md)

#### Defined in

[Process.ts:17](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L17)

## Methods

### codeRun

▸ **codeRun**(`code`): `Promise`\<`ExecuteResponse`\>

Executes code in the workspace using the appropriate language runtime

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | Code to execute |

#### Returns

`Promise`\<`ExecuteResponse`\>

Code execution results

#### Defined in

[Process.ts:47](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L47)

___

### createSession

▸ **createSession**(`sessionId`): `Promise`\<`void`\>

Creates a new exec session in the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |

#### Returns

`Promise`\<`void`\>

Code execution results

#### Defined in

[Process.ts:62](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L62)

___

### deleteSession

▸ **deleteSession**(`sessionId`): `Promise`\<`void`\>

Deletes a session in the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Process.ts:124](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L124)

___

### executeCommand

▸ **executeCommand**(`command`, `cwd?`, `timeout?`): `Promise`\<`ExecuteResponse`\>

Executes a shell command in the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | `string` | Command to execute |
| `cwd?` | `string` | - |
| `timeout?` | `number` | - |

#### Returns

`Promise`\<`ExecuteResponse`\>

Command execution results

#### Defined in

[Process.ts:28](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L28)

___

### executeSessionCommand

▸ **executeSessionCommand**(`sessionId`, `req`): `Promise`\<`SessionExecuteResponse`\>

Executes a command in the session

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |
| `req` | `SessionExecuteRequest` | Command to execute and async flag |

#### Returns

`Promise`\<`SessionExecuteResponse`\>

Command execution results

#### Defined in

[Process.ts:74](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L74)

___

### getSession

▸ **getSession**(`sessionId`): `Promise`\<`Session`\>

Gets the session

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |

#### Returns

`Promise`\<`Session`\>

Session

#### Defined in

[Process.ts:95](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L95)

___

### getSessionCommand

▸ **getSessionCommand**(`sessionId`, `commandId`): `Promise`\<`Command`\>

Gets the session command

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |
| `commandId` | `string` | Unique identifier for the command |

#### Returns

`Promise`\<`Command`\>

Session command

#### Defined in

[Process.ts:106](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L106)

___

### getSessionCommandLogs

▸ **getSessionCommandLogs**(`sessionId`, `commandId`): `Promise`\<`string`\>

Gets the logs for a command in the session

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sessionId` | `string` | Unique identifier for the session |
| `commandId` | `string` | Unique identifier for the command |

#### Returns

`Promise`\<`string`\>

Command logs

#### Defined in

[Process.ts:85](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L85)

___

### listSessions

▸ **listSessions**(): `Promise`\<`Session`[]\>

Lists all sessions in the workspace

#### Returns

`Promise`\<`Session`[]\>

List of sessions

#### Defined in

[Process.ts:115](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Process.ts#L115)
