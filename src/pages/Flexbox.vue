<template>
  <!--
    flexbox布局 —— 基本布局主要由两部分组成
    * 外层控制定义flex的class『vie-flexbox』
      row 水平布局 —— 在class『vie-flexbox』后追加 class『vie-flexbox-dir-row』
      column 垂直布局 —— 在class『vie-flexbox』后追加 class『vie-flexbox-dir-column』
      特殊 column-justify 垂直布局-两端对齐中间自适应 —— 在class『vie-flexbox』后追加 class『vie-flexbox-dir-column-justify』
      wrap 换行布局 —— 在class『vie-flexbox』后追加 class『vie-flexbox-wrap』

      justify-content 主轴水平对齐方式 —— 在class『vie-flexbox』后追加 class『vie-flexbox-justify-start/end/center/between/around』
      align-items 交叉轴垂直对齐方式 —— 在class『vie-flexbox』后追加 class『vie-flexbox-align-top/bottom/middle/stretch/baseline』

    * 内层控制子元素的布局方式的class『vie-flexbox-item, 默认是{flex:1}, 子元素会根据父元素来自动分配宽度,
      如果是自定义子元素的宽度，不需要加class『vie-flexbox-item』
  -->
  <!--/特殊垂直布局class『vie-flexbox-dir-column-justify』,通过中间元素加class『vie-flexbox-item』, 实现垂直方向的两端对齐，中间自适应宽布局-->
  <Flexbox direction="column" :styles="{'height':'100vh'}">

    <!--<div class="vie-wrapper vie-flexbox vie-flexbox-dir-column-justify">-->

    <!--/水平布局,通过中间元素加class『vie-flexbox-item』, 实现水平方向的两端对齐，中间自适应宽布局-->
    <Flexbox :classes="{'vie-header':true}" direction="row">
      <div> &lt; 返回</div>
      <FlexboxItem :classes="{'vie-title-area':true}">
        {{header}}
      </FlexboxItem>
      <div>...</div>
    </Flexbox>
    <!--<div class="vie-header vie-flexbox vie-flexbox-dir-row">
      <div> &lt; 返回</div>
      <div class="vie-flexbox-item vie-title-area">
        header
      </div>
      <div>...</div>
    </div>-->
    <!--/.vie-header-->

    <FlexboxItem :classes="{'vie-content':true,'flex-container':true}">
      <h3>基本</h3>
      <Flexbox>
        <FlexboxItem>
          <div class="flex-demo">1</div>
        </FlexboxItem>
        <FlexboxItem>
          <div class="flex-demo">2</div>
        </FlexboxItem>
      </Flexbox>
      <h3>row 水平布局</h3>
      <Flexbox direction="row">
        <FlexboxItem>
          <div class="flex-demo">1</div>
        </FlexboxItem>
        <FlexboxItem>
          <div class="flex-demo">2</div>
        </FlexboxItem>
      </Flexbox>
      <!--<div class="vie-flexbox vie-flexbox-dir-row">
        <div class="vie-flexbox-item">
          <div class="flex-demo">1</div>
        </div>
        <div class="vie-flexbox-item">
          <div class="flex-demo">2</div>
        </div>
      </div>-->
      <!--/.vie-flexbox-dir-row-->
      <h3>row 反转布局</h3>
      <Flexbox direction="row-reverse">
        <FlexboxItem>
          <div class="flex-demo">1</div>
        </FlexboxItem>
        <FlexboxItem>
          <div class="flex-demo">2</div>
        </FlexboxItem>
      </Flexbox>
      <!--/.vie-flexbox-dir-row-reverse-->
      <h3>column 垂直布局</h3>
      <Flexbox direction="column">
        <FlexboxItem>
          <div class="flex-demo">1</div>
        </FlexboxItem>
        <FlexboxItem>
          <div class="flex-demo">2</div>
        </FlexboxItem>
      </Flexbox>
      <!--/.vie-flexbox-dir-column-->

      <h3>column 垂直布局反转</h3>
      <Flexbox direction="column-reverse">
        <FlexboxItem>
          <div class="flex-demo">1</div>
        </FlexboxItem>
        <FlexboxItem>
          <div class="flex-demo">2</div>
        </FlexboxItem>
      </Flexbox>
      <h3>wrap 换行布局(自定义宽度)</h3>
      <Flexbox wrap="wrap">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
        <div class="inline">
          <div class="flex-demo">3</div>
        </div>
        <div class="inline">
          <div class="flex-demo">4</div>
        </div>
        <div class="inline">
          <div class="flex-demo">5</div>
        </div>
        <div class="inline">
          <div class="flex-demo">6</div>
        </div>
      </Flexbox>
      <h3>wrap 反转换行布局(自定义宽度)</h3>
      <Flexbox wrap="wrap-reverse">
        <div class=" inline">
          <div class="flex-demo">1</div>
        </div>
        <div class=" inline">
          <div class="flex-demo">2</div>
        </div>
        <div class=" inline">
          <div class="flex-demo">3</div>
        </div>
        <div class=" inline">
          <div class="flex-demo">4</div>
        </div>
        <div class=" inline">
          <div class="flex-demo">5</div>
        </div>
        <div class=" inline">
          <div class="flex-demo">6</div>
        </div>
      </Flexbox>
      <h3>wrap 均分换行布局</h3>
      <Flexbox wrap="wrap">
        <div class="average">
          <div class="flex-demo">1</div>
        </div>
        <div class="average">
          <div class="flex-demo">2</div>
        </div>
        <div class="average">
          <div class="flex-demo">3</div>
        </div>
        <div class="average">
          <div class="flex-demo">4</div>
        </div>
        <div class="average">
          <div class="flex-demo">5</div>
        </div>
        <div class="average">
          <div class="flex-demo">6</div>
        </div>
        <div class="average">
          <div class="flex-demo">7</div>
        </div>
        <div class="average">
          <div class="flex-demo">8</div>
        </div>
        <div class="average">
          <div class="flex-demo">9</div>
        </div>
      </Flexbox>
      <h3>justify-content 水平对齐方式(左对齐)</h3>
      <Flexbox justify="start">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>justify-content 水平对齐方式(右对齐)</h3>
      <Flexbox justify="end">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>justify-content 水平对齐方式(居中)</h3>
      <Flexbox justify="center">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>justify-content 水平对齐方式(两端)</h3>
      <Flexbox justify="between">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>

      <h3>justify-content 水平对齐方式(两端间距相等)</h3>
      <Flexbox justify="around">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>

      <h3>align-items 垂直对齐方式(顶部对齐)</h3>
      <Flexbox align="top">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline small">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>align-items 垂直对齐方式(底部对齐)</h3>
      <Flexbox align="bottom">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline small">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>align-items 垂直对齐方式(底部对齐)</h3>
      <Flexbox align="middle">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline small">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
      <h3>align-items 垂直对齐方式(stretch对齐)</h3>
      <Flexbox align="stretch">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline small">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>

      <h3>align-items 垂直对齐方式(基线对齐)</h3>
      <Flexbox align="baseline">
        <div class="inline">
          <div class="flex-demo">1</div>
        </div>
        <div class="inline small">
          <div class="flex-demo">2</div>
        </div>
      </Flexbox>
    </FlexboxItem>
    <div class="vie-tabbar">
      tabbar
    </div>
  </Flexbox>
</template>

<script>
import { Flexbox, FlexboxItem } from '@/components/flexbox'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      header: '我是 header'
    }
  }
}
</script>
<style lang="less">
.vie-title-area {
  text-align: center;
}

.flex-demo {
  background: #20b907;
  color: #ffffff;
  text-align: center;
  border-radius: 8px;
  height: 100%;
  line-height: 1.5;
}

.flex-container {
  height: 100%;
  overflow-y: scroll;
}

.flex-container .inline {
  width: 2.2rem;
  overflow: hidden;
}

.flex-container .average {
  width: 20%;
  overflow: hidden;
}


.flex-container .small {
  height: 40px;
}
</style>
