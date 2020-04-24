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

      <DatePicker v-if="datePickerShow" :date.sync="popSelectDate" :mode="mode" :minDate="minDate" :maxDate="maxDate" :minuteStep="minuteStep"></DatePicker>
    </div>
  </Modal>
</template>
<script>
import { Modal } from '../../components/modal'
import moment from 'moment'
import DatePicker from './DatePicker'
import { oneOf } from '../../utils/object'
import { companyPrefix } from '../../config/style.js'
import TYPES from './mode'
const prefixCls = `${companyPrefix}-picker-popup`
export default {
  components: {
    Modal,
    DatePicker
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
    // 最小时间
    minDate: {
      type: Object
    },
    // 最大时间
    maxDate: {
      type: Object
    },
    // 分钟的步长 默认1
    minuteStep: {
      type: Number,
      default: 1
    },
    // 模式
    mode: {
      validator(value) {
        // 日期,时间,日期和时间,年,月
        return oneOf(value, TYPES)
      },
      type: String,
      default: TYPES.DATE
    },
    // v-model 传入[{value,label},...] 返回同样内容
    value: {
      type: Object,
      required: true,
      default() {
        return moment()
      }
    }
  },
  data() {
    return {
      datePickerShow: false,
      popVisible: this.visible,
      popSelectDate: null
    }
  },
  created() {
    this.getSelectedDate()
  },
  watch: {
    visible(val) {
      // 定时器存在时不允许显示
      if (this.timer) {
        return false
      }
      this.popVisible = val
      if (val === true) {
        this.datePickerShow = val
      } else {
        // 设置timer
        this.timer = setTimeout(() => {
          this.datePickerShow = val
          if (this.value) {
            this.popSelectDate = moment(this.value.valueOf())
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
    getSelectedDate() {
      this.popSelectDate = moment(this.value.valueOf())
    },
    dismissHandler(e) {
      this.popVisible = false
      this.$emit('update:visible', false)
    },
    okHandler(e) {
      let date = moment(this.popSelectDate.valueOf())
      this.$emit('input', date)
      this.$emit('update:visible', false)
    }
  }
}
</script>
