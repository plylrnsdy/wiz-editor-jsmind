define(function(require, exports, module) {
	'use strict';

	var $ = require('jquery');
	var jsmind_adapter = require('jsmind/jsmind.wrapper');
	var Toolbar = require('ui/toolbar_builder');
	var ShortcutTaker = require('editor.jsmind.shortcut_taker');

	var _jm;

	var editor = function(options, io) {
		var adapter = new jsmind_adapter(options.jsmind);
		_jm = adapter.jm;

		this.loadMindMap(io.loadMindMapFromDocument());

		var _canvas = $('#' + options.jsmind.container);
		$(window).on('resize', function(e) {
			_canvas.css({
				width: window.innerWidth,
				height: window.innerHeight
			});
			_jm.resize();
		}).trigger('resize');

		var shortcutTaker = new ShortcutTaker(_jm);

		this.funcMap = {
			addchild 	: adapter.handle_addchild,
            addbrother	: adapter.handle_addbrother,
            editnode	: adapter.handle_editnode,
            delnode		: adapter.handle_delnode,
            toggle		: adapter.handle_toggle,
            up			: adapter.handle_up,
            down		: adapter.handle_down,
            left		: adapter.handle_left,
            right		: adapter.handle_right,
			settheme	: adapter.handle_settheme,
			setshortcut	: shortcutTaker.applyShortcut.bind(shortcutTaker),
			save		: io.saveMindMapToDocument,
			savesetting	: io.saveSetting
		};

		shortcutTaker.init(options.keymap, this.funcMap);

		if(options.jsmind.editable){
			this.toolbar = Toolbar(options.toolbar, options.keymap, this.funcMap);
		}
	};

	editor.prototype = {
		loadMindMap: function(mind_json) {
			_jm.set_theme(mind_json.theme);
			delete mind_json.theme;

			_jm.show(mind_json);
		},
		getMindMap: function() {
				var mind_json = _jm.get_data('node_tree');
				mind_json.theme = _jm.options.theme;
				return mind_json;
		}
	};

	module.exports = editor;
});