(function() {
	var render = (function() {
		var doc;
		var basePath;

		function render(document, path) {
			doc = document;
			basePath = path;

			if (isJsMind()) {
				initJsMind();
			}
		};

		function isJsMind() {
			var title = doc.title;

			if (!title)
				return false;
			if (-1 != title.indexOf('.jm '))
				return true;
			if (-1 != title.indexOf('.jm@'))
				return true;
			if (title.match(/\.jm$/i))
				return true;
			return false;
		};

		function initJsMind() {
			doc.title = doc.title.replace(/.jm/gi, '');
			util.appendScriptSrc2('body', 'text/javascript', 'sea-2.2.3.min.js', false, function() {
				util.appendScriptSrc2('body', 'text/javascript', 'sea-config.js', false, function() {
					util.appendScriptSrc('body', 'text/javascript', 'wiz.editor.jsmind.js', false);
				});
			});
		};

		var util = {
			insertElem: function(part, elem_type, callbackfunc) {
				var oPart = doc.getElementsByTagName(part).item(0);
				var oElem = doc.createElement(elem_type);
				callbackfunc(oElem);
				oPart.insertBefore(oElem, null);
				return oElem;
			},
			appendCssSrc: function(str) {
				util.insertElem('HEAD', 'link', function(oCss) {
					oCss.rel = 'stylesheet';
					oCss.href = ('' + basePath + str).replace(/\\/g, '/');
				});
			},
			appendScriptInnerHtml: function(part, script_type, innerHtmlStr) {
				util.insertElem(part, 'script', function(oScript) {
					oScript.type = script_type;
					oScript.innerHTML = innerHtmlStr;
				});
			},
			appendScriptSrc: function(part, script_type, str, isServer) {
				return util.insertElem(part, 'script', function(oScript) {
					oScript.type = script_type;
					if (isServer) {
						oScript.src = str;
					} else {
						oScript.src = ('' + basePath + str).replace(/\\/g, '/');
					}
				});
			},
			appendScriptSrc2: function(part, script_type, str, isServer, onLoadFunc) {
				var oPart = doc.getElementsByTagName(part).item(0);
				var oElem = doc.createElement('script');

				oElem.type = script_type;
				if (!!onLoadFunc) {
					oElem.onload = function() {
						onLoadFunc();
					};
				}

				if (isServer) {
					oElem.src = str;
				} else {
					oElem.src = ('' + basePath + str).replace(/\\/g, '/');
				}

				oPart.insertBefore(oElem, null);
				return oElem;
			}
		};

		return render;
	})();

	var pluginPath = 'file:///' + objApp.GetPluginPathByScriptFileName('wiz.global_script.render.js');
	if (eventsHtmlDocumentCompleteEx) {
		eventsHtmlDocumentCompleteEx.add(function(a, b) {
			//IF 'title' in a => { a is document in wiz 4.2.691 } else => { a is objDocument in wiz 4.3.4 }
			var doc = ('title' in a) ? a : b;
			render(doc, pluginPath);
		});
	}

})();