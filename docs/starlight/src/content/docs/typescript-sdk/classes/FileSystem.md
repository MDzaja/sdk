---
title: FileSystem Reference
description: FileSystem Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / FileSystem

# Class: FileSystem

Provides file system operations within a workspace
 FileSystem

## Table of contents

### Constructors

- [constructor](FileSystem.md#constructor)

### Methods

- [createFolder](FileSystem.md#createfolder)
- [deleteFile](FileSystem.md#deletefile)
- [downloadFile](FileSystem.md#downloadfile)
- [findFiles](FileSystem.md#findfiles)
- [getFileDetails](FileSystem.md#getfiledetails)
- [listFiles](FileSystem.md#listfiles)
- [moveFiles](FileSystem.md#movefiles)
- [replaceInFiles](FileSystem.md#replaceinfiles)
- [searchFiles](FileSystem.md#searchfiles)
- [setFilePermissions](FileSystem.md#setfilepermissions)
- [uploadFile](FileSystem.md#uploadfile)

## Constructors

### constructor

• **new FileSystem**(`instance`, `toolboxApi`): [`FileSystem`](FileSystem.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Workspace` |
| `toolboxApi` | `ToolboxApi` |

#### Returns

[`FileSystem`](FileSystem.md)

#### Defined in

[FileSystem.ts:29](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L29)

## Methods

### createFolder

▸ **createFolder**(`path`, `mode`): `Promise`\<`void`\>

Creates a new folder in the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path where the folder should be created |
| `mode` | `string` | Folder permissions in octal format |

#### Returns

`Promise`\<`void`\>

#### Defined in

[FileSystem.ts:40](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L40)

___

### deleteFile

▸ **deleteFile**(`path`): `Promise`\<`void`\>

Deletes a file from the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to delete |

#### Returns

`Promise`\<`void`\>

#### Defined in

[FileSystem.ts:50](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L50)

___

### downloadFile

▸ **downloadFile**(`path`): `Promise`\<`Blob`\>

Downloads a file from the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file to download |

#### Returns

`Promise`\<`Blob`\>

The file contents as a Blob

#### Defined in

[FileSystem.ts:60](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L60)

___

### findFiles

▸ **findFiles**(`path`, `pattern`): `Promise`\<`Match`[]\>

Searches for files matching a pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Directory to search in |
| `pattern` | `string` | Search pattern |

#### Returns

`Promise`\<`Match`[]\>

Array of matching files

#### Defined in

[FileSystem.ts:71](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L71)

___

### getFileDetails

▸ **getFileDetails**(`path`): `Promise`\<`FileInfo`\>

Gets details about a file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file |

#### Returns

`Promise`\<`FileInfo`\>

File information

#### Defined in

[FileSystem.ts:81](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L81)

___

### listFiles

▸ **listFiles**(`path`): `Promise`\<`FileInfo`[]\>

Lists files in a directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Directory path to list |

#### Returns

`Promise`\<`FileInfo`[]\>

Array of file information

#### Defined in

[FileSystem.ts:91](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L91)

___

### moveFiles

▸ **moveFiles**(`source`, `destination`): `Promise`\<`void`\>

Moves/renames files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Source path |
| `destination` | `string` | Destination path |

#### Returns

`Promise`\<`void`\>

#### Defined in

[FileSystem.ts:102](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L102)

___

### replaceInFiles

▸ **replaceInFiles**(`files`, `pattern`, `newValue`): `Promise`\<`ReplaceResult`[]\>

Replaces text in multiple files

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `string`[] | Array of file paths |
| `pattern` | `string` | Pattern to replace |
| `newValue` | `string` | Replacement value |

#### Returns

`Promise`\<`ReplaceResult`[]\>

Results of the replace operation

#### Defined in

[FileSystem.ts:114](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L114)

___

### searchFiles

▸ **searchFiles**(`path`, `pattern`): `Promise`\<`SearchFilesResponse`\>

Searches for files by name pattern

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Directory to search in |
| `pattern` | `string` | Search pattern |

#### Returns

`Promise`\<`SearchFilesResponse`\>

Search results

#### Defined in

[FileSystem.ts:135](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L135)

___

### setFilePermissions

▸ **setFilePermissions**(`path`, `permissions`): `Promise`\<`void`\>

Sets file permissions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the file |
| `permissions` | `FilePermissionsParams` | Permission settings |

#### Returns

`Promise`\<`void`\>

#### Defined in

[FileSystem.ts:149](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L149)

___

### uploadFile

▸ **uploadFile**(`path`, `file`): `Promise`\<`void`\>

Uploads a file to the workspace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Destination path |
| `file` | `File` | File contents to upload |

#### Returns

`Promise`\<`void`\>

#### Defined in

[FileSystem.ts:163](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/FileSystem.ts#L163)
