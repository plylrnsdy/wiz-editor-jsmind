define(function (require, exports, module) {
    'use strict';
	var $ = require('jquery');

    var select_theme = function() {
		this.selector = $('<input id="select_theme">');
		this.widget = $('<span >').addClass('widget')
								  .append($('<span>主题:</span>'), this.selector);
    }

    select_theme.prototype = {
    	render: function(keyMap, funcMap){
			this.selector.combobox({
				width: '100px',
				valueField: 'id',
				textField: 'label',
				onSelect: funcMap.settheme,
				data: [{
					id: 'pomegranate',
					label: 'pomegranate'
				}, {
					id: 'danger',
					label: 'danger'
				}, {
					id: 'warning',
					label: 'warning'
				}, {
					id: 'pumpkin',
					label: 'pumpkin'
				}, {
					id: 'orange',
					label: 'orange'
				}, {
					id: 'success',
					label: 'success'
				}, {
					id: 'nephrite',
					label: 'nephrite'
				}, {
					id: 'greensea',
					label: 'greensea'
				}, {
					id: 'info',
					label: 'info'
				}, {
					id: 'belizehole',
					label: 'belizehole'
				}, {
					id: 'primary',
					label: 'primary',
					selected: true
				}, {
					id: 'asphalt',
					label: 'asphalt'
				}, {
					id: 'wisteria',
					label: 'wisteria'
				}, {
					id: 'clouds',
					label: 'clouds'
				}, {
					id: 'asbestos',
					label: 'asbestos'
				}]
			});
    	}
    }

    module.exports = select_theme;
});
