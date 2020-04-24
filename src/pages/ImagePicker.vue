<template>
  <div>
    <button @click="getAllUploadedFiles">获取所有图片</button>
    <!--
      * files 图片文件数组，元素为对象，包含属性 id、url（必选， 可能业务需要的其它属性），必选
      * max 最多允许上传的图片数量 默认：1，非必选
      * multiple: 是否多选 默认：false，类型：Boolean，非必选
      * list-type  默认：picture-card(普通图片上传)，类型：String。
        其他值：
          * id-card(身份证图片上传)，类型：String：
            max要么不写，要么写1，绝对不能大于1；
            且应只能单选，所以multiple尽量不写，如不慎写了，一定要加上exceed-max事件进行提示。
            下面的span标签中是相应的提示文字
          * photo-card(用户头像上传)，类型：String
      * 若添加multiple设为true，可以添加自定义事件exceed-max，拿到max进行‘提示’等操作；反之，不必添加，非必选
      * 自定义事件add-img，主要用于接收每张图片的formData作为参数与后台交互，必选
      * 自定义事件remove-img，主要用于接受要删除的图片id作为参数与后台交互，必选
      -->
    <!--
      * 关于普通图片上传是否可移除：
      * canRemove 是否可以移除，默认可移除true
      * cannotRemoveLen 不可移除的图片数量，默认为0，若canRemove设为false，该项通常取回显的files的length
      * 因此:canRemove="false"和:cannotRemoveLen="fileLength"必须同时存在
     -->
    <!--
      * 裁剪：
      * canCrop 是否可裁剪，默认false
      * autoCrop 是否默认生成截图框，默认true
      * autoCropWidth 默认生成截图框宽度，默认200
      * autoCropHeight 默认生成截图框高度	，默认200
      * fixed 是否开启截图框宽高固定比例，默认true
      * fixedNumber 截图框的宽高比例，默认[1,1]
      * canMoveBox 截图框能否拖动，默认false
      * fixedBox 固定截图框大小 不允许改变， 默认false
      ***特别说明：如果普通图片上传想裁剪图片，必须单张上传，即canCrop与multiple不能同时为true，否则会报错
     -->
     <!--
      * 安卓机上准备裁剪画布前会有时间空白，需要添加loading：
      * 添加自定义事件onStartLoading和onEndLoading
      * PS:只有当canCrop设为true的时候才需要添加
      -->
    <!--
      * 拍照or从文件夹选择：
      * capture 如果不设置该属性，默认可以拍照，也可以从文件夹选择；当设置为"camera"时，只允许拍照
      *** PS: 如果需要从文件夹选择，一定不要设置capture属性 ***
     -->

    <h2>普通图片上传</h2>
    <image-picker
      :files="files"
      :max="maxNum"
      :multiple="true"
      :canCrop="fileCanCrop"
      :canRemove="false"
      :cannotRemoveLen="fileLength"
      @exceed-max="onExceedMax"
      @add-img="onAddImage"
      @remove-img="onRemoveImage"
      @start-loading="onStartLoading"
      @end-loading="onEndLoading" />

    <h2>身份证图片上传</h2>
    <image-picker
      :canCrop="fileCanCrop1"
      :fixedNumber="[214, 135]"
      list-type="id-card"
      :files="files1"
      capture="camera"
      @add-img="onAddImage1"
      @remove-img="onRemoveImage1">
        <span>上传身份证个人信息面</span>
      </image-picker>

    <h2>头像上传</h2>
    <div style="position:relative;">
      <image-picker
        :canCrop="photoCanCrop"
        list-type="photo-card"
        :files="files2"
        @add-img="onAddImage2"
        @start-loading="onStartLoading"
        @end-loading="onEndLoading" />
    </div>
  </div>
</template>

