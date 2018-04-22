(function() {
	var objApp = WizExplorerApp;
	var objWindow = objApp.Window;
	var objDocument = objWindow.CurrentDocument;

	if (objDocument == null) {
		return;
	}

	var objCommon = objApp.CreateWizObject('WizKMControls.WizCommonUI');
	var tempPath = objCommon.GetSpecialFolder('TemporaryFolder');
	objCommon.CreateDirectory(tempPath += 'editor_jsmind_temp/');
	objCommon.CreateDirectory(tempPath += objDocument.GUID + '/');
	objCommon.CreateDirectory(tempPath + 'index_files/');

	var tempFile = tempPath + 'index.html';
	var pluginPath = objApp.GetPluginPathByScriptFileName('wiz.execute_script.editor.js');
	objCommon.CopyFile(pluginPath + 'wiz.editor.jsmind.html', tempFile);
	var tempText = objCommon.LoadTextFromFile(tempFile);
	tempText = tempText.replace(new RegExp(tempPath, 'g'), '')
		.replace(/(<script type="text\/javascript" src=")/g, '$1' + pluginPath);
	objCommon.SaveTextToFile(tempFile, tempText, 'utf-8-bom');

	var editorFileName = [
		tempFile, '?',
			'guid=', objDocument.GUID,
			'&kbguid=', objDocument.Database.KbGUID,
			'&mode=edit'
	].join('');
	objWindow.ViewHtml(editorFileName, true);
})();