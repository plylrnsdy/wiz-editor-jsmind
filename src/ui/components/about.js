define(function(require, exports, module) {
	'use strict';
	var $ = require('jquery');

	var button_about = function() {
		this.widget = $('<a id="button_about">关于</a>').addClass('widget');
	}

	button_about.prototype = {
		render: function() {
			var dialog_about = $([
				'<div class="dialog"><div>',
					'<h1>wiz.editor.jsmind</h1>',
					'<p>插件版本：0.3.10</p>',
					'<p>插件作者：plylrnsdy</p>',
					'<h2>开源组件：</h2>',
					'<ul>',
						'<li>jQuery 2.2.3</li>',
						'<li>jQuery-EasyUI 1.4.5</li>',
						'<li>jsMind 0.2</li>',
					'</ul>',
					'<h2>更新</h2>',
					'<ul>',
						'<h4>0.3.10 更新：</h4>',
						'<ul>',
							'<li>规范的版本号</li>',
							'<li>修复无法在 wiz 4.3.4 阅读模式下查看jm导图</li>',
							'<li>新的工具栏</li>',
							'<li>可自定义快捷键</li>',
						'</ul>',
						'<h4>0.2.6 更新：</h4>',
						'<ul>',
							'<li>不保存无用数据到文档</li>',
						'</ul>',
						'<h4>0.2.4 更新：</h4>',
						'<ul>',
							'<li>载入插件</li>',
							'<li>保存、加载思维导图</li>',
							'<li>修复阅读模式下无连接线</li>',
							'<li>思维导图画布自适应文档窗口</li>',
							'<li>主题切换、保存</li>',
							'<li>修正加载文档后节点内html标签失效</li>',
							'<li>修正无法保存节点折叠状态</li>',
						'</ul>',
					'</ul>',
				'</div></div>'
			].join(''));
			dialog_about.dialog({
				title: '关于',
				width: 400,
				height: 500,
				closed: true,
				draggable: false,
				shadow: false,
				modal: true
			});

			this.widget.linkbutton({
				onClick: function(e) {
					dialog_about.dialog('open');
				}
			});
		}
	}

	module.exports = button_about;
});