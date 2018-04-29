// Type definitions for wiz ^4.5
// Project: http://http://www.wiz.cn/
// Definitions by: plylrnsdy <https://github.com/plylrnsdy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8.1

interface IWizEventDispatcher<T, U, V> {
    add(callback: (arg1: T, arg2: U, arg3: V) => void): void
    remove(callback: (arg1: T, arg2: U, arg3: V) => void): void
    dispatch(): void
    dispatch1(arg1: T): void
    dispatch2(arg1: T, arg2: U): void
    dispatch3(arg1: T, arg2: U, arg3: V): void
}
interface IWizExplorerApp {
    Database: IWizDatabase
    SettingsPath: string
    Window: IWizExplorerWindow

    CreateWizObject(objName: string): any
    GetGroupDatabase(kbGUID: string): IWizDatabase
    GetPluginPathByScriptFileName(fileName: string): string
}
interface IWizExplorerWindow {
    CurrentDocument: IWizDocument
    /**
     * @deprecated wiz >=4.5
     */
    CurrentDocumentHtmlDocument: HTMLDocument
    /**
     * @since wiz 4.5
     */
    CurrentDocumentBrowserObject: IWizChromeBrowser
    /**
     * 显示一个 HTML 文件（不同于 HTML 对话框，在 Wiz 的文档窗口 Tab 里面显示）
     * @param fileUrl {string} HTML 的绝对路径，URL 后面可以带查询字符串（?key=value&key2=value2...）
     */
    ViewHtml(fileUrl: string, isOpenInNewTab: boolean): void
}
/**
 * 为了启用多个选项，可以将他们相 与(&)
 */
declare enum WizDocumentUpdateFlag {
    // 保存选中部分，仅仅针对 UpdateDocument2 有效
    wizUpdateDocumentSaveSel = 0x0001,
    // 包含 html 里面的脚本
    wizUpdateDocumentIncludeScript = 0x0002,
    // 显示进度
    wizUpdateDocumentShowProgress = 0x0004,
    // 只保存正文
    wizUpdateDocumentSaveContentOnly = 0x0008,
    // 只保存文字内容，并且为纯文本
    wizUpdateDocumentSaveTextOnly = 0x0010,
    // 不从网络下载 html 里面的资源
    wizUpdateDocumentDonotDownloadFile = 0x0020,
    // 如果只保存正文，允许使用自动获得正文方式
    wizUpdateDocumentAllowAutoGetContent = 0x0040
}
interface IWizDocument {
    GUID: string
    Title: string
    Database: IWizDatabase

    GetHtml(): string
    SaveToHtml(path: string, flag: number): void
    UpdateDocument3(html: string, flag: WizDocumentUpdateFlag | number): void
}
/**
 * 4.5 以前版本，使用一个浏览器加载阅读状态下的笔记，external 对象即 WizExplorerApp 对象；使用另一个浏览器加载编辑状态下的笔记， external 对象为 IWizHtmlEditorApp 类型，所属文件 WizTools.idl。
 *
 * 4.5以及之后版本，改为使用一个浏览器来加载阅读状态与编辑状态下的笔记，external 对象类型为 IWizHtmlEditorApp。
 */
interface IWizHtmlEditorApp {
    SettingsPath: string
}
interface IWizDatabase {
    KbGUID: string
}
interface IWizChromeBrowser {
    ExecuteScript(script: string, callback: (fnReturn) => void)
    ExecuteScriptFile(filePath: string, callback: (fnReturn) => void): void
    ExecuteFunction(fnName: string, callback: (fnReturn) => void): void
    ExecuteFunction1(fnName: string, arg, callback: (fnReturn) => void): void
    ExecuteFunction2(fnName: string, arg, arg2, callback: (fnReturn) => void): void
    ExecuteFunction3(fnName: string, arg, arg2, arg3, callback: (fnReturn) => void): void
    ExecuteFunction4(fnName: string, arg, arg2, arg3, arg4, callback: (fnReturn) => void): void
}
interface IWizCommonUI {
    CopyFile(srcFilePath: string, destFilePath: string): void
    CreateDirectory(path: string): void
    LoadTextFromFile(path: string): string
    PathFileExists(path: string): boolean
    SaveTextToFile(file: string, text: string, encoding: string): void
    GetSpecialFolder(dirName: 'WindowsFolder' | 'SystemFolder' | 'TemporaryFolder' | 'AppPath'): string
    GetValueFromIni(iniPath: string, group: string, key: string): string
}

declare const eventsClose: IWizEventDispatcher<void, void, void>
declare const eventsAccountChanged: IWizEventDispatcher<void, void, void>
declare const eventsTabCreate: IWizEventDispatcher<HTMLDocument | IWizDocument, void, void>
declare const eventsTabClose: IWizEventDispatcher<HTMLDocument, IWizDocument, void>
declare const eventsHtmlDocumentComplete: IWizEventDispatcher<HTMLDocument | IWizDocument | IWizChromeBrowser, void, void>
declare const eventsHtmlDocumentCompleteEx: IWizEventDispatcher<HTMLDocument | IWizChromeBrowser, IWizDocument, void>
declare const eventsDocumentBeforeChange: IWizEventDispatcher<HTMLDocument, IWizDocument, IWizDocument>
declare const eventsDocumentAfterChange: IWizEventDispatcher<HTMLDocument, IWizDocument, IWizDocument>
/**
 * @deprecated wiz >=4.5.8
 */
declare const eventsDocumentBeforeEdit: IWizEventDispatcher<HTMLDocument, IWizDocument, void>
/**
 * @deprecated wiz >=4.5.8
 */
declare const eventsDocumentAfterEdit: IWizEventDispatcher<HTMLDocument, IWizDocument, void>

declare const WizExplorerApp: IWizExplorerApp
declare const objApp: IWizExplorerApp
declare const objWindow: IWizExplorerWindow
declare const objCommon: IWizCommonUI
