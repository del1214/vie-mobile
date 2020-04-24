<template>
  <div class="infinite-demo">
    <span v-for="item in tabs" :key="item.id" @click="switchTab(item)" :style="{color:item.id===params?'red':''}">{{item.name}}</span>
    <div class="infinite-wrapper">
      <pull-to-refresh :topLoadMethod="topLoad" :bottomLoadMethod="getData" :loadingConfig="{style: 'circles'}">
        <!--
          slot 支持
          <div slot="no-result"></div>
          <div slot="no-more"></div>

          prop:
          topLoadMethod 下拉刷新方法
          bottomLoadMethod 上拉加载方法
          loadingConfig {
            type: 默认 图案--spinner 文字--text 默认 spinner
            style: default 图案风格   default,bubbles,circles,spiral,waveDots
          }

          topConfig 下拉时提示文字默认值
          {
            pullText: '下拉刷新',
            // 下拉释放提示文字
            triggerText: '释放更新',
            // 下拉加载时文字
            loadingText: '加载中...',
            // 成功文字
            doneText: '加载完成',
            // 失败文字
            failText: '加载失败',
            // 加载完毕等待时间
            loadedStayTime: 400,
            // 默认距离和高度一样
            stayDistance: 50,
            // 高度差多少触发
            triggerDistance: 70
          }
          bottomConfig 上拉时提示文字
          {
            pullText: '上拉加载',
            // 上拉释放提示文字
            triggerText: '释放更新',
            // 上拉加载时文字
            loadingText: '加载中...',
            // 成功文字
            doneText: '加载完成',
            // 失败文字
            failText: '加载失败',
            // 没有更多
            'no-moreText': '没有更多',
            // 没有数据
            'no-resultText': '没有数据',
            // 加载完毕等待时间
            loadedStayTime: 400,
            // 默认距离和高度一样
            stayDistance: 50,
            // 高度差多少触发
            triggerDistance: 70
          }

          topLoadMethod  bottomLoadMethod 调用时 参数 callback 为load
          请求结束请 load(state)

          state: done 请求完成还有更多数据 fail 请求失败 no-more 请求完成没有更多 no-result 请求成功没有数据 reset 重新请求
         -->
        <ol>
          <li v-for="(li, index) in list" :key="index">{{li}}</li>
        </ol>
      </pull-to-refresh>

    </div>
  </div>
</template>

<script>
import PullToRefresh from '@/components/pulltorefresh'
export default {
  data() {
    return {
      tabs: [
        { name: 'tab1', id: 0 },
        { name: 'tab2', id: 1 }
      ],
      params: 0,
      offset: 0,
      total: 12,
      list: []
    }
  },
  methods: {
    switchTab(item) {
      this.params = item.id
      this.offset = 0
      this.list = []
      this.pullToLoad('reset')
    },
    getData(load) {
      console.log('loading')
      if (!this.pullToLoad && load) {
        this.pullToLoad = load
      }
      if (this.list.length) {
        this.offset += 6
      }
      setTimeout(() => {
        let str = this.tabs[this.params].name
        for (var i = 1; i < 7; i++) {
          this.list.push(str + '-----------' + (i + this.offset))
        }
        console.log(this.offset)
        if (this.offset === this.total) {
          this.pullToLoad('no-more')
        } else {
          this.pullToLoad('done')
        }
      }, 2000)
    },
    topLoad(load) {
      this.list = []
      this.getData(load)
    }
  },
  components: {
    PullToRefresh
  }
}
</script>
<style scoped>
.infinite-demo {
  text-align: center;
  font-size: 20px;
}
span {
  display: inline-block;
  border: 1px solid #333;
  width: 40vw;
  height: 50px;
  line-height: 50px;
}
.infinite-wrapper {
  height: 60vh;
  overflow-y: auto;
}
li {
  height: 80px;
  line-height: 80px;
  margin-bottom: 20px;
  border: 1px solid #000;
}

li:nth-child(2n) {
  background: orange;
}
</style>
