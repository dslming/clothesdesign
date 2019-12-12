var svgEvent = {
  needAddToHistory: false,
  loc: '',
  bbox: null,
  cancelLate: 0, //总共有3种状态
};
//取消选中函数
svgEvent.cancelFun = function () {
  this.triggerPart();
  this.currentImg = null;
  this.bbox = null;
  this.loc = '';
  this.needAddToHistory = false;
  this.currentPart = null;
  myStore.commit('setChangeText', false);
  myStore.commit('setCommonColorBtn', false);
  myStore.commit('setPantoneBoxShow', false);
  myStore.commit('setImageToolShow', false);
  myStore.commit('setFontShow', false);
  myStore.commit('setOutlineShow', false);
  myStore.commit('setShapeShow', false);
  myStore.commit('setCopyBoxShow', false);
  myStore.commit('setTextObj', { key: 'txt', value: '' });
};
//选中svg事件
svgEvent.clickSvg = function (el) {
  el.mousedown(function (e) {
    if (myStore.state.whatTool === 1) {
      e.preventDefault();
      e.stopPropagation();
      this.currentImg = null;
      this.bbox = null;
      this.loc = '';
      this.needAddToHistory = false;
      var color = Snap.getRGB(el.attr('fill')).hex.replace('#', '').toUpperCase();
      var pantone = el.attr('pantone') || '';
      this.triggerPart(el);
      myStore.commit('setPantoneBoxShow', true);
      myStore.commit('setChoisePantone', { rgb: color, pantone: pantone });
      myStore.commit('setColorTitle', 'Choose Your Colour');
      myStore.commit('setImageToolShow', false);
      // this.addHistoryStart(svgTool.choiseColor({rgb:color,pantone:pantone},[el]));
      svgTool.choiseColor({ rgb: color, pantone: pantone }, [el], this.currentKey, true)
    }
  }, this);
};
//图片g标签的拖拽事件
svgEvent.dragImgG = function (el) {
  var that = this, imgid;
  el.drag(function (dx, dy, x, y, e) {
    e.preventDefault();
    e.stopPropagation();
    that.needAddToHistory = true;
    that.computeM({ x: dx / that.currentSvg.ratio, y: dy / that.currentSvg.ratio, type: 't' });
  }, function (x, y, e) {
    var uriObj, k;
    e.preventDefault();
    e.stopPropagation();
    if (this !== that.currentImg) {
      imgid = this.attr('imgid');
      if (imgid === 'text') {
        uriObj = JSON.parse(decodeURIComponent(this.attr('myuri')));
        myStore.commit('setWhatTool', 3);
        for (k in uriObj) myStore.commit('setTextObj', { key: k, value: uriObj[k] });
        myStore.commit('setChangeText', true);
        myStore.commit('setCommonColorBtn', false);
      } else if (imgid === 'common') {
        myStore.commit('setChangeText', false);
        myStore.commit('setCommonColorBtn', true);
      } else {
        myStore.commit('setChangeText', false);
        myStore.commit('setCommonColorBtn', false);
      }
    }
    that.currentImg = this;
    that.loc = this.transform().local;
    that.needAddToHistory = false;
    myStore.commit('setImageToolShow', false);
    myStore.commit('setPantoneBoxShow', false);
    that.addHistoryStart({ type: 'matrix', matrix: that.loc, image: this, key: that.currentKey });
  }, function (e) {
    e.preventDefault();
    e.stopPropagation();
    myStore.commit('setImageToolShow', true);
    if (that.needAddToHistory) {
      that.addToRenderLoop(that.currentKey);
      that.addHistoryEnd({ type: 'matrix', matrix: this.transform().local, image: this, key: that.currentKey });
    }
    that.bbox = this.getBBox();
    that.computedHandle();
  });
};
export default svgEvent;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-event.js
