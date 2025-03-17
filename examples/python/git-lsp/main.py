from daytona_sdk import Daytona
import os


def main():
    daytona = Daytona()

    sandbox = daytona.create()

    try:
        root_dir = sandbox.get_user_root_dir()
        project_dir = os.path.join(root_dir, "learn-typescript")

        # Clone the repository
        sandbox.git.clone(
            "https://github.com/panaverse/learn-typescript", project_dir, "master"
        )

        sandbox.git.pull(project_dir)

        # Search for the file we want to work on
        matches = sandbox.fs.find_files(project_dir, "var obj1 = new Base();")
        print("Matches:", matches)

        # Start the language server
        lsp = sandbox.create_lsp_server("typescript", project_dir)
        lsp.start()

        # Notify the language server of the document we want to work on
        lsp.did_open(matches[0].file)

        # Get symbols in the document
        symbols = lsp.document_symbols(matches[0].file)
        print("Symbols:", symbols)

        # Fix the error in the document
        sandbox.fs.replace_in_files(
            [matches[0].file], "var obj1 = new Base();", "var obj1 = new E();"
        )

        # Notify the language server of the document change
        lsp.did_close(matches[0].file)
        lsp.did_open(matches[0].file)

        # Get completions at a specific position
        completions = lsp.completions(
            matches[0].file, {"line": 12, "character": 18})
        print("Completions:", completions)

    except Exception as error:
        print("Error creating sandbox:", error)
    finally:
        # Cleanup
        daytona.remove(sandbox)


if __name__ == "__main__":
    main()
