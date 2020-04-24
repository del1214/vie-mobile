<template>
  <button :type="htmlType" :sytle="buttonStyle" :class="classes" :active="active" :disabled="disabled" @click="handleClick">
    <Icon :type="icon" class="vie-animation-loading" v-if="loading"></Icon>
    <Icon :type="icon" v-if="icon && !loading"></Icon>
    <span><slot></slot></span>
  </button>
</template>

<script>
import { companyPrefix } from '../../config/style.js'
import { oneOf } from '../../utils/object'
import { Icon } from '../icon/'
const prefixCls = `${companyPrefix}-button`
export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    // 按钮名称-色值状态
    type: {
      validator (value) {
        return oneOf(value, ['primary', 'ghost', 'info', 'success', 'warning', 'error'])
      }
    },
    // 控制大小
    size: {
      validator (value) {
        return oneOf(value, ['small', 'long'])
      }
    },
    // 按钮形状
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'circle-outline'])
      }
    },
    htmlType: {
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      }
    },
    // button 样式
    buttonStyle: {
      type: Object,
      required: false
    },
    // 设置点击状态
    active: Boolean,
    // 是否通栏
    across: {
      type: Boolean,
      default: false
    },
    // 禁用状态
    disabled: Boolean,
    // 设置loading
    loading: Boolean,
    // 设置图标
    icon: String
  },
  data() {
    return {
      // class 前缀
      prefixCls: prefixCls
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-across`]: this.across,
          [`${prefixCls}-icon`]: this.icon,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: !!this.disabled,
          [`${prefixCls}-active`]: !!this.active
        }
      ]
    }
  },
  methods: {
    handleClick (event){
      this.$emit('click', event)
    }
  }
}
</script>
