<template>
  <div :class="className">
    <div :class="`${prefixCls}-header`" v-if="showHead">
      <div :class="`${prefixCls}-header-content`">
        <slot name="headerTitle"></slot>
      </div>
      <div :class="`${prefixCls}-header-extra`">
        <slot name="headerExtra"></slot>
      </div>
    </div>
    <div :class="`${prefixCls}-body`">
      <slot></slot>
    </div>
    <div :class="`${prefixCls}-footer`" v-if="showFooter">
      <div :class="`${prefixCls}-footer-content`">
        <slot name="footerContent"></slot>
      </div>
      <div :class="`${prefixCls}-footer-extra`">
        <slot name="footerExtra"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-card`
export default {
  props: {
    // 卡片border
    border: Boolean,
    // 卡片通栏
    full: Boolean
  },
  data() {
    return {
      // class 前缀
      prefixCls: prefixCls,
      showHead: true,
      showFooter: true
    }
  },
  computed: {
    className() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-full`]: this.full
        }
      ]
    }
  },
  created(){
    this.showHead = this.$slots.headerTitle !== undefined || this.$slots.headerExtra !== undefined
    this.showFooter = this.$slots.footerTitle !== undefined || this.$slots.footerExtra !== undefined
  }
}
</script>
