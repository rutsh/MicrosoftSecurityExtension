import { getAllFilesSync } from "get-all-files";
import path = require("path");
import { OutputChannel, Uri, window, workspace } from "vscode";
import { File } from "../tree item classes/file";


export class GateFunctions {

    public async getFiles(searchSettings: GetFileSettings, files: string[]) {
        let _files = [];
        let myPath = workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
        myPath === undefined ? myPath = [] : null;
        for (let path of searchSettings.pathToSearch ? searchSettings.pathToSearch : myPath) {
            for (let filename of files?.length > 0 ? files : getAllFilesSync(path)) {
                for (let fileExtension of searchSettings.fileExtension) {
                    if (filename.endsWith(fileExtension)) {
                        _files.push(filename);
                    }
                }
            }
        }
        return _files;
    }

    public createOutputChannel(outputChannelName: string) {
        let outputChannel = window.createOutputChannel(outputChannelName);
        return outputChannel;
    }

    public appendLineToOutputChannel(outputChannel: OutputChannel, message: string) {
        outputChannel.appendLine(message);
    }

    public writeResultsToOutput(results: File, outputChannel: OutputChannel) {
        this.appendLineToOutputChannel(outputChannel, "in file: " + results.fileName + " /n");
        results.results.forEach((item) => {
            this.appendLineToOutputChannel(outputChannel, item.message);
        });
    }


}

export class GetFileSettings {
    fileExtension!: string[];
    pathToSearch?: string;
    constructor(fileExtension: string[], pathToSearch?: string) {
        this.fileExtension = fileExtension;
        this.pathToSearch = pathToSearch;
    }
}


