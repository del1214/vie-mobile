<template>
  <div :class="classObj" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { extend } from '../../utils/object'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-flexbox`
export default {
  props: {
    // 自定义样式
    styles: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    // 自定义 class
    classes: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    classObj() {
      // 混合class
      let temp = {
        [`${prefixCls}-item`]: true
      }
      return extend(temp, this.classes)
    }
  }
}
</script>
