import * as utils from './utils';

/**
 * @param {string} [docStr] when mode = 'edit', html document's string
 */
export default function adapt(docStr?: string) {
    // mode = 'edit'
    if (docStr) {
        let matched = docStr.match(/data-jsmindmap="([^"]+?)"/),
            dataElem2 = document.getElementById('data'),
            data,
            theme;
        // mindmap data of plugin's version <=0.3.11
        if (matched) {
            [theme, data] = exactData1(matched[1]);
        }
        // mindmap data of plugin's version >0.3.11
        else {
            matched = docStr.match(/data-theme="([^"]+?)" data-mindmap="([^"]+?)"/);
            if (matched) [, theme, data] = matched;
        }
        dataElem2.setAttribute('data-theme', theme);
        dataElem2.setAttribute('data-mindmap', data);
    }
    // mode = 'read'
    else {
        let dataElem1 = document.getElementById('jsmind_container');

        // mindmap of plugin's version <=0.3.11
        if (dataElem1) {
            let appElem = document.createElement('div'),
                dataElem2 = document.createElement('div'),
                [theme, data] = exactData1(dataElem1.getAttribute('data-jsmindmap'));

            appElem.setAttribute('id', 'app');
            dataElem2.setAttribute('id', 'data');
            dataElem2.setAttribute('data-theme', theme);
            dataElem2.setAttribute('data-mindmap', data);

            document.body.appendChild(appElem);
            document.body.appendChild(dataElem2);
            dataElem1.remove();
        }
    }
}

function exactData1(dataStr1: string) {
    let data = JSON.parse(utils.decodeHTML(dataStr1)),
        theme = data.theme;
    delete data.theme;
    return [theme, utils.encodeHTML(JSON.stringify(data))];
}
