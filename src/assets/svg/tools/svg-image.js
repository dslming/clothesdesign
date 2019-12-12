var svgImage = {
  currentImg: null
};
//重新设置图片事件 以及对应的用户图片取消删除按钮(已经在svg中的图片不能在服务器里删除) 的函数
svgImage.reSetImg = function (svg) {
  var imgG = svg.clipG.selectAll('g'), i = 0, len = imgG.length, imgid, uriObj;
  for (i; i < len; i++) {
    imgid = imgG[i].attr('imgid');
    if (imgid === 'common') {
      uriObj = JSON.parse(decodeURIComponent(imgG[i].attr('myuri')));
      if (uriObj.color) {
        changeCommonImageColor(uriObj.url, uriObj.color.split(','), function (base64, color, commonG) {
          var img1 = commonG.select('image');
          commonG.attr('dataurl', base64);
          if (img1.attr('href')) {
            img1.attr('href', base64);
          } else {
            img1.attr('xlink:href', base64);
          }
        }, imgG[i]);
      }
    } else if (imgid !== 'default' && imgid !== 'text') {
      myStore.commit('addImageTimes', imgid);
    }
    this.dragImgG(imgG[i]);
  }
};
//加载图片函数
svgImage.loadImg = function (src, svg, cb) {
  var img = new Image();
  img.src = src;
  var that = this;
  img.onload = function (e) {
    var nx, ny;
    nx = svg.svgW - this.naturalWidth >> 1;
    ny = svg.svgH - this.naturalHeight >> 1;
    cb && cb.call(that, nx, ny, this.naturalWidth, this.naturalHeight);
  };
};
//添加图片函数
svgImage.addImg = function (url, imgid, myuri, key, loc, image1, loc2) {
  var mykey = key || this.currentKey,
    currentSvg = this.container[mykey];
  this.loadImg(url, currentSvg, function (x, y, w, h) {
    var imgG = currentSvg.clipG.g(currentSvg.image(url, x, y, w, h));
    imgG.attr({ imgid: imgid, dataurl: url, myuri: myuri });
    if (imgid !== 'text' && imgid !== 'common' && imgid !== 'default') myStore.commit('addImageTimes', imgid);
    //通过key有没有值判断是不是操作历史记录
    if (!key) {
      this.addHistoryStart({ type: 'add', key: mykey, myuri: myuri, imgid: imgid, image: imgG, url: url });
      this.addHistoryEnd({});
    } else {
      if (typeof (loc) === 'string' && loc !== '') imgG.attr('transform', loc);
      if (typeof (loc2) === 'string' && loc2 !== '') imgG.select('image').attr('transform', loc2);
      this.historyArr[this.nowIndex].start.image = imgG;
      var i = 0, len = this.historyArr.length;
      for (i; i < len; i++)if (this.historyArr[i].start.image === image1) {
        this.historyArr[i].start.image = imgG;
        this.historyArr[i].end.image = imgG;
      }
    }
    this.dragImgG(imgG);
    this.addToRenderLoop(mykey);
  }
  )
};
//删除图片
svgImage.delImg = function (key, image) {
  var mykey = key || this.currentKey, myuri, imgid, url, loc, loc2;
  image = image || this.currentImg;
  imgid = image.attr('imgid');
  //通过key有没有值判断是不是操作历史记录
  if (!key) {
    myuri = image.attr('myuri');
    url = image.attr('dataurl');
    loc = image.transform().local;
    loc2 = image.select('image').transform().local;
    this.addHistoryStart({ type: 'del', key: mykey, url: url, myuri: myuri, imgid: imgid, image: image, loc: loc, loc2: loc2 });
    this.addHistoryEnd({});
  }
  image.remove();
  if (imgid !== 'default' && imgid !== 'text' && imgid !== 'common') myStore.commit('subImageTimes', imgid);
  this.addToRenderLoop(mykey);
  this.cancelFun();
};
//更换图片函数
svgImage.changeImg = function (url, myuri, key, image1) {
  var mykey = key || this.currentKey,
    currentSvg = this.container[mykey];
  this.loadImg(url, currentSvg, function (x, y, w, h) {
    var oldUrl, oldUri, uriObj, k;
    image1 = image1 || this.currentImg;
    uriObj = JSON.parse(decodeURIComponent(myuri));
    if (myStore.state.whatTool === 3 && myStore.state.pantoneBoxShow) myStore.commit('setChoisePantone', { rgb: uriObj.fill_color, pantone: uriObj.pantone1 });
    //通过key有没有值判断是不是操作历史记录
    if (!key) {
      oldUrl = image1.attr('dataurl');
      oldUri = image1.attr('myuri');
      this.addHistoryStart({ type: 'change', key: mykey, url: oldUrl, myuri: oldUri, image: image1 });
      this.addHistoryEnd({ type: 'change', key: mykey, url: url, myuri: myuri, image: image1 });
    } else {
      for (k in uriObj) myStore.commit('setTextObj', { key: k, value: uriObj[k] });
    }
    image1.attr({ myuri: myuri, dataurl: url });
    var myimage = image1.select('image');
    if (myimage.attr('href')) {
      myimage.attr('href', url);
    } else {
      myimage.attr('xlink:href', url);
    }
    myimage.attr({ width: w, height: h, x: x, y: y });
    this.bbox = image1.getBBox();
    this.computedHandle();
    this.addToRenderLoop(mykey);
    // 如果cancelLate的状态处于2时,这次更换图片是取消选中事件触发的,这次取消选中事件将会被阻止,知道更换图片成功后,由更换图片函数触发
    if (this.cancelLate === 2) {
      this.cancelFun();
      this.cancelLate = 0;
    }
  }
  )
};
//拷贝图片
svgImage.copyTo = function (key) {
  var image = this.currentImg, url, imgid, myuri, loc, loc2;
  url = image.attr('dataurl');
  imgid = image.attr('imgid');
  myuri = image.attr('myuri');
  loc = image.transform().local;
  loc2 = image.select('image').transform().local;
  window.myVueApp.clikcPart(key);
  this.addImg(url, imgid, myuri, null, loc, null, loc2);
  this.addToRenderLoop(key);
  this.cancelFun();
};
export default svgImage;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-image.js
