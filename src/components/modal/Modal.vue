<template>
  <div v-if="appendBody">
    <transition :name="maskTransitionName">
      <div v-if="mask" :class="`${prefixCls}-mask`" :style="maskStyle" v-show="modalVisible" @click="maskClickHandler"></div>
    </transition>
    <div :class="wrapClasses" @click="wrapClickHandler">
      <transition :name="transitionName">
        <div v-show="modalVisible" :class="comModalClasses">
          <div :class="`${prefixCls}-content`">
            <div v-if="closable" :class="`${prefixCls}-close`" @click="closeHandler">
              <slot name="close">
                <Icon type="ios-close-empty"></Icon>
              </slot>
            </div>
            <div v-if="showHeader" :class="`${prefixCls}-header`">
              <slot name="header">
                <div :class="`${prefixCls}-title`">{{title}}</div>
              </slot>
            </div>
            <div :class="`${prefixCls}-body`" :style="bodyStyle">
              <slot></slot>
            </div>
            <div v-if="showFooter" :class="`${prefixCls}-footer`">
              <div :class="buttonGroupClasses">
                <slot name="footer">
                  <a v-if="confirmModal" href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="cancelHandler">{{cancelText}}</a>
                  <a href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="okHandler">{{okText}}</a>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div v-else v-transfer-dom>
    <transition :name="maskTransitionName">
      <div v-if="mask" :class="`${prefixCls}-mask`" :style="maskStyle" v-show="modalVisible" @click="maskClickHandler"></div>
    </transition>
    <div :class="wrapClasses" @click="wrapClickHandler">
      <transition :name="transitionName">
        <div v-show="modalVisible" :class="comModalClasses">
          <div :class="`${prefixCls}-content`">
            <div v-if="closable" :class="`${prefixCls}-close`" @click="closeHandler">
              <slot name="close">
                <Icon type="ios-close-empty"></Icon>
              </slot>
            </div>
            <div v-if="showHeader" :class="`${prefixCls}-header`">
              <slot name="header">
                <div :class="`${prefixCls}-title`">{{title}}</div>
              </slot>
            </div>
            <div :class="`${prefixCls}-body`" :style="bodyStyle">
              <slot></slot>
            </div>
            <div v-if="showFooter" :class="`${prefixCls}-footer`">
              <div :class="buttonGroupClasses">
                <slot name="footer">
                  <a v-if="confirmModal" href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="cancelHandler">{{cancelText}}</a>
                  <a href="javascript:;" :class="`${prefixCls}-button`" role="button" @click="okHandler">{{okText}}</a>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Button from '../../components/button'
import Icon from '../../components/icon'
import TransferDom from '../../directives/transfer-dom'
import { companyPrefix } from '../../config/style.js'
import { isPromise } from '../../utils/object.js'

const prefixCls = `${companyPrefix}-modal`