<script>
import Modal from '@/components/modal/'
import Toast from '@/components/toast/'
import ImagePicker from '@/components/imagepicker/ImagePicker'
export default {
  components: {
    ImagePicker
  },
  data () {
    return {
      maxNum: 5,
      fileLength: 0,
      files: [],
      files1: [],
      files2: [],
      fileCanCrop: false,
      fileCanCrop1: true,
      photoCanCrop: true,
      resFn: null
    }
  },
  mounted () {
    this.getFiles()
    this.getFiles1()
    this.getFiles2()
  },
  methods: {
    // 获取图片文件
    getFiles () {
      // 调取后台接口，获取图片文件
      this.files = [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121'
        }
      ]
      this.fileLength = this.files.length
    },
    onAddImage (rst, fnCallback) {
      console.log(rst)
      let formData = new FormData()
      if (this.fileCanCrop) {
        alert('看不见图片，但可以拿到blobData')
        formData.append('file', rst, 'image.png')
      } else {
        formData.append('file', rst.file)
      }
      formData.append('type', 'MEMBER_HEAD')
      // 把目标图片的地址传给后台，后台返回新的图片数组并更新this.files
      // axios.post('', formData, {
        // method: 'post',
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // })
      // .then(res => {
      //   if (res.data.code === 1) {
      // 多选时即设置multiple="true"时，由于涉及到异步，需要另作判断
      if (this.files.length < this.maxNum) {
        this.files.push({    // 先用push方法代替
          url: rst.base64,
          id: 1212
        })
      } else {
        this.onExceedMax(this.maxNum)
      }
      // 回调，清空file的value，从而触发input框的onchange事件
      fnCallback()
      //   }
      // })
    },
    onRemoveImage (index) {
      // 把id传给后台，返回新的图片数组并更新this.files
      this.files.splice(index, 1)    // 先用splice方法代替
    },
    // 多选时超出最大值需要进行提示
    onExceedMax (max) {
      Modal.alert({body: '最多只能上传' + max + '张图片'})
    },
    // 获取所有已上传的文件
    getAllUploadedFiles () {
      console.log(this.files)
    },

    // 获取图片文件
    getFiles1 () {
      // 调取后台接口，获取图片文件
    },
    onAddImage1 (rst, fnCallback) {
      console.log(rst)
      let formData = new FormData()
      if (this.fileCanCrop1) {
        alert('看不见图片，但可以拿到blobData')
        formData.append('file', rst, 'image.png')
      } else {
        formData.append('file', rst.file)
      }
      formData.append('type', 'MEMBER_HEAD')
      // 把目标图片的地址传给后台，后台返回新的图片数组并更新this.files
      // axios.post('', formData, {
        // method: 'post',
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // })
      // .then(res => {
      //   if (res.data.code === 1) {
      this.files1 = []
      this.files1.push({    // 先用push方法代替
        url: rst.base64,
        id: 1212
      })
      // 回调，清空file的value，从而触发input框的onchange事件
      fnCallback()
      //   }
      // })
    },
    onRemoveImage1 (index) {
      // 把id传给后台，返回新的图片数组并更新this.files
      this.files1.splice(index, 1)    // 先用splice方法代替
    },

    // 获取图片文件
    getFiles2 () {
      // 调取后台接口，获取图片文件
    },
    onAddImage2 (rst, fnCallback) {
      console.log(rst)
      let formData = new FormData()
      if (this.photoCanCrop) {
        alert('看不见图片，但可以拿到blobData')
        formData.append('file', rst, 'image.png')
      } else {
        formData.append('file', rst.file)
      }
      formData.append('type', 'MEMBER_HEAD')
      // 把目标图片的地址传给后台，后台返回新的图片数组并更新this.files
      // axios.post('', formData, {
        // method: 'post',
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // })
      // .then(res => {
      //   if (res.data.code === 1) {
      this.files2 = []
      this.files2.push({    // 先用push方法代替
        url: rst.base64,
        id: 1212
      })
      // 回调，清空file的value，从而触发input框的onchange事件
      fnCallback()
      //   }
      // })
    },

    // 为安卓机计算图片数据到上传前的空白时间添加loading
    onStartLoading () {
      let promise = new Promise((resolve, reject) => {
        this.resFn = resolve
      })
      Toast.loading('正在准备图片...', promise)
    },
    onEndLoading () {
      this.resFn()
    }
  }
}
</script>
