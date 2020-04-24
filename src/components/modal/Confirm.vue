<template>
  <Modal @on-ok="ok" @on-cancel="cancel" :okText="okText" :cancelText="cancelText" :maskClosable="maskClosable" :visible.sync="visible" :confirmModal="confirmModal" :title="title" :bodyStyle="bodyStyle">
    <div v-html="body"></div>
  </Modal>
</template>
<script>
import Modal from './Modal'
function noop() {}
export default {
  props: {
    bodyStyle: {
      type: Object,
      default: function() {
        return { width: '5.4rem', height: 'auto' }
      }
    },
    title: {
      type: String,
      default: ''
    },
    maskClosable: false,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    body: {
      type: String,
      default: ''
    },
    confirmModal: {
      type: Boolean,
      default: false
    },
    okCb: {
      type: Function,
      default: noop
    },
    cancelCb: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      visible: false
    }
  },
  components: {
    Modal
  },
  methods: {
    ok() {
      this.visible = false
      this.okCb && this.okCb()
      this.remove()
    },
    cancel() {
      this.visible = false
      this.cancelCb && this.cancelCb()
      this.remove()
    },
    remove() {
      setTimeout(() => {
        this.$destroy()
        // 可以删除v-transfer-dom 复制出的body下的dom节点
        document.body.removeChild(this.$el)
      }, 400)
    }
  }
}
</script>

