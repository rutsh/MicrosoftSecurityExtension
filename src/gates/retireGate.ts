

import {  execSync } from "child_process";
import { OutputChannel, workspace } from "vscode";
//import { read, readFile, readFileSync, readSync } from "fs";
import { CustomGate } from "../customGate/customer-gate";
import { FileMessages, GateData, GateResult, ResultsList } from "../customGate/gate-data";
const axios = require('axios');
const appRoot = require('app-root-path');
export class RetireGate extends CustomGate {
    labels: string[] = ["High", "Medium", "Low"];
    label: string = "Retire";
    description: string = "";
    public async scanData(): Promise<GateData> {
        const resultData = new GateData();
        const outputChannel = this.createOutputChannel('Retire');
        // const response = await axios.default({
        //     //sending to the api
        //     method: "post",
        //     data:myPath![0],
        //     url:  "https://myfunctionruth.azurewebsites.net/api/TryFunc1?code=DlsIH3aoATO_ybCePc3-7HG1igC5wtwKaKuzp1asc9ymAzFuUHiKNQ==",
        //     headers:
        //     {
        //         "Content-Type": `multipart/form-data`
        //     }
        // });
        // console.log(response);
        await this.execGate(outputChannel).then((response) => {
            const resultArr: ResultsList[] = [];
            resultArr.push(new ResultsList(this.labels[0], []));
            resultArr.push(new ResultsList(this.labels[1], []));
            resultArr.push(new ResultsList(this.labels[2], []));
            response.data?.forEach((item: any) => {
                let filePath = item.file;
                item.results.forEach((re: any) => {
                    const high: GateResult[] = [];
                    const medium: GateResult[] = [];
                    const low: GateResult[] = [];
                    re.vulnerabilities.forEach((v: any) => {
                        switch (v.severity) {
                            case "high": high.push(new GateResult(v.info[0], v.identifiers.summary));break;
                            case "medium": medium.push(new GateResult(v.info[0], v.identifiers.summary));break;
                            case "low": low.push(new GateResult(v.info[0], v.identifiers.summary));
                        }
                    });
                    high.length > 0 ? resultArr[0].result.push(new FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), high)) : null;
                    medium.length > 0 ? resultArr[1].result.push(new FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), medium)) : null;
                    low.length > 0 ? resultArr[2].result.push(new FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), low)) : null;
                });
            });
            resultData.data = resultArr;
        });

        return Promise.resolve(resultData);
    }



    public async execGate(outputChannel:OutputChannel) {
        const path = workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
        const command1 = `npm i -g retire`;
        const command2 = `retire --path ${path} --outputformat json --outputpath ${appRoot}\\results.json`;
        try {
            await execSync(command1);
        } catch (err) {
            console.log(err);
        }
        try {
            this.appendLineToOutputChannel(outputChannel,"Retire scanning the project...");
            await execSync(command2);
        } catch (err) {
            console.log(err);
        }
        this.appendLineToOutputChannel(outputChannel,"The scan is finished");
        const result = require(appRoot + "\\results.json");
        return result;
    }

}