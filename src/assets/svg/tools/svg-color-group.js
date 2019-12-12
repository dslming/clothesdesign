var svgColorGroup = {
  colorGroupObj: {}, //颜色组的对象
  noColorEls: ['g', 'image', 'desc', 'defs', 'clipPath', 'linearGradient', 'radialGradient']
}
//检索出所有能填充的裁片
svgColorGroup.searchEls = function (key, svg) {
  var els = svg.selectAll('*'), len = els.length, i = 0, type = null;
  this.colorGroupObj[key] = {};
  myStore.commit('addSvgColorOps', key);
  for (i; i < len; i++) {
    type = els[i].type;
    //过滤出需要取颜色的元素
    if (!this.noColorEls.includes(type) && els[i].parent().type !== 'clipPath') {
      this.colorGroup(key, els[i], type, svg);
    } else if (type === 'linearGradient' || type === 'radialGradient') {
      //渐变色标签id更改
      this.fristTime && this.changeGradientId(key, els[i]);
    }
  }
};
// 将所有颜色分组
svgColorGroup.colorGroup = function (key, el, type) {
  var rgb, color;
  if (type === 'stop') {
    color = el.attr('style').slice(12).toUpperCase();
    //将颜色放入颜色分组对象中
    this.addColorInGroup(color, el, key);
    return;
  }
  rgb = el.attr('fill');
  //将填充为'none'的元素删除,没有填充只使用边框线作为颜色部分与给选中的部件添加边框冲突,都没有的话这个元素存在没意义
  if (rgb === 'none') {
    el.remove();
  } else if (typeof rgb === 'string' && rgb[0] !== 'u') {
    //进来这里说明这个元素填充色有意义,且不是用一个渐变色标签填充的
    color = Snap.getRGB(rgb).hex.replace('#', '').toUpperCase();
    //将颜色放入颜色分组对象中
    this.addColorInGroup(color, el, key);
    //给可以点击的元素添加点击事件
    this.clickSvg(el);
  } else if (typeof rgb !== 'string' || rgb[0] === 'u') {
    //进来这里说明这个元素使用一个渐变色标签填充的 将使用渐变标签填充的元素的填充渐变色更改 如果不是第一次打开则不需要更改
    this.fristTime && this.changeGradientFill(key, el, rgb);
  }
};
//将渐变色标签id更改
svgColorGroup.changeGradientId = function (key, el) {
  var nowId = el.attr('id') + key;
  el.attr('id', nowId);
};
//将使用渐变标签填充的元素的填充渐变色更改
svgColorGroup.changeGradientFill = function (key, el, rgb) {
  var nowId;
  if (typeof rgb === 'object') {
    //进来这里说明在更改这个元素的填充时用于填充这个元素的渐变色标签的id还没有更改
    nowId = rgb.attr('id') + key;
  } else {
    //进来这里这渐变色元素的id先更改了 rgb 谷歌浏览器得到的是 url("#caipian_1_") ie浏览器得到的是url(#caipian_1_)
    nowId = rgb.split('#')[1].replace(/"?\)/, '') + key;
  }
  el.attr('fill', 'url(#' + nowId + ')');
};
svgColorGroup.addColorInGroup = function (color, el, key) {
  //如果分组对象里没有则创建一个空数组
  var pantone;
  if (!this.colorGroupObj[key][color]) {
    pantone = el.attr('pantone') || '';
    myStore.commit('pushSvgColor', { key: key, rgb: color, pantone: pantone });
    this.colorGroupObj[key][color] = [];
  }
  //将这元素添加到分组对象对应的颜色数组中
  this.colorGroupObj[key][color].push(el);
};
//通过颜色值和key值获取这个颜色值在对应key里的颜色分组中的裁片
svgColorGroup.getColorInGroupByColor = function (color, key) {
  var piceArr = [], k, i, len;
  if (key) {
    len = this.colorGroupObj[key][color].length;
    for (i = 0; i < len; i++) {
      piceArr.push(this.colorGroupObj[key][color][i]);
    }
  } else {
    for (k in this.colorGroupObj) if (this.colorGroupObj[k][color]) {
      len = this.colorGroupObj[k][color].length;
      for (i = 0; i < len; i++) {
        piceArr.push(this.colorGroupObj[k][color][i]);
      }
    }
  }
  return piceArr;
};
export default svgColorGroup;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-color-group.js
