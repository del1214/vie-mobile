import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Flexbox from '@/pages/Flexbox'
import Picker from '@/pages/Picker'
import Card from '@/pages/Card'
import Modal from '@/pages/Modal'
import Icon from '@/pages/Icon'
import Button from '@/pages/Button'
import Space from '@/pages/Space'
import Tabs from '@/pages/Tabs'
import DatePicker from '@/pages/DatePicker'
import Toast from '@/pages/Toast'
import ActionSheet from '@/pages/ActionSheet'
import ImagePicker from '@/pages/ImagePicker'
import Textarea from '@/pages/Textarea'
import PopupDialog from '@/pages/PopupDialog'
import PullToRefresh from '@/pages/PullToRefresh'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/flexbox',
      name: 'Flexbox',
      component: Flexbox
    },
    {
      path: '/picker',
      name: 'Picker',
      component: Picker
    },
    {
      path: '/datepicker',
      name: '/DatePicker',
      component: DatePicker
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/icon',
      name: 'Icon',
      component: Icon
    },
    {
      path: '/button',
      name: 'Button',
      component: Button
    },
    {
      path: '/space',
      name: 'Space',
      component: Space
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    },
    {
      path: '/toast',
      name: 'Toast',
      component: Toast
    },
    {
      path: '/sheet',
      name: 'ActionSheet',
      component: ActionSheet
    },
    {
      path: '/dialog',
      name: 'PopupDialog',
      component: PopupDialog
    },
    {
      path: '/imagepicker',
      name: 'ImagePicker',
      component: ImagePicker
    },
    {
      path: '/textarea',
      name: 'Textarea',
      component: Textarea
    },
    {
      path: '/pulltorefresh',
      name: 'PullToRefresh',
      component: PullToRefresh
    }
  ]
})