export default {
  components: {
    Icon,
    'r-button': Button
  },
  directives: { TransferDom },
  props: {
    appendBody: {
      type: Boolean,
      default: false
    },
    // 弹层classname
    modalClassName: Array,
    // 模式窗体样式
    modalStyle: Object,
    // wrap样式
    wrapStyle: Object,
    // body样式
    bodyStyle: Object,
    // mask样式
    maskStyle: Object,
    // 显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 显示尾部
    showFooter: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 是否启用mask
    mask: {
      type: Boolean,
      default: true
    },
    // mask是否可点击
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    // modal过渡动画名称
    transitionName: {
      type: String,
      default: `${companyPrefix}-animation-zoom`
    },
    // mask过渡动画名称
    maskTransitionName: {
      type: String,
      default: `${companyPrefix}-animation-fade`
    },
    // 键盘事件
    keyboard: {
      type: Boolean,
      default: true
    },
    // 关闭回调
    onCancel: {
      type: Function
    },
    // 关闭回调
    onClose: {
      type: Function
    },
    loading: {
      type: Boolean,
      default: false
    },
    // modal title
    title: {
      type: String
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmModal: {
      type: Boolean,
      default: true
    },
    // 是否在reject中抛出异常,抛出即会关闭窗体
    throwRjectError: {
      type: Boolean,
      default: true
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    modalClasses: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      modalVisible: this.visible,
      wrapShow: false,
      buttonLoading: false
    }
  },
  methods: {
    maskClickHandler(e) {
      if (this.maskClosable) {
        this.close()
      }
    },
    wrapClickHandler(e) {
      // wrap实际在mask之上,先触发这个
      // 防止modal-content内容点击冒泡到上面去
      const className = event.target.className
      if ((typeof className === 'string') && className && className.indexOf(`${this.prefixCls}-wrap`) !== -1) {
        this.maskClickHandler()
      }
    },
    closeHandler(e) {
      this.close()
    },
    cancelHandler() {
      this.close()
    },
    close() {
      // 正在loading的不允许关闭
      if (this.loading) { return false }
      if (this.onCancel) {
        let result = this.onCancel()
        if (result === true) {
          this.modalVisible = false
          this.$emit('input', false)
          this.$emit('update:visible', false)
          this.$emit('on-cancel')
        } else {
          return false
        }
      } else {
        this.modalVisible = false
        this.$emit('input', false)
        this.$emit('update:visible', false)
        this.$emit('update:loading', false)
        this.$emit('on-cancel')
      }
    },
    okHandler() {
      // loading时不继续向下
      if (this.loading) {
        return false
      } else {
        // 先触发loading 的sync
        this.$emit('update:loading', true)
        // 有回调时
        if (this.onClose) {
          // 先执行获取返回对象
          let result = this.onClose()
          // 是boolean类型 true的
          if (result === true) {
            this.modalVisible = false
            this.$emit('input', false)
            this.$emit('update:visible', false)
            this.$emit('on-ok')
          } else if (isPromise(result)) {
            // 是promise类型的注册一个 resove 和 reject处理器
            result.then((res) => {
              this.modalVisible = false
              this.$emit('input', false)
              this.$emit('update:loading', false)
              this.$emit('update:visible', false)
              this.$emit('on-ok')
            }, (err) => {
              // reject处理后不会走catch
              this.modalVisible = false
              this.$emit('input', false)
              this.$emit('update:loading', false)
              this.$emit('on-cancel')
              // 默认会抛异常关闭窗体
              if (this.throwRjectError) {
                throw err
              }
            }).catch((err) => {
              this.modalVisible = false
              this.$emit('input', false)
              this.$emit('update:loading', false)
              this.$emit('update:visible', false)
              this.$emit('on-cancel')
              console.log(err.toString())
            })
          }
        } else {
          // 没有回调的触发关闭事件
          this.modalVisible = false
          this.$emit('input', false)
          this.$emit('update:visible', false)
          this.$emit('on-ok')
        }
      }
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${this.prefixCls}-wrap`,
        { [`${this.prefixCls}-hidden`]: !this.wrapShow }
      ]
    },
    comModalClasses(){
      let classObj = {}
      classObj[`${this.prefixCls}`] = true
      classObj[`${this.prefixCls}-transparent`] = true
      return Object.assign(classObj, this.modalClasses)
    },
    buttonGroupClasses(){
      return {
        [`${this.prefixCls}-button-group-h`]: this.confirmModal,
        [`${this.prefixCls}-button-group-v`]: !this.confirmModal
      }
    }
  },
  watch: {
    visible(val) {
      this.modalVisible = val
    },
    modalVisible(val) {
      if (val === false) {
        this.buttonLoading = false
        this.timer = setTimeout(() => {
          this.wrapShow = false
        }, 300)
      } else {
        this.timer && clearTimeout(this.timer)
        this.wrapShow = true
      }
    }
  }
}
</script>
