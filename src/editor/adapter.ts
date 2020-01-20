import * as utils from './utils';


const defaultMindMap = '{&quot;meta&quot;:{&quot;name&quot;:&quot;New MindMap&quot;,&quot;author&quot;:&quot;&quot;,&quot;version&quot;:&quot;0.4&quot;},&quot;format&quot;:&quot;node_tree&quot;,&quot;data&quot;:{&quot;id&quot;:&quot;root&quot;,&quot;topic&quot;:&quot;Main Topic&quot;,&quot;children&quot;:[]}}'

/**
 * @param {string} [docStr] when mode = 'edit', html document's string
 */
export default function adapt(docStr?: string) {
  // mode = 'edit'
  if (docStr) {
    let matched = docStr.match(/data-jsmindmap="([^"]+?)"/);
    const dataElem2 = document.getElementById('data') as HTMLElement;
    let data;
    let theme;
    // mindmap data of plugin's version <=0.3.11
    if (matched) {
      [theme, data] = exactData1(matched[1]);
    }
    // mindmap data of plugin's version >0.3.11
    else {
      matched = docStr.match(/data-theme="([^"]+?)" data-mindmap="([^"]+?)"/);
      if (matched) [, theme, data] = matched;
    }
    dataElem2.setAttribute('data-theme', theme || 'primary');
    dataElem2.setAttribute('data-mindmap', data || defaultMindMap);
  }
  // mode = 'read'
  else {
    const dataElem1 = document.getElementById('jsmind_container');

    // mindmap of plugin's version <=0.3.11
    if (dataElem1) {
      const appElem = document.createElement('div');
      const dataElem2 = document.createElement('div');
      const [theme, data] = exactData1(dataElem1.getAttribute('data-jsmindmap') || defaultMindMap);

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
  const data = JSON.parse(utils.decodeHTML(dataStr1));
  const theme = data.theme;
  delete data.theme;
  return [theme, utils.encodeHTML(JSON.stringify(data))];
}
