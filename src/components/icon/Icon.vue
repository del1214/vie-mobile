<template>
      <i :class="classes" :style="iconStyle"></i>
</template>

<script>
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-icon`
export default {
  name: 'Icon',
  props: {
    // 图标的名称
    type: String,
    // Icon 样式
    iconStyle: {
      type: Object,
      required: false
    }
  },
  computed: {
    classes () {
      return `${prefixCls} ${prefixCls}-${this.type}`
    }
  }
}
</script>
