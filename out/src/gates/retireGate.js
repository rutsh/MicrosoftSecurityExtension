"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetireGate = void 0;
const vscode_1 = require("vscode");
//import { read, readFile, readFileSync, readSync } from "fs";
const customer_gate_1 = require("../customGate/customer-gate");
const gate_data_1 = require("../customGate/gate-data");
const axios = require('axios');
const myFunc_1 = require("../../myFunc");
class RetireGate extends customer_gate_1.CustomGate {
    constructor() {
        super(...arguments);
        this.labels = ["High", "Medium", "Low"];
        this.label = "Retire";
        this.description = "";
        // public async execGate() {
        //     //const child_process_1 = require("child_process");
        //     const path = workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
        //     const command1 = `npm i -g retire`;
        //     const command2 = `retire --path ${path} --outputformat json --outputpath ./results.json`;
        //     let error = "";
        //     try {
        //         await execSync(command1);
        //     } catch (err) {
        //         error += err;
        //         console.log(err);
        //     }
        //     try {
        //         await execSync(command2);
        //     } catch (err) {
        //         error += err;
        //         console.log(err);
        //     }
        //      let result=require(".../results.json");
        //     return result;
        // }
    }
    async scanData() {
        const resultData = new gate_data_1.GateData();
        const outputChannel = this.createOutputChannel('Retire');
        let myPath = vscode_1.workspace.workspaceFolders?.map(elem => elem.uri.fsPath);
        console.log(myPath);
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
        await (0, myFunc_1.execGate)().then((response) => {
            //     console.log(data);
            //    exec(`npm i -g retire`,function(err));
            //        exec(command2).catch((err) => {
            //             console.log(err);
            //         }).then(() => {
            //     resultData.data = [];
            //    // new ResultsList()
            //     resultData.data[0].label = this.labels[0];
            //     resultData.data[1].label = this.labels[1];
            //     resultData.data[2].label = this.labels[2];
            //     resultData.data[0].result = [];
            //     resultData.data[1].result = [];
            //     resultData.data[2].result = [];
            // let highResult:ResultsList;
            const resultArr = [];
            resultArr.push(new gate_data_1.ResultsList(this.labels[0], []));
            resultArr.push(new gate_data_1.ResultsList(this.labels[1], []));
            resultArr.push(new gate_data_1.ResultsList(this.labels[2], []));
            response.data?.data?.forEach((item) => {
                let filePath = item.file;
                item.results.forEach((re) => {
                    // let res:GateResult[]=[];
                    const high = [];
                    const medium = [];
                    const low = [];
                    re.vulnerabilities.forEach((v) => {
                        switch (v.severity) {
                            case "high": high.push(new gate_data_1.GateResult(new gate_data_1.Location(0), v.identifiers.summary));
                            case "medium": medium.push(new gate_data_1.GateResult(new gate_data_1.Location(0), v.identifiers.summary));
                            case "low": low.push(new gate_data_1.GateResult(new gate_data_1.Location(0), v.identifiers.summary));
                        }
                        // res.push(new GateResult(new Location(0), v.identifiers.summary));
                    });
                    resultArr[0].result.push(new gate_data_1.FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), high));
                    resultArr[1].result.push(new gate_data_1.FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), medium));
                    resultArr[2].result.push(new gate_data_1.FileMessages(filePath, filePath.slice(filePath.lastIndexOf('\\') + 1), low));
                    //const result=new FileMessages(filePath,filePath.slice(filePath.lastIndexOf('\\')+1),res);
                });
            });
            //resultData.data=[];
            resultData.data = resultArr;
        });
        return Promise.resolve(resultData);
    }
}
exports.RetireGate = RetireGate;
//# sourceMappingURL=retireGate.js.map