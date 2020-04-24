<template>
  <div>
    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">PopupPicker</div>
        <r-button @click="visible=true">点我</r-button>
        <h4>{{getSelectedStr}}</h4>
        <PopupPicker v-if="popupData" title="选择省市区" v-model="popupSelected" :visible.sync="visible" :cols="3" :data="popupData"></PopupPicker>
      </Card>
    </WingBlank>

    <WhiteSpace size="md"></WhiteSpace>
    <WingBlank size="md">
      <Card :border="true">
        <div slot="headerTitle">
          <p>Picker</p>
        </div>
        <Picker :disabled="disabled" :items="items0" :selectedValue="value"></Picker>
      </Card>
    </WingBlank>
    <WhiteSpace>
    </WhiteSpace>
    <WingBlank>
      <Card :border="true">
        <div slot="headerTitle">
          <p>MultiPicker</p>
        </div>
        <MultiPicker v-if="cols.length>0" ref="multiPicker" :disabled="disabled" :multiItems="cols" :selectedValues="selectedValues"></MultiPicker>
      </Card>
    </WingBlank>
    <WhiteSpace>
    </WhiteSpace>

    <WingBlank>
      <Card :border="true">
        <div slot="headerTitle">
          <p>Cascader</p>
        </div>
        <Cascader v-if="cascaderQuattroData" :cols="4" :disabled="disabled" :data="cascaderQuattroData" :selectedValues.sync="cascaderQuattroSelectedValues"></Cascader>
      </Card>
    </WingBlank>

    <WhiteSpace>
    </WhiteSpace>
  </div>
</template>



<script>
import { Picker, MultiPicker, Cascader, PopupPicker } from '@/components/picker/'
import Button from '@/components/button/'
import { Card } from '@/components/card/'
import { WhiteSpace, WingBlank } from '@/components/space/'
import axios from 'axios'
export default {
  components: {
    Card,
    WhiteSpace,
    WingBlank,
    Picker,
    MultiPicker,
    Cascader,
    PopupPicker,
    'r-button': Button
  },
  data() {
    return {
      disabled: false,
      value: '黑龙江省',
      items0: null,
      items1: null,
      items2: null,
      items3: null,
      selectedValues: ['黑龙江省', '北京', '新疆维吾尔自治区'],
      cols: [],
      cascaderData: null,
      cascaderSelectedValues: [],
      cascaderQuattroData: null,
      cascaderQuattroSelectedValues: [],
      visible: false,
      popupData: null,
      popupSelected: []
    }
  },
  created() {
    for (let i = 0; i < 4; i++) {
      this['items' + i] = this.generateArray()()
    }

    this.cols.push([{
      id: 1,
      value: '北京',
      label: '北京'
    }, {
      id: 2,
      value: '澳门特别行政区',
      label: '澳门特别行政区'
    }, {
      id: 3,
      value: '广西壮族自治区',
      label: '广西壮族自治区'
    }, {
      id: 4,
      value: '香港特别行政区',
      label: '香港特别行政区'
    }, {
      id: 5,
      value: '浙江省',
      label: '浙江省'
    }, {
      id: 6,
      value: '山西省',
      label: '山西省'
    }, {
      id: 7,
      value: '四川省',
      label: '四川省'
    }, {
      id: 8,
      value: '江西省',
      label: '江西省'
    }, {
      id: 9,
      value: '山东省',
      label: '山东省'
    }, {
      id: 10,
      value: '黑龙江省',
      label: '黑龙江省'
    }, {
      id: 11,
      value: '新疆维吾尔自治区',
      label: '新疆维吾尔自治区'
    }])
    this.cols.push([{
      id: 1,
      value: '北京',
      label: '北京'
    }, {
      id: 2,
      value: '澳门特别行政区',
      label: '澳门特别行政区'
    }, {
      id: 3,
      value: '广西壮族自治区',
      label: '广西壮族自治区'
    }, {
      id: 4,
      value: '香港特别行政区',
      label: '香港特别行政区'
    }, {
      id: 5,
      value: '浙江省',
      label: '浙江省'
    }, {
      id: 6,
      value: '山西省',
      label: '山西省'
    }, {
      id: 7,
      value: '四川省',
      label: '四川省'
    }, {
      id: 8,
      value: '江西省',
      label: '江西省'
    }, {
      id: 9,
      value: '山东省',
      label: '山东省'
    }, {
      id: 10,
      value: '黑龙江省',
      label: '黑龙江省'
    }, {
      id: 11,
      value: '新疆维吾尔自治区',
      label: '新疆维吾尔自治区'
    }])
    this.cols.push([{
      id: 1,
      value: '北京',
      label: '北京'
    }, {
      id: 2,
      value: '澳门特别行政区',
      label: '澳门特别行政区'
    }, {
      id: 3,
      value: '广西壮族自治区',
      label: '广西壮族自治区'
    }, {
      id: 4,
      value: '香港特别行政区',
      label: '香港特别行政区'
    }, {
      id: 5,
      value: '浙江省',
      label: '浙江省'
    }, {
      id: 6,
      value: '山西省',
      label: '山西省'
    }, {
      id: 7,
      value: '四川省',
      label: '四川省'
    }, {
      id: 8,
      value: '江西省',
      label: '江西省'
    }, {
      id: 9,
      value: '山东省',
      label: '山东省'
    }, {
      id: 10,
      value: '黑龙江省',
      label: '黑龙江省'
    }, {
      id: 11,
      value: '新疆维吾尔自治区',
      label: '新疆维吾尔自治区'
    }])
    console.log(this.cols)
    let self = this
    axios.get('/static/data.json').then(function (res) {
      self.popupData = res.data
    })
    axios.get('/static/dataQuattro.json').then(function (res) {
      self.cascaderQuattroData = res.data
    })
  },
  methods: {
    generateArray() {
      return function () {
        return [{
          id: 1,
          value: '北京',
          label: '北京'
        }, {
          id: 2,
          value: '澳门特别行政区',
          label: '澳门特别行政区'
        }, {
          id: 3,
          value: '广西壮族自治区',
          label: '广西壮族自治区'
        }, {
          id: 4,
          value: '香港特别行政区',
          label: '香港特别行政区'
        }, {
          id: 5,
          value: '浙江省',
          label: '浙江省'
        }, {
          id: 6,
          value: '山西省',
          label: '山西省'
        }, {
          id: 7,
          value: '四川省',
          label: '四川省'
        }, {
          id: 8,
          value: '江西省',
          label: '江西省'
        }, {
          id: 9,
          value: '山东省',
          label: '山东省'
        }, {
          id: 10,
          value: '黑龙江省',
          label: '黑龙江省'
        }, {
          id: 11,
          value: '新疆维吾尔自治区',
          label: '新疆维吾尔自治区'
        }]
      }
    }
  },
  computed: {
    getSelectedStr() {
      return this.popupSelected.map(function (obj) {
        return obj.label
      }).join('-')
    }
  }
}
</script>
<style lang="less">

</style>

