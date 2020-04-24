

import { Flexbox, FlexboxItem } from '@/components/flexbox'
import PopupPicker from '@/components/picker'
import Modal from '@/components/modal'
import PopupDatePicker from '@/components/datepicker'
import Toast from '@/components/toast'
import ActionSheet from '@/components/actionsheet'
import TextareaItem from '@/components/textareaitem'
import PopupDialog from '@/components/popupdialog/Popupdialog'
import ImagePicker from '@/components/imagePicker'
import PullToRefresh from '@/components/pulltorefresh'

// const components = [
//   Flexbox,
//   FlexboxItem,
//   Modal,
//   PopupPicker,
//   PopupDatePicker,
//   Toast,
//   ActionSheet,
//   TextareaItem,
//   PopupDialog,
//   ImagePicker
// ]

const install = function(Vue, opts = {}) {
  Vue.component('r-flexbox', Flexbox)
  Vue.component('r-flexbox-item', FlexboxItem)
  Vue.component('r-modal', Modal)
  Vue.component('r-popup-picker', PopupPicker)
  Vue.component('r-popup-date-picker', PopupDatePicker)
  Vue.component('r-textarea-item', TextareaItem)
  Vue.component('r-popup-dialog', PopupDialog)
  Vue.component('r-image-picker', ImagePicker)
  Vue.component('r-pull-to-refresh', PullToRefresh)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Flexbox,
  FlexboxItem,
  Modal,
  PopupPicker,
  PopupDatePicker,
  Toast,
  ActionSheet,
  TextareaItem,
  PopupDialog,
  ImagePicker,
  PullToRefresh
}


export default {
  install,
  Flexbox,
  FlexboxItem,
  Modal,
  PopupPicker,
  PopupDatePicker,
  Toast,
  ActionSheet,
  TextareaItem,
  PopupDialog,
  ImagePicker,
  PullToRefresh
}
