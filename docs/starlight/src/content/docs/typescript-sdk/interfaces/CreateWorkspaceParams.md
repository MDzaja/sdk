---
title: CreateWorkspaceParams Reference
description: CreateWorkspaceParams Reference for TypeScript SDK
---

[Daytona TypeScript SDK - v0.9.0](../README.md) / CreateWorkspaceParams

# Interface: CreateWorkspaceParams

Parameters for creating a new workspace
 CreateWorkspaceParams

## Table of contents

### Properties

- [async](CreateWorkspaceParams.md#async)
- [autoStopInterval](CreateWorkspaceParams.md#autostopinterval)
- [envVars](CreateWorkspaceParams.md#envvars)
- [id](CreateWorkspaceParams.md#id)
- [image](CreateWorkspaceParams.md#image)
- [labels](CreateWorkspaceParams.md#labels)
- [language](CreateWorkspaceParams.md#language)
- [public](CreateWorkspaceParams.md#public)
- [resources](CreateWorkspaceParams.md#resources)
- [target](CreateWorkspaceParams.md#target)
- [timeout](CreateWorkspaceParams.md#timeout)
- [user](CreateWorkspaceParams.md#user)

## Properties

### async

• `Optional` **async**: `boolean`

If true, will not wait for the workspace to be ready before returning

#### Defined in

[Daytona.ts:70](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L70)

___

### autoStopInterval

• `Optional` **autoStopInterval**: `number`

Auto-stop interval in minutes (0 means disabled) (must be a non-negative integer)

#### Defined in

[Daytona.ts:74](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L74)

___

### envVars

• `Optional` **envVars**: `Record`\<`string`, `string`\>

Optional environment variables to set in the workspace

#### Defined in

[Daytona.ts:60](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L60)

___

### id

• `Optional` **id**: `string`

Optional workspace ID. If not provided, a random ID will be generated

#### Defined in

[Daytona.ts:52](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L52)

___

### image

• `Optional` **image**: `string`

Optional Docker image to use for the workspace

#### Defined in

[Daytona.ts:54](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L54)

___

### labels

• `Optional` **labels**: `Record`\<`string`, `string`\>

Workspace labels

#### Defined in

[Daytona.ts:62](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L62)

___

### language

• `Optional` **language**: `CodeLanguage`

Programming language for direct code execution

#### Defined in

[Daytona.ts:58](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L58)

___

### public

• `Optional` **public**: `boolean`

Is the workspace port preview public

#### Defined in

[Daytona.ts:64](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L64)

___

### resources

• `Optional` **resources**: `WorkspaceResources`

Resource allocation for the workspace

#### Defined in

[Daytona.ts:68](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L68)

___

### target

• `Optional` **target**: `string`

Target location for the workspace

#### Defined in

[Daytona.ts:66](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L66)

___

### timeout

• `Optional` **timeout**: `number`

Timeout in seconds, for the workspace to be ready (0 means no timeout)

#### Defined in

[Daytona.ts:72](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L72)

___

### user

• `Optional` **user**: `string`

Optional os user to use for the workspace

#### Defined in

[Daytona.ts:56](https://github.com/MDzaja/sdk/blob/e93abec36901ef96205bc214bb41f96f1104036a/packages/typescript/src/Daytona.ts#L56)
