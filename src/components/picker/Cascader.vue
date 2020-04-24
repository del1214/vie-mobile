<template>
  <div>
    <MultiPicker :disabled="disabled" :hasKey="false" :selectedValues="selectedValues" :multiItems="multiItems" :pickerClassName="pickerClassName" :pickerStyle="pickerStyle" :pickerItemStyle="pickerItemStyle" :indicatorStyle="indicatorStyle" :multiPickerClassName="multiPickerClassName" :multiPickerStyle="multiPickerStyle" v-on:valueChange="valueChange">
    </MultiPicker>
  </div>
</template>
<script>
import MultiPicker from './MultiPicker'
import arrayTreeFilter from 'array-tree-filter'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-picker-multi`

export default {
  components: {
    MultiPicker
  },
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // data 是级联数据数据格式如下
    // {
    //   value:'',
    //   label:'',
    //   children:[
    // 内容同上,递归下去
    //   ]
    // }
    data: {
      props: Array,
      required: true
    },
    // 有几列数据,默认3列
    cols: {
      type: Number,
      default: 3
    },
    // 此属性必须是sync的否则picker无法自动更新内容
    // 选中值
    selectedValues: {
      type: Array,
      required: false,
      default() {
        return []
      }
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
      multiItems: null
    }
  },
  created() {
    if (!this.selectedValues.length) {
      this.getDefaultSelectedValues()
    } else {
      this.getCols(this.selectedValues)
    }
  },
  methods: {
    getDefaultSelectedValues() {
      let data = this.data[0]
      let selectedValues = [data.value]
      for (let i = 1; data && data.children && data.children.length && i < this.cols; i++) {
        data = data.children[0]
        selectedValues.push(data.value)
      }
      this.getCols(selectedValues)
      this.$nextTick(function () {
        this.$emit('update:selectedValues', selectedValues)
      })
    },
    // 获得列数据
    getCols(selectedValues) {
      const childrenTree = arrayTreeFilter(this.data, (c, level) => {
        // console.log(c.label, c.value, level, this.selectedValues[level], 'aaa')
        // 将value与选中序列中一致的选中
        return c.value === selectedValues[level]
      }).map(c => c.children)
      // map(c=>c.chidren)后只能保留除了顶级数组以外的内容和一个undefined 如下所示
      // [array1,array2,undefined]
      // 将undefined从数组截出
      childrenTree.length = this.cols - 1
      // 向数组头部插入顶级元素
      childrenTree.unshift(this.data)
      this.multiItems = childrenTree
    },
    valueChange(value, item, index) {
      // 复制当前选中值
      let selectedValues = [...this.selectedValues]
      // 设置索引值为新的item value
      selectedValues[index] = item.value
      // 如果item有子项开始递归处理
      if (item.children && item.children.length) {
        // 取出item 的children数组
        let data = item.children[0]
        // 将内容替换到index+1也就是下一组数据更换
        this.multiItems.splice(index + 1, 1, item.children)
        // i为index+1,data存在且i 小于列数
        for (let i = index + 1; data && i < this.cols; i++) {
          // 设置选中值
          selectedValues[i] = data.value
          // 有子项的处理
          if (data.children && data.children.length) {
            // 替换下一列数组
            this.multiItems.splice(i + 1, 1, data.children)
            // 取出下一列顶点位置对象 继续递归
            data = data.children[0]
          } else {
            // 没有子项
            break
            // data = null
          }
        }
      }
      // 触发selectedValues sync,下面的Piker自动选中目标
      this.$emit('update:selectedValues', selectedValues)
    }
  }
}
</script>
