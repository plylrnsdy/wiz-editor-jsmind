/**
 * 封装 Wiz API 并简化接口调用的对象。
 */
(function(factory) {

	var objWizApp;
	try {
		objWizApp = WizExplorerApp; //IF GobalScript && ExecuteScript
	} catch (error) {
		objWizApp = window.external; //IF HtmlDialog
	}
	if (!objWizApp) {
		return;
	}

	if (typeof define === "function") {
		define(function(require, exports, module) {
			module.exports = factory(objWizApp); //IF SeaJS exists
		});
	} else {
		window['$wiz'] = factory(objWizApp); //IF SeaJS not exist
	}

})(function(objApp) {

	var $wiz = {
		/**
		 * @description Wiz-API 入口对象
		 */
		app: objApp,

		//  ========== 静态方法 ==========
		/**
		 * @param {String} scriptFileName 需要获取路径的插件脚本名称
		 * @return {String} 指定插件脚本所在路径
		 */
		path: function(scriptFileName) {
			return $wiz.app.GetPluginPathByScriptFileName(scriptFileName);
		},
		//  ========== 获取外覆类的实例的快捷方法 ==========
		db: function(kbGUID) {
			return new $obj.db(kbGUID);
		},
		file: function(fileName) {
			return new $obj.file(fileName);
		},
	};

	//  ========== Wiz内部对象的外覆类的定义 ==========
	var $obj = {
		common: (function() {
			return $wiz.app.CreateWizObject('WizKMControls.WizCommonUI');
		})(),

		db: (function() {
			function db(kbGUID) {
				if (kbGUID) {
					this.db = $wiz.app.GetGroupDatabase(kbGUID);
				} else {
					this.db = $wiz.app.Database;
				}
			}
			db.prototype = {
				constructor: db,
				doc: function(guid) {
					return new $obj.doc(this.db, guid);
				}
			}
			return db;
		})(),

		doc: (function() {
			function doc(db, guid) {
				if (guid) {
					this.doc = db.DocumentFromGUID(guid);
				} else {
					this.doc = db.CurrentDocument;
				}
			}
			doc.prototype = {
				constructor: doc,
				title: function() {
					return this.doc.Title;
				},
				html: function(html_str) {
					if (html_str) {
						this.doc.UpdateDocument3(html_str, 0);
					} else {
						return this.doc.GetHtml();
					}
				}
			}
			return doc;
		})(),

		file: (function() {
			function file(fileName) {
				this.fileName = fileName;
			}
			file.prototype = {
				constructor: file,
				text: function(text) {
					if (text) {
						$obj.common.SaveTextToFile(this.fileName, text, 'utf-8-bom');
					} else {
						return $obj.common.LoadTextFromFile(this.fileName);
					}
				}
			}
			return file;
		})()
	};

	return $wiz;
});