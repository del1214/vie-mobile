<template>
  <div :class="prefixListCls">
    <div :class="wrapCls">
      <div :class="labelCls" v-if="label">{{label}}</div>
      <div :class="prefixCls + '-control'">
        <textarea ref="textareaRef" :style="{height: textareaHeight}" :disabled="disabled" :maxLength="maxLength" :readOnly="!editable" :rows="rows" :placeholder="placeholder" :value="value" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></textarea>
      </div>
      <div v-show="clear && editable && selfValue && characterLength > 0">
        <div :class="prefixCls + '-clear'" @click="clearInput" ref="clear"></div>
      </div>
      <span v-if="maxLength > 0 && rows > 1" :class="prefixCls+ '-count'">
        <span>{{selfValue ? characterLength : 0}}</span>/{{maxLength}}</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-textarea`
const prefixListCls = `${companyPrefix}-list`
export default {
  props: {
    // 原生属性
    disabled: {
      type: Boolean,
      required: false
    },
    // 原生属性
    rows: {
      type: [String, Number],
      required: false,
      default: 1
    },
    // 是否自动计算高度
    autoHeight: {
      type: Boolean,
      required: true
    },
    // 暂时未用到
    error: {
      type: Boolean,
      required: false
    },
    // 获取焦点
    focus: {
      type: Boolean,
      required: false
    },
    // 设置readOnly
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否显示清空按钮
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    // label内容
    label: {
      type: String,
      default: ''
    },
    // label宽度
    labelNumber: {
      type: String,
      default: '5'
    },
    // 原生属性
    placeholder: {
      type: String,
      default: ''
    },
    // v-model 绑定的value
    value: {
      type: [String, Number],
      default: ''
    },
    // 原生属性
    maxLength: {
      type: Number
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      prefixListCls: prefixListCls,
      characterLength: 0, // value长度
      debounceTimeout: null,
      textareaHeight: '', // 根据value的变化，textarea的高度自动变化
      selfFocus: this.focus,
      selfValue: this.value
    }
  },
  mounted() {
    this.characterLength = this.countSymbols(this.selfValue)
  },
  methods: {
    // 输入
    handleInput(event) {
      const value = event.target.value
      this.selfValue = value
      this.$emit('input', value)
    },
    // 获取焦点
    handleFocus(event) {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
        this.debounceTimeout = null
      }
      this.selfFocus = true
      this.$emit('focus', event)
    },
    // change事件
    handleChange(event) {
      this.$emit('change', event)
    },
    // 失去焦点
    handleBlur(event) {
      this.debounceTimeout = setTimeout(() => {
        this.selfFocus = false
      }, 100)
      this.$emit('blur', event)
    },
    // 计算value长度
    countSymbols(text = '') {
      const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g
      return text.replace(regexAstralSymbols, '_').length
    },
    // 清空输入框
    clearInput(e) {
      this.selfValue = ''
      this.$emit('input', this.selfValue)
    }
  },
  computed: {
    wrapCls() {
      return [
        `${prefixListCls}-item`,
        `${prefixCls}-item`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-item-single-line`]: (this.rows === 1 || this.rows === '1') && !this.autoHeight,
          [`${prefixCls}-error`]: this.error,
          [`${prefixCls}-focus`]: this.selfFocus
        }
      ]
    },
    labelCls() {
      return [
        `${prefixCls}-label`, {
          [`${prefixCls}-label-2`]: this.labelNumber === '2',
          [`${prefixCls}-label-3`]: this.labelNumber === '3',
          [`${prefixCls}-label-4`]: this.labelNumber === '4',
          [`${prefixCls}-label-5`]: this.labelNumber === '5',
          [`${prefixCls}-label-6`]: this.labelNumber === '6',
          [`${prefixCls}-label-7`]: this.labelNumber === '7'
        }
      ]
    }
  },
  watch: {
    'selfValue'(val, oldValue) {
      this.characterLength = this.countSymbols(val)
      this.selfFocus = true
      const textareaDom = this.$refs.textareaRef
      if (this.autoHeight && this.selfValue) {
        this.textareaHeight = `${textareaDom.scrollHeight}px`
      } else {
        this.textareaHeight = ''
      }
    }
  }
}
</script>


