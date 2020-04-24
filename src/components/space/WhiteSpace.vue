<template>
    <div :class="classes">
    </div>
</template>

<script>
import { companyPrefix } from '../../config/style.js'
import { oneOf } from '../../utils/object'
const prefixCls = `${companyPrefix}-whitespace`
export default {
  name: 'WhiteSpace',
  props: {
    // 控制大小
    size: {
      validator (value) {
        return oneOf(value, ['xs', 'sm', 'md', 'lg', 'xl'])
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
