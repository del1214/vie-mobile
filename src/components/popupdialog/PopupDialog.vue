<template>
<Modal :prefixCls="prefixCls" :visible.sync="popVisible" :closable="false" :showHeader="false" :showFooter="false" :transitionName="transitionName" :maskTransitionName="maskTransitionName">
  <div>
    <div :class="`${prefixCls}-title`">
      {{title}}
      <Icon @click.native="close" type="close"></Icon>
    </div>
    <div :class="wrapClassObj" :style="wrapStyle">
      <div ref="content" :class="contentClass" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
    <div :class="footerClassObj" :style="footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</Modal>
</template>

<script>
import Modal from '@/components/modal'
import Icon from '@/components/icon'
import ZScroller from 'zscroller'
import { companyPrefix } from '@/config/style.js'
const prefixCls = `${companyPrefix}-popup-dialog`
export default {
  components: {
    Modal,
    Icon
  },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: '你没事干嘛'
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    onDismiss: Function,
    // modal过渡动画名称
    transitionName: {
      type: String,
      default: `${companyPrefix}-animation-slide`
    },
    // mask过渡动画名称
    maskTransitionName: {
      type: String,
      default: `${companyPrefix}-animation-fade`
    },
    contentClass: {
      type: Object
      // default: {}
    },
    footerClass: {
      type: Object
      // default: {}
    },
    wrapClass: {
      type: Object
    },
    contentStyle: {
      type: Object
    },
    footerStyle: {
      type: Object
    },
    wrapStyle: {
      type: Object
    }
  },
  data() {
    return {
      popVisible: false,
      zscroller: null
    }
  },
  mounted() {
    // 初始化 zscroller
    this.$nextTick(() => {
      this.zscroller = new ZScroller(this.$refs.content, {
        scrollingX: false,
        snapping: true,
        locking: false,
        penetrationDeceleration: 0.1,
        minVelocityToKeepDecelerating: 0.5
      })
    })
  },
  methods: {
    close() {
      this.popVisible = false
    }
  },
  computed: {
    // containerClass() {
    //   let classObj = {}
    //   classObj[`${prefixCls}-share`] = this.mode === 'SHARE'
    //   return classObj
    // },
    wrapClassObj(){
      let classObj = {}
      classObj[`${prefixCls}-zwrap`] = true
      return Object.assign({}, classObj, this.wrapClass)
    },
    contentClassObj(){
      let classObj = {}
      classObj[`${prefixCls}-zwrap-content`] = true
      return Object.assign({}, classObj, this.contentClass)
    },
    footerClassObj(){
      let classObj = {}
      classObj[`${prefixCls}-zwrap-footer`] = true
      return Object.assign({}, classObj, this.footerClass)
    }
  },
  beforeDestroy() {
    // 销毁对象前销毁 scroller
    this.zscroller.destroy()
  },
  watch: {
    value(val) {
      this.popVisible = val
    },
    popVisible(val) {
      this.$emit('input', val)
    }
  }
}
</script>
