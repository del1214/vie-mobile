<template>
  <div>
    <WhiteSpace></WhiteSpace>
    <WingBlank size="lg">
      <h3>基础</h3>
      <r-button size="long" @click="showToast">文字 toast</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="showToastNoMask">不含蒙层</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="showCustomToast">自定义图标</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="successToast">成功 toast</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="failToast">失败 toast</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="offline">网络异常 toast</r-button>
      <WhiteSpace></WhiteSpace>
      <r-button size="long" @click="loadingToast">Loading toast</r-button>
    </WingBlank>
  </div>
</template>

<script>
import axios from 'axios'
import Promise from 'es6-promise'
import Toast from '@/components/toast'
import Button from '@/components/button'
import { WhiteSpace, WingBlank } from '@/components/space'
// var Promise = require('es6-promise').Promise
export default {
  components: {
    WhiteSpace,
    WingBlank,
    'r-button': Button
  },
  data() {
    return {
    }
  },
  methods: {
    showToast() {
      Toast.info('This is a toast tips !!!', 2)
    },
    showToastNoMask() {
      Toast.info('Toast without mask !!!', 2, null, false)
    },
    showCustomToast() {
      Toast.custom('Custom icon toast !!!', require('../assets/down.svg'), 2, null, false)
    },
    successToast() {
      Toast.success('Load success !!!', 2)
    },
    failToast() {
      Toast.fail('Load failed !!!', 2)
    },
    offline() {
      Toast.offline('Network connection failed !!!', 2)
    },
    loadingToast() {
      // let self = this
      let promise = axios.get('/promisetest').then(function (res) {
        return Promise.resolve(res)
      })



      Toast.loading('我支持Promise😯...', promise)
      setTimeout(function(){
        Toast.hide()
        Toast.fail('太慢了我取消了loading !!!', 2)
      }, 10000)
    }
  }
}
</script>
