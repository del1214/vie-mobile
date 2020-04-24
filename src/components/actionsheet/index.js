import ActionSheet from './ActionSheet'
import Vue from 'vue'
const Sheet = Vue.component('ActionSheet', ActionSheet)
function noop() { }
const queue = []
const NORMAL = 'NORMAL'
const SHARE = 'SHARE'

function createActionSheet(flag, config, callback) {
  // 合并props
  const props = {
    prefixCls: 'vie-action-sheet',
    cancelText: '取消',
    ...config,
    mode: flag,
    onOk: (index, rowIndex) => cb(index, rowIndex)
  }

  // 创建容器
  let div = document.createElement('div')
  document.body.appendChild(div)
  // 实例化组件 挂载
  let component = new Sheet({ propsData: props }).$mount()
  // 组件dom插入
  div.appendChild(component.$el)
  // 加入队列
  queue.push(close)

  // 关闭方法
  function close() {
    if (div) {
      component.popVisible = false
      setTimeout(() => {
        component.$destroy()
        div.parentNode.removeChild(div)
        div = null
        const index = queue.indexOf(close)
        if (index !== -1) {
          queue.splice(index, 1)
        }
      }, 300)
    }
  }

  // 回调方法
  function cb(index, rowIndex = 0) {
    const res = callback(index, rowIndex)
    // promise 处理
    if (res && res.then) {
      res.then(() => {
        close()
      })
    } else {
      close()
    }
  }
}

// 默认导出
export default {
  showActionSheet(config, callback = noop) {
    createActionSheet(NORMAL, config, callback)
  },
  showShareActionSheet(config, callback = noop) {
    createActionSheet(SHARE, config, callback)
  },
  close() {
    queue.forEach(q => q())
  }
}

