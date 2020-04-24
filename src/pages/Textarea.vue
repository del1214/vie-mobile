<template>
  <div>
    <textarea-item :autoHeight=true :focus=false :disabled=false :rows="1"  label="多行文本框" labelNumber=3 :clear=true v-model="textareaValue" @change="change"></textarea-item>
    <!-- <textarea-item autoHeight=true  :rows="1" maxLength=100 placeholder="请输入文本内容"  label="多行文本框" labelNumber=5 v-model="textareaValue2" @change="change" clear=true></textarea-item> -->
    <textarea-item :autoHeight=true  :rows="2" :maxLength=200  v-model="textareaValue2" @change="change" :clear=true></textarea-item>
  </div>
</template>


<script>
import Textareaitem from '@/components/textareaitem'
export default {
  components: {
    'textarea-item': Textareaitem
  },
  data() {
    return {
      textareaValue: '多行文本框输入内容',
      textareaValue2: ''
    }
  },
  methods: {
    change(event) {
      console.log(event)
    }
  }
}
</script>
