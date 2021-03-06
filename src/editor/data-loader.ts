import * as $wiz from './wiz';
import adapt from './adapter';
import * as utils from './utils';
const { version: _version } = require('../../package.json');

export const version: string = _version;

let query = utils.queryObject(window.location.href);
export const editable = query['mode'] == 'edit';

function noop(arg: any, arg2: any) { }
export let saveSetting = noop as (setting: object) => void;
export let saveMindmap = noop as (theme: string, mindmap: object) => void;

let docStr;
if (editable) {
  let $db = $wiz.database(query['kbguid'] as string),
    $doc = $db.document(query['guid'] as string);

  document.title = '编辑 ' + $doc.title().replace(/\.jm$/, '');
  docStr = $doc.html() as string;

  saveSetting = function (setting: object) {
    $settingFile.text(JSON.stringify(setting));
  }
  saveMindmap = function (theme: string = 'primary', mindmap: object = {}) {
    $doc.html('<!DOCTYPE html><html><head></head><body><div id="app"></div><div id="data" data-theme="' + theme + '" data-mindmap="' + utils.encodeHTML(JSON.stringify(mindmap)) + '" style="display: none;"></div></body></html>');
  }
}
adapt(docStr);

const pluginPath = $wiz.path('jsmind_editor.js');
const $settingFile = $wiz.file(pluginPath + 'setting.json');
export let setting = JSON.parse($settingFile.text() as string);

const dataElem = document.getElementById('data') || document.createElement('div');
const attrData = dataElem.getAttribute('data-theme')
export let theme = (attrData !== 'undefined' && attrData) || 'primary';

const attrMindmap = dataElem.getAttribute('data-mindmap')
const data = (attrMindmap !== 'undefined' && attrMindmap) || '{}';
export let mindmap = JSON.parse(utils.decodeHTML(data));
