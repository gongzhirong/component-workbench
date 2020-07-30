<style lang="less" scoped>
@import "./doubleImgConfig.less";
</style>
<template :options="options">
  <div class="d-config">
    <Tabs value="content" class="d-tab">
      <TabPane label="多列图片组配置" name="content">
        <div class="pannelcontent">
          <div class="pannelItem">
            <div class="pannelItem" style="border-bottom:0px;display:flex;flex-direction:row;align-items:center;">
              <div class="tit" style="margin-right:30px;margin-bottom:0px;">背景色</div>
              <ColorPicker v-model="backColor" @on-change="changeBackColor" :editable="false" />
            </div>
            <div class="pannelItem" style="border-bottom:0px">
              <div class="tit">上下边距</div>
              <div class="list-group slide">
                <Slider class="slide-content" @on-change="changeSlide" v-model="udPadding" :max="48"></Slider>
                <div class="slide-tips">{{udPadding}}PX</div>
              </div>
            </div>
            <div class="pannelItem" style="border-bottom:0px">
              <div class="tit">左右边距</div>
              <div class="list-group slide">
                <Slider class="slide-content" @on-change="changeSlide" v-model="lrPadding" :max="48"></Slider>
                <div class="slide-tips">{{lrPadding}}PX</div>
              </div>
            </div>
            <div class="pannelItem">
              <div class="tit">选择列数</div>
              <RadioGroup v-model="girdnum" style="width:100%" @on-change="changeGirdNum">
                <Radio label="2"></Radio>
                <Radio label="3"></Radio>
                <Radio label="4"></Radio>
              </RadioGroup>
            </div>
            <div class="tit">上传图片</div>
            <div class="colorGroup">
              <draggable v-model="colorGroup" v-bind="dragOptions" handle=".handle" @change="changeDisplay">
                <transition-group type="transition">
                  <div class="colorItem" v-for="(item,index) in colorGroup" :key="item.id">
                    <i  class="iconfont icon-drag handle"
                        size="24"
                        style="position:absolute;top:0px;right:25px;"></i>
                    <i  type="ios-trash img-trash"
                        size="24"
                        @click="deleteColor(index)"
                        v-if="index != 0"></i>
                   <!-- <Icon
                      class="iconfont icon-drag handle"
                      size="24"
                      style="position:absolute;top:0px;right:25px;"
                    />
                    <Icon
                      type="ios-trash img-trash"
                      size="24"
                      @click="deleteColor(index)"
                      v-if="index != 0"
                    />-->
                    <img v-if="item.adImg" class="colorIcon" :src="item.adImg" alt>
                    <img v-else class="colorIcon" src="../../static/img/default_onegoods.jpg" alt>
                    <div class="colorInput">
                      <Input v-model="item.adImg" class="itemInput" disabled placeholder="请选择图片">
                        <Button slot="append" @click="showImgSelect(index)" :disabled="editable != 'enable'">选择图片</Button>
                      </Input>
                      <Input v-model="item.adLink" class="itemInput" disabled placeholder="请选择或填写小程序路径">
                        <Button slot="append" @click="showLinkSelect(index)" :disabled="editable != 'enable'">选择跳转</Button>
                      </Input>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>

            <div class="colorAdd" @click="addAd" v-if="editable == 'enable'">
              +
              <span class="colortips">添加图片</span>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: ["options","editable"],
  components:{
    draggable
  },
  data() {
    return {
      newOptions: {},
      udPadding:0,
      lrPadding:0,
      backColor:'#fff',
      girdnum:'2',
      colorGroup: [
        {
          id: 0, // 这id是解决警告的问题
          adImg: "",
          adLink: ""
        },{
          id: 1, // 这id是解决警告的问题
          adImg: "",
          adLink: ""
        }
      ]
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  created() {
    let _this = this;
    _this.init(_this.options);
  },
  watch: {
    options() {
      let _this = this;
      _this.newOptions = _this.options;
      _this.init(_this.newOptions);
    }
  },
  methods: {
    // 初始化
    init(op) {
      let _this = this;
      let optionsParams = op.options;
      console.log(optionsParams);
      if (JSON.stringify(optionsParams) == "{}") {
        _this.restore();
      } else {
        _this.colorGroup = optionsParams.colorGroup
        _this.girdnum = optionsParams.girdnum
        _this.udPadding = optionsParams.udPadding || 0
        _this.lrPadding = optionsParams.lrPadding || 0
        _this.backColor = optionsParams.backColor || '#fff'
      }
    },
    // 切换列数
    changeGirdNum(e){
      this.girdnum = e
      this.changeForm()
    },
    // 恢复初始状态
    restore() {
      let _this = this;
      _this.colorGroup = [
        {
          id: 0, // 这id是解决警告的问题
          adImg: "",
          adLink: ""
        },
        {
          id: 1, // 这id是解决警告的问题
          adImg: "",
          adLink: ""
        }
      ]
      _this.girdnum = '2'
      _this.udPadding = 0
      _this.lrPadding = 0
      _this.backColor = '#fff'
      _this.changeForm();
    },

    // 改变背景色
    changeBackColor(e){
      this.changeForm();
    },

    //改变边距
    changeSlide(e){
      console.log(e)
      this.changeForm();
    },

    //改变值并且给父组件传递事件
    changeForm(index) {
      let _this = this;
      console.log(index);
      let changeData;
      if (index) {
        changeData = {
          colorGroup: _this.colorGroup,
          udPadding:_this.udPadding,
          lrPadding:_this.lrPadding,
          backColor:_this.backColor,
          girdnum:_this.girdnum,
          addIndex: index - 1
        };
      } else {
        changeData = {
          udPadding:_this.udPadding,
          lrPadding:_this.lrPadding,
          backColor:_this.backColor,
          girdnum:_this.girdnum,
          colorGroup: _this.colorGroup
        };
      }

      _this.$emit("listenToForm", changeData);
    },

    //删除图片
    deleteColor(index) {
      let _this = this;
      _this.colorGroup.splice(index, 1);
      _this.changeForm();
    },

    // 添加图片

    addAd() {
      let _this = this;
      // 判断数量
      _this.colorGroup.push({
        id: _this.colorGroup.length, // 这id是解决警告的问题
        adImg: "",
        adLink: ""
      });
      _this.changeForm();
    },

    // 点击显示图片的选择弹框
    showImgSelect(index) {
      let _this = this;
      _this.changeForm(index + 1);
      let changeData = {
        openImg: true,
        mode: "diy",
        type: "image",
        id: "img"
      };
      _this.$emit("listenToOpenImgSelect", changeData);
    },

    // 点击显示链接的选择弹框
    showLinkSelect(index) {
      let _this = this;
      _this.changeForm(index + 1);
      let changeData = {
        mode: "diy",
        id: "img",
        link: _this.colorGroup[index].adLink
      };
      _this.$emit("listenToOpenLinkSelect", changeData);
    },

    // 更换位置
    changeDisplay(e){
      this.changeForm();
    }
  }
};
</script>
