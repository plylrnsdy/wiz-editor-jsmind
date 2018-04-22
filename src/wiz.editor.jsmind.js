seajs.use([
		'jquery',
		'wiz/wiz',
		'editor.jsmind',
		'util'
	],
	function($, $wiz, editor, util) {
		'use strict';
		var queryDict = util.getQueryDictionary(location.href);
		var pluginPath = $wiz.path('wiz.execute_script.editor.js');
		var $settingFile = $wiz.file(pluginPath + 'setting.json');
		var setting = JSON.parse( $settingFile.text() );

		var options = {
			toolbar: [
				'save', 'theme', 'setting', 'help', 'about'
			],
			keymap: setting.keymap,
			jsmind: {
				container: 'jsmind_container',
				editable: queryDict['mode'] === 'edit'
			}
		};

		var $db = $wiz.db(queryDict['kbGUID']);
		var $doc = $db.doc(queryDict['guid']);
		var io = {
			loadMindMapFromDocument: function() {
				var mind_str, mind_json;
				if (queryDict['mode'] === 'edit') {
					document.title = '编辑 ' + $doc.title().replace(/.jm/gi, '');

					mind_str = $doc.html().match(/data\-jsmindmap="([^"]*)"/);
					if (mind_str) {
						mind_str = mind_str[1].replace(/data-jsmindmap="/, '')
											  .replace(/&quot;/g, '"')
											  .replace(/&lt;/g, '<')
											  .replace(/&gt;/g, '>');
					} else {
						mind_str = '{"meta":{"name":"New MindMap","author":"","version":"0.2"},"format":"node_tree","theme":"primary","data":{"id":"root","topic":"Main Topic","children":[]}}';
					}
				} else {
					//$('#jsmind_container').html('');//为什么放这里会导致阅读模式下无法添加子节点
					mind_str = $('#jsmind_container').attr('data-jsmindmap');
				}
				mind_json = JSON.parse(mind_str);
				return mind_json;
			},
			saveMindMapToDocument: function(e) {
				var mind_str = JSON.stringify(jsmind_editor.getMindMap());

				mind_str = mind_str.replace(/"/g, '&quot;')
								   .replace(/</g, '&lt;')
								   .replace(/>/g, '&gt;');

				var doc_str = $('#jsmind_container').html();
				doc_str = doc_str.replace(/<[^>]*>/g, '');

				doc_str = '<!DOCTYPE html><html><head></head><body><div id="jsmind_container" data-jsmindmap="' + mind_str + '">' + doc_str + '</div></body></html>';

				$doc.html(doc_str);
			},
			saveSetting: function(keymap_json) {
				setting = {
					keymap: keymap_json
				};
				$settingFile.text( JSON.stringify( setting ) );
			}
		};

		$('#jsmind_container').html('');
		var jsmind_editor = new editor(options, io);
	}
);