import * as data from '../data-loader';

const { keymap } = data.setting;

export default [
  {
    name: 'addchild',
    operation: '添加子节点',
    key: keymap.addchild,
  },
  {
    name: 'addbrother',
    operation: '添加兄弟节点',
    key: keymap.addbrother,
  },
  {
    name: 'editnode',
    operation: '编辑节点',
    key: keymap.editnode,
  },
  {
    name: 'delnode',
    operation: '删除节点',
    key: keymap.delnode,
  },
  {
    name: 'toggle',
    operation: '折叠/展开',
    key: keymap.toggle,
  },
  {
    name: 'left',
    operation: '选择上一个兄弟节点',
    key: keymap.left,
  },
  {
    name: 'up',
    operation: '选择下一个兄弟节点',
    key: keymap.up,
  },
  {
    name: 'right',
    operation: '选择左边第一个节点',
    key: keymap.right,
  },
  {
    name: 'down',
    operation: '选择右边第一个节点',
    key: keymap.down,
  },
];
