<template>
  <div :class="wrapClasses" :style="propStyle">
    <transition :name="transitionName">
      <Notice v-for="notice in notices" :duration="notice.duration" :closable="notice.closable" :key="notice.key" :prefixCls="prefixCls" :content="notice.content" :onClose="notice.onClose">
      </Notice>
    </transition>
  </div>
</template>
<script>
import Notice from './Notice'
import { companyPrefix } from '../../config/style.js'
const prefixCls = `${companyPrefix}-notice`

let seed = 0
const now = Date.now()

function getUuid() {
  return `vie-mobile_${now}_${seed++}`
}

export default {
  components: {
    Notice
  },
  props: {
    transitionName: {
      type: String,
      default: `${companyPrefix}-animation-fade`
    },
    className: {
      type: Object
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    propStyle: {
      type: Object,
      default() {
        return {
          top: 65,
          left: '50%'
        }
      }
    }
  },
  data() {
    return {
      notices: []
    }
  },
  methods: {
    add(notice = {}) {
      const props = Object.assign(
        {},
        {
          onClose: null,
          duration: null,
          closable: null,
          className: null,
          prefixCls: null,
          propStyle: null
        },
        notice
      )
      const key = (props.key = props.key || getUuid())
      if (!this.notices.filter((v) => v.key === key).length) {
        this.notices.push(props)
      }
    },
    remove(key) {
      this.notices = this.notices.filter((notice) => notice.key !== key)
    }
  },
  computed: {
    wrapClasses() {
      return this.className ? this.className : {}
    }
  }
}
</script>
