define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');

	var _jm;

	var shortcutTaker = function(jm) {
		_jm = jm;
		this.opts = jm.options.shortcut;
	};

	shortcutTaker.prototype = {
		constructor: shortcutTaker,

        init : function(keyDict, funcDict) {
			this.handles = funcDict;
			this._mapping = {};
			this.applyShortcut(keyDict);

            $(document).on('mousedown',this.mousedownHandler);
            $(document).on('click',this.clickHandler);
            $(document).on('dblclick',this.dbClickHandler);

            $(document).on('keydown',this.keyHandler.bind(this));
        },

		applyShortcut: function(keyDict) {
			this._mapping = {};

            for(var handle in keyDict){
                if(!!keyDict[handle] && (handle in this.handles)){
                    this._mapping[keyDict[handle]] = this.handles[handle];
                }
            }
		},

        enable_shortcut : function() {
            this.opts.enable = true;
        },

        disable_shortcut : function() {
            this.opts.enable = false;
        },

		keyHandler: function(e) {
			if (_jm.view.is_editing()) {
				return;
			}
			var evt = e || event;
			if (!this.opts.enable) {
				return true;
			}
			var kc = evt.keyCode;
			if (kc in this._mapping) {
				this._mapping[kc].call(this, this.jm, e);
			}
		},

		mousedownHandler: function(e) {
			var element = e.target || event.srcElement;
			var isnode = _jm.view.is_node(element);
			if (isnode) {
				var nodeid = _jm.view.get_nodeid(element);
				_jm.select_node(nodeid);
			} else {
				_jm.select_clear();
			}
		},

		clickHandler: function(e) {
			var element = e.target || event.srcElement;
			var isexpander = _jm.view.is_expander(element);
			if (isexpander) {
				var nodeid = _jm.view.get_nodeid(element);
				_jm.toggle_node(nodeid);
			}
		},

		dbClickHandler: function(e) {
			if (_jm.get_editable()) {
				var element = e.target || event.srcElement;
				var isnode = _jm.view.is_node(element);
				if (isnode) {
					var nodeid = _jm.view.get_nodeid(element);
					_jm.begin_edit(nodeid);
				}
			}
		}
	};

	module.exports = shortcutTaker;
});