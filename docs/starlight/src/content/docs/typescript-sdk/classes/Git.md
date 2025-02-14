---
title: Git Reference
description: Git Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / Git

# Class: Git

Provides Git operations within a workspace
 Git

## Table of contents

### Constructors

- [constructor](Git.md#constructor)

### Methods

- [add](Git.md#add)
- [branches](Git.md#branches)
- [clone](Git.md#clone)
- [commit](Git.md#commit)
- [pull](Git.md#pull)
- [push](Git.md#push)
- [status](Git.md#status)

## Constructors

### constructor

• **new Git**(`workspace`, `toolboxApi`, `instance`): [`Git`](Git.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | [`Workspace`](Workspace.md) |
| `toolboxApi` | `ToolboxApi` |
| `instance` | `Workspace` |

#### Returns

[`Git`](Git.md)

#### Defined in

[Git.ts:14](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L14)

## Methods

### add

▸ **add**(`path`, `files`): `Promise`\<`void`\>

Stages files for commit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |
| `files` | `string`[] | Array of file paths to stage |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Git.ts:26](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L26)

___

### branches

▸ **branches**(`path`): `Promise`\<`ListBranchResponse`\>

Lists branches in the repository

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |

#### Returns

`Promise`\<`ListBranchResponse`\>

List of branches

#### Defined in

[Git.ts:38](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L38)

___

### clone

▸ **clone**(`url`, `path`, `branch?`, `commitId?`, `username?`, `password?`): `Promise`\<`void`\>

Clones a Git repository

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Repository URL |
| `path` | `string` | Destination path |
| `branch?` | `string` | Branch to clone |
| `commitId?` | `string` | Specific commit to clone |
| `username?` | `string` | Git username for authentication |
| `password?` | `string` | Git password/token for authentication |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Git.ts:53](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L53)

___

### commit

▸ **commit**(`path`, `message`, `author`, `email`): `Promise`\<`void`\>

Creates a new commit with staged changes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |
| `message` | `string` | Commit message |
| `author` | `string` | Author name |
| `email` | `string` | Author email |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Git.ts:80](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L80)

___

### pull

▸ **pull**(`path`, `username?`, `password?`): `Promise`\<`void`\>

Pulls changes from remote repository

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |
| `username?` | `string` | Git username for authentication |
| `password?` | `string` | Git password/token for authentication |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Git.ts:120](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L120)

___

### push

▸ **push**(`path`, `username?`, `password?`): `Promise`\<`void`\>

Pushes local commits to remote repository

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |
| `username?` | `string` | Git username for authentication |
| `password?` | `string` | Git password/token for authentication |

#### Returns

`Promise`\<`void`\>

#### Defined in

[Git.ts:101](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L101)

___

### status

▸ **status**(`path`): `Promise`\<`GitStatus`\>

Gets the current Git repository status

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Repository path |

#### Returns

`Promise`\<`GitStatus`\>

Repository status information

#### Defined in

[Git.ts:137](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Git.ts#L137)
