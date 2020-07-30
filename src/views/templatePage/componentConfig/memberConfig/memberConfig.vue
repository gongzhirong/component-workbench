<style lang="less" scoped>
@import "./memberConfig.less";
</style>
<template :options="options">
  <div class="d-config">
    <Tabs value="content" class="d-tab">
      <TabPane label="个人中心设置" name="content">
        <div class="pannelcontent">
          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">背景色</div>
            <ColorPicker v-model="member_color" @on-change="changeColor" :editable="false"/>
          </div>
          <div class="pannelItem">
            <div class="tit">背景图</div>
            <div class="pannelDiv" style="position:relative">
              <Input v-model="member_img" class="itemInput" disabled placeholder="请选择图片">
                <Button slot="append" @click="showImgSelect">选择图片</Button>
                <Button slot="append" @click="clearImg">重置</Button>
              </Input>
              <div
                class="linetips"
                style="position:absolute;top:2px;width:1px;height:30px;right:50px;background:#dcdee2;"
              ></div>
              <div class="tipsicon" style="margin-top:6px;font-size:12px;color:#666;">添加背景图后将不显示页面背景色</div>
            </div>
          </div>
          <div class="pannelItem">
            <div class="titspe">用户昵称</div>
            <RadioGroup  v-model="member_name" @on-change="changeContent">
              <Radio label="1">
                <span>显示</span>
              </Radio>
              <Radio label="2">
                <span>隐藏</span>
              </Radio>
            </RadioGroup >
          </div>
          <div class="pannelItem">
            <div class="titspe">会员等级</div>
            <RadioGroup  v-model="member_level" @on-change="changeContent">
              <Radio label="1" disabled>
                <span>显示</span>
              </Radio>
              <Radio label="2">
                <span>隐藏</span>
              </Radio>
            </RadioGroup >
          </div>
          <div class="pannelItem">
            <div class="titspe">会员积分</div>
            <RadioGroup  v-model="member_credit" @on-change="changeContent">
              <Radio label="1" disabled>
                <span>显示</span>
              </Radio>
              <Radio label="2">
                <span>隐藏</span>
              </Radio>
            </RadioGroup >
          </div>
          <div class="pannelItem">
            <div class="titspe">修改信息</div>
            <RadioGroup  v-model="member_review" @on-change="changeContent">
              <Radio label="1">
                <span>显示</span>
              </Radio>
              <Radio label="2">
                <span>隐藏</span>
              </Radio>
            </RadioGroup >
          </div>

          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">标题名称</div>
            <Input
              v-model="member_text"
              class="itemInput"
              @on-change="changeContent"
              style="flex:1;width:auto;"
              placeholder="请输入标题名称"
              :maxlength="10"
            ></Input>
          </div>

          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">跳转页面</div>
            <Input
              v-model="member_link"
              class="itemInput"
              style="flex:1;width:auto;"
              disabled
              placeholder="请选择或填写小程序路径"
            >
              <Button slot="append" @click="showLinkSelect">选择跳转</Button>
            </Input>
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
      member_color: "#f1f1f1",
      member_img: "",
      member_name: "1",
      member_level: "2",
      member_credit: "2",
      member_review: "1",
      member_text: "",
      member_link: "",
      newOptions: {}
    };
  },
  created() {
    let _this = this;
    console.log(this.editable);
    _this.init(_this.options);
  },
  watch: {
    options() {
      let _this = this;
      _this.newOptions = _this.options;
      console.log("选项卡", _this.newOptions);
      _this.init(_this.newOptions);
    },
    editable() {
      console.log(this.editable);
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
        _this.member_color = optionsParams.member_color;
        _this.member_img = optionsParams.member_img;
        _this.member_name = optionsParams.member_name;
        _this.member_level = optionsParams.member_level;
        _this.member_credit = optionsParams.member_credit;
        _this.member_review = optionsParams.member_review;
        _this.member_text = optionsParams.member_text;
        _this.member_link = optionsParams.member_link;
      }
    },
    //改变颜色
    changeColor(e) {
      this.changeForm();
    },

    // 改变内容
    changeContent(e) {
      this.changeForm();
    },
    // 恢复初始状态
    restore() {
      let _this = this;
      _this.member_color = "#f1f1f1";
      _this.member_img = "";
      _this.member_name = "1";
      _this.member_level = "2";
      _this.member_credit = "2";
      _this.member_review = "1";
      _this.member_text = "";
      _this.member_link = "";
      _this.changeForm();
    },

    //改变值并且给父组件传递事件
    changeForm() {
      let _this = this;
      let changeData;
      changeData = {
        member_color: _this.member_color,
        member_img: _this.member_img,
        member_name: _this.member_name,
        member_level: _this.member_level,
        member_credit: _this.member_credit,
        member_review: _this.member_review,
        member_text: _this.member_text,
        member_link: _this.member_link
      };

      _this.$emit("listenToForm", changeData);
    },

    // 点击显示图片的选择弹框
    showImgSelect() {
      let _this = this;
      _this.changeForm();
      let changeData = {
        openImg: true,
        mode: "diy",
        type: "image",
        id: "member"
      };
      _this.$emit("listenToOpenImgSelect", changeData);
    },

    // 点击显示链接的选择弹框
    showLinkSelect() {
      let _this = this;
      _this.changeForm();
      let changeData = {
        mode: "diy",
        id: "member",
        link: _this.member_link
      };
      _this.$emit("listenToOpenLinkSelect", changeData);
    },

    clearImg() {
      this.member_img = "";
      this.changeForm();
    }
  }
};
</script>
