<template>
  <div :class="classObj" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { companyPrefix } from '../../config/style.js'
import { extend } from '../../utils/object'
const prefixCls = `${companyPrefix}-flexbox`
export default {
  props: {
    // flex-direction
    direction: {
      type: String,
      required: false,
      default() {
        return 'row'
      }
    },
    // flex-wrap
    wrap: {
      type: String,
      required: false,
      default() {
        return 'nowrap'
      }
    },
    // justify-content
    justify: {
      type: String,
      required: false,
      default() {
        return 'start'
      }
    },
    // align-items
    align: {
      type: String,
      required: false,
      default() {
        return 'stretch'
      }
    },
    // align-content
    alignContent: {
      type: String,
      required: false,
      default() {
        return 'stretch'
      }
    },
    // 可以绑定其他 class
    classes: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    // 可以自定义样式
    styles: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    classObj() {
      // 穷举可能的样式 class ,在 flexbox.less 中需要有配套的 class 存在
      let temp = {
        [`${prefixCls}`]: true,
        [`${prefixCls}-dir-row`]: this.direction === 'row',
        [`${prefixCls}-dir-row-reverse`]: this.direction === 'row-reverse',
        [`${prefixCls}-dir-column`]: this.direction === 'column',
        [`${prefixCls}-dir-column-reverse`]: this.direction === 'column-reverse',

        [`${prefixCls}-nowrap`]: this.wrap === 'nowrap',
        [`${prefixCls}-wrap`]: this.wrap === 'wrap',
        [`${prefixCls}-wrap-reverse`]: this.wrap === 'wrap-reverse',

        [`${prefixCls}-justify-start`]: this.justify === 'start',
        [`${prefixCls}-justify-end`]: this.justify === 'end',
        [`${prefixCls}-justify-center`]: this.justify === 'center',
        [`${prefixCls}-justify-between`]: this.justify === 'between',
        [`${prefixCls}-justify-around`]: this.justify === 'around',

        [`${prefixCls}-align-top`]: this.align === 'top' || this.align === 'start',
        [`${prefixCls}-align-middle`]: this.align === 'middle' || this.align === 'center',
        [`${prefixCls}-align-bottom`]: this.align === 'bottom' || this.align === 'end',
        [`${prefixCls}-align-baseline`]: this.align === 'baseline',
        [`${prefixCls}-align-stretch`]: this.align === 'stretch',

        [`${prefixCls}-align-content-start`]: this.alignContent === 'start',
        [`${prefixCls}-align-content-end`]: this.alignContent === 'end',
        [`${prefixCls}-align-content-center`]: this.alignContent === 'center',
        [`${prefixCls}-align-content-between`]: this.alignContent === 'between',
        [`${prefixCls}-align-content-around`]: this.alignContent === 'around',
        [`${prefixCls}-align-content-stretch`]: this.alignContent === 'stretch'
      }
      // 混合class
      return extend(temp, this.classes)
    }
  }
}
</script>
