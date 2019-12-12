var svgColor = {
  tempPiceArr: null,
  tempObj: { rgb: '', pantone: '', key: '', flag: false }
};
//选择颜色函数
svgColor.choiseColor = function (colorObj1, elArr, key, flag) {
  this.tempPiceArr = elArr;
  this.tempObj.rgb = colorObj1.rgb;
  this.tempObj.pantone = colorObj1.pantone;
  this.tempObj.key = key;
  this.tempObj.flag = !!flag;
  if (flag) this.addHistoryStart({ type: 'color', rgb: colorObj1.rgb, pantone: colorObj1.pantone, changeArr: this.tempPiceArr, key: key });
};
//更换颜色函数
svgColor.changeColor = function (colorObj2) {
  this.piceChange(colorObj2);
  if (this.tempObj.key) {
    this.changeGroup(this.tempObj.rgb, colorObj2, this.tempObj.key);
  } else {
    for (var k in this.colorGroupObj) {
      this.changeGroup(this.tempObj.rgb, colorObj2, k);
    }
  }
  if (this.tempObj.flag) {
    this.addHistoryEnd({ type: 'color', rgb: colorObj2.rgb, pantone: colorObj2.pantone, changeArr: this.tempPiceArr, key: this.tempObj.key });
  }
};
// 裁片换色函数
svgColor.piceChange = function (resultObj) {
  var i = 0, len = this.tempPiceArr.length;
  for (i; i < len; i++) {
    if (this.tempPiceArr[i].type === 'stop') {
      this.tempPiceArr[i].attr('style', 'stop-color:#' + resultObj.rgb);
    } else {
      this.tempPiceArr[i].attr('fill', '#' + resultObj.rgb);
    }
    this.tempPiceArr[i].attr('pantone', resultObj.pantone);
  }
};
// 裁片改变分组函数
svgColor.changeGroup = function (color1, color2, key) {
  var tagArr, nowArr, i, len, j, obj = { color1: '', color2: null, key: key }, j;
  nowArr = this.colorGroupObj[key][color1];
  if (!nowArr) return;
  this.addToRenderLoop(key);
  if (!this.colorGroupObj[key][color2.rgb]) {
    this.colorGroupObj[key][color2.rgb] = [];
    obj.color2 = { rgb: color2.rgb, pantone: color2.pantone };
  }
  tagArr = this.colorGroupObj[key][color2.rgb];
  len = this.tempPiceArr.length;
  for (i = 0; i < len; i++)for (j = 0; j < nowArr.length; j++) {
    if (this.tempPiceArr[i] === nowArr[j]) {
      tagArr.push(this.tempPiceArr[i]);
      nowArr.splice(j, 1);
      break;
    }
  }
  if (!nowArr[0]) {
    delete this.colorGroupObj[key][color1];
    obj.color1 = color1;
  }
  myStore.commit('changeSvgColor', obj);
};
export default svgColor;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-color.js
