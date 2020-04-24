// import Modal from './confirm'
import Vue from 'vue'
import ConfirmComponent from './Confirm.vue'
import Modal from './Modal'
const ConfirmModal = Vue.component('r-confirm', ConfirmComponent)

function createConfirm(props) {
  const _props = Object.assign({}, props)
  let component = new ConfirmModal({ propsData: _props }).$mount()
  document.body.appendChild(component.$el)
  const modal = component.$children[0]
  modal.modalVisible = true
}

// Modal下的静态alert confirm只提供简单的确认取消,如果需要严格控制流程,如提交回调,promise处理,请使用Modal本身处理

Modal.alert = function (_props = {}) {
  return createConfirm(_props)
}

Modal.confirm = function (_props = {}) {
  let props = Object.assign(_props, {
    confirmModal: true
  })
  return createConfirm(props)
}

export default Modal
export {
  Modal
}
