/// <reference path="../typings/wiz.d.ts" />

(function () {
    let objApp = WizExplorerApp,
        objWindow = objApp.Window,
        objDocument = objWindow.CurrentDocument;

    if (!objDocument) return;
    let objCommon = objApp.CreateWizObject('WizKMControls.WizCommonUI');

    function createTempDir(...dirs: string[]): string {
        let path = objCommon.GetSpecialFolder('TemporaryFolder');
        for (let dir of dirs)
            objCommon.CreateDirectory(path += dir + '/');
        return path;
    }

    let tempDir = createTempDir('Wiz.Editor.jsMind', objDocument.GUID),
        tempFile = tempDir + 'index.html',
        pluginDir = objApp.GetPluginPathByScriptFileName('jsmind_editor.js'),
        resourceDir = pluginDir + 'editor/',
        templateFile = pluginDir + 'editor/index.html';

    // 处理编辑页中引用的资源路径
    let tempText = objCommon.LoadTextFromFile(templateFile)
        .replace(new RegExp(pluginDir.replace(/\\/g, '\\\\'), 'g'), '.') // 去掉 wiz 给 <script> 的文件路径加的前缀
        .replace(/(<link href=")(?:\.\/)?/g, '$1' + resourceDir)
        .replace(/(<script type="text\/javascript" src=")(?:\.\/)?/g, '$1' + resourceDir);

    // 在缓存目录内，新建笔记编辑页
    // objDocument.SaveToHtml(tempFile, 0); // 可用于新建文件
    objCommon.CopyFile(templateFile, tempFile); // 用于新建文件
    objCommon.SaveTextToFile(tempFile, tempText, "utf-8-bom"); // 用修正过路径的内容覆盖

    // 传递笔记的 guid，在笔记编辑页提取数据、保存数据；还可以传其他键值对参数
    let editorFileName = tempFile + "?guid=" + objDocument.GUID + "&kbguid=" + objDocument.Database.KbGUID + '&mode=edit';
    objWindow.ViewHtml(editorFileName, true);
})();
