import Vue from 'vue'
import NotificationComponent from './Notification.vue'
import {
  companyPrefix
} from '../../config/style.js'
const Notification = Vue.component('r-notification', NotificationComponent)


let messageInstance
let prefixCls = `${companyPrefix}-toast`

function getMessageInstance(mask) {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance.null
  }

  const properties = {
    prefixCls,
    propStyle: {},
    transitionName: `${companyPrefix}-animation-fade`,
    className: {
      [`${prefixCls}`]: true,
      [`${prefixCls}-mask`]: mask,
      [`${prefixCls}-nomask`]: !mask
    }
  }
  const {
    getContainer,
    ...props
  } = properties || {}
  let div
  if (getContainer) {
    // 从dom中取
    div = getContainer()
  } else {
    // 绝大部分是直接插到body上
    div = document.createElement('div')
    document.body.appendChild(div)
  }
  // 创建一个component实例
  const notification = new Notification({
    propsData: props
  }).$mount()
  div.appendChild(notification.$el)
  return {
    notice(noticeProps) {
      notification.add(noticeProps)
    },
    removeNotice(key) {
      notification.remove(key)
    },
    component: notification,
    destroy() {
      try {
        notification.$destroy()
        document.body.removeChild(div)
      } catch (e) {

      }
    }
  }
}

function notice(content, type, duration = 3, onClose, mask = true) {
  let iconType
  if (/^data:image\/svg\+xml/.test(type)) {
    iconType = type
  } else {
    iconType = ({
      info: '',
      success: require('../../assets/success.svg'),
      fail: require('../../assets/fail.svg'),
      offline: require('../../assets/dislike.svg'),
      loading: require('../../assets/loading.svg')
    })[type]
  }
  let instance = getMessageInstance(mask)
  instance.notice({
    duration,
    propStyle: {},
    content: (iconType) ? `
      <div class="${prefixCls}-text ${prefixCls}-text-icon" role="alert" aria-live="assertive">
        <svg class="${companyPrefix}-icon ${type === 'loading' ? (companyPrefix + '-icon-loading') : ''} ${companyPrefix}-icon-lg" >
          <image xlink:href="${iconType}" width="100%" height="100%"/>
        </svg>
        <div class="${prefixCls}-text-info">${content}</div>
      </div>
    ` : `
      <div class="${prefixCls}-text" role="alert" aria-live="assertive">
        <div>${content}</div>
      </div>
    `,
    onClose: () => {
      if (onClose) {
        onClose()
      }
      instance.destroy()
      instance = null
      messageInstance = null
    }
  })
}


export default {
  SHORT: 3,
  LONG: 8,
  show(content, duration, mask) {
    return notice(content, 'info', duration, () => { }, mask)
  },
  info(content, duration, onClose, mask) {
    return notice(content, 'info', duration, onClose, mask)
  },
  success(content, duration, onClose, mask) {
    return notice(content, 'success', duration, onClose, mask)
  },
  fail(content, duration, onClose, mask) {
    return notice(content, 'fail', duration, onClose, mask)
  },
  offline(content, duration, onClose, mask) {
    return notice(content, 'offline', duration, onClose, mask)
  },
  loading(content, duration, onClose, mask) {
    return notice(content, 'loading', duration, onClose, mask)
  },
  custom(content, type, duration, onClose, mask) {
    return notice(content, type, duration, () => { }, mask)
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  }
}
