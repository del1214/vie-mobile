<template>
  <div>
    <WingBlank size="lg">
      <h1>Space</h1>
      <WhiteSpace size="sm"></WhiteSpace>
      <WingBlank>
        <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      </WingBlank>
      <WingBlank size="lg">
        <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      </WingBlank>
      <WhiteSpace size="sm"></WhiteSpace>
      <WingBlank size="md">
        <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      </WingBlank>
      <WhiteSpace size="sm"></WhiteSpace>
      <WingBlank>
        <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      </WingBlank>
      
      <WhiteSpace></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      <WhiteSpace size="xs"></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      <WhiteSpace size="sm"></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      <WhiteSpace size="md"></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      <WhiteSpace size="lg"></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
      <WhiteSpace size="xl"></WhiteSpace>
      <div style="background-color: rgb(235, 235, 239); color: rgb(187, 187, 187); text-align: center; height: 0.6rem; line-height: 0.6rem; width: 100%;">Block</div>
    
    </WingBlank>
  </div>
</template>

<script>
import { WhiteSpace, WingBlank } from '@/components/space/'
export default {
  components: {
    WhiteSpace,
    WingBlank
  }
}
</script>

<style lang="less">
  .block{
    background-color: rgb(235, 235, 239);
    color: rgb(187, 187, 187);
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    width: 100%;
  }

</style>
