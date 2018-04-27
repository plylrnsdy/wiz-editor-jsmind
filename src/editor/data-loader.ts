import * as $wiz from './wiz';
import adapt from './adapter';
import * as utils from './utils';

let query = utils.queryObject(window.location.href);
export const editable = query['mode'] == 'edit';

function noop(arg: any, arg2: any) { }
export let saveSetting = noop as (setting: object) => void;
export let saveMindmap = noop as (theme: string, mindmap: object) => void;

let docStr;
if (editable) {
    let $db = $wiz.database(query['kbguid']),
        $doc = $db.document(query['guid']);

    docStr = $doc.html() as string;

    saveSetting = function (setting: object) {
        $settingFile.text(JSON.stringify(setting));
    }
    saveMindmap = function (theme: string, mindmap: object) {
        $doc.html('<!DOCTYPE html><html><head></head><body><div id="app"></div><div id="data" data-theme="' + theme + '" data-mindmap="' + utils.encodeHTML(JSON.stringify(mindmap)) + '" style="display: none;"></div></body></html>');
    }
}
adapt(docStr);

let pluginPath = $wiz.path('jsmind_editor.js'),
    $settingFile = $wiz.file(pluginPath + 'setting.json');
export let setting = JSON.parse($settingFile.text() as string);

let dataElem = document.getElementById('data');
export let theme = dataElem.getAttribute('data-theme');
export let mindmap = JSON.parse(utils.decodeHTML(dataElem.getAttribute('data-mindmap')));
