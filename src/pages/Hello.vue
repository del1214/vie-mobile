<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Components</h2>
    <ul>
      <li><router-link to="/picker">Picker</router-link></li>
      <li><router-link to="/datepicker">DatePicker</router-link></li>
      <li><router-link to="/modal">Modal</router-link></li>
      <li><router-link to="/toast">Toast</router-link></li>
      <li><router-link to="/sheet">ActionSheet</router-link></li>
      <li><router-link to="/dialog">PopupDialog</router-link></li>
      <li><router-link to="/card">Card</router-link></li>
      <li><router-link to="/icon">Icon</router-link></li>
      <li><router-link to="/Button">Button</router-link></li>
      <li><router-link to="/Space">Space</router-link></li>
      <li><router-link to="/flexbox">Flexbox</router-link></li>
      <li><router-link to="/imagepicker">ImagePicker</router-link></li>
      <li><router-link to="/textarea">Textareaitem</router-link></li>
      <li><router-link to="/pulltorefresh">PullToRefresh</router-link></li>
      <br>
      <li><a href="https://www.baidu.com" target="_blank">Docs for This UI</a></li>
    </ul>
    <h2>阅读相关文档</h2>
    <ul>
      <li><a href="https://cn.vuejs.org/" target="_blank">vue</a></li>
      <li><a href="https://router.vuejs.org/zh-cn/" target="_blank">vue-router</a></li>
      <li><a href="http://momentjs.com/" target="_blank">moment</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Vie Mobile'
    }
  }
}
</script>

