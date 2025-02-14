---
title: Daytona Reference
description: Daytona Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / Daytona

# Class: Daytona

Main class for interacting with Daytona Server API
 Daytona

## Table of contents

### Constructors

- [constructor](Daytona.md#constructor)

### Methods

- [create](Daytona.md#create)
- [get](Daytona.md#get)
- [getCurrentWorkspace](Daytona.md#getcurrentworkspace)
- [list](Daytona.md#list)
- [remove](Daytona.md#remove)
- [start](Daytona.md#start)
- [stop](Daytona.md#stop)

## Constructors

### constructor

• **new Daytona**(`config?`): [`Daytona`](Daytona.md)

Creates a new Daytona client instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config?` | [`DaytonaConfig`](../interfaces/DaytonaConfig.md) | Configuration options |

#### Returns

[`Daytona`](Daytona.md)

**`Throws`**

When API key or server URL is missing

#### Defined in

[Daytona.ts:94](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L94)

## Methods

### create

▸ **create**(`params?`): `Promise`\<[`Workspace`](Workspace.md)\>

Creates a new workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`CreateWorkspaceParams`](../interfaces/CreateWorkspaceParams.md) | Parameters for workspace creation |

#### Returns

`Promise`\<[`Workspace`](Workspace.md)\>

The created workspace instance

#### Defined in

[Daytona.ts:128](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L128)

___

### get

▸ **get**(`workspaceId`): `Promise`\<[`Workspace`](Workspace.md)\>

Gets a workspace by its ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspaceId` | `string` | The ID of the workspace to retrieve |

#### Returns

`Promise`\<[`Workspace`](Workspace.md)\>

The workspace instance

#### Defined in

[Daytona.ts:182](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L182)

___

### getCurrentWorkspace

▸ **getCurrentWorkspace**(`workspaceId`): `Promise`\<[`Workspace`](Workspace.md)\>

Gets the current workspace by ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspaceId` | `string` | The ID of the workspace to retrieve |

#### Returns

`Promise`\<[`Workspace`](Workspace.md)\>

The workspace instance

#### Defined in

[Daytona.ts:243](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L243)

___

### list

▸ **list**(): `Promise`\<[`Workspace`](Workspace.md)[]\>

Lists all workspaces

#### Returns

`Promise`\<[`Workspace`](Workspace.md)[]\>

The list of workspaces

#### Defined in

[Daytona.ts:195](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L195)

___

### remove

▸ **remove**(`workspace`): `Promise`\<`void`\>

Removes a workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspace` | [`Workspace`](Workspace.md) | The workspace to remove |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Daytona.ts:234](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L234)

___

### start

▸ **start**(`workspace`, `timeout?`): `Promise`\<`void`\>

Starts a workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspace` | [`Workspace`](Workspace.md) | The workspace to start |
| `timeout?` | `number` | - |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Daytona.ts:216](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L216)

___

### stop

▸ **stop**(`workspace`): `Promise`\<`void`\>

Stops a workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `workspace` | [`Workspace`](Workspace.md) | The workspace to stop |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Daytona.ts:225](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L225)
