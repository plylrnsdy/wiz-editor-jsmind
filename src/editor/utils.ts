import { parse } from 'querystring';

export function queryObject(url: string) {
  return url.indexOf('?') > -1
    ? parse(url.match(/\?(.+)$/)[1])
    : {};
}

/**
 * @description 将字符串中的字符 ` " < > ` 编码为实体字符
 * @param {string} str
 * @return {string} html
 */
export function encodeHTML(str: string): string {
  // let div = document.createElement('div');
  // div.appendChild(document.createTextNode(str));
  // return div.innerHTML;

  return str.replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @description 将字符串中的实体字符编码为字符
 * @param {string} html
 * @return {string} str
 */
export function decodeHTML(html: string): string {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText || div.textContent;
}
