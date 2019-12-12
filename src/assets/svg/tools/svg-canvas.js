var toCanvasObj = {
  canvasObj: {},
  renderLoop: {},//等待渲染成canvas的svg的key值池子
  loopTimeout: null//等待渲染定时器
},
  svgHeader = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
  canvasSize = 40,
  blankImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=';
//创建用于渲染的canvas函数
toCanvasObj.createCanvas = function (key, svg, cb) {
  this.canvasObj[key] = document.createElement('canvas');
  //如果vue里的数据结构包含了这个key则需要计算这个canvas设置为缩略图的缩放
  if (myStore.state.svgKeys[key]) this.calcCanvasTransform(key, svg);
  cb && cb(key, this.canvasObj[key]);
};
//获取svg字符串函数
toCanvasObj.getSvgStr = function (svg, key, flag) {
  var svgStr, imgArr, i, len, imgid, uriObj, image1, commonArr;
  svg.caipian.attr('stroke', 'none');
  if (key === this.currentKey && this.currentPart) this.currentPart.attr('stroke', 'none');
  if (this.currentKey !== key) svg.attr('display', 'block');
  // 通过flag的值判断是什么情境下获取这个svg字符串
  if (flag) {
    // 为真时说明是在保存阶段, 保存阶段设置回原来的宽高
    svg.attr({ height: svg.svgH, width: svg.svgW });
    //此时将形状和图片为base64字符串的图片改为 一个空白像素的图片base64字符串 避免保存的svg太大
    imgArr = svg.selectAll('g');
    commonArr = [];
    len = imgArr.length;
    i = 0;
    for (i; i < len; i++) {
      imgid = imgArr[i].attr('imgid');
      if (imgid === 'common') {
        uriObj = JSON.parse(decodeURIComponent(imgArr[i].attr('myuri')));
        if (uriObj.color) {
          commonArr.push(imgArr[i]);
          imgArr[i].attr('dataurl', blankImg);
          image1 = imgArr[i].select('image');
          if (image1.attr('href')) {
            image1.attr('href', blankImg);
          } else {
            image1.attr('xlink:href', blankImg);
          }
        }
      }
    }
  }
  svgStr = svgHeader + svg.toString().replace(/ns[\d]*:href/gi, "xlink:href");
  svg.caipian.attr('stroke', '#333399');
  if (key === this.currentKey && this.currentPart) this.currentPart.attr('stroke', '#333399');
  if (this.currentKey !== key) svg.attr('display', 'none');
  // 这个条件决定有没有需要还原成 原来base64的形状
  if (commonArr && commonArr.length) {
    len = commonArr.length;
    for (i = 0; i < len; i++) {
      uriObj = JSON.parse(decodeURIComponent(commonArr[i].attr('myuri')));
      changeCommonImageColor(uriObj.url, uriObj.color.split(','), function (base64, color, commonG) {
        var img1 = commonG.select('image');
        commonG.attr('dataurl', base64);
        if (img1.attr('href')) {
          img1.attr('href', base64);
        } else {
          img1.attr('xlink:href', base64);
        }
      }, commonArr[i]);
    }
  }
  return svgStr;
};
//将key值推到等待渲染的池子里去
toCanvasObj.addToRenderLoop = function (key) {
  //添加到渲染池
  this.renderLoop[key] = 1;
  if (this.loopTimeout) {
    clearTimeout(this.loopTimeout);
    this.loopTimeout = null;
  }
  this.loopTimeout = setTimeout(function () {
    svgTool.loopTimeout = null;
    for (var k in svgTool.renderLoop) svgTool.startRender(k);
    svgTool.renderLoop = {};
  }, 809);
};
//开始渲染
toCanvasObj.startRender = function (key) {
  var svg = this.container[key], str;
  str = this.getSvgStr(svg, key);
  //如果vue里的数据结构包含了这个key则 清空这个key值对应的vue创造的dom
  if (myStore.state.svgKeys[key]) myVueApp.clearBox(key);
  canvg(this.canvasObj[key], str, {
    ignoreMouse: true,
    log: false,
    ignoreClear: false,
    ignoreAnimation: true,
    useCORS: true,
    ignoreDimensions: false,
    renderCallback: function () {
      //如果vue里的数据结构包含了这个key则 把这个canvas添加到vue结构里去
      if (myStore.state.svgKeys[key]) myVueApp.appendCanvas(key, svgTool.canvasObj[key]);
      window.BLS && window.BLS.updateTexture && window.BLS.updateTexture(key);
    }
  });
};
//计算canvas缩略图的偏移位置
toCanvasObj.calcCanvasTransform = function (key, svg) {
  var originX = 0, originY = 0, myScale = canvasSize / this.svgMaxSize;
  if (svg.svgW > svg.svgH) {
    originY = (canvasSize - svg.svgH * this.svgMaxSize / svg.svgW * myScale) >> 1;
  } else {
    originX = (canvasSize - svg.svgW * this.svgMaxSize / svg.svgH * myScale) >> 1;
  }
  this.canvasObj[key].style.transformOrigin = originX + 'px ' + originY + 'px 0px';
  this.canvasObj[key].style.transform = 'scale(' + myScale + ')';
};
export default toCanvasObj;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-canvas.js
