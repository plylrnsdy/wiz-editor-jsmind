define(function (require, exports, module) {
    'use strict';
	var $ = require('jquery');

    var button_setting = function() {
		this.widget = $('<a id="button_setting">设置</a>').addClass('widget');
    };

    button_setting.prototype = {
    	render: function(keyMap, funcMap){
			var dialog_setting = $([
				'<div id="dialog_setting">',
					'<table id="keymap"></table>',
				'</div>'
			].join(''));
			dialog_setting.dialog({
    			title: '设置',
    			width: 350,
    			closed: true,
    			draggable: false,
    			shadow: false,
    			modal: true,
    			buttons:[
    				{ text: '应用', handler: function(){
    					funcMap.setshortcut(newKeyMap);
    					funcMap.savesetting(newKeyMap);
    					keyMap = newKeyMap;
    				} },
    				{ text: '关闭', handler: function(){
    					newKeyMap = $.extend(true, {}, keyMap);
    					dialog_setting.dialog('close');
    				} }
    			]
			});
    		dialog_setting.next('.dialog-button').width(dialog_setting.width() - 10);
    		dialog_setting.parent().css({ top: (($(document).height() - dialog_setting.parent().height()) / 4) });

    		var funcNameArray = [];
    		for(var funcName in keyMap){
    			funcNameArray.push(funcName);
    		};
    		var newKeyMap = $.extend(true, {}, keyMap);
    		dialog_setting.find('#keymap').propertygrid({
				showGroup: true,
				columns: [[
					{ field: 'name', title: '操作', width: 100, resizable: true },
					{ field: 'value', title: '快捷键的键盘编码', width: 100, resizable: false }
				]],
				onAfterEdit: function(index, row, changes) {
					newKeyMap[funcNameArray[index]] = Number(changes.value);
				}
    		});
			dialog_setting.find('.datagrid-body').on('keyup', _.getKeyCode);

			var _this = this;
			this.widget.linkbutton({ onClick: function(e) {
				_this.loadData(dialog_setting, keyMap);
				dialog_setting.dialog('open');
			} });
    	},
    	loadData: function(dialog_setting, keyMap) {
			var rows = [
        		{ group: '编辑', name: '添加子节点',			value: keyMap.addchild,		editor: 'text' },
        		{ group: '编辑', name: '添加兄弟节点',		value: keyMap.addbrother,	editor: 'text' },
        		{ group: '编辑', name: '编辑节点',			value: keyMap.editnode,		editor: 'text' },
        		{ group: '编辑', name: '删除节点',			value: keyMap.delnode,		editor: 'text' },
        		{ group: '其他', name: '折叠/展开',			value: keyMap.toggle,		editor: 'text' },
        		{ group: '选择', name: '选择上一个兄弟节点',	value: keyMap.up,			editor: 'text' },
        		{ group: '选择', name: '选择下一个兄弟节点',	value: keyMap.down,			editor: 'text' },
        		{ group: '选择', name: '选择左边第一个节点',	value: keyMap.left,			editor: 'text' },
        		{ group: '选择', name: '选择右边第一个节点',	value: keyMap.right,		editor: 'text' },
    		];
    		dialog_setting.find('#keymap').propertygrid('loadData', rows);
    	}
    };

    var _ = {
		getKeyCode: function(e) {
			$(e.target).val(e.keyCode);
           	e.stopPropagation();
			e.preventDefault();
		}
    }

    module.exports = button_setting;
});
