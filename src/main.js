import Vue from 'vue'
import myApp from './my-app'
import Vuex from 'vuex'
import './assets/config/config.js'
import './assets/svg/svg-main.js'
import './assets/bls/main'
import './assets/css/all.css'
import './assets/filter/changeImagecolor'

import { color } from './modelColor'
Vue.use(Vuex);
Vue.config.productionTip = true;
if (globalData.query.scene === 'shop') window.document.domain = globalData.myDomain;
var myStore = new Vuex.Store({
  state: {
    svgBoxShow: false,
    whatTool: 1, //1为颜色工具 2为图片工具 3为文字工具 4为模型选择工具 5为可变色图片工具
    svgKeys: {},
    whichSvg: '',
    imageToolShow: false,
    copyBoxShow: false,
    svgColorObj: {},
    choisePantone: { rgb: '', pantone: '' },
    pantoneBoxShow: false,
    canUndo: false,
    canRedo: false,
    imageTimes: {},
    changeText: false,
    textObj: {
      txt: '', font: '5', fill_color: '000033', text_shape: 'NORMAl', stroke: '', strokewidth: '4', h: '150', shape_set: '4',
      pantone1: 'Black 6C', pantone2: ''
    }, // CURVE NORMAl
    colorTitle: 'Choose Your Colour', // Choose Your Colour , Font Colors
    fontShow: false,
    outlineShow: false,
    shapeShow: false,
    salt: 'SSFSlwm588ADF#$#SADFE#ASDFAS(*&D',
    pantoneData: [],
    latelyColor: JSON.parse(localStorage.getItem('latelyColor')) || [],
    smallScreen: false,
    title: '',
    categoriesTabShow: false,
    canvasLoading: false,
    shadeState: 0, //遮罩状态 0不显示 1显示帮助遮罩 2显示保存遮罩 3显示加载遮罩 //4显示离开警告遮罩 //5显示分享遮罩 //6显示加载其他模型警告遮罩
    shareUrl: window.globalData.base3, //分享地址
    commonColorBtn: false
  },
  mutations: {
    initVue(state) {
      state.svgBoxShow = false;
      state.whatTool = 1;
      state.svgKeys = {};
      state.whichSvg = '';
      state.svgColorObj = {};
      state.choisePantone = { rgb: '', pantone: '' };
      state.canUndo = false;
      state.canRedo = false;
      state.imageTimes = {};
      state.textObj = {
        txt: '', font: '5', fill_color: '000033', text_shape: 'NORMAl', stroke: '', strokewidth: '4', h: '150', shape_set: '4',
        pantone1: 'Black 6C', pantone2: ''
      };
      state.title = '';
      state.categoriesTabShow = false;
      state.shadeState = 0;
      state.commonColorBtn = false;
    },
    setSvgBoxShow(state, msg) {
      state.svgBoxShow = msg;
    },
    setWhatTool(state, msg) {
      state.whatTool = msg;
    },
    addSvgKeys(state, msg) {
      var obj = {};
      obj.flag = msg.flag;
      obj.title = msg.title;
      Vue.set(state.svgKeys, msg.key, obj);
    },
    setWhichSvg(state, msg) {
      state.whichSvg = msg;
    },
    setImageToolShow(state, msg) {
      state.imageToolShow = msg;
    },
    setCopyBoxShow(state, msg) {
      state.copyBoxShow = msg;
    },
    addSvgColorOps(state, msg) {
      Vue.set(state.svgColorObj, msg, []);
    },
    pushSvgColor(state, msg) {
      state.svgColorObj[msg.key].push({ rgb: msg.rgb, pantone: msg.pantone });
    },
    changeSvgColor(state, msg) {
      var i = 0, len = state.svgColorObj[msg.key].length, flag = !!msg.color2;
      for (i; i < len && msg.color1; i++)if (state.svgColorObj[msg.key][i].rgb === msg.color1) {
        state.svgColorObj[msg.key].splice(i, 1);
        len--;
        break;
      }
      for (i = 0; i < len && msg.color2; i++)if (state.svgColorObj[msg.key][i].rgb === msg.color2.rgb) flag = false;
      if (flag) state.svgColorObj[msg.key].push(msg.color2);
    },
    setChoisePantone(state, msg) {
      state.choisePantone.rgb = msg.rgb;
      state.choisePantone.pantone = msg.pantone;
    },
    setPantoneBoxShow(state, msg) {
      state.pantoneBoxShow = msg;
    },
    setCanUndo(state, msg) {
      state.canUndo = msg;
    },
    setCanRedo(state, msg) {
      state.canRedo = msg;
    },
    addImageTimes(state, msg) {
      if (state.imageTimes[msg] === undefined) {
        Vue.set(state.imageTimes, msg, 1);
      } else {
        state.imageTimes[msg]++;
      }
    },
    subImageTimes(state, msg) {
      state.imageTimes[msg]--;
    },
    setChangeText(state, msg) {
      state.changeText = msg;
    },
    setTextObj(state, msg) {
      state.textObj[msg.key] = msg.value;
    },
    setColorTitle(state, msg) {
      state.colorTitle = msg;
    },
    setFontShow(state, msg) {
      state.fontShow = msg;
    },
    setOutlineShow(state, msg) {
      state.outlineShow = msg;
    },
    setShapeShow(state, msg) {
      state.shapeShow = msg;
    },
    addPantoneData(state, msg) {
      state.pantoneData.push(msg);
    },
    addLatelyColor(state, msg) {
      var i = 0, len = state.latelyColor.length;
      for (i; i < len; i++)if (state.latelyColor[i].rgb === msg.rgb) {
        state.latelyColor.splice(i, 1);
        break;
      };
      if (state.latelyColor.unshift({ rgb: msg.rgb, pantone: msg.pantone }) > 9) state.latelyColor.pop();
      localStorage.setItem('latelyColor', JSON.stringify(state.latelyColor));
    },
    setSmallScreen(state, msg) {
      state.smallScreen = msg;
    },
    setTitle(state, msg) {
      state.title = msg;
      if (state.shareUrl[state.shareUrl.length - 1] === '=') state.shareUrl += state.title;
    },
    setCanvasLoading(state, msg) {
      if (!msg && globalData.query.scene === 'shop' && globalData.query.bz_edit === '0') state.categoriesTabShow = true;
      perFun(msg)
      state.canvasLoading = msg;
    },
    setShadeState(state, msg) {
      state.shadeState = msg;
    },
    setShareUrl(state, msg) {
      state.shareUrl = window.globalData.base3 + '?designid=' + msg + '&title=';
      if (state.title) state.shareUrl += state.title;
    },
    setCommonColorBtn(state, msg) {
      state.commonColorBtn = msg;
    }
  },
  getters: {},
  actions: {}
});
window.getFontPic = function (obj, cb) {
  var myArr = [myStore.state.salt], myObj = {};
  for (var k in obj) {
    myArr.push(obj[k]);
    myObj[k] = obj[k];
  };
  myObj.signature = abcde(myArr.sort().join(''));
  $.ajax({
    type: 'POST',
    url: resourceUrl.buildFontImage,
    data: myObj,
    success: function (res) {
      if (res.error_code === 0) {
        cb && cb(globalData.base2 + res.data);
      } else {
        alert('Failed,please try again');
      }
    }
  });
};
// $.ajax({
//   url: resourceUrl.getPantone,
//   success: function (res) {
//     var colorData = JSON.parse(res), k, i;
//     colorData['Cool Gray10C'][8] = { rgb: '000033', pantone: 'Black 6C' };
//     for (k in colorData) for (i = 0; i < colorData[k].length; i++) myStore.commit('addPantoneData', colorData[k][i]);
//   }
// });
// console.error(color);

var colorData = color, k, i;
colorData['Cool Gray10C'][8] = { rgb: '000033', pantone: 'Black 6C' };
for (k in colorData) for (i = 0; i < colorData[k].length; i++) myStore.commit('addPantoneData', colorData[k][i]);

window.setProduct = function (title, flag) {
  window.myStore.commit('setTitle', title);
  if (flag) window.myStore.commit('setShadeState', 4);
};
window.myVueApp = {};
window.myStore = myStore;
new Vue({ store: myStore, el: '#app', components: { myApp }, render: h => h(myApp) });



// WEBPACK FOOTER //
// ./src/main.js
