<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { companyPrefix } from '../../config/style.js'
import { oneOf } from '../../utils/object'
const prefixCls = `${companyPrefix}-wingblank`
export default {
  name: 'WingBlank',
  props: {
    // 控制大小
    size: {
      validator (value) {
        return oneOf(value, ['sm', 'md', 'lg'])
      },
      default: 'md'
    }
  },
  data (){
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
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    }
  }
}
</script>
