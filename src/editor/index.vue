<style lang="scss">
.el-header {
  height: 34px !important;

  #theme-selector {
    padding: 0 10px 0 10px;
    display: inline;
  }
  .label {
    font-size: 14px;
  }
  .svg-inline--fa {
    transform: scale(1.4, 1.4);
  }
}
.el-main {
  padding: 0;
}
</style>

<template>
  <el-container>

    <el-header v-if="editable">
      <el-button size="mini" @click="saveMindmap">
        <font-awesome-icon :icon="icon_save" />
      </el-button>
      <div id="theme-selector">
        <span class="label">主题：</span>
        <el-select size="mini" v-model="theme" @change="changeTheme" placeholder="请选择主题">
          <el-option v-for="item in themes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button size="mini">
        <font-awesome-icon :icon="icon_cogs" @click="setting.visible = true" />
      </el-button>
      <el-button size="mini" @click="about_visible = true">
        <font-awesome-icon :icon="icon_info" />
      </el-button>
    </el-header>

    <el-dialog title="设置" :visible.sync="setting.visible" width="400">
      <el-table size="mini" :data="setting.keybinds" style="width: 100%">
        <el-table-column prop="operation" label="操作" width="180"></el-table-column>
        <el-table-column prop="key" label="快捷键" width="180"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="setting.visible = false">取 消</el-button>
        <el-button size="mini" @click="saveSetting" type="primary">应 用</el-button>
      </div>
    </el-dialog>

    <el-dialog title="关于" :visible.sync="about_visible" width="200">
      <h2>wiz.editor.jsmind</h2>
      <p>插件版本：0.3.11</p>
      <p>插件作者：plylrnsdy</p>
      <h3>开源组件：</h3>
      <ul>
        <li>Font Awesome</li>
        <li>Element-UI</li>
        <li>jsMind</li>
        <li>Vue.js</li>
      </ul>
      <h3>
        <a href="https://github.com/plylrnsdy/wiz-editor-jsmind/blob/master/docs/README.md">使用帮助</a>
      </h3>
      <h3>
        <a href="https://github.com/plylrnsdy/wiz-editor-jsmind/blob/master/docs/CHANGELOG.md">更新日志</a>
      </h3>
    </el-dialog>

    <el-main :style="size">
      <div :style="size" id="jsmind-canvas"></div>
    </el-main>

  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faSave, faCogs, faInfo } from '@fortawesome/fontawesome-free-solid';
import jsMind = require('jsmind');
import 'jsmind/js/jsmind.draggable.js';
import 'jsmind/style/jsmind.css';
import { format } from 'util';
import * as data from './data-loader';

let jm = null;

export default Vue.extend({
    data() {
        let keymap = data.setting.keymap;
        return {
            size: '',
            editable: data.editable,
            theme: data.theme,
            themes: [
                { value: "pomegranate", label: "pomegranate" },
                { value: "danger", label: "danger" },
                { value: "warning", label: "warning" },
                { value: "pumpkin", label: "pumpkin" },
                { value: "orange", label: "orange" },
                { value: "success", label: "success" },
                { value: "nephrite", label: "nephrite" },
                { value: "greensea", label: "greensea" },
                { value: "info", label: "info" },
                { value: "belizehole", label: "belizehole" },
                { value: "primary", label: "primary" },
                { value: "asphalt", label: "asphalt" },
                { value: "wisteria", label: "wisteria" },
                { value: "clouds", label: "clouds" },
                { value: "asbestos", label: "asbestos" }
            ],
            setting: {
                visible: false,
                keybinds: [
                    { name: 'addchild', operation: '添加子节点', key: keymap.addchild },
                    { name: 'addbrother', operation: '添加兄弟节点', key: keymap.addbrother },
                    { name: 'editnode', operation: '编辑节点', key: keymap.editnode },
                    { name: 'delnode', operation: '删除节点', key: keymap.delnode },
                    { name: 'toggle', operation: '折叠/展开', key: keymap.toggle },
                    { name: 'left', operation: '选择上一个兄弟节点', key: keymap.left },
                    { name: 'up', operation: '选择下一个兄弟节点', key: keymap.up },
                    { name: 'right', operation: '选择左边第一个节点', key: keymap.right },
                    { name: 'down', operation: '选择右边第一个节点', key: keymap.down }
                ]
            },
            about_visible: false
        };
    },
    computed: {
        icon_save() { return faSave; },
        icon_cogs() { return faCogs; },
        icon_info() { return faInfo; }
    },
    methods: {
        changeTheme() {
            jm.set_theme(this.theme);
        },
        resize() {
            // this.size = format('width:%dpx;height:%dpx;', window.innerWidth - 16, window.innerHeight - 50);
            this.size = format('width:%dpx;height:%dpx;', window.innerWidth - 48, window.innerHeight - 90);
        },
        saveSetting() {
            let setting = {};
            for (let item of this.setting.keybinds)
                setting[item.name] = item.key;

            jm.options.shortcut.mapping = setting;
            data.saveSetting(data.setting);

            this.setting.visible = false;
        },
        saveMindmap() {
            data.saveMindmap(this.theme, jm.get_data('node_tree'));
        }
    },
    components: {
        FontAwesomeIcon
    },
    mounted() {
        let options = {
            container: 'jsmind-canvas',
            theme: this.theme,
            editable: this.editable,
            shortcut: { mapping: data.setting.keymap }
        };

        jm = jsMind.show(options, data.mindmap);

        window.onresize = (e) => {
            this.resize();
            jm.resize();
        }
        window.onresize(new UIEvent('resize'));
    }
})
</script>
