import * as vscode from 'vscode';
import { KubesecGate } from './kubesec/kubesec-gate';
import { Gate } from './tree item classes/gate';
import { TreeItem } from './tree item classes/tree-item';
import * as gatesList from './gates/gateList.json';


export class GatesProvider implements vscode.TreeDataProvider<TreeItem> {
  public gates: any[] = [];
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;


  constructor() {
    this.gates = [new KubesecGate(),
    ];
    this.loadGates();
  }

  loadGates() {
    gatesList.forEach((gate) => {
      import(gate.path).then((x: any) => {
        this.gates.push(new x[gate.name]());
      });

    });
  }

  getTreeItem(element: Gate): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItem | undefined): Thenable<TreeItem[]> {
    return element === undefined ?
      Promise.resolve(this.gates) :
      element.getMoreChildren(this);
  }

  activeAllGates() {
    this.gates.forEach((gate) => { return gate.setIsActive(true); });
    this.refresh();
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}



