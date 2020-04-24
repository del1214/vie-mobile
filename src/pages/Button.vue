<template>
  <div>
      <WingBlank size="lg">
        <h1>Button</h1>
        <r-button>defualt</r-button>
        <r-button type="primary">primary</r-button>
        <r-button type="success">success</r-button>
        <r-button type="warning">warning</r-button>
        <WhiteSpace size="md"></WhiteSpace>
        <r-button type="error">error</r-button>
        <r-button type="ghost">ghost</r-button>
        <r-button disabled>disabled</r-button>
        <r-button size="small">small</r-button>
        <WhiteSpace size="md"></WhiteSpace>
        <r-button type="ghost" size="long">long</r-button>
        <WhiteSpace size="md"></WhiteSpace>
        <r-button type="primary" across>across</r-button>
        <WhiteSpace size="md"></WhiteSpace>
        <r-button type="ghost" icon="load-c" loading>defualt</r-button>
        <WhiteSpace size="md"></WhiteSpace>
        <r-button type="primary" icon="ios-search">primary</r-button>
      </WingBlank>
</div>
</template>

<script>
import { Button } from '@/components/button/'
import { WhiteSpace, WingBlank } from '@/components/space/'
export default {
  components: {
    'r-button': Button,
    WhiteSpace,
    WingBlank
  },
  data() {
    return {}
  }
}
</script>
