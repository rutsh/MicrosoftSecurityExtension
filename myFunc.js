"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execGate = void 0;
const child_process_1 = require("child_process");
const vscode_1 = require("vscode");
async function execGate() {
    const path = vscode_1.workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
    const command1 = `npm i -g retire`;
    const command2 = `retire --path c:\\Users\\user1\\Documents\\handesaim14\\Angular\\angular\\angular-app 
    --outputformat json --outputpath ./results.json`;
    let error = "";
    try {
        await (0, child_process_1.execSync)(command1);
    }
    catch (err) {
        error += err;
        console.log(err);
    }
    try {
        await (0, child_process_1.execSync)(command2);
    }
    catch (err) {
        error += err;
        console.log(err);
    }
    let result = require("./results.json");
    return result;
}
exports.execGate = execGate;
//# sourceMappingURL=myFunc.js.map