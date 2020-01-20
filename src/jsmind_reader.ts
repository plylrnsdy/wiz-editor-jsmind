/// <reference path="../typings/wiz.d.ts" />

class JsMindReader {
  private name: string;
  private thisPluginDir: string = '';
  private thisFileName: string;
  private document: HTMLDocument | null = null;

  constructor(private objApp: IWizExplorerApp | IWizHtmlEditorApp) {
    this.name = 'Wiz.Editor.jsMind';
    this.thisFileName = 'jsmind_reader.js';
  }

  /** 插件目录 */
  get directory(): string {
    if (!this.thisPluginDir)
      try {
        this.thisPluginDir = (this.objApp as IWizExplorerApp).GetPluginPathByScriptFileName(this.thisFileName);
      } catch (error) {
        this.thisPluginDir = `${(this.objApp as IWizHtmlEditorApp).SettingsPath}Plugins/${this.name}/`;
      }
    return this.thisPluginDir;
  }

  /** jsmind_reader.js 的绝对路径 */
  get path(): string {
    return this.directory + this.thisFileName;
  }

  render(document: HTMLDocument): void {
    this.document = document;
    if (this.isJsMind()) {
      document.title = document.title.replace(/\.jm$/i, '');
      document.head.appendChild(this.createLinkElement('editor/css/styles.css'));
      document.head.appendChild(this.createScriptElement('editor/index.bundle.js'));
    }
  }

  /** 当前文件是否 .jm 文件 */
  private isJsMind(): boolean {
    const { title } = this.document!;
    return !!title && /\.jm(?: |@)?.*?$/i.test(title);
  }

  private createElement(tag: string, props): HTMLElement {
    const elem = this.document!.createElement(tag);
    for (const name in props) {
      elem.setAttribute(name, props[name]);
    }
    return elem;
  }

  private createLinkElement(rPath: string): HTMLElement {
    return this.createElement('link', {
      type: 'text/css',
      href: this.toFullPath(rPath),
      rel: 'stylesheet'
    });
  }

  private createScriptElement(rPath: string): HTMLElement {
    return this.createElement('script', {
      type: 'text/javascript',
      src: this.toFullPath(rPath)
    });
  }

  /** 相对插件目录的路径转为绝对路径 */
  private toFullPath(rPath: string): string {
    return (this.directory + rPath).replace(/\\/g, '/');
  }
}

; (function () {
  try { // in Global
    function handleDocumentComplete(arg: HTMLDocument | IWizDocument | IWizChromeBrowser) {
      const reader = new JsMindReader(objApp);
      let doc: HTMLDocument;
      if (!arg || !('title' in arg) || 'GUID' in arg) { // ^4.4
        doc = objWindow.CurrentDocumentHtmlDocument;
      } else { // ^4.2
        doc = arg;
      }
      if (doc) {
        reader.render(doc);
      } else { // ^4.5
        let browser = arg as IWizChromeBrowser;
        browser.ExecuteScriptFile(reader.path, (retValue) => {
          browser.ExecuteFunction1('initJsMind', objApp, (retValue) => { });
        });
      }
    }

    if (eventsHtmlDocumentComplete) {
      eventsHtmlDocumentComplete.add(handleDocumentComplete);
    }
  }
  catch (error) {
    // console.error(error.message);
  }
})();

function initJsMind(app) { // in Browser
  // 不能定义全局变量，要对 window['variable'] 赋值
  window['objApp'] = app;
  // new Reader(window.external as IWizHtmlEditorApp).render(document);
  new JsMindReader(objApp).render(document);
}
