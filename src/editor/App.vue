<template>
  <el-container>
    <el-header v-if="editable">
      <el-button size="mini" @click="saveMindmap">
        <font-awesome-icon icon="save" />
      </el-button>
      <div id="theme-selector">
        <span class="label">主题：</span>
        <el-select size="mini" v-model="theme" @change="changeTheme" placeholder="请选择主题">
          <el-option
            v-for="item in themes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button size="mini">
        <font-awesome-icon icon="cogs" @click="setting.visible = true" />
      </el-button>
      <el-button size="mini" @click="about_visible = true">
        <font-awesome-icon icon="info" />
      </el-button>
    </el-header>

    <el-dialog title="设置" :visible.sync="setting.visible" width="400">
      <el-table size="mini" :data="setting.keybinds" style="width: 100%">
        <el-table-column prop="operation" label="操作" width="180" />
        <el-table-column prop="key" label="快捷键 (暂不可更改)" width="180" />
      </el-table>
      <!--<div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="setting.visible = false">取 消</el-button>
        <el-button size="mini" @click="saveSetting" type="primary">应 用</el-button>
      </div>-->
    </el-dialog>

    <el-dialog title="关于" :visible.sync="about_visible" width="200">
      <h2>wiz-editor-jsmind</h2>
      <p>插件版本：{{ version }}</p>
      <p>插件作者：plylrnsdy</p>
      <h3>开源组件：</h3>
      <ul>
        <li>
          <a href="http://www.fontawesome.io">Font Awesome</a>
        </li>
        <li>
          <a href="http://element-cn.eleme.io">Element-UI</a>
        </li>
        <li>
          <a href="https://github.com/hizzgdev/jsmind">jsMind</a>
        </li>
        <li>
          <a href="https://vuejs.org/">Vue.js</a>
        </li>
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
/// <reference path="../../typings/jsmind.d.ts" />
import Vue from "vue";
import * as data from "./data-loader";
import themes from "./configs/theme";
import keybinds from "./configs/keybinds";

const jsMind = require("jsmind") as JsMindStatic;
import "jsmind/js/jsmind.draggable.js";
import "jsmind/style/jsmind.css";

export default Vue.extend({
  data() {
    return {
      version: data.version,
      editable: data.editable,
      theme: data.theme || "primary",
      themes,
      setting: {
        visible: false,
        keybinds
      },
      about_visible: false,
      size: "",
      jm: {} as JsMind
    };
  },
  mounted() {
    const options = {
      container: "jsmind-canvas",
      theme: this.theme,
      editable: this.editable,
      shortcut: { mapping: data.setting.keymap }
    };

    this.jm = jsMind.show(options, data.mindmap);

    window.onresize = e => {
      this.resize();
      this.jm.resize();
    };
    window.onresize(new UIEvent("resize"));
  },
  methods: {
    changeTheme() {
      this.jm.set_theme(this.theme);
    },
    resize() {
      // this.size = `width:${window.innerWidth - 16}px;height:${window.innerHeight - 50}px;`;
      this.size = `width:${window.innerWidth -
        48}px;height:${window.innerHeight - 90}px;`;
    },
    saveSetting() {
      const setting = {};
      for (const item of this.setting.keybinds) {
        setting[item.name] = item.key;
      }

      this.jm.options.shortcut.mapping = setting;
      data.saveSetting(data.setting);

      this.setting.visible = false;
    },
    saveMindmap() {
      data.saveMindmap(this.theme, this.jm.get_data("node_tree"));
    }
  }
});
</script>

<style lang="scss">
body,
jmnode {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
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
