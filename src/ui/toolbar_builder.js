define(function (require, exports, module) {
    'use strict';

	var $ = require('jquery');

	require('ui/themes/default/easyui.css');
	require('ui/themes/icon.css');
	require('jeasyui');

	require('ui/components/save');
	require('ui/components/theme');
	require('ui/components/setting');
	require('ui/components/help');
	require('ui/components/about');

    var toolbarBuilder = function(option, keyMap, funcMap) {
    	$('head').append(
			$('<style>').text([
				'#toolbar_container { position: fixed; z-index: 10; }',
				'.widget { margin:5px; -webkit-user-select:none; }',
				'.dialog div { padding:1em; font-size: 16px; }'
			].join('\n'))
		);

		//必需先构建好节点
    	var toolbarPanel = $('<div id="toolbar_panel">').css({border: 0});
		$(window).on('resize', function(e) {
			toolbarPanel.css({
				width: window.innerWidth
			});
		}).trigger('resize');

    	var i, widget;
    	var widgetBuilders = {};
    	var widgets = {};
    	for(i = 0; i < option.length; i++){
    		widget = 'ui/components/' + option[i];
    		widgetBuilders[widget] = require(widget);
    		widgets[widget] = new widgetBuilders[widget]();
    		toolbarPanel.append(widgets[widget]);
    	}
		//再用jeasyui渲染
    	toolbarPanel.panel();
    	for (var widget in widgets) {
    		widgets[widget].render(keyMap, funcMap);
    	}

    	//待控件渲染完毕再添加到DOM，减少刷新
    	for(var widget in widgets){
    		toolbarPanel.append(widgets[widget].widget);
    	}
    	var toolbar = $('#toolbar_container').append(toolbarPanel);

		return toolbar;
    };

    module.exports = toolbarBuilder;
});