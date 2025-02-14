---
title: Workspace Reference
description: Workspace Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / Workspace

# Class: Workspace

Represents a Daytona workspace instance with file system, git, and process management capabilities
 Workspace

## Table of contents

### Constructors

- [constructor](Workspace.md#constructor)

### Properties

- [fs](Workspace.md#fs)
- [git](Workspace.md#git)
- [id](Workspace.md#id)
- [instance](Workspace.md#instance)
- [process](Workspace.md#process)
- [toolboxApi](Workspace.md#toolboxapi)
- [workspaceApi](Workspace.md#workspaceapi)

### Methods

- [createLspServer](Workspace.md#createlspserver)
- [delete](Workspace.md#delete)
- [getWorkspaceRootDir](Workspace.md#getworkspacerootdir)
- [info](Workspace.md#info)
- [setAutostopInterval](Workspace.md#setautostopinterval)
- [setLabels](Workspace.md#setlabels)
- [start](Workspace.md#start)
- [stop](Workspace.md#stop)
- [waitUntilStarted](Workspace.md#waituntilstarted)
- [waitUntilStopped](Workspace.md#waituntilstopped)

## Constructors

### constructor

• **new Workspace**(`id`, `instance`, `workspaceApi`, `toolboxApi`, `codeToolbox`): [`Workspace`](Workspace.md)

Creates a new workspace instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Unique identifier for the workspace |
| `instance` | `Workspace` | The underlying workspace instance |
| `workspaceApi` | `WorkspaceApi` | API client for workspace operations |
| `toolboxApi` | `ToolboxApi` | API client for toolbox operations |
| `codeToolbox` | [`WorkspaceCodeToolbox`](../interfaces/WorkspaceCodeToolbox.md) | Language-specific toolbox implementation |

#### Returns

[`Workspace`](Workspace.md)

#### Defined in

[Workspace.ts:87](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L87)

## Properties

### fs

• `Readonly` **fs**: [`FileSystem`](FileSystem.md)

File system operations for the workspace

#### Defined in

[Workspace.ts:72](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L72)

___

### git

• `Readonly` **git**: [`Git`](Git.md)

Git operations for the workspace

#### Defined in

[Workspace.ts:74](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L74)

___

### id

• `Readonly` **id**: `string`

Unique identifier for the workspace

#### Defined in

[Workspace.ts:88](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L88)

___

### instance

• `Readonly` **instance**: `Workspace`

The underlying workspace instance

#### Defined in

[Workspace.ts:89](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L89)

___

### process

• `Readonly` **process**: [`Process`](Process.md)

Process and code execution operations

#### Defined in

[Workspace.ts:76](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L76)

___

### toolboxApi

• `Readonly` **toolboxApi**: `ToolboxApi`

API client for toolbox operations

#### Defined in

[Workspace.ts:91](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L91)

___

### workspaceApi

• `Readonly` **workspaceApi**: `WorkspaceApi`

API client for workspace operations

#### Defined in

[Workspace.ts:90](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L90)

## Methods

### createLspServer

▸ **createLspServer**(`languageId`, `pathToProject`): `LspServer`

Creates a new Language Server Protocol (LSP) server instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `languageId` | ``"typescript"`` | The language server type |
| `pathToProject` | `string` | Path to the project root |

#### Returns

`LspServer`

A new LSP server instance

#### Defined in

[Workspace.ts:116](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L116)

___

### delete

▸ **delete**(): `Promise`\<`void`\>

Deletes the workspace

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:161](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L161)

___

### getWorkspaceRootDir

▸ **getWorkspaceRootDir**(): `Promise`\<`undefined` \| `string`\>

Gets the root directory path of the workspace

#### Returns

`Promise`\<`undefined` \| `string`\>

The absolute path to the workspace root

#### Defined in

[Workspace.ts:103](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L103)

___

### info

▸ **info**(): `Promise`\<`WorkspaceInfo`\>

Get structured information about the workspace

#### Returns

`Promise`\<`WorkspaceInfo`\>

Structured workspace information

#### Defined in

[Workspace.ts:218](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L218)

___

### setAutostopInterval

▸ **setAutostopInterval**(`interval`): `Promise`\<`void`\>

Sets the auto-stop interval for the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `number` | Number of minutes after which the workspace will automatically stop (must be an integer). Set to 0 to disable auto-stop. |

#### Returns

`Promise`\<`void`\>

**`Throws`**

If interval is negative

#### Defined in

[Workspace.ts:256](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L256)

___

### setLabels

▸ **setLabels**(`labels`): `Promise`\<`void`\>

Sets labels for the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `labels` | `Record`\<`string`, `string`\> | The labels to set |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:132](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L132)

___

### start

▸ **start**(`timeout?`): `Promise`\<`void`\>

Starts the workspace

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeout?` | `number` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:140](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L140)

___

### stop

▸ **stop**(): `Promise`\<`void`\>

Stops the workspace

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:152](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L152)

___

### waitUntilStarted

▸ **waitUntilStarted**(`timeout?`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeout` | `number` | `60` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:165](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L165)

___

### waitUntilStopped

▸ **waitUntilStopped**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[Workspace.ts:191](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Workspace.ts#L191)
