<template>
<div>
  <!--svg 图标集合-->
  <div style="display:none;">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <symbol id="svg-arrow" viewBox="0 0 438 750">
        <desc>svg 箭头</desc>
        <path d="M430.696401,395.102744 C431.18292,394.129707 432.034327,393.278299 432.399216,392.305262 C440.913291,374.547334 438.115809,352.653997 423.033733,338.423328 L79.30835,13.307281 C60.577384,-4.450647 31.02138,-3.59924 13.263452,15.131726 C-4.494476,33.862692 -3.643069,63.418696 15.087897,81.176624 L323.540682,372.966148 L16.304193,669.012709 C-2.305143,686.892267 -2.791662,716.448271 15.087897,735.057607 C24.210121,744.544719 36.494715,749.409905 48.65768,749.409905 C60.334126,749.409905 72.010572,745.031238 81.011166,736.273903 L421.574178,407.995485 C422.182326,407.387337 422.425586,406.4143 423.155363,405.806151 C423.641882,405.319632 424.1284,404.954743 424.736548,404.468225 C427.53403,401.670745 428.871956,398.265115 430.696401,395.102744 L430.696401,395.102744 L430.696401,395.102744 Z"></path>
      </symbol>
      <symbol id="svg-add" viewBox="0 0 644 643">
        <desc>svg 加</desc>
        <path d="M611.171,289.589 L354,289.589 L354,32.418 C354,14.745 339.673,0.418 322,0.418 C304.327,0.418 290,14.745 290,32.418 L290,289.589 L32.83,289.589 C15.157,289.589 0.83,303.916 0.83,321.589 C0.83,339.262 15.157,353.589 32.83,353.589 L290,353.589 L290,610.759 C290,628.432 304.327,642.759 322,642.759 C339.673,642.759 354,628.432 354,610.759 L354,353.589 L611.171,353.589 C628.844,353.589 643.171,339.262 643.171,321.589 C643.171,303.916 628.844,289.589 611.171,289.589 L611.171,289.589 Z"></path>
      </symbol>
    </svg>
  </div>
  <div v-if="listType==='picture-card'" :class="`${prefixCls}`">
    <div :class="`${prefixCls}-list`">
      <div :class="`${prefixFlexbox} ${prefixFlexbox}-align-center`">
        <div
          :class="`${prefixFlexbox}-list`"
          v-for="(file, index) in files"
          :key="index">
          <div :class="`${prefixCls}-item`">
            <!-- 可移除 -->
            <div
              v-if="canRemove"
              :class="`${prefixCls}-item-remove`"
              @click="removeImage(file.id, index)" />
            <!-- 有几张图片不可移除 -->
            <div
              v-if="!canRemove && index >= cannotRemoveLen"
              :class="`${prefixCls}-item-remove`"
              @click="removeImage(file.id, index)" />
            <div
              :class="`${prefixCls}-item-content`"
              :style="{backgroundImage: 'url('+file.url+')', transform: 'rotate('+file.rotation+'deg)'}" />
          </div>
        </div>
        <div
          :class="`${prefixFlexbox}-list`"
          v-show="files.length < max">
          <div
            :class="`${prefixCls}-item ${prefixCls}-upload-btn`"
            @click="addImage">
            <input
              type="file"
              accept="image/*"
              :capture="capture"
              :multiple="multiple"
              readonly
              ref="fileSelectorInput"
              @change="onFileChange">
            <div class="image-picker-tips-text">
              <div class="image-picker-tips-icon">
                <svg class="svg-add">
                  <use xlink:href="#svg-add" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="listType==='id-card'" :class="`${prefixIdCls}`">
    <div :class="`${prefixCls}-list`">
      <div :class="`${prefixFlexbox} ${prefixFlexbox}-align-center`">
        <div
          :class="`${prefixFlexbox}-list`"
          v-for="(file, index) in files"
          :key="index">
          <div :class="`${prefixCls}-item`">
            <div
              :class="`${prefixCls}-item-remove`"
              @click="removeImage(file.id, index)" />
            <div
              :class="`${prefixCls}-item-content`"
              :style="{backgroundImage: 'url('+file.url+')', transform: 'rotate('+file.rotation+'deg)'}" />
          </div>
        </div>
        <div
          :class="`${prefixFlexbox}-list`"
          v-show="files.length < max">
          <div
            :class="`${prefixCls}-item ${prefixCls}-upload-btn`"
            @click="addImage">
            <input
              type="file"
              accept="image/*"
              :capture="capture"
              :multiple="multiple"
              readonly
              ref="fileSelectorInput"
              @change="onFileChange">
            <div class="image-picker-tips-text">
              <div class="image-picker-tips-icon">
                <svg class="svg-add">
                  <use xlink:href="#svg-add" />
                </svg>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="listType==='photo-card'" :class="`${prefixPhotoCls}`">
    <div class="author-avatar">
      <div
        class="upload-list"
        v-for="(file, index) in files"
        :key="index">
        <div
          class="upload-item-content"
          :style="{backgroundImage: 'url('+file.url+')', transform: 'rotate('+file.rotation+'deg)'}" />
      </div>
      <img v-if="files.length === 0" src="static/images/m/avatar.jpg" alt="avatar">
    </div>
    <input ref="fileSelectorInput" type="file" accept="image/*" :capture="capture" @change="onPhotoChange" class="upload-input">
  </div>
  <VueCropper v-if="visible" ref="cropper" :img="img"
    :autoCrop="autoCrop" :autoCropWidth="autoCropWidth" :autoCropHeight="autoCropHeight"
    :fixed="fixed" :fixedNumber="fixedNumber" :canMoveBox="canMoveBox" :fixedBox="fixedBox">
  </VueCropper>
