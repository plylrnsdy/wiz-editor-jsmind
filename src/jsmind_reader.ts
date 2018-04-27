/// <reference path="../typings/wiz.d.ts" />

class Reader {
    private name: string;
    private thisPluginDir: string;
    private thisFileName: string;
    private document: HTMLDocument;

    constructor(private objApp: IWizExplorerApp | IWizHtmlEditorApp) {
        this.name = 'Wiz.Editor.jsMind';
        this.thisFileName = 'jsmind_reader.js';
    }
    get directory(): string {
        if (!this.thisPluginDir)
            try {
                this.thisPluginDir = (this.objApp as IWizExplorerApp).GetPluginPathByScriptFileName(this.thisFileName);
            } catch (error) {
                this.thisPluginDir = `${(this.objApp as IWizHtmlEditorApp).SettingsPath}Plugins/${this.name}/`;
            }
        return this.thisPluginDir;
    }
    get path(): string {
        return this.directory + this.thisFileName;
    }
    render(document: HTMLDocument): void {
        this.document = document;
        if (this.isJsMind()) {
            this.document.title = this.document.title.replace(/\.jm/gi, '');
            this.document.head.appendChild(this.createLinkElement('editor/styles.css'));
            this.document.head.appendChild(this.createScriptElement('editor/index.bundle.js'));
        }
    }
    private isJsMind(): boolean {
        let title = this.document.title;
        return title && title.match(/\.jm(?: |@)?.*?$/i) ? true : false;
    }
    private createElement(tag: string, props): HTMLElement {
        let elem = this.document.createElement(tag);
        for (let name in props)
            elem.setAttribute(name, props[name]);
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
    private toFullPath(rPath: string): string {
        return (this.directory + rPath).replace(/\\/g, '/');
    }
}

; (function () {
    try { // in Global
        function handleDocumentComplete(arg: HTMLDocument | IWizDocument | IWizChromeBrowser) {
            let doc: HTMLDocument,
                reader = new Reader(objApp);
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
                    browser.ExecuteFunction1('initApp', objApp, (retValue) => { });
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

function initApp(app) { // in Browser
    // 不能定义全局变量，要对 window['variable'] 赋值
    window['objApp'] = app;
    // new Reader(window.external as IWizHtmlEditorApp).render(document);
    new Reader(objApp).render(document);
}
