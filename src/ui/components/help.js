define(function (require, exports, module) {
    'use strict';
	var $ = require('jquery');

    var button_help = function() {
		this.widget = $('<a id="button_help">帮助</a>').addClass('widget');
    }

    button_help.prototype = {
    	render: function(){
			var dialog_help = $([
				'<div class="dialog"><div>',
					'<h2>使用</h2>',
					'<ul>',
						'<li>文档标题加后缀 .jm</li>',
						'<li>鼠标和键盘操作（见“设置－快捷键”）；</li>',
						'<li>节点可以插入html文本（比如要换行就输入&lt;br&gt;，等等）。</li>',
					'</ul>',
					'<h2>设置</h2>',
					'<ul>',
						'<li><h4>快捷键</h4></li>',
						'<ol>',
							'<li>单击键盘编码输入框使其处于输入状态</li>',
							'<li>按下键盘按键，程序将自动将其转换为键盘编码并输入到输入框内</li>',
							'<li>单击“应用”按钮应用快捷键设置</li>',
						'</ol>',
					'</ul>',
					'<h2>FAQ（常见问题）</h2>',
					'<h4>Q：在PC上能查看jm导图，在手机端却只能看到文字</h5>',
					'<p>A：jm导图目前依赖插件渲染，无法单独查看。</p>',
				'</div></div>'
			].join(''));
			dialog_help.dialog({
				iconCls: 'icon-help',
    			title: '帮助',
    			width: 400,
    			height: 380,
    			closed: true,
    			draggable: false,
    			shadow: false,
    			modal:true
			});

			this.widget.linkbutton({
				iconCls: 'icon-help',
				onClick:function(e){dialog_help.dialog('open');}
			});
    	}
    }

    module.exports = button_help;
});
