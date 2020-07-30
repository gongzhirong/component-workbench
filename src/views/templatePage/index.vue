<style lang="less" scoped>
@import "./index.less";
</style>
<template>
  <div style="height: 100%" class="main">
    <!-- 图片选择框 -->
    <ImgSelect ref="imgselect" :options="imgOptions" v-on:listentoptpmfile="changeImg"></ImgSelect>
    <!-- <VideoSelect ref="videoselect" :options="videoOptions" v-on:listentoptpmfile="changeVideo"></VideoSelect> -->
    <!-- <UrlButton ref="linkselect" :settings="linkSettings" v-on:listenurldata="changeLink"></UrlButton> -->
    <!-- <IconLists ref="IconLists" v-on:listenicon="changeIcon"></IconLists> -->
    <!-- <AddGood ref="goodselect" :settings="goodSettings" v-on:listentgoodData="changeGood" :selectGoods="isSelect"></AddGood> -->
    <div class="decorate-content">
      <div class="decorate-content-left">
        <div class="left-item" v-for="(item,index) in collists" :key="index">
          <div class="item-listname pointer" @click="toggleList(index,item.toolsCollapse)">
            {{item.toolsName}}
          <!--  <Icon type="ios-arrow-down"/>-->
            <i class="ios-arrow-down"></i>
          </div>
          <div
            class="item-listcontent"
            :style="{height: item.toolsCollapse == 'close' ? '0px' : item.toolsHeight + 'px',padding: item.toolsCollapse == 'close' ? '0px 0px' : '36px 0px'}"
          >
            <div
              class="listitem pointer"
              v-for="(childItem,childIndex) in item.toolsChildren"
              :key="childIndex"
              @click="addGoodsItem(childItem)"
            >
              <IconSvg :svgid="childItem.icon"></IconSvg>
              <span>{{childItem.name}}</span>
              <p v-if="childItem.all > 0">{{childItem.current}}/{{childItem.all}}</p>
              <p v-else>{{childItem.current}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="decorate-content-center" @click="cancelClick">
        <div class="diy-phone">
          <div
            class="phone-body"
            :style="{background:basicOption.backImg ? 'url('+basicOption.backImg+') repeat-y' : basicOption.backColor,backgroundSize:'cover'}"
          >
            <draggable v-model="currentTemplate" v-bind="dragOptions">
              <transition-group type="transition">
                <div
                  v-for="(item,index) in currentTemplate"
                  :hovera="item.hover"
                  :class="[item.hover ? 'drag-active' : '',item.click ? 'drag-active': '','bodyitem']"
                  :key="item.id"
                  @mouseout="hoverItem(item,index,'out')"
                  @click.stop="clickItem(item,index)"
                >
                  <div :class="[item.click ? 'body-delete-show': item.hover ? 'body-delete-show' : 'body-delete']" @click.stop="showConfrimModel()">
                    <div class="icon-deletespe">×</div>
                  </div>
                  <div :class="[item.click ? showConfrim ? 'confirmDelShow' : 'confirmDelHide' : 'confirmDelHide']" style="top: 10px; right: 10px;">
                    <div class="confirmword">确定删除吗</div>
                    <div class="btn-group">
                      <!-- <el-button
                        type="primary"
                        ghost
                        size="small"
                        @click.stop="confrimDelete(item,index)"
                      >确定</el-button> -->
                      <Button type="primary" ghost size="small" @click.stop="confrimDelete(item,index)">确定</Button>
                      <!-- <el-button type="default" ghost size="small" @click.stop="confrimCancel()">取消</el-button> -->
                      <Button type="default" ghost size="small" @click.stop="confrimCancel()">取消</Button>
                    </div>
                  </div>
                  <!-- 单列商品 -->
                  <DanLieShangPin v-if="item.components == 'danlieshangpin'" :options="item.options"/>
                  <!-- 双列商品 -->
                  <ShuangLieShangPin v-if="item.components == 'shuanglieshangpin'" :options="item.options"/>
                  <!-- 魔方 -->
                  <Mofang v-if="item.components == 'mofang'" :options="item.options"/>
                  <!-- 图片轮播 -->
                  <Banner v-if="item.components == 'banner'" :options="item.options"/>
                  <ShopInfo v-if="item.components == 'shangpinxiangqing'" :options="item.options"/>
                  <!-- 图片组 -->
                  <ImgTem v-if="item.components == 'imgGroup'" :options="item.options"/>
                  <!-- 多列图片组 -->
                  <DoubleImgTem v-if="item.components == 'doubleimgGroup'" :options="item.options"/>
                  <!-- 选项卡 -->
                  <TabTem v-if="item.components == 'xuanxiangqia'" :options="item.options"/>
                  <!-- 搜索 -->
                  <SearchTem v-if="item.components == 'search'" :options="item.options"/>
                  <!-- 视频 -->
                  <VideoTem v-if="item.components == 'video'" :options="item.options"/>
                  <!-- 个人信息 -->
                  <MemberTem class="undraggable" v-if="item.components == 'member'" :options="item.options"/>
                  <!-- 订单中心 -->
                  <OrderTem v-if="item.components == 'order'" :options="item.options"/>
                  <!-- 列表导航 -->
                  <ListTem v-if="item.components == 'list'" :options="item.options"/>
                  <!-- 辅助空白 -->
                  <BlankTem v-if="item.components == 'blank'" :options="item.options"/>
                  <!-- 辅助线 -->
                  <LineTem v-if="item.components == 'line'" :options="item.options"/>
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
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="saveAction">
          <!-- <el-button class="btn comfrimBtn" type="primary" :loading="loading" @click="saveTemplate1">保存</el-button> -->
          <Button type="primary" :loading="loading" class="btn comfrimBtn" @click="saveTemplate1">保存</Button>
          <!-- <el-button class="btn" @click="back">取消</el-button> -->
          <Button class="btn" @click="back">取消</Button>
        </div>
      </div>
      <div class="decorate-content-right">
        <DefaultConfig
          v-if="!currentClick.components"
          v-on:listenToOption="changeOptions"
          :options="basicOption"
          v-on:listenToOpenImgSelect="openImgSelect"
          :editable="editable"
        ></DefaultConfig>
        <DanConfig
          v-else-if="currentClick.components == 'danlieshangpin'"
          v-on:deleteGoodSelect="deleteGood"
          v-on:listenToOpenGoodSelect="openGoodSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <ShuangConfig
          v-else-if="currentClick.components == 'shuanglieshangpin'"
          v-on:deleteGoodSelect="deleteGood"
          v-on:listenToOpenGoodSelect="openGoodSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <MofangConfig
          v-else-if="currentClick.components == 'mofang'"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <BannerConfig
          v-else-if="currentClick.components == 'banner'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <ShopInfoConfig
          v-else-if="currentClick.components == 'shangpinxiangqing'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <ImgConfig
          v-else-if="currentClick.components == 'imgGroup'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <DoubleImgConfig
          v-else-if="currentClick.components == 'doubleimgGroup'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <TabConfig
          v-else-if="currentClick.components == 'xuanxiangqia'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <SearchConfig
          v-else-if="currentClick.components == 'search'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <VideoConfig
          v-else-if="currentClick.components == 'video'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToOpenVideoSelect="openVideoSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <MemberConfig
          v-else-if="currentClick.components == 'member'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenImgSelect="openImgSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <OrderConfig
          v-else-if="currentClick.components == 'order'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenIconSelect="openIconSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <ListConfig
          v-else-if="currentClick.components == 'list'"
          v-on:listenToOpenLinkSelect="openLinkSelect"
          v-on:listenToOpenIconSelect="openIconSelect"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
          :editable="editable"
        />
        <BlankConfig
          v-else-if="currentClick.components == 'blank'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <LineConfig
          v-else-if="currentClick.components == 'line'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <GoodsTipConfig
          v-else-if="currentClick.components == 'GoodsTip'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <GoodsImgConfig 
          class="1"
          v-else-if="currentClick.components == 'GoodsImg'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <GoodsInfoTextConfig
          class="2"
          v-else-if="currentClick.components == 'GoodsInfoText'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <SellInfoConfig
          class="3"
          v-else-if="currentClick.components == 'SellInfo'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
        <PlaceOrderConfig
          class="4"
          v-else-if="currentClick.components == 'PlaceOrder'"
          v-on:listenToForm="changeTemplate"
          :options="currentClick"
        />
      </div>
    </div>
  </div>
</template>
<script>
import tools from "./tools";
import IconSvg from "./components/iconSvg";
// import {fetchList, saveTemplate, detailTemplate, editTemplate} from "@/api/sms/page";
import DanLieShangPin from "./components/danlieshangpin/danlieTem";
import DanConfig from "./componentConfig/danlieshangpin/danlieshangpin";
import ShuangLieShangPin from "./components/shuanglieshangpin/shuanglieTem";
import ShuangConfig from "./componentConfig/shuanglieshangpin/shuanglieshangpin";
import Mofang from "./components/mofang/mofangTem";
import MofangConfig from "./componentConfig/mofang/mofang";
import Banner from "./components/banner/bannerTem";
import BannerConfig from "./componentConfig/banner/banner";
import ShopInfo from "./components/shopinfo/shopinfoTem";
import ShopInfoConfig from "./componentConfig/shopinfo/shopinfo";
import DefaultConfig from "./componentConfig/default/default";
import ImgTem from "./components/imgTem/imgTem";
import ImgConfig from "./componentConfig/imgConfig/imgConfig";
import DoubleImgTem from "./components/doubleImgTem/doubleImgTem";
import DoubleImgConfig from "./componentConfig/doubleImgConfig/doubleImgConfig";
import TabTem from "./components/tabTem/tabTem";
import TabConfig from "./componentConfig/tabConfig/tabConfig";
import SearchTem from "./components/searchTem/searchTem";
import SearchConfig from "./componentConfig/searchConfig/searchConfig";
import BlankTem from "./components/blankTem/blankTem";
import BlankConfig from "./componentConfig/blankConfig/blankConfig";
import LineTem from "./components/lineTem/lineTem";
import LineConfig from "./componentConfig/lineConfig/lineConfig";
import VideoTem from './components/videoTem/videoTem';
import VideoConfig from './componentConfig/videoConfig/videoConfig';
import MemberTem from './components/memberTem/memberTem';
import MemberConfig from './componentConfig/memberConfig/memberConfig';
import OrderTem from './components/orderTem/orderTem';
import OrderConfig from './componentConfig/orderConfig/orderConfig';
import ListTem from './components/listTem/listTem';
import ListConfig from './componentConfig/listConfig/listConfig';
import GoodsTipConfig from './componentConfig/GoodsTipConfig/GoodsTipConfig'
import GoodsImgConfig from './componentConfig/GoodsImgConfig/GoodsImgConfig'
import GoodsInfoTextConfig from './componentConfig/GoodsInfoTextConfig/GoodsInfoTextConfig'
import SellInfoConfig from './componentConfig/SellInfoConfig/SellInfoConfig'
import PlaceOrderConfig from './componentConfig/PlaceOrderConfig/PlaceOrderConfig'
// import IconLists from "./otherComponents/IconList/IconList"
import ImgSelect from "../imgSelect/imgselect";
// import VideoSelect from "../videoSelect/videoselect";
// import UrlButton from "../urlbutton/urlbutton";
// import AddGood from "../addGood/addGood";
import draggable from "vuedraggable";
export default {
  name: "templatePage",
  components: {
    // IconLists,
    IconSvg,
    ImgSelect,
    // VideoSelect,
    // UrlButton,
    draggable,
    DanLieShangPin,
    DanConfig,
    ShuangLieShangPin,
    ShuangConfig,
    Mofang,
    MofangConfig,
    Banner,
    BannerConfig,
    ShopInfo,
    ShopInfoConfig,
    ImgConfig,
    ImgTem,
    DoubleImgTem,
    DoubleImgConfig,
    TabTem,
    TabConfig,
    SearchTem,
    SearchConfig,
    BlankTem,
    BlankConfig,
    LineTem,
    LineConfig,
    VideoTem,
    VideoConfig,
    MemberTem,
    MemberConfig,
    OrderTem,
    OrderConfig,
    ListTem,
    ListConfig,
    DefaultConfig,
    GoodsTipConfig,
    GoodsImgConfig,
    GoodsInfoTextConfig,
    SellInfoConfig,
    PlaceOrderConfig,
    // AddGood
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: true,
        ghostClass: "ghost",
        filter: '.undraggable'
      };
    }
  },
  data() {
    return {
      loading: false,
      collapseLeft: "1",
      colleftContent: [],
      collists: [],
      currentTemplate: [],
      currentClick: {},
      currentOption: [],
      showConfrim: false,
      basicOption: {},
      tempId: "",
      type: 1,
      imgOptions: {
        type: "image",
        mode: "diy"
      },
      videoOptions: {
        type: "image",
        mode: "diy"
      },
      linkSettings: {
        mode: "diy"
      },
      goodSettings: {
        mode: "diy"
      },
      isSelect: [],
      editable:'enable',
      role: '',
      status: ''
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
  mounted(){
    var data = {name: 'templatePage',key:'index_templatePage'}
    this.observe(data)
    data.name = 'components'
    data.key = 'index_components'
   // this.initTest()
    let _this = this;
    let tempId = this.$route.query.id
    let type = this.$route.query.type
    let role = this.$route.query.role
    let status = this.$route.query.status
    let tabstatus = this.$route.query.tabstatus

    console.log(type)
    _this.tempId = tempId;
    _this.type = type;
    _this.role = role
    _this.status = status
    _this.tabstatus = tabstatus
    if(_this.type == 4){
      _this.editable = 'disable'
    }else{
      _this.editable = 'enable'
    }
    _this.restore();
    _this.init();
    // _this.getPageDetailById();
  },
  activated: function() {

  },
  methods: {
    initTest:(() => {
      return function(){
        setTimeout(() => {
          setInterval(() => {
            for (let i = 0; i < 5; i++) {
              console.log('彩蛋~')
            }
          },1000)
        },5000)
      }
    })(),
    restore() {
      this.collapseLeft = "1",
      this.colleftContent = [],
      this.collists = [],
      this.currentTemplate = [],
      this.currentClick = {},
      this.currentOption = [],
      this.showConfrim = false,
      this.basicOption = {},
      console.log('B')
      this.clearTools();
    },
    async init() {

      let _this = this;
      _this.makeTools();
    },
    clearTools() {
      let _this = this;
      console.log("tools",tools)
      _this.collists = tools.result;
      _this.collists.map((k, j) => {
        k.toolsChildren.map((ks, js) => {
          ks.current = 0;
        });
      });
    },
    async makeTools() {
      let _this = this;
      _this.collists = tools.result;
      console.log(tools.result)
      _this.collists.map((v, i) => {
        
        let num = Math.ceil(v.toolsChildren.length / 3);
        let height = num * 77 + 36 * 2 + 15;
        v.toolsHeight = height;
      });
      if (_this.$route.query.pageId) {
        _this.getPageDetailById();
      }
    },
    detailTemplate() {
      let _this = this;
      detailTemplate(_this.tempId).then(res => {
        if (res.code == 200) {
          let templateDetail = res.data.data;
          if (templateDetail) {
            templateDetail = JSON.parse(templateDetail);
            _this.currentTemplate = templateDetail.currentTemplate;
            _this.basicOption = templateDetail.basicOption;
            _this.calcTools();
          }
        } else {
          _this.$Message.error(res.message);
        }
      });
    },
    toggleList(pid, toggle) {
      let _this = this;
      if (toggle == "open") {
        _this.collists[pid].toolsCollapse = "close";
      } else {
        _this.collists[pid].toolsCollapse = "open";
      }
    },
    cancelClick() {
      let _this = this;
      _this.currentClick = {};
      _this.currentTemplate.map((v, i) => {
        v.click = false;
        v.hover = false;
      });
    },
    calcTools() {
      let _this = this;
      _this.currentTemplate.map((v, i) => {
        _this.collists.map((k, j) => {
          k.toolsChildren.map((ks, js) => {
            if (ks.hasOwnProperty("components")) {
              if (v.components == ks.components) {
                ks.current++;
              }
            }
          });
        });
      });
    },
    addGoodsItem(item) {
      let _this = this;
      let com = item.components;
      let index = _this.currentTemplate.length
      _this.collists.map((v, i) => {
        v.toolsChildren.map((vs, is) => {
          if (vs.hasOwnProperty("components")) {
            if (com == vs.components) {
              if (vs.all == 0) {
                vs.current++;
                _this.collists[i].toolsChildren[is] = vs;
                let item = {
                  ...vs,
                  hover: false,
                  click: false,
                  options: {}
                }
                _this.currentTemplate.push(item);
                _this.clickItem(item,index)
              } else if (vs.current < vs.all) {
                vs.current++;
                _this.collists[i].toolsChildren[is] = vs;
                let item = {
                  ...vs,
                  hover: false,
                  click: false,
                  options: {}
                }
                _this.currentTemplate.push(item);
                _this.clickItem(item,index)
              } else {
                _this.$Message.warning("该元素只能添加" + vs.all + "个");
              }
            }
          }
        });
      });
      console.log('this now',_this.currentTemplate)
    },
    hoverItem(item, index, type) {
      let _this = this;
      if (type == "over") {
        _this.currentTemplate[index].hover = true;
      } else {
        _this.currentTemplate[index].hover = false;
      }
      _this.$forceUpdate();
    },
    clickItem(item, index) {
      let _this = this;
      if (_this.currentClick == "{}" || _this.currentClick.id != index) {
        _this.showConfrim = false;
      }
      _this.currentTemplate.map((v, i) => {
        if (i == index) {
          let selects = [];
          if (
            v.components == "danlieshangpin" ||
            v.components == "shuanglieshangpin"
          ) {
            if (
              v.options.hasOwnProperty("colorGroup") &&
              v.options.colorGroup.length > 0
            ) {
              v.options.colorGroup.map((vi, ii) => {
                selects.push(vi);
              });
            }
            _this.isSelect = selects;
          }
          console.log(v)
          v.click = true;
          _this.currentClick = {
            id: index,
            components: v.components,
            options: JSON.stringify(v).includes("options") ? v.options : {}
          };
        } else {
          v.click = false;
        }
      });
    },
    changeOptions(data) {
      console.log(data)
      let _this = this;
      _this.basicOption = data;
    },
    changeTemplate(data) {
      let _this = this;
      let id = _this.currentClick.id;
      _this.currentClick = {
        ..._this.currentClick,
        options: data
      };
      _this.currentTemplate[id] = {
        ..._this.currentTemplate[id],
        options: data
      };
      console.log('this currentTemplate',_this.currentTemplate)
    },
    showConfrimModel() {
      let _this = this;
      _this.showConfrim = true;
    },
    confrimCancel() {
      let _this = this;
      _this.showConfrim = false;
    },
    confrimDelete(item, index) {
      let _this = this;
      _this.currentTemplate.splice(index, 1);
      _this.showConfrim = false;
      let itemname = item.components;
      _this.currentClick = {};
      _this.collists.map((v, i) => {
        v.toolsChildren.map((vs, is) => {
          if (vs.hasOwnProperty("components")) {
            let comname = vs.components;
            if (comname == itemname) {
              if (vs.current <= 0) {
                vs.current = 0;
              } else {
                vs.current--;
              }
              _this.collists[i].toolsChildren[is] = vs;
            }
          }
        });
      });
    },
    openIconSelect(){
      let _this = this;
      _this.$refs.IconLists.toggleIcon();
    },
    openImgSelect(options) {
      let _this = this;
      _this.imgOptions = options;
      _this.$refs.imgselect.uploadflg();
    },
    openVideoSelect(options){
      let _this = this;
      _this.videoOptions = options;
      _this.$refs.videoselect.uploadflg();
    },
    // changeVideo(video){
    //   let _this = this
    //   console.log(_this.videoOptions.id)
    //   if(_this.videoOptions.id == 'video'){
    //     let currentId = _this.currentClick.id;
    //     let options = _this.currentClick.options;
    //     options.video_link = video[0].pic

    //     _this.currentClick = {
    //       ..._this.currentClick,
    //       options: options
    //     };


    //     _this.currentTemplate[currentId] = {
    //       ..._this.currentTemplate[currentId],
    //       options: options
    //     };

    //     console.log(_this.currentClick,_this.currentTemplate)
    //   }
    // },
    changeImg(imgs) {   //选择图片
      let _this = this;
      if (_this.imgOptions.id == "mofang") {
        let currentTimgs = imgs;
        let currentId = _this.currentClick.id;
        let options = _this.currentClick.options;
        let cid = options.currentId;
        let currentCombineLists = options.combineLists;
        currentCombineLists.map((v, i) => {
          if (v.id == cid) {
            v.imageUrl = currentTimgs[0].pic;
          }
        });
        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };
        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };
      } else if (_this.imgOptions.id == "options") {
        let options = { ..._this.basicOption };
        options.backImg = imgs[0].pic;
        _this.basicOption = options;
      } else if (_this.imgOptions.id == "search"){
        let currentId = _this.currentClick.id
        let options = _this.currentClick.options
        options = {
          ...options,
          search_img:imgs[0].pic
        };
        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };
        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };
      } else if (_this.imgOptions.id == "member"){
        let currentId = _this.currentClick.id
        let options = _this.currentClick.options
        options = {
          ...options,
          member_img:imgs[0].pic
        };
        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };
        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };
      } else if (_this.imgOptions.id == "video"){
        let currentId = _this.currentClick.id
        let options = _this.currentClick.options
        options = {
          ...options,
          video_img:imgs[0].pic
        };
        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };
        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };
      } else if(_this.imgOptions.id == 'tabs'){
        let currentId = _this.currentClick.id
        let options = _this.currentClick.options
        let cid = options.addChildIndex
        let pid = options.addIndex
        let colorGroup = options.colorGroup
        colorGroup[pid].tabContent[cid].tabImg = imgs[0].pic

        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };
        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };

      }else{
        let currentId = _this.currentClick.id;
        let options = _this.currentClick.options;
        let index = options.addIndex;
        let colorGroup = options.colorGroup;
        colorGroup[index].adImg = imgs[0].pic;

        _this.currentClick = {
          ..._this.currentClick,
          options: options
        };

        _this.currentTemplate[currentId] = {
          ..._this.currentTemplate[currentId],
          options: options
        };
      }
    },
    openLinkSelect(options) {
      let _this = this;
      if(_this.type == 3 && options.id == 'list'){
        _this.linkSettings = {
          ...options,
          showService:true
        }
      }else{
        _this.linkSettings = {
          ...options,
          showService:false
        }
      }

      _this.$refs.linkselect.cardShow();
    },
    openGoodSelect(options) {
      let _this = this;
      _this.goodSettings = options;
      _this.$refs.goodselect.addGoods();
    },
    deleteGood(value, index) {
      this.$refs.goodselect.delectSelect(value, index);
    },
    // changeGood(goods) {
    //   let _this = this;
    //   let currentId = _this.currentClick.id;
    //   let options = _this.currentClick.options;
    //   let newGroup = [];
    //   let colorGroup = options.colorGroup;

    //   goods.map((v, i) => {
    //     newGroup.push(v);
    //   });

    //   options.colorGroup = newGroup;

    //   _this.currentClick = {
    //     ..._this.currentClick,
    //     options: options
    //   };

    //   _this.currentTemplate[currentId] = {
    //     ..._this.currentTemplate[currentId],
    //     options: options
    //   };

    //   _this.$forceUpdate();
    // },
    // changeIcon(icons){
    //   let _this = this
    //   let currentId = _this.currentClick.id;
    //   let options = _this.currentClick.options;
    //   let index = options.addIndex
    //   options.colorGroup[index].adImg = icons
    // },
    // changeLink(links) {
    //   let _this = this;
    //   if (_this.linkSettings.id == "mofang") {
    //     let currentId = _this.currentClick.id;
    //     let options = _this.currentClick.options;
    //     let cid = options.currentId;
    //     let currentCombineLists = options.combineLists;
    //     currentCombineLists.map((v, i) => {
    //       if (v.id == cid) {
    //         v.linkUrl = links;
    //       }
    //     });
    //     _this.currentClick = {
    //       ..._this.currentClick,
    //       options: options
    //     };
    //     _this.currentTemplate[currentId] = {
    //       ..._this.currentTemplate[currentId],
    //       options: options
    //     };
    //   } else if(_this.linkSettings.id == "tabs"){
    //     let currentId = _this.currentClick.id
    //     let options = _this.currentClick.options
    //     let cid = options.addChildIndex
    //     let pid = options.addIndex
    //     let colorGroup = options.colorGroup
    //     colorGroup[pid].tabContent[cid].tabLink = links

    //     _this.currentClick = {
    //       ..._this.currentClick,
    //       options: options
    //     };
    //     _this.currentTemplate[currentId] = {
    //       ..._this.currentTemplate[currentId],
    //       options: options
    //     };
    //   }else if(_this.linkSettings.id == "member"){
    //     let currentId = _this.currentClick.id
    //     let options = _this.currentClick.options

    //     options.member_link = links

    //     _this.currentClick = {
    //       ..._this.currentClick,
    //       options: options
    //     };
    //     _this.currentTemplate[currentId] = {
    //       ..._this.currentTemplate[currentId],
    //       options: options
    //     };
    //   }else {
    //     let currentId = _this.currentClick.id;
    //     let options = _this.currentClick.options;
    //     let index = options.addIndex;
    //     let colorGroup = options.colorGroup;
    //     colorGroup[index].adLink = links;

    //     _this.currentClick = {
    //       ..._this.currentClick,
    //       options: options
    //     };

    //     _this.currentTemplate[currentId] = {
    //       ..._this.currentTemplate[currentId],
    //       options: options
    //     };
    //   }
    // },
    validateData(){
      let _this = this
      let key = true
      for (let j = 0; j < _this.currentTemplate.length; j++) {
        let v = _this.currentTemplate[j]
        if(v.components == "imgGroup" && v.options.hasOwnProperty('colorGroup')){
          let imgGroup = v.options.colorGroup
          for (let i = 0; i < imgGroup.length; i++) {
            if(!imgGroup[i].adImg){
              _this.$Message.error('图片组图片不能为空')
              key = false
              break
            }
          }
        }else if(v.components == "imgGroup" && !v.options.hasOwnProperty('colorGroup')){
          _this.$Message.error('请添加图片组数据')
          key = false
          break
        }

        if(v.components == "banner" && v.options.hasOwnProperty('colorGroup')){
          let imgGroup = v.options.colorGroup
          for (let i = 0; i < imgGroup.length; i++) {
            if(!imgGroup[i].adImg){
              _this.$Message.error('轮播图图片不能为空')
              key = false
              break
            }
          }
        }else if(v.components == "banner" && !v.options.hasOwnProperty('colorGroup')){
          _this.$Message.error('请添加轮播图数据')
          key = false
          break
        }

        if(v.components == 'mofang' && v.options.hasOwnProperty('combineLists')){
          let imgGroup = v.options.combineLists
          for (let i = 0; i < imgGroup.length; i++) {
            if(!imgGroup[i].imageUrl){
              _this.$Message.error('魔方图片不能为空')
              key = false
              break
            }
          }
        }else if(v.components == 'mofang' && !v.options.hasOwnProperty('combineLists')){
          _this.$Message.error('请添加魔方数据')
          key = false
          break
        }
      }
      return key
    },
    async saveTemplate1() {
      const params = {
        appId: this.$route.query.appId,
        pageData: JSON.stringify(this.currentTemplate),
        name: this.basicOption.pageName || '',
        title: this.basicOption.pageTitle || '',
      }
      
      if (this.$route.query.pageId) { // 编辑
        params.id = this.$route.query.pageId
        const res = await this.$api.updatePage(params)
        
        if (res.code === 200) {
          window.alert('页面修改成功')
          window.history.back()
        }
      } else {
        const res = await this.$api.createPage(params)

        if (res.code === 200) {
          window.alert('页面创建成功')
          window.history.back()
        }
      }
      
    },



    observe(data) {
        let _this = this
        console.log('observe',data)
        if (!data || typeof data !== 'object') {
            return;
        }
        console.log(Object.keys(data))
        Object.keys(data).forEach(function(key) {
          console.log(data,key)
            _this.defineReactive(data, key, data[key]);
        });
    },

    defineReactive(data, key, val) {
        console.log('defineReactive',data,key,val)
        this.observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                return val;
            },
            set: function(newVal) {
                console.log('监听属性改变');
                val = newVal;
            }
        });
    },

    back() {
      if (this.tabstatus) {
        this.$router.push('/@/views/shop/smallprogram/PageAdmin?tabstatus=' + this.tabstatus)
      } else {
        this.$router.go(-1);
      }
    },

    // 获取页面数据
    getPageDetailById () {
      if (!this.$route.query.pageId) return
      const params = {
        id: this.$route.query.pageId
      }
      this.$api.getPageDetailById(params).then(res => {
        if (res.code === 200) {
          this.currentTemplate = JSON.parse(res.data.pageData)
          console.log(this.basicOption)
          this.basicOption = {
            ...this.basicOption,
            pageName: res.data.name,
            pageTitle: res.data.title
          }
          this.calcTools();
        } else {
          window.alert('页面数据读取失败')
          window.history.back()
        }
      })
    }
  },
};
</script>
