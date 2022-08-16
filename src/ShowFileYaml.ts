import { Position, Range, Selection, Uri, window, workspace } from "vscode";

import * as fs from 'fs';
import { highLightTextInFile } from "./highLight";

export async function showTextDocumentWithErrors(result: any, documentText: string[]) {
    result.forEach(async (res: any) => {
        highLightTextInFile(res.location.lineNumber - 1,res.location.columnNumber);
    });
}


export async function jumpSpecifiedLine(lineNumber: number, filePath: string) {
	var pos1 = new Position(lineNumber, 0);
	var openPath = Uri.file(filePath);
	workspace.openTextDocument(openPath).then((doc: any) => {
		window.showTextDocument(doc).then((editor: any) => {
			// Line added - by having a selection at the same position twice, the cursor jumps there
			editor.selections = [new Selection(pos1, pos1)];
			// And the visible range jumps there too
			var range = new Range(pos1, pos1);
			editor.revealRange(range);
		});
	});
}