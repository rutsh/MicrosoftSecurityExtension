"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFileSettings = exports.GateFunctions = void 0;
const get_all_files_1 = require("get-all-files");
const vscode_1 = require("vscode");
class GateFunctions {
    async getFiles(searchSettings, files) {
        var _files = [];
        let myPath = vscode_1.workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
        myPath === undefined ? myPath = [] : null;
        for (const path of searchSettings.pathToSearch ? searchSettings.pathToSearch : myPath) {
            for (const filename of files?.length > 0 ? files : (0, get_all_files_1.getAllFilesSync)(path)) {
                if (filename.endsWith(searchSettings.fileExtension)) {
                    _files.push(filename);
                }
            }
        }
        return _files;
    }
    createOutputChannel(outputChannelName) {
        let outputChannel = vscode_1.window.createOutputChannel(outputChannelName);
        return outputChannel;
    }
    appendLineToOutputChannel(outputChannel, message) {
        outputChannel.appendLine(message);
    }
}
exports.GateFunctions = GateFunctions;
class GetFileSettings {
    constructor(fileExtension, pathToSearch) {
        this.fileExtension = fileExtension;
        this.pathToSearch = pathToSearch;
    }
}
exports.GetFileSettings = GetFileSettings;
//# sourceMappingURL=gate-functions.js.map