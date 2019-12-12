var myDomain = 'tontossport.com';
var base1 = 'https://diy.' + myDomain,
  base2 = 'https://text.' + myDomain,
  base3 = 'https://c2m.' + myDomain,
  base4 = 'https://www.' + myDomain;
window.globalData = {
  // query: getQueryString(),
  query: {
    designid: "7970",//"7710",
    // sid: "c1041a53-6634-4156-ad69-08f7b005c88d",
    title: "a14c0bf1-7058-41d3-ba19-14307fe63d13",
    bz_edit: "0",
    scenee: "shop"
  },
  myDomain: myDomain, // location.hostname || myDomain
  count: 0,
  timer: null,
  uuid: null,
  saveObj: {},
  saveDesign: '0',
  base1: base1,
  base2: base2,
  base3: base1 + '/static/share.php',
  base4: base4,
  base5: base3 + '/home/myfile',
  preX: 1,
  preTimer: null,
  toDesign: '',
  toProduct: ''
};
globalData.uuid = localStorage.getItem('uuid');
if (!globalData.uuid) {
  globalData.uuid = guid();
  localStorage.setItem('uuid', globalData.uuid);
};
window.resourceUrl = {
  getMoldById: base1 + '/model/design', //加载模型
  getPantone: base1 + '/color/pantone', //获取颜色
  getImage: base1 + '/draw/getimg?sid=' + globalData.uuid + '&type=4&designid=' + globalData.query.designid, //获取图片
  uploadImage: base1 + '/draw/upimg?sid=' + globalData.uuid + '&type=4&designid=' + globalData.query.designid, //上传图片
  deleteImage: base1 + '/draw/removeimage?sid' + globalData.uuid + '&id=', //删除图片
  getBaseImage: base1 + '/draw/SysImage?page=', //获取内置图库2
  getFonts: base2 + '/api/get_fonts', //获取字体
  buildFontImage: base2 + '/api/build_font_images', //生成文件图片 png
  saveC2m: base3 + '/api/design/save', //保存到协同平台
  createDesignId: base1 + '/save/design', //保存第一步,获取设计id
  savePng: base1 + '/save/effect', //保存效果图 designid,sn,data
  saveSvg: base1 + '/save/svg', //保存svg svgname,part_id,svg,designid
  getCategories: base4 + '/index.php?route=common/menu&ajax=1', //获取分类
  getCommonImages: base4 + '/index.php?route=common/home/images' //获取可变色图形
};
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
};
function getQueryString() {
  var url = window.location.search.substr('1'); //获取url中"?"符后的字串
  var theRequest = {};
  if (url.indexOf("=") !== -1) {
    var strs = url.split("&"); //将url按照“&”位置一个个剪开，strs为一个数组
    for (var i = 0; i < strs.length; i++) {
      var prams = strs[i].split("=");
      if (prams[0]) theRequest[prams[0]] = prams[1];
    }
  }
  return theRequest;
};
window.getSaveObj = function (msg) {
  globalData.saveObj.designid = globalData.query.designid;
  globalData.saveObj.sid = globalData.uuid;
  if (globalData.query.scene === 'tontos') {
    if (globalData.query.bz_edit === '0') {
      globalData.saveObj.title = '';
    } else {
      globalData.saveObj.title = msg;
      window.myStore.commit('setTitle', msg);
      globalData.saveDesign = globalData.query.designid;
      window.myStore.commit('setShareUrl', globalData.saveDesign);
    }
  } else {
    if (globalData.query.bz_edit === '0') {
      globalData.saveObj.title = guid();
    } else {
      globalData.saveObj.title = msg;
      window.myStore.commit('setTitle', decodeURI(globalData.query.title));
      globalData.saveDesign = globalData.query.designid;
      window.myStore.commit('setShareUrl', globalData.saveDesign);
    }
  }
};
var myTimer1 = null,
  myTimer2 = null,
  requestDone = false,
  requestCount = 0;
window.saveInServer = function (cb) {
  if (globalData.saveDesign === '0' && !myTimer1) {
    $.get(resourceUrl.createDesignId, globalData.saveObj, function (res) {
      globalData.saveDesign = JSON.parse(res).newDesignId;
      window.myStore.commit('setShareUrl', globalData.saveDesign);
    });
    myTimer1 = setInterval(function () {
      if (globalData.saveDesign !== '0') {
        clearInterval(myTimer1);
        saveImgAndSvg(cb);
      }
    }, 97);
  } else if (globalData.saveDesign !== '0' && !myTimer2) {
    saveImgAndSvg(cb);
  }
};
function saveImgAndSvg(cb) {
  var saveSvgObj;
  requestCount = 2;
  imgSize = globalData.query.scene === 'tontos' ? 800 : 500;
  window.BLS.saveImage(requestCount, function (base64, sn) {
    var saveImgObj = {};
    saveImgObj.designid = globalData.saveDesign;
    saveImgObj.sn = sn;
    saveImgObj.data = base64;
    $.post(resourceUrl.savePng, saveImgObj, function () {
      requestCount--;
    });
  }, imgSize);
  for (var key in svgTool.container) {
    requestCount++;
    saveSvgObj = {};
    saveSvgObj.designid = globalData.saveDesign;
    saveSvgObj.svgname = key;
    saveSvgObj.part_id = key;
    saveSvgObj.svg = svgTool.getSvgStr(svgTool.container[key], key, true);
    $.post(resourceUrl.saveSvg, saveSvgObj, function () {
      requestCount--;
    });
  }
  for (var j in window.BLS.NotEditData) {
    requestCount++;
    saveSvgObj = {};
    saveSvgObj.designid = globalData.saveDesign;
    saveSvgObj.svgname = j;
    saveSvgObj.part_id = j;
    saveSvgObj.svg = window.BLS.NotEditData[j];
    saveSvgObj.isurl = 1;
    $.post(resourceUrl.saveSvg, saveSvgObj, function () {
      requestCount--;
    });
  }
  myTimer2 = setInterval(function () {
    if (requestCount < 1) {
      clearInterval(myTimer2);
      myTimer2 = null;
      cb && cb();
    }
  }, 509);
};
// 初始化配置参数
window.initConfig = function (opt) {
  globalData.saveDesign = '0';
  myTimer1 = null;
  globalData.query.product_id = opt.product_id;
  globalData.query.designid = opt.designid;
  globalData.saveObj.title = guid();
  globalData.saveObj.designid = opt.designid;;
};



// WEBPACK FOOTER //
// ./src/assets/config/config.js
