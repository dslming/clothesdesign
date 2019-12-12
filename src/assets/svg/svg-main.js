import svgLoader from './tools/svg-loader'
import svgToCanvas from './tools/svg-canvas'
import svgColor from './tools/svg-color'
import svgHistroy from './tools/svg-history'
import svgImage from './tools/svg-image'
import svgMatrix from './tools/svg-matrix'
import svgClip from './tools/svg-clip'
import svgEvent from './tools/svg-event'
import svgColorGroup from './tools/svg-color-group'
import svgLayer from './tools/svg-layer'

function MyTool() {
  var i = 0, len = arguments.length, k;
  for (; i < len; i++)for (k in arguments[i]) {
    if (typeof arguments[i][k] === 'function') {
      MyTool.prototype[k] = arguments[i][k];
    } else {
      this[k] = arguments[i][k];
    }
  }
};
//计算元素的bbox数据到dom结构上
MyTool.prototype.computedHandle = function () {
  var w, h, x, y;
  w = this.bbox.w * this.currentSvg.ratio;
  h = this.bbox.h * this.currentSvg.ratio;
  x = this.currentSvg.startX + this.bbox.x * this.currentSvg.ratio;
  y = this.currentSvg.startY + this.bbox.y * this.currentSvg.ratio;
  myVueApp.move(w, h, x, y);
};
MyTool.prototype.init = function () {
  // svg-loader
  var k;
  for (k in this.container) {
    this.container[k].remove();
    this.container[k] = null;
  }
  this.container = {};
  this.currentKey = '';
  this.currentSvg = null;
  this.currentPart = null;
  this.fristTime = true;
  this.svgShowed = false;
  // svg-canvas
  for (k in this.canvasObj) this.canvasObj[k] = null;
  this.canvasObj = {};
  if (this.loopTimeout) {
    clearTimeout(this.loopTimeout);
    this.loopTimeout = null;
    svgTool.renderLoop = {};
  }
  // svg-color-group
  this.colorGroupObj = {};
  // svg-color
  this.tempPiceArr = null;
  this.tempObj = { rgb: '', pantone: '', key: '', flag: false };
  // svg-event
  this.needAddToHistory = false;
  this.loc = '';
  this.bbox = null;
  this.cancelLate = 0;
  // svg-history
  this.nowIndex = -1;
  this.historyArr = [];
  this.historyObj = null;
  // svg-image
  this.currentImg = null;
};
window.svgTool = new MyTool(svgLoader, svgToCanvas, svgColor, svgHistroy, svgImage, svgMatrix, svgClip, svgEvent, svgColorGroup, svgLayer);



// WEBPACK FOOTER //
// ./src/assets/svg/svg-main.js
