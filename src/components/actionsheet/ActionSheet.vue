<template>
<Modal :appendBody="true" :prefixCls="prefixCls" :modalClasses="containerClass" :visible.sync="popVisible" :closable="false" :showHeader="false" :showFooter="false" :transitionName="transitionName" :maskTransitionName="maskTransitionName">
  <div>
    <h3 v-if="title" :class="`${prefixCls}-title`">{{title}}</h3>
    <div v-if="message" :class="`${prefixCls}-message`">{{message}}</div>
    <template v-if="mode==='NORMAL'">
    <div :class="`${prefixCls}-button-list`" role="group">
      <template v-for="(item, $index) in options">
        <!-- cancel -->
        <div v-if="cancelButtonIndex === $index" :key="item"
          @click="itemClickHandler($index)"
          :class="`${prefixCls}-button-list-item ${prefixCls}-cancel-button`" role="button">
          {{item}}
          <span v-if="cancelButtonIndex === $index" :class="`${prefixCls}-cancel-button-mask`"></span>
        </div>
        <!-- destruct -->
        <div v-else-if="destructiveButtonIndex === $index" :key="item"
          @click="itemClickHandler($index)"
          :class="`${prefixCls}-button-list-item ${prefixCls}-destructive-button`" role="button">
          {{item}}
        </div>
        <div v-else :key="item"
          @click="itemClickHandler($index)"
          :class="`${prefixCls}-button-list-item`" role="button">
          {{item}}
        </div>
      </template>
    </div>
    </template>
    <template v-if="mode==='SHARE'">
      <div :class="`${prefixCls}-share`">
        <template v-if="multipleLine">
          <div v-for="(item,$index) in options" :key="'shareMulti' + $index" :class="`${prefixCls}-share-list`">
            <div v-for="(_sub, _$index) in item" :key="'shareMultiSub' + _$index" @click="itemClickHandler(_$index, $index)" :class="`${prefixCls}-share-list-item`" role="button">
              <div :class="`${prefixCls}-share-list-item-icon`" ><img :src="_sub.url" :alt="_sub.title" style="width:36px;"></div>
              <div :class="`${prefixCls}-share-list-item-title`">{{_sub.title}}</div>
            </div>
          </div>
        </template>
        <div v-else :class="`${prefixCls}-share-list`">
          <div v-for="(item, $index) in options" :key="'shareSingleSub' + $index" @click="itemClickHandler($index, 0)" :class="`${prefixCls}-share-list-item`" role="button">
            <div :class="`${prefixCls}-share-list-item-icon`"><img :src="item.url" :alt="item.title" style="width:36px;"></div>
            <div :class="`${prefixCls}-share-list-item-title`">{{item.title}}</div>
          </div>
        </div>
        <div @click="itemClickHandler(-1)"
          :class="`${prefixCls}-share-cancel-button`" role="button">
          {{cancelText}}
        </div>
      </div>
    </template>
  </div>
</Modal>
</template>

<script>
import { Modal } from '@/components/modal'
import { companyPrefix } from '@/config/style.js'
const prefixCls = `${companyPrefix}-action-sheet`
export default {
  components: {
    Modal
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String
    },
    message: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    prefixCls: {
      type: String,
      default: prefixCls
    },
    destructiveButtonIndex: {
      type: Number,
      default: -1
    },
    cancelButtonIndex: {
      type: Number,
      default: -1
    },
    onOk: {
      type: Function,
      required: true
    },
    onDismiss: Function,
    // modal过渡动画名称
    transitionName: {
      type: String,
      default: `${companyPrefix}-animation-slide`
    },
    // mask过渡动画名称
    maskTransitionName: {
      type: String,
      default: `${companyPrefix}-animation-fade`
    }
  },
  data() {
    return {
      actionSheetShow: false,
      popVisible: false
    }
  },
  mounted(){
    console.log(this)
    // 载入dom后显示自己
    this.$nextTick(() => {
      this.popVisible = true
    })
  },
  methods: {
    itemClickHandler(index) {
      this.onOk(index)
    },
    close(){
      this.popVisible = false
      setTimeout(() => {
        try{
          this.$el.parentNode.removeChild(this.$el)
          this.$destroy()
        }catch(e){

        }
      }, 300)
    }
  },
  computed: {
    multipleLine(){
      if(this.mode === 'SHARE'){
        return this.options.length && Array.isArray(this.options[0])
      }else {
        return false
      }
    },
    containerClass(){
      let classObj = {}
      classObj[`${prefixCls}-share`] = this.mode === 'SHARE'
      // classObj[prefixCls] = true
      return classObj
    }
  }
}
</script>
