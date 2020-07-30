<style lang="less" scoped>
@import "./GoodsInfoTextConfig.less";
.d-tab {
  padding-bottom: 300px;
}
</style>
<template :options="options">
  <div class="d-config">
    <Tabs value="content" class="d-tab">
      <TabPane label="接口配置" name="content">
        <div class="pannelcontent">

          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">关联类型</div>
            <Select v-model="relCode" style="width:200px" label-in-value @on-change="relChange">
              <Option v-for="item in relCodeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">接口类别</div>
            <Select v-model="typeCode" style="width:200px" label-in-value @on-change="typeChange">
              <Option v-for="item in typeCodeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">接口</div>
            <Select v-model="api" style="width:200px" label-in-value @on-change="apiChange">
              <Option v-for="item in apiList" :value="item.interfaceId" :key="item.interfaceId">{{ item.interfaceName }}</Option>
            </Select>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  props: ["options", "editable"],
  data() {
    return {
      relCode: '',
      relName: '',
      typeCode: '',
      typeName: '',
      api: '',
      apiName: '',
      relCodeList: [],
      typeCodeList: [],
      apiList: [],
    };
  },
  created() {
    let _this = this;
    console.log(this.editable);
    _this.init(_this.options);
    _this.getApiRelList()
    _this.getApiTypeList()
    _this.getApis()
    console.log('created')
  },
  watch: {
    options() {
      let _this = this;
      console.log(_this.options);
      _this.init(_this.options);
      _this.getApis()
      console.log('options')
    },
    editable() {
      console.log(this.editable);
    }
  },
  methods: {
    // 初始化
    init(op) {
      let _this = this;
      let optionsParams = JSON.parse(JSON.stringify(op.options));
      if (JSON.stringify(optionsParams) == "{}") {
        _this.restore();
      } else {
        _this.relCode = optionsParams.relCode;
        _this.typeCode = optionsParams.typeCode;
        _this.api = optionsParams.api;
      }
      
    },

    relChange (ob) {
      this.relName = ob.label
      this.api = ''
      this.apiList = []
      this.changeContent()
      this.getApis()
    },

    typeChange (ob) {
      this.typeName = ob.label
      this.api = ''
      this.apiList = []
      this.changeContent()
      this.getApis()
    },

    apiChange (ob) {
      this.apiName = ob.label
      this.changeContent()
    },

    async getApis () {
      if (this.relCode && this.typeCode) {
        const params = {
          relCode: this.relCode,
          typeCode: this.typeCode,
        }
        const res = await this.$api.getApis(params)
        this.apiList = res.data
      }
    },

    // 改变内容
    changeContent(e) {
      this.changeForm();
    },
    // 恢复初始状态
    restore() {
      console.log('restore')
      let _this = this;
      _this.relCode = '';
      _this.typeCode = '';
      _this.relName = '';
      _this.typeName = '';
      _this.apiName = '';
      _this.api = '';
      _this.changeForm();
    },

    //改变值并且给父组件传递事件
    changeForm() {
      let _this = this;
      let changeData;
      changeData = {
        relCode: _this.relCode,
        typeCode: _this.typeCode,
        typeName: _this.typeName,
        relName: _this.relName,
        api: _this.api,
        apiName: _this.apiName,
      };
      _this.$emit("listenToForm", changeData);
    },
    async getApiRelList () {
      const res = await this.$api.getApiRelList()
      this.relCodeList = res.data
    },
    async getApiTypeList () {
      const res = await this.$api.getApiTypeList()
      this.typeCodeList = res.data
    },
  },
};
</script>
