<template>
  <div>
    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <h3>基础</h3>
      <r-button size="long" @click="visible = true">Modal 对话框</r-button>
      <Modal :visible.sync="visible" :loading.sync="modalLoading" title="你好title" :bodyStyle="bodyStyle" :onClose="modalConfirmCb">
        <p>我是内容...</p>
        <p>我是内容...</p>
      </Modal>
    </WingBlank>

    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <r-button size="long" @click="visibleAlert = true">确认对话框</r-button>
      <Modal :visible.sync="visibleAlert" :confirmModal="false" title="你好title" :bodyStyle="bodyStyle" :onClose="modalConfirmCb">
        <p>我是内容...</p>
        <p>我是内容...</p>
      </Modal>
    </WingBlank>

    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <h3>自定义内容</h3>
      <r-button size="long" @click="visibleCustom1 = true">自定义按钮文字</r-button>
      <Modal :visible.sync="visibleCustom1" title="删除" :bodyStyle="bodyStyle">
      </Modal>

      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="visibleCustom2 = true">弹出多个按钮</r-button>
      <Modal :visible.sync="visibleCustom2" :confirmModal="false" title="删除" :bodyStyle="bodyStyle">
        <div>请点击一个按钮</div>
        <div slot="footer">
          <a href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="multiButtonClickHandler">按钮一</a>
          <a href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="multiButtonClickHandler">按钮二</a>
          <a href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="multiButtonClickHandler">按钮三</a>
        </div>
      </Modal>

      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="visible = true">按钮Promise</r-button>
      <Modal :visible.sync="visiblePromise" :loading.sync="loadingPromise" title="按钮Promise" :bodyStyle="bodyStyle" :onClose="modalConfirmCb">
        <p>我是内容...</p>
        <p>我是内容...</p>
      </Modal>
    </WingBlank>

    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <h3>静态方式调用</h3>
      <r-button size="long" @click="alert()">alert</r-button>
    </WingBlank>

    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <r-button size="long" @click="confirm()">confirm</r-button>
    </WingBlank>
  </div>
</template>

<script>
import { Modal } from '@/components/modal'
import Button from '@/components/button'
import { WhiteSpace, WingBlank } from '@/components/space'
// var Promise = require('es6-promise').Promise
import Promise from 'es6-promise'
import { companyPrefix } from '../config/style.js'
const prefixCls = `${companyPrefix}-modal`
export default {
  components: {
    Modal,
    WhiteSpace,
    WingBlank,
    'r-button': Button
  },
  data() {
    return {
      prefixCls: prefixCls,
      modalLoading: false,
      visible: false,
      bodyStyle: { width: '5.4rem', height: 'auto' },
      visibleAlert: false,
      visibleCustom1: false,
      visibleCustom2: false,
      visiblePromise: false,
      loadingPromise: false
    }
  },
  methods: {
    modalCancelCb() {
      return true
    },
    modalConfirmCb() {
      // let self = this
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 5000)
      })
    },
    multiButtonClickHandler(e) {
      this.visibleCustom2 = false
      Modal.alert({ body: `点击了${e.target.textContent}` })
    },
    alert() {
      Modal.alert({ body: '<b>hahaha</b>' })
    },
    confirm() {
      Modal.confirm({
        title: '确认',
        okText: '草拟吗',
        cancelText: '去你妹',
        body: '<b>yahaha</b>',
        okCb: function() {
          Modal.alert({ body: '你点击了确认' })
        },
        cancelCb: function() {
          Modal.alert({ body: '你点击了取消' })
        }
      })
    }
  }
}
</script>
