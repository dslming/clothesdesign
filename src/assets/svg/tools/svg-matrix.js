var svgMatrix = {};
svgMatrix.computeM = function (obj) {
  this.currentImg.attr('transform', this.loc + (this.loc ? obj.type.toUpperCase() : obj.type) + [obj.x, obj.y, obj.z, obj.u]);
};
svgMatrix.mirrorM = function (flag) {
  var x, m, image = this.currentImg.select('image'), trs = image.transform();
  this.addHistoryStart({ type: 'matrix', image: this.currentImg, matrix: trs.local, key: this.currentKey, isMi: true });
  if (flag) {
    x = image.getBBox().cy;
    m = trs.localMatrix.multLeft(1, 0, 0, -1, 0, 2 * x);
  } else {
    x = image.getBBox().cx;
    m = trs.localMatrix.multLeft(-1, 0, 0, 1, 2 * x, 0);
  }
  image.transform(m);
  this.addHistoryEnd({ type: 'matrix', image: this.currentImg, matrix: image.transform().local, key: this.currentKey, isMi: true });
  this.addToRenderLoop(this.currentKey);
};
svgMatrix.fullSvg = function (flag) {
  var sca, x, y, scaW, scaH;
  scaW = this.currentSvg.svgW / this.bbox.w;
  scaH = this.currentSvg.svgH / this.bbox.h;
  if (flag) {
    sca = scaW < scaH ? scaW : scaH;
  } else {
    sca = scaW > scaH ? scaW : scaH;
  }
  x = this.currentSvg.svgW - this.bbox.w * sca >> 1;
  y = this.currentSvg.svgH - this.bbox.h * sca >> 1;
  this.loc = this.currentImg.transform().local;
  this.addHistoryStart({ type: 'matrix', image: this.currentImg, matrix: this.loc, key: this.currentKey });
  this.computeM({ type: 't', x: x - this.bbox.x, y: y - this.bbox.y });
  this.loc = this.currentImg.transform().local;
  this.computeM({ type: 's', x: sca, y: sca, z: x, u: y });
  this.addHistoryEnd({ type: 'matrix', image: this.currentImg, matrix: this.currentImg.transform().local, key: this.currentKey });
  this.bbox = this.currentImg.getBBox();
  this.computedHandle();
  this.addToRenderLoop(this.currentKey);
};
svgMatrix.alignSvg = function (flag) {
  var x = 0, y = 0;
  if (flag) {
    y = this.currentSvg.svgH / 2 - this.bbox.cy | 0;
  } else {
    x = this.currentSvg.svgW / 2 - this.bbox.cx | 0;
  }
  if (!x && !y) return;
  this.loc = this.currentImg.transform().local;
  this.addHistoryStart({ type: 'matrix', image: this.currentImg, matrix: this.loc, key: this.currentKey });
  this.computeM({ type: 't', x: x, y: y });
  this.addHistoryEnd({ type: 'matrix', image: this.currentImg, matrix: this.currentImg.transform().local, key: this.currentKey });
  this.bbox = this.currentImg.getBBox();
  this.computedHandle();
  this.addToRenderLoop(this.currentKey);
};
svgMatrix.toMatrix = function (obj, matrix, key, isMi) {
  if (isMi) {
    obj.select('image').attr('transform', matrix);
  } else {
    obj.attr('transform', matrix);
  }
  this.addToRenderLoop(key);
  this.bbox = obj.getBBox();
  // 如果图片操作工具显示则重新计算操作框的位置
  if (myStore.state.imageToolShow) this.computedHandle();
};
export default svgMatrix;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-matrix.js
