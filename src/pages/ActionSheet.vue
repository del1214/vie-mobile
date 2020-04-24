<template>
  <div>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">ActionSheet Normal</div>
        <r-button @click="actionSheetHandler(true, true)">点我</r-button>
        <r-button @click="actionSheetHandler(false, false)">都没有</r-button>
        <r-button @click="actionSheetHandler(false, true)">没有message</r-button>
        <r-button @click="actionSheetHandler(true, false)">没有Title</r-button>
        <!-- <h4>{{getSelectedStr}}</h4> -->
      </Card>
    </WingBlank>

    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          ActionSheet Share
        </div>
        <r-button @click="actionSheetShareHandler">点我</r-button>
        <!-- <Picker :disabled="disabled" :items="items0" :selectedValue="value"></Picker> -->
      </Card>
    </WingBlank>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          ActionSheet MultiLineShare
        </div>
        <r-button @click="actionSheetMultiLineShareHandler">点我</r-button>
        <!-- <Picker :disabled="disabled" :items="items0" :selectedValue="value"></Picker> -->
      </Card>
    </WingBlank>
    <WhiteSpace>
    </WhiteSpace>
    <WhiteSpace>
    </WhiteSpace>
  </div>
</template>



<script>
// import { Picker, MultiPicker, Cascader, PopupPicker } from '@/components/picker/'
import Modal from '@/components/modal/'
import Button from '@/components/button/'
import { Card } from '@/components/card/'
import { WhiteSpace, WingBlank } from '@/components/space/'
import ActionSheet from '@/components/actionsheet/'
export default {
  components: {
    Card,
    WhiteSpace,
    WingBlank,
    'r-button': Button
  },
  data() {
    return {
      visible: false,
      options: ['aaa', 'bbb', 'ccc']
    }
  },
  created() {},
  methods: {
    actionSheetHandler(message = false, title = false) {
      let options = ['aaa', 'bbb', 'ccc', '取消']
      ActionSheet.showActionSheet(
        {
          message: message ? '你没事吗,你没事干嘛message' : null,
          title: title ? '你没事吗,你没事干嘛title' : null,
          cancelButtonIndex: 3,
          destructiveButtonIndex: 2,
          options: options
        },
        index => {
          Modal.alert({ body: '您点击了' + options[index] })
        }
      )
    },
    actionSheetHandlerNoTitleMessage() {
      let options = ['aaa', 'bbb', 'ccc', '取消']
      ActionSheet.showActionSheet(
        {
          // message: '你没事吗,你没事干嘛message',
          // title: '你没事吗,你没事干嘛title',
          cancelButtonIndex: 3,
          destructiveButtonIndex: 2,
          options: options
        },
        index => {
          Modal.alert({ body: '您点击了' + options[index] })
        }
      )
    },
    actionSheetShareHandler() {
      let options = [
        {
          url:
            'https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png',
          title: '发送给朋友'
        },
        {
          url:
            'https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png',
          title: '新浪微博'
        },
        {
          url:
            'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png',
          title: '生活圈'
        },
        {
          url:
            'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png',
          title: '微信好友'
        },
        {
          url:
            'https://gw.alipayobjects.com/zos/rmsportal/SxpunpETIwdxNjcJamwB.png',
          title: 'QQ'
        }
      ]
      ActionSheet.showShareActionSheet(
        {
          message: '你没事吗,你没事干嘛message',
          title: '你没事吗,你没事干嘛title',
          options: options
        },
        index => {
          Modal.alert({ body: '您点击了' + options[index] })
        }
      )
    },
    actionSheetMultiLineShareHandler() {
      let options = [
        [
          {
            url:
              'https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png',
            title: '发送给朋友'
          },
          {
            url:
              'https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png',
            title: '新浪微博'
          }
        ],
        [
          {
            url:
              'https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png',
            title: '发送给朋友'
          },
          {
            url:
              'https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png',
            title: '新浪微博'
          }
        ]
      ]
      ActionSheet.showShareActionSheet(
        {
          message: '你没事吗,你没事干嘛message',
          title: '你没事吗,你没事干嘛title',
          options: options
        },
        index => {
          Modal.alert({ body: '您点击了' + options[index] })
        }
      )
    }
  },
  computed: {}
}
</script>

