var svgLayer = {};
svgLayer.layerCtrl = function (flag, flag2, obj, key) {
  var temp;
  obj = obj || this.currentImg;
  key = key || this.currentKey;
  if (!flag && obj.node.nextSibling) {
    if (flag2) this.addHistoryStart({ type: 'layer', image: obj, flag: flag, key: key });
    temp = Snap(obj.node.nextSibling);
    temp.after(obj);
    if (flag2) this.addHistoryEnd({ type: 'layer', image: obj, flag: flag, key: key });
    this.addToRenderLoop(key);
  } else if (flag && obj.node.previousSibling) {
    if (flag2) this.addHistoryStart({ type: 'layer', image: obj, flag: flag, key: key });
    temp = Snap(obj.node.previousSibling);
    temp.before(obj);
    if (flag2) this.addHistoryEnd({ type: 'layer', image: obj, flag: flag, key: key });
    this.addToRenderLoop(key);
  }
};
export default svgLayer;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-layer.js
