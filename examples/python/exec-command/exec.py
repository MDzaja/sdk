from daytona_sdk import Daytona, CreateWorkspaceParams, DaytonaConfig

config = DaytonaConfig(
    api_key="dtn_53642f583077d534f6ac7704ba308e535305a9b2d1d59450d0dd9ecea55a2a42",
    server_url="https://stage.daytona.work/api",
    target="eu"
)

daytona = Daytona(config)

params = CreateWorkspaceParams(
    language="python",
)
workspace = daytona.create(params)

# Run the code securely inside the workspace
response = workspace.process.code_run('print("Hello World!")')
if response.exit_code != 0:
    print(f"Error: {response.exit_code} {response.result}")
else:
    print(response.result)

# Execute an os command in the workspace
response = workspace.process.exec('echo "Hello World from exec!"', cwd="/home/daytona", timeout=10)
if response.exit_code != 0:
    print(f"Error: {response.exit_code} {response.result}")
else:
    print(response.result)

project_dir = "/home/daytona/sdk"

# create folder
workspace.git.clone("https://github.com/MDzaja/sdk.git", project_dir)

branches = workspace.git.branches(project_dir)
print(f"Current branch: {branches.branches}")


daytona.remove(workspace)
