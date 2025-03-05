from typing import Protocol, Dict, Any

class SandboxCodeToolbox(Protocol):
    def get_default_image(self) -> str: ...
    def get_code_run_command(self, code: str) -> str: ...
    def get_code_run_args(self) -> list[str]: ...
    # ... other protocol methods 

class SandboxInstance(Protocol):
    id: str
