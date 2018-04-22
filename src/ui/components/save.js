define(function (require, exports, module) {
    'use strict';
	var $ = require('jquery');

    var button_save = function() {
		this.widget = $('<a id="button_save">保存</a>').addClass('widget');
    };

    button_save.prototype = {
    	render: function(keyMap, funcMap){
			this.widget.linkbutton({
				iconCls: 'icon-save',
				onClick: funcMap.save
			});
    	}
    };

    module.exports = button_save;
});
