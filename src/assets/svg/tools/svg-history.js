var svgHistory = {
  nowIndex: -1,
  historyArr: [],
  historyObj: null
}, maxTemp = 10;
//添加历史记录开始状态
svgHistory.addHistoryStart = function (opt) {
  var obj = { start: opt };
  this.historyObj = obj;
};
//把历史记录的end状态添加到新的历史记录的开始状态
svgHistory.addHistoryEndToStart = function () {
  var obj;
  if (!this.historyObj) {
    obj = this.historyArr[this.nowIndex].end;
    this.choiseColor({ rgb: obj.rgb, pantone: obj.pantone }, obj.changeArr, obj.key, true);
  }
};
//添加历史记录结束状态
svgHistory.addHistoryEnd = function (opt) {
  this.historyObj.end = opt;
  if (this.nowIndex + 1 < this.historyArr.length) {
    this.historyArr.splice(++this.nowIndex, this.historyArr.length - this.nowIndex, this.historyObj);
  } else {
    this.nowIndex = this.historyArr.push(this.historyObj) - 1;
  }
  if (this.historyArr.length > maxTemp) {
    this.historyArr.shift();
    this.nowIndex--;
  }
  this.historyObj = null;
  myStore.commit('setCanUndo', true);
  myStore.commit('setCanRedo', false);
};
//撤回
svgHistory.undo = function () {
  var obj = this.historyArr[this.nowIndex--];
  if (obj.start.type === 'color') {
    this.choiseColor({ rgb: obj.end.rgb, pantone: obj.end.pantone }, obj.start.changeArr, obj.start.key);
    this.changeColor({ rgb: obj.start.rgb, pantone: obj.start.pantone });
  } else if (obj.start.type === 'matrix') {
    this.toMatrix(obj.start.image, obj.start.matrix, obj.start.key, obj.start.isMi);
  } else if (obj.start.type === 'layer') {
    this.layerCtrl(!obj.start.flag, false, obj.start.image, obj.start.key);
  } else if (obj.start.type === 'add') {
    this.delImg(obj.start.key, obj.start.image);
  } else if (obj.start.type === 'del') {
    this.addImg(obj.start.url, obj.start.imgid, obj.start.myuri, obj.start.key, obj.start.loc, obj.start.image, obj.start.loc2);
  } else if (obj.start.type === 'change') {
    this.changeImg(obj.start.url, obj.start.myuri, obj.start.key, obj.start.image);
  }
  myStore.commit('setCanRedo', true);
  if (this.nowIndex < 0) myStore.commit('setCanUndo', false);
};
//重做
svgHistory.redo = function () {
  var obj = this.historyArr[++this.nowIndex];
  if (obj.start.type === 'color') {
    this.choiseColor({ rgb: obj.start.rgb, pantone: obj.start.pantone }, obj.start.changeArr, obj.start.key);
    this.changeColor({ rgb: obj.end.rgb, pantone: obj.end.pantone });
  } else if (obj.start.type === 'matrix') {
    this.toMatrix(obj.start.image, obj.end.matrix, obj.start.key, obj.start.isMi);
  } else if (obj.start.type === 'layer') {
    this.layerCtrl(obj.start.flag, false, obj.start.image, obj.start.key);
  } else if (obj.start.type === 'add') {
    this.addImg(obj.start.url, obj.start.imgid, obj.start.myuri, obj.start.key, '', obj.start.image, '');
  } else if (obj.start.type === 'del') {
    this.delImg(obj.start.key, obj.start.image);
  } else if (obj.start.type === 'change') {
    this.changeImg(obj.end.url, obj.end.myuri, obj.end.key, obj.end.image);
  }
  myStore.commit('setCanUndo', true);
  if (this.nowIndex > this.historyArr.length - 2) {
    myStore.commit('setCanRedo', false);
  }
};
export default svgHistory;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-history.js
