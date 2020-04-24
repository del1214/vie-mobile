<template>
  <div>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">PopupDialog Normal</div>
        <r-button @click="visible = true">点我</r-button>
        <PopupDialog v-model="visible"
          :contentClass="contentClass"
          :contentStyle="contentStyle"
          :footerClass="footerClass"
          :wrapStyle="wrapStyle"
          ></PopupDialog>
        <!-- <h4>{{getSelectedStr}}</h4> -->
      </Card>
    </WingBlank>
    <WhiteSpace>
    </WhiteSpace>
  </div>
</template>



<script>
// import { Picker, MultiPicker, Cascader, PopupPicker } from '@/components/picker/'
// import Modal from '@/components/modal/'
import Button from '@/components/button/'
import { Card } from '@/components/card/'
import { WhiteSpace, WingBlank } from '@/components/space/'
import PopupDialog from '@/components/popupdialog/PopupDialog'
export default {
  components: {
    Card,
    WhiteSpace,
    WingBlank,
    'r-button': Button,
    PopupDialog
  },
  data() {
    return {
      visible: false,
      contentClass: {
        'lw_is_beautiful': true
      },
      footerClass: {
        'lw_is_beautiful': true
      },
      contentStyle: {
        height: '900px'
      },
      // footerStyle: {
      //   height: '87px',
      //   background: 'blue'
      // },
      wrapStyle: {
        background: 'gray'
      }
    }
  },
  created() {},
  methods: {
  },
  computed: {}
}
</script>

