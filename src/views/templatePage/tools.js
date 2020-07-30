const tools = {
  "result": [
    {
      'toolsName':'订货会基础组件',
      'toolsOrder':'1',
      'toolsId':'dhh-order',
      'toolsHeight':0,
      'toolsCollapse':'open',
      'toolsChildren':[
        {
          id:101,
          name:'商品图片展示',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'GoodsImg',
          img: '/upload/pic/component/GoodsImg.png'
        },
        {
          id:102,
          name:'提示行',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'GoodsTip',
          img: '/upload/pic/component/GoodsTip.png'
        },
        {
          id:103,
          name:'商品文字信息',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'GoodsInfoText',
          img: '/upload/pic/component/GoodsInfoText.png'
        },
        {
          id:104,
          name:'售卖信息组件',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'SellInfo',
          img: '/upload/pic/component/SellInfo.png'
        },
        {
          id:105,
          name:'下单组件',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'PlaceOrder',
          img: '/upload/pic/component/PlaceOrder.png'
        },
      ]
    },
    {
      'toolsName':'基础组件',
      'toolsOrder':'1',
      'toolsId':'member',
      'toolsHeight':0,
      'toolsCollapse':'open',
      'toolsChildren':[
        {
          id:1,
          name:'个人信息',
          icon:'icon-huiyuan',
          current:0,
          all:1,
          components: 'member'
        },
        {
          id:2,
          name:'订单中心',
          icon:'icon-shangpintubiaozu',
          current:0,
          all:1,
          components: 'order'
        },
        // {
        //   id:3,
        //   name:'常用图标组',
        //   icon:'icon-changyongtubiaozu',
        //   current:0,
        //   all:1
        // },{
        //   id:3,
        //   name:'常用图标组',
        //   icon:'icon-changyongtubiaozu',
        //   current:0,
        //   all:1
        // }
      ]
    },
    {
      'toolsName': '商品类',
      'toolsOrder': '2',
      'toolsId':'shop',
      'toolsHeight': 0,
      'toolsCollapse': 'open',
      'toolsChildren': [{
          id: 1,
          name: '单列商品',
          icon: 'icon-danlieshangpin',
          current: 0,
          all: 6,
          components: 'danlieshangpin'
        }, 
        {
          id: 2,
          name: '双列商品',
          icon: 'icon-shuanglieshangpin',
          current: 0,
          all: 6,
          components: 'shuanglieshangpin'
        },
        {
          id:4,
          name:'选项卡',
          icon:'icon-xuanxiangqia',
          current:0,
          all:1,
          components: 'xuanxiangqia'
        },
        // {
        //   id:3,
        //   name:'其他类型',
        //   icon:'icon-qitaleixing',
        //   current:0,
        //   all:1
        // },{
        //   id:5,
        //   name:'猜你喜欢',
        //   icon:'icon-cainixihuan',
        //   current:0,
        //   all:1
        // },{
        //   id:6,
        //   name:'商品排行',
        //   icon:'icon-shangpinpaihang',
        //   current:0,
        //   all:1
        // }
      ]
    },
     {
      'toolsName': '图文类',
      'toolsOrder': '3',
      'toolsId':'picture',
      'toolsHeight': 0,
      'toolsCollapse': 'open',
      'toolsChildren': [{
        id: 1,
        name: '魔方',
        icon: 'icon-mofang',
        current: 0,
        all: 0,
        components: 'mofang'
      }, {
        id: 2,
        name: '图片轮播',
        icon: 'icon-banner',
        current: 0,
        all: 0,
        components: 'banner'
      }, {
        id: 3,
        name: '图片组',
        icon: 'icon-tupianzu',
        current: 0,
        all: 0,
        components: 'imgGroup'
      },{
        id: 4,
        name: '多列图片组',
        icon: 'icon-shuanglietupian',
        current: 0,
        all: 0,
        components: 'doubleimgGroup'
      },{
        id: 5,
        name: '搜索',
        icon: 'icon-search',
        current: 0,
        all: 1,
        components: 'search'
      },{
        id:6,
        name:'视频',
        icon:'icon-shipin',
        current: 0,
        all: 0,
        components:'video'
      },{
        id:7,
        name:'列表导航',
        icon:'icon-liebiaodaohang',
        current: 0,
        all: 0,
        components:'list'
      },{
        id:8,
        name:'辅助空白',
        icon:'icon-fuzhukongbai',
        current:0,
        all:0,
        components:'blank'
      },{
        id:9,
        name:'辅助线',
        icon:'icon-fuzhuxian',
        current:0,
        all:0,
        components:'line'
      }]
    }
  ]
}

export default tools