</div>
</template>

<script>
import VueCropper from 'vue-cropper'
import lrz from 'lrz/dist/lrz.all.bundle.js'
import { companyPrefix } from '@/config/style.js'
const prefixCls = `${companyPrefix}-image-picker`
const prefixIdCls = `${companyPrefix}-id-picker`
const prefixPhotoCls = `${companyPrefix}-photo-picker`
const prefixFlexbox = `${companyPrefix}-flexbox`
const prefixCropperCls = `${companyPrefix}-cropper-picker`
let prefixClsToast = `${companyPrefix}-toast`
export default {
  props: {
    prefixCls: {
      type: String,
      default: prefixCls
    },
    prefixFlexbox: {
      type: String,
      default: prefixFlexbox
    },
    prefixIdCls: {
      type: String,
      default: prefixIdCls
    },
    prefixPhotoCls: {
      type: String,
      default: prefixPhotoCls
    },
    prefixCropperCls: {
      type: String,
      default: prefixCropperCls
    },
    prefixClsToast: {
      type: String,
      default: prefixClsToast
    },

    listType: {
      type: String,
      default: 'picture-card'
    },
    max: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      required: true,
      default: []
    },
    canRemove: {
      type: Boolean,
      default: true
    },
    cannotRemoveLen: {
      type: Number,
      default: 0
    },

    canCrop: {
      type: Boolean,
      default: false
    },
    autoCrop: {
      type: Boolean,
      default: true
    },
    autoCropWidth: {
      type: Number
    },
    autoCropHeight: {
      type: Number
    },
    fixed: {
      type: Boolean,
      default: true
    },
    fixedNumber: {
      type: Array
    },
    canMoveBox: {
      type: Boolean,
      default: false
    },
    fixedBox: {
      type: Boolean,
      default: false
    },

    capture: {
      type: String
    }
  },
  data () {
    return {
      unmaxFlag: true,
      visible: false,
      img: null,
      cropperBtn: null,
      confirmBtn: null,
      cancelBtn: null
    }
  },
  components: {
    VueCropper
  },
  watch: {
    visible (val) {
      if (!val) {
        document.body.removeChild(this.cropperBtn)
      }
    }
  },
  methods: {
    onFileChange (e) {
      let fileSelectorList = e.target.files
      // 判断Android或IOS系统
      let ua = navigator.userAgent.toLowerCase()
      this.$emit('start-loading')
      for(var i = 0; i < fileSelectorList.length; i++) {
        if (ua.indexOf('like mac os x') > 0 && this.get_ios_version() <= 8) {
          // 如果IOS版本低于8
          this.canCrop = false
        }
        lrz(fileSelectorList[i]).then((rst) => {
          this.createCropper(e, rst)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    addImage() {
      if (this.files.length >= this.max) {
        // unmaxFlag用来限制超出最大值多张时只允许提示一次
        if (this.unmaxFlag) {
          this.$emit('exceed-max', this.max)
        }
        this.unmaxFlag = false
        return false
      }else {
        return true
      }
    },
    // 删除图片
    removeImage (id, index) {
      this.$emit('remove-img', index)
      this.unmaxFlag = true
    },

    onPhotoChange (e) {
      if (e.target.files.length > 0) {
        // 判断Android或IOS系统
        let ua = navigator.userAgent.toLowerCase()
        this.$emit('start-loading')
        if (ua.indexOf('like mac os x') > 0 && this.get_ios_version() <= 8) {
          // 如果IOS版本低于8
          this.canCrop = false
        }
        lrz(e.target.files[0]).then((rst) => {
          this.createCropper(e, rst)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    // 判断IOS版本
    get_ios_version (){
      let ua = navigator.userAgent.toLowerCase()
      var version = null
      var reg = /os [\d._]+/gi
      var vInfo = ua.match(reg)
      version = (vInfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.') // 得到版本号9.3.2或者9.0
      version = parseInt(version.split('.')[0]) // 得到版本号第一位
      return version
    },
    // 生成裁剪画布和按钮
    createCropper (e, rst) {
      this.$emit('end-loading')
      // 判断是否可裁剪
      if (this.canCrop) {
        this.img = rst.base64
        this.visible = true
        // 添加按钮
        this.cropperBtn = document.createElement('div')
        this.cancelBtn = document.createElement('button')
        this.confirmBtn = document.createElement('button')
        this.cancelBtn.innerHTML = '取消'
        this.confirmBtn.innerHTML = '确定'
        this.cropperBtn.className = `${prefixCropperCls}`
        this.cancelBtn.addEventListener('click', this.cancelCropper, false)
        this.confirmBtn.addEventListener('click', this.confirmCropper, false)
        document.body.append(this.cropperBtn)
        this.cropperBtn.append(this.cancelBtn)
        this.cropperBtn.append(this.confirmBtn)
      } else {
        // 展示处理好的图片
        this.$emit('add-img', rst, () => {
          e.target.value = ''
        })
      }
    },
    // 确定裁剪
    confirmCropper () {
      this.$refs.cropper.getCropBlob((data) => {
        this.visible = false
        this.$emit('add-img', data, () => {
          this.$refs.fileSelectorInput.value = ''
        })
      })
    },
    // 取消裁剪
    cancelCropper () {
      this.visible = false
    }
  },
  beforeDestroy () {
    if (this.cropperBtn && this.visible) {
      this.cancelBtn.removeEventListener('click', this.cancelCropper, false)
      this.confirmBtn.removeEventListener('click', this.confirmCropper, false)
      document.body.removeChild(this.cropperBtn)
    }
  }
}
</script>
