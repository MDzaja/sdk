from .daytona import (
    Daytona,
    DaytonaConfig,
    CodeLanguage,
    SessionExecuteRequest,
    SessionExecuteResponse,
    DaytonaError,
    CreateSandboxParams,
    SandboxResources,
)
from .lsp_server import LspLanguageId
from .common.code_run_params import CodeRunParams
from .sandbox import (
    Sandbox,
    SandboxTargetRegion,
    SandboxState,
)


# Create deprecated aliases with proper warnings
from ._utils.deprecation import deprecated_alias
CreateWorkspaceParams = deprecated_alias('CreateWorkspaceParams', 'CreateSandboxParams')(CreateSandboxParams)
Workspace = deprecated_alias('Workspace', 'Sandbox')(Sandbox)
WorkspaceTargetRegion = deprecated_alias('WorkspaceTargetRegion', 'SandboxTargetRegion')(SandboxTargetRegion)
WorkspaceResources = deprecated_alias('WorkspaceResources', 'SandboxResources')(SandboxResources)
WorkspaceState = deprecated_alias('WorkspaceState', 'SandboxState')(SandboxState)


__all__ = [
    "Daytona",
    "DaytonaConfig",
    "CodeLanguage",
    "SessionExecuteRequest",
    "SessionExecuteResponse",
    "DaytonaError",
    "LspLanguageId",
    "WorkspaceTargetRegion",
    "WorkspaceState",
    "CodeRunParams",
    "CreateSandboxParams",
    "Sandbox",
    "SandboxTargetRegion",
    "SandboxResources",
    "SandboxState",
    "CreateWorkspaceParams",
    "Workspace",
    "WorkspaceTargetRegion",
    "WorkspaceResources",
    "WorkspaceState",
]
