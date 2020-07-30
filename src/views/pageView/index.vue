<template>
  <div>
    <div
      v-for="item in pageData"
    >
      <!-- 商品图片展示 -->
      <GoodsImg v-if="item.components == 'GoodsImg'" v-bind="item.options"/>
      <!-- 提示行 -->
      <GoodsTip v-if="item.components == 'GoodsTip'" v-bind="item.options"/>
      <!-- 商品文字信息 -->
      <GoodsInfoText v-if="item.components == 'GoodsInfoText'" v-bind="item.options"/>
      <!-- 商品售卖信息组件 -->
      <SellInfo v-if="item.components == 'SellInfo'" v-bind="item.options"/>
      <!-- 下单组件 -->
      <PlaceOrder v-if="item.components == 'PlaceOrder'" v-bind="item.options"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pageView',
  data () {
    return {
      pageData: []
    }
  },
  methods: {
    // 获取页面数据
    getPageDetailById () {
      const params = {
        id: this.$route.params.pageId
      }
      this.$api.getPageDetailById(params).then(res => {
        if (res.code === 200) {
          this.pageData = JSON.parse(res.data.pageData)
          console.log(this.pageData)
        } else {
          window.alert('页面数据读取失败')
        }
      })
    },
  },
  created () {
    this.getPageDetailById()
  }
}
</script>