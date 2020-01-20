/// <reference path="../typings/wiz.d.ts" />

(function () {
  const objApp = WizExplorerApp;
  const objWindow = objApp.Window;
  const objDocument = objWindow.CurrentDocument;

  if (!objDocument) return;
  const objCommon = objApp.CreateWizObject('WizKMControls.WizCommonUI');

  /**
   * 创建编辑器的临时工作目录
   */
  function createTempDir(...dirs: string[]): string {
    let path = objCommon.GetSpecialFolder('TemporaryFolder');
    for (const dir of dirs) {
      objCommon.CreateDirectory(path += dir + '/');
    }
    return path;
  }

  const tempDir = createTempDir('Wiz.Editor.jsMind', objDocument.GUID);
  const tempFile = tempDir + 'index.html';
  const pluginDir = objApp.GetPluginPathByScriptFileName('jsmind_editor.js');
  const resourceDir = pluginDir + 'editor/';
  const templateFile = pluginDir + 'editor/index.html';

  // 处理编辑页中引用的资源路径
  const tempText = objCommon.LoadTextFromFile(templateFile)
    // 去掉 wiz 给 <script> 的文件路径加的前缀
    .replace(new RegExp(pluginDir.replace(/\\/g, '\\\\'), 'g'), '.')
    // 将相对地址变为绝对地址
    .replace(/(<link href=")(?:\.\/)?/g, '$1' + resourceDir)
    .replace(/(<script(?: type="text\/javascript")? src=")(?:\.\/)?/g, '$1' + resourceDir);

  // 在缓存目录内，新建笔记编辑页
  // objDocument.SaveToHtml(tempFile, 0); // 可用于新建文件
  objCommon.CopyFile(templateFile, tempFile); // 用于新建文件
  objCommon.SaveTextToFile(tempFile, tempText, "utf-8-bom"); // 用修正过路径的内容覆盖

  // 传递笔记的 guid，在笔记编辑页提取数据、保存数据；还可以传其他键值对参数
  const editorFileName = tempFile + "?guid=" + objDocument.GUID + "&kbguid=" + objDocument.Database.KbGUID + '&mode=edit';
  objWindow.ViewHtml(editorFileName, true);
})();
