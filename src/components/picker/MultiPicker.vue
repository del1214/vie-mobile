<template>
  <div v-if="hasKey === true" :class="className" :style="multiPickerStyle">
    <div  v-for="(items,$index) in multiItems" :key="items.key" :class="[`${prefixCls}-item`]">
      <Picker v-on:valuechange="valueChangeHandler" :pickerIndex="$index" :disabled="disabled" :selectedValue="selectedValues[$index]" :items="items.values" :pickerStyle="pickerStyle" :itemStyle="pickerItemStyle" :indicatorStyle="indicatorStyle" :pickerClassName="pickerClassName"></Picker>
    </div>
  </div>
  <div v-else :class="className" :style="multiPickerStyle">
    <div v-for="(items,$index) in multiItems" :key="$index" :class="[`${prefixCls}-item`]">
      <Picker v-on:valuechange="valueChangeHandler" :pickerIndex="$index" :disabled="disabled" :selectedValue="selectedValues[$index]" :items="items" :pickerStyle="pickerStyle" :itemStyle="pickerItemStyle" :indicatorStyle="indicatorStyle" :pickerClassName="pickerClassName"></Picker>
    </div>
  </div>
</template>
<script>
import Picker from './Picker'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-picker-multi`
export default {
  components: {
    Picker
  },
  props: {
    hasKey: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // 列数据
    multiItems: {
      type: Array,
      required: true
    },
    // 选中值
    selectedValues: {
      type: Array,
      required: true
    },
    // picker 额外 className
    pickerClassName: {
      type: Array,
      required: false
    },
    // picker style
    pickerStyle: {
      type: Object,
      required: false
    },
    // pickerItem 样式
    pickerItemStyle: {
      type: Object,
      required: false
    },
    // indicator 样式
    indicatorStyle: {
      type: Object,
      required: false
    },
    // multipicker class
    multiPickerClassName: {
      type: Array,
      required: false
    },
    // 自己的样式
    multiPickerStyle: {
      type: Object,
      required: false
    },
    prefixCls: {
      type: String,
      default: prefixCls
    }
  },
  data() {
    return {
    }
  },
  created() { },
  methods: {
    valueChangeHandler(value, item, index) {
      this.$emit('valueChange', value, item, index)
    }
  },
  computed: {
    className() {
      if (this.multiPickerClassName) {
        return this.multiPickerClassName.concat(this.prefixCls)
      } else {
        return [this.prefixCls]
      }
    }
  }
}
</script>
