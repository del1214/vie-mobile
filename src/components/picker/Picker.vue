<template>
  <div :class="className" :style="pickerStyle">
    <div :class="`${prefixCls}-item`" :style="itemStyle">
      <div :class="`${prefixCls}-col`">
        <div :class="`${prefixCls}-col-mask`"></div>
        <div ref="indicator" :class="`${prefixCls}-col-indicator`" :style="indicatorStyle"></div>
        <div ref="content" :class="`${prefixCls}-col-content`">
          <div v-for="item in items" :key="item.value" :class="[`${prefixCls}-col-item`,(pickerSelectedValue === item.value) ? `${prefixCls}-col-item-selected`: '']">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZScroller from 'zscroller'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-picker`
export default {
  props: {
    // picker 的索引值 只在多个 picker时使用
    pickerIndex: {
      type: Number,
      required: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // 滚动位置时是否用动画
    scrollToAnimate: {
      type: Boolean,
      required: false,
      default: true
    },
    // 选择
    selectedValue: [String, Number],
    // 默认值
    defaultValue: [String, Number],
    // 子项
    items: {
      type: Array,
      required: true
    },
    // pickerItem 样式
    itemStyle: {
      type: Object,
      required: false
    },
    // indicator 样式
    indicatorStyle: {
      type: Object,
      required: false
    },
    // 自己的样式
    pickerStyle: {
      type: Object,
      required: false
    },
    pickerClassName: {
      type: Array,
      required: false
    },
    prefixCls: {
      type: String,
      default: prefixCls
    }
  },
  data() {
    return {
      // 一个子项的高度
      itemHeight: 0,
      // 选中的值
      pickerSelectedValue: null
    }
  },
  created() {
    if (this.selectedValue) {
      // 有 props value 用 value
      this.pickerSelectedValue = this.selectedValue
    } else if (this.defaultValue) {
      // 有默认值用默认值
      this.pickerSelectedValue = this.defaultValue
    } else if (this.items && this.items.length) {
      // 有 items 时用 value
      this.pickerSelectedValue = this.items[0].value
    }
  },
  mounted() {
    this.$nextTick(function () {
      // 计算选择器高度
      this.itemHeight = this.$refs.indicator.getBoundingClientRect().height
      if(!this.itemHeight){
        var node = this.$refs.indicator.cloneNode()
        node.style.position = 'absolute'
        node.style.top = '-10000px'
        node.style.left = '0'
        node.style.right = '0'
        document.body.appendChild(node)
        this.itemHeight = node.getBoundingClientRect().height
        document.body.removeChild(node)
      }
      // 内容区 padding 设置为选择器高度3倍
      this.$refs.content.style.padding = `${this.itemHeight * 3}px 0`
      // 初始化 zscroller
      this.zscroller = new ZScroller(this.$refs.content, {
        scrollingX: false,
        snapping: true,
        locking: false,
        penetrationDeceleration: 0.1,
        minVelocityToKeepDecelerating: 0.5,
        scrollingComplete: this.scrollingComplete
      })
      // 设置是否禁用
      this.zscroller.setDisabled(this.disabled)
      // 设置 snapsize
      this.zscroller.scroller.setSnapSize(0, this.itemHeight)
      // 默认选一次
      this.select(this.pickerSelectedValue)
    })
  },
  beforeDestroy() {
    // 销毁对象前销毁 scroller
    this.zscroller.destroy()
  },
  methods: {
    // zscroller scrollingComplete 回调
    scrollingComplete() {
      const { top } = this.zscroller.scroller.getValues()
      // 大于0 再做滚动操作
      if (top >= 0) {
        this.doScrollComplete(top)
      }
    },
    // 滚动到对应位置
    scrollTo(top) {
      this.zscroller.scroller.scrollTo(0, top)
    },
    // 根据 value 选中索引
    select(value) {
      const items = this.items
      // 遍历 items
      for (let i = 0, len = items.length; i < len; i++) {
        if (items[i].value === value) {
          this.selectByIndex(i)
          return
        }
      }
      this.selectByIndex(0)
    },
    // 根据索引滚动到对应位置
    selectByIndex(index) {
      // 索引小于0 索引大于长度 没有 item 高度
      if (index < 0 || index >= this.items.length || !this.itemHeight) {
        console.warn('picker select index out of boundary')
        return
      }
      // 索引*item 高度正好是那个位置,好机智
      this.scrollTo(index * this.itemHeight)
    },
    doScrollComplete(top) {
      // 高度除以 单个 item 的高度得到带小数的 索引值数字
      let index = top / this.itemHeight
      // 舍弃小数
      const floor = Math.floor(index)
      // index 大于 floor的 +1
      if (index - floor > 0.5) {
        index = floor + 1
      } else {
        index = floor
      }
      // 比一比 index 是否超过了数组最后一位,取小的那个
      index = Math.min(index, this.items.length - 1)
      const item = this.items[index]
      if (item) {
        this.valueChange(item.value, item)
      } else {
        console.warn('picker item is not found', this.items, index)
      }
    },
    // value 变动
    valueChange(value, item) {
      // 修改了值才有继续操作的意义
      if (value !== this.pickerSelectedValue) {
        this.pickerSelectedValue = value
        // 触发变动
        this.$emit('valuechange', value, item, this.pickerIndex)
      }
    }
  },
  watch: {
    'disabled'(val) {
      this.zscroller.reflow()
      this.zscroller.setDisabled(val)
    },
    'items'(val) {
      this.$nextTick(function(){
        this.zscroller.reflow()
      })
    },
    'selectedValue'(val) {
      if(val === this.pickerSelectedValue){
        return false
      }
      this.$nextTick(function(){
        this.zscroller.reflow()
        this.select(val)
      })
    }
  },
  computed: {
    className() {
      if (this.pickerClassName) {
        return this.pickerClassName.concat(this.prefixCls)
      } else {
        return [this.prefixCls]
      }
    }
  }
}
</script>
