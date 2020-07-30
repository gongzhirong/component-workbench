<style lang="less" scoped>
@import "./videoConfig.less";
</style>
<template :options="options">
  <div class="d-config">
    <Tabs value="content" class="d-tab">
      <TabPane label="选项卡设置" name="content">
        <div class="pannelcontent">
          <div class="pannelItem">
            <div class="titspe">视频样式</div>
            <RadioGroup v-model="video_style" @on-change="changeContent">
              <Radio label="1">
                <span>16:9</span>
              </Radio>
              <Radio label="2">
                <span>4:3</span>
              </Radio>
              <Radio label="3">
                <span>1:1</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="pannelItem">
            <div class="titspe">播放方式</div>
            <RadioGroup v-model="video_type" @on-change="changeContent">
              <Radio label="1">
                <span>自动播放</span>
              </Radio>
              <Radio label="2">
                <span>点击播放</span>
              </Radio>
              <Radio label="3">
                <span>静音播放</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="pannelItem">
            <div class="tit">视频封面</div>
            <div class="pannelDiv" style="position:relative">
              <Input v-model="video_img" class="itemInput" disabled placeholder="请选择图片">
                <Button slot="append" @click="showImgSelect">选择图片</Button>
                <Button slot="append" @click="clearImg">重置</Button>
              </Input>
              <div class="linetips" style="position:absolute;top:2px;width:1px;height:30px;right:50px;background:#dcdee2;"></div>
            </div>
          </div>
          <div class="pannelItem" style="align-items:center;">
            <div class="titspe">视频链接</div>
            <div class="pannelDiv" style="position:relative">
              <Input v-model="video_link" class="itemInput" disabled placeholder="请选择视频">
                <Button slot="append" @click="showVideoSelect">选择视频</Button>
                <Button slot="append" @click="clearImg">重置</Button>
              </Input>
              <div class="linetips" style="position:absolute;top:2px;width:1px;height:30px;right:50px;background:#dcdee2;"></div>
            </div>
          </div>
          <div class="pannelVideo" v-if="video_link" style="width:100%;height:200px;">
              <video controls :src="video_link" style="width:100%;height:200px;"></video>
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
      video_type:'1',
      video_style:'1',
      video_img:'',
      video_link:'',
      newOptions: {},
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
      console.log('选项卡',_this.newOptions)
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
        _this.video_type = optionsParams.video_type
        _this.video_style = optionsParams.video_style
        _this.video_img = optionsParams.video_img
        _this.video_link = optionsParams.video_link
      }
    },
    // 添加内容
    addContent(index){
      let _this = this
      let length = _this.colorGroup[index].tabContent.length;
      if (length >= 10) {
        _this.$Message.error("不能超过10个");
        return false;
      }
      _this.colorGroup[index].tabContent.push({
        tabImg:'',
        tabLink:''
      })

      _this.changeForm()
    },
    //改变颜色
    changeColor(e){
      this.changeForm()
    },

    // 改变内容
    changeContent(e){
      this.changeForm()
    },
    // 恢复初始状态
    restore() {
      let _this = this;
      _this.video_type = '1'
      _this.video_style = '1'
      _this.video_img = ''
      _this.video_link = ''
      _this.changeForm();
    },

    //改变值并且给父组件传递事件
    changeForm() {
      let _this = this;
      let changeData;
      changeData = {
        video_type:_this.video_type,
        video_style:_this.video_style,
        video_img:_this.video_img,
        video_link:_this.video_link
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
        id: "video"
      };
      _this.$emit("listenToOpenImgSelect", changeData);
    },

    showVideoSelect(){
      let _this = this;
      _this.changeForm();
      let changeData = {
        openImg: true,
        mode: "diy",
        type: "image",
        id: "video"
      };
      _this.$emit("listenToOpenVideoSelect", changeData);
    },

    clearImg(){
      this.video_img = ''
      this.changeForm()
    }
  }
};
</script>
