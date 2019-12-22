/// <reference path="../../typings/wiz.d.ts" />

let objApp = window['objApp'] || window.external as any as IWizExplorerApp,
  objWindow = objApp.Window,
  objCommon = objApp.CreateWizObject('WizKMControls.WizCommonUI') as IWizCommonUI;

class Document {
  doc: IWizDocument
  constructor(db, guid: string) {
    this.doc = guid
      ? db.DocumentFromGUID(guid)
      : objWindow.CurrentDocument;
  }
  title(): string {
    return this.doc.Title;
  }
  html(html?: string): void | string {
    if (html) {
      this.doc.UpdateDocument3(html, 0);
    } else {
      return this.doc.GetHtml();
    }
  }
}

class Database {
  db: IWizDatabase
  constructor(kbGUID?: string) {
    this.db = kbGUID
      ? objApp.GetGroupDatabase(kbGUID)
      : objApp.Database;
  }
  document(guid: string) {
    return new Document(this.db, guid);
  }
}

class File {
  constructor(public fileName: string) {
    this.fileName = fileName;
  }
  text(text?: string): void | string {
    if (text) {
      objCommon.SaveTextToFile(this.fileName, text, 'utf-8-bom');
    } else {
      return objCommon.LoadTextFromFile(this.fileName);
    }
  }
}

/**
 * @param {string} scriptFileName 需要获取路径的插件脚本名称
 * @return {string} 指定插件脚本所在路径
 */
export function path(scriptFileName: string): string {
  return objApp.GetPluginPathByScriptFileName(scriptFileName);
}

export function database(kbGUID?: string) {
  return new Database(kbGUID);
}

export function file(fileName: string) {
  return new File(fileName);
}
