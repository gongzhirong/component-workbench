<style lang="less" scoped>
@import "./listConfig.less";
</style>
<template :options="options">
  <div class="d-config">
    <Tabs value="content" class="d-tab">
      <TabPane label="导航列表设置" name="content">
        <div class="pannelcontent">
          <div class="pannelItemspe">
            <div class="pannelcontent">
              <div class="colorGroup">
                <div class="colorItem" v-for="(item,index) in colorGroup" :key="index">
                  <i  type="ios-trash img-trash"
                      size="24"
                      @click="deleteColor(index)"
                      v-if="index != 0"
                      style="position:absolute;top:0px;right:25px;"></i>
                 <!-- <Icon
                      type="ios-trash img-trash"
                      size="24"
                      @click="deleteColor(index)"
                      v-if="index != 0"
                      style="position:absolute;top:0px;right:25px;"
                    />-->
                  <div class="colorImg">
                    <span v-if="item.adImg" :class="['icon iconfont colorIcon',item.adImg]" :src="item.adImg"></span>
                    <img v-else class="colorIcon" src="../../static/img/default_onegoods.jpg" alt>
                    <Button class="chooseIcon" @click="showIconSelect(index)" :disabled="editable != 'enable'">选择图标</Button>
                  </div>

                  <div class="colorInput">
                    <Input v-model="item.adText" class="itemInput" :maxlength="10" placeholder="请输入标题"></Input>
                    <Input v-model="item.adLink" class="itemInput" disabled placeholder="请选择或填写小程序路径">
                      <Button slot="append" @click="showLinkSelect(index)" :disabled="editable != 'enable'">选择跳转</Button>
                    </Input>
                  </div>
                </div>

                <div class="colorAdd" @click="addList">
                    +<span class="colortips">添加</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  props: ["options","editable"],
  data() {
    return {
      newOptions: {},
      colorGroup: []
    };
  },
  created() {
    let _this = this;
    console.log(this.editable)
    _this.init(_this.options);
  },
  watch: {
    options() {
      let _this = this;
      _this.newOptions = _this.options;
      _this.init(_this.newOptions);
    },
    editable(){
      console.log(this.editable)
    }
  },
  methods: {
    // 初始化
    init(op) {
      let _this = this;
      let optionsParams = op.options;
      if (JSON.stringify(optionsParams) == "{}") {
        _this.restore();
      } else {
        _this.colorGroup = optionsParams.colorGroup || [];
      }
    },

    // 添加列表
    addList(){
      let _this = this;
      _this.colorGroup.push({
        adImg: "",
        adText:"",
        adLink: ""
      })
    },

    //删除图片
    deleteColor(index) {
      let _this = this;
      _this.colorGroup.splice(index, 1);
      _this.changeForm();
    },

    // 恢复初始状态
    restore() {
      let _this = this;
      _this.colorGroup = []
      for(let i = 0; i < 1; i++) {
        let newObj = {
          adImg: "",
          adText:"",
          adLink: ""
        }
        _this.colorGroup.push(newObj)
      }
      _this.changeForm();
    },

    //改变值并且给父组件传递事件
    changeForm(index) {
      let _this = this;
      console.log(index);
      let changeData;
      if (index) {
        changeData = {
          colorGroup: _this.colorGroup,
          addIndex: index - 1
        };
      } else {
        changeData = {
          colorGroup : _this.colorGroup
        };
      }

      _this.$emit("listenToForm", changeData);
    },

    // 点击显示图片的选择弹框
    showIconSelect(index) {
      let _this = this;
      _this.changeForm(index + 1);
      let changeData = {
        openImg: true,
        mode: "diy",
        type: "image",
        id: "banner"
      };
      _this.$emit("listenToOpenIconSelect", changeData);
    },

    // 点击显示链接的选择弹框
    showLinkSelect(index) {
      let _this = this;
      _this.changeForm(index + 1);
      let changeData = {
        mode: "diy",
        id: "list",
        link: _this.colorGroup[index].adLink
      };
      _this.$emit("listenToOpenLinkSelect", changeData);
    }
  }
};
</script>
