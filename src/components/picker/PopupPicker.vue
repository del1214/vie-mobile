<template>
  <!--visible需要写成.sync 来同步显示-->
  <Modal :prefixCls="prefixCls" :visible.sync="popVisible" :closable="false" :showHeader="false" :showFooter="false" :transitionName="transitionName" :maskTransitionName="maskTransitionName">
    <!--插入到slot 中的不能用v-show 或 v-if控制 否则没有动画-->
    <div>
      <div :class="`${prefixCls}-header`">
        <div :class="`${prefixCls}-item ${prefixCls}-left`" @click="dismissHandler">{{dismissText}}</div>
        <div :class="`${prefixCls}-item ${prefixCls}-title`">{{title}}</div>
        <div :class="`${prefixCls}-item ${prefixCls}-right`" @click="okHandler">{{okText}}</div>
      </div>
      <!--数据不全时不添加此节点 selectedValues需为sync否则无法触发picker自动选择内容 cols与data的子项层级需一致-->
      <Cascader v-if="cascaderShow" :cols="cols" :data="data" :selectedValues.sync="popSelectedValues"></Cascader>
    </div>
  </Modal>
</template>
<script>
import { Modal } from '../../components/modal'
import Cascader from './Cascader'
import arrayTreeFilter from 'array-tree-filter'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-picker-popup`
export default {
  components: {
    Modal,
    Cascader
  },
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // modal过渡动画名称
    transitionName: {
      type: String,
      default: `${companyPrefix}-animation-slide`
    },
    // mask过渡动画名称
    maskTransitionName: {
      type: String,
      default: `${companyPrefix}-animation-fade`
    },
    // 数据 需满足格式
    data: {
      props: Array,
      required: true
    },
    // 有几列数据,默认3列
    cols: {
      type: Number,
      default: 3
    },
    title: String,
    dismissText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    // 暂时无效
    onDismiss: Function,
    // 暂时无效
    onOk: Function,
    // 前缀
    prefixCls: {
      type: String,
      default: prefixCls
    },
    // v-model 传入[{value,label},...] 返回同样内容
    value: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cascaderShow: false,
      popVisible: this.visible,
      popSelectedValues: []
    }
  },
  created() {
    this.getSelectedValues()
  },
  watch: {
    visible(val) {
      // 定时器存在时不允许显示
      if (this.timer) {
        return false
      }
      this.popVisible = val
      if (val === true) {
        this.cascaderShow = val
      } else {
        // 设置timer
        this.timer = setTimeout(() => {
          this.cascaderShow = val
          if (this.value.length) {
            this.getSelectedValues()
          }
          // 清楚timer
          this.timer = null
        }, 300)
      }
    },
    popVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    // 从value中遍历选中值
    getSelectedValues() {
      let selectedValues = []
      this.value.forEach(function (element) {
        selectedValues.push(element.value)
      })
      this.popSelectedValues = selectedValues
    },
    dismissHandler(e) {
      this.popVisible = false
      this.$emit('update:visible', false)
    },
    okHandler(e) {
      let results = this.getResults()
      this.$emit('input', results)
      this.$emit('update:visible', false)
    },
    getResults() {
      const children = arrayTreeFilter(this.data, (c, level) => {
        // 将value与选中序列中一致的选中
        return c.value === this.popSelectedValues[level]
      })
      let selectedValues = []
      for (let i = 0, len = children.length; i < len; i++) {
        selectedValues.push({
          label: children[i].label,
          value: children[i].value
        })
      }
      return selectedValues
    }
  }
}
</script>
