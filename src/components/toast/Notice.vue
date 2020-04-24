<template>
  <div :class="`${prefixCls}-notice`" :style="propStyle">
    <div :class="`${prefixCls}-notice-content`" v-html="content">

    </div>
    <a v-if="closable" tabIndex="0" @click="close" :class="closeClass">
      <span :class="closeXClsss"></span>
    </a>
  </div>
</template>

<script>
import { isPromise } from '../../utils/object.js'
import { companyPrefix } from '../../config/style.js'
import Icon from '@/components/icon'
const prefixCls = `${companyPrefix}-notice`
export default {
  components: {
    Icon
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function,
      required: false
    },
    duration: {
      type: Number | Object,
      default: 1.5,
      required: false
    },
    closable: {
      type: Boolean,
      default(){
        return function(){}
      },
      required: false
    },
    className: {
      type: String | Object,
      required: false
    },
    prefixCls: {
      type: String,
      default: prefixCls,
      required: false
    },
    propStyle: {
      type: Object,
      required: false,
      default(){
        return {
          right: '50%'
        }
      }
    }
  },
  data() {
    return {
      // timer
      closeTimer: null
    }
  },
  methods: {
    // 清除timer
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    close(e) {
      this.clearCloseTimer()
      this.onClose && this.onClose()
    }
  },
  mounted() {
    if(isPromise(this.duration)){
      let result = this.duration
      result.then(() => {
        setTimeout(() => {
          this.close()
        }, 300)
      }, () => {
        setTimeout(() => {
          this.close()
        }, 300)
      }).catch(() => {
        setTimeout(() => {
          this.close()
        }, 300)
      })
    }else{
      if (this.duration) {
        this.closeTimer = setTimeout(() => {
          this.close()
        }, this.duration * 1000)
      }
    }
  },
  beforeDestroy() {
    this.clearCloseTimer()
  },
  computed: {
    closeXClsss() {
      return {
        [`${this.prefixCls}-closable-x`]: this.closable
      }
    },
    closeClass() {
      return {
        [`${this.prefixCls}-closable`]: this.closable
      }
    },
    wrapClasses() {
      return {
        [this.className]: !!this.className
      }
    }
  }
}
</script>
