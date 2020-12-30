// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function wait(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "paste-as-typewriter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('paste-as-typewriter.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('Open a file in the editor to insert to paste.');
			return;
		}

		vscode.env.clipboard.readText().then(content => {

			if (content) {

				let line = editor.selection.start.line;
				let start = editor.selection.start.character;
				[...content].reduce((promise, character, index) =>
					promise.then((_) => editor.edit(editBuilder => editBuilder.insert(new vscode.Position(line, start + index), character))
						.then(_ => { if (character === '\n') { line++ } })
						.then(_ => { return wait(100) })
					), Promise.resolve());

			}

		});

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
