define(function(require, exports, module) {
	var util = {
		/**
		 * @param {String} uri 待查询的统一定位标识符
		 * @return {JSON} URI查询字符串中键值对的字典
		 */
		getQueryDictionary: function(uri, key) {
			var queryDictionary = {};
			if (uri.indexOf('?') == -1) {
				return queryDictionary;
			}

			var queryString = uri.substring(uri.indexOf('?') + 1);
			var parameters = queryString.split('&');

			var pos, paraName, paraValue;
			for (var i = 0; i < parameters.length; i++) {
				pos = parameters[i].indexOf('=');
				if (pos == -1) {
					continue;
				}

				paraName = parameters[i].substring(0, pos);
				paraValue = parameters[i].substring(pos + 1);
				paraValue = unescape(paraValue.replace(/\+/g, ' '));

				queryDictionary[paraName] = paraValue;
			}
			return queryDictionary;
		},
		/**
		 * @description 将字符串中的转义字符编码为实体字符（TODO：？支持空格）
		 * @param {String} str
		 * @return {HTMLString} html
		 */
		encodeHTML: function(str) {
			var div = document.createElement('div');
			div.appendChild(document.createTextNode(str));
			return div.innerHTML;
		},
		/**
		 * @description 将字符串中的实体字符编码为普通字符
		 * @param {HTMLString} html
		 * @return {String} str
		 */
		decodeHTML: function(html) {
			var div = document.createElement('div');
			div.innerHTML = html;
			return div.innerText || div.textContent;
		}
	}

	module.exports = util;
});