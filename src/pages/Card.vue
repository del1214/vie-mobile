<template>
  <div>
  <WhiteSpace></WhiteSpace>
  <WingBlank>
    <h1>Card</h1>
    <Card border>
      <!--头部-->
      <p slot="headerTitle">
        <Icon type="person-stalker"></Icon> 
        人员列表
      </p>
      <span slot="headerExtra" style="color: #2d8cf0;">
        <Icon type="ios-loop-strong"></Icon>换一换
      </span>
      <!--内容区-->
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <!--底部-->
      <div slot="footerContent">
        总计 <strong>3</strong> 人
      </div>
      <div slot="footerExtra">
        2017-6-21
      </div>
    </Card>
  </WingBlank>
  <WhiteSpace></WhiteSpace>
  <WingBlank>
    <h1>Card无底部</h1>
    <Card border>
      <!--头部-->
      <p slot="headerTitle">
        <Icon type="person-stalker"></Icon> 
        人员列表
      </p>
      <span slot="headerExtra" style="color: #2d8cf0;">
        <Icon type="ios-loop-strong"></Icon>换一换
      </span>
      <!--内容区-->
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </Card>
  </WingBlank>
  <WhiteSpace></WhiteSpace>
  <WingBlank>
    <h1>Card无头部</h1>
    <Card border>
      <!--内容区-->
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <!--底部-->
      <div slot="footerContent">
        总计 <strong>3</strong> 人
      </div>
      <div slot="footerExtra">
        2017-6-21
      </div>
    </Card>
  </WingBlank>
  <WhiteSpace></WhiteSpace>
  <WingBlank>
    <h1>Card仅内容</h1>
    <Card border>
      <!--内容区-->
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </Card>
  </WingBlank>
  <WhiteSpace></WhiteSpace>
  <!--通栏卡片-->
  <WingBlank>
    <h1>通栏Card</h1>
  </WingBlank>
  <Card border full>
    <div slot="headerTitle">
      <img src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"> 我是title
    </div>
    <span slot="headerExtra">this is extra</span>
    <!--内容区-->
    <div>This is content of `Card`</div>
    <p slot="footerContent">
      footer content
    </p>
    <span slot="footerExtra">
      extra footer content
    </span>
  </Card>
  
        
  </div>
</template>

<script>
import { Card } from '@/components/card/'
import { Icon } from '@/components/icon/'
import { WhiteSpace, WingBlank } from '@/components/space/'
export default {
  components: {
    Card,
    Icon,
    WhiteSpace,
    WingBlank
  },
  data() {
    return {
    }
  }
}
</script>
