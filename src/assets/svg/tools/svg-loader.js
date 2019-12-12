var svgLoader = {
  container: {}, // svg的容器对象
  currentKey: '', // 当前显示svg的key
  currentSvg: null, // 当前显示的svg
  currentPart: null, //当前点击的元素 图片除外
  fristTime: true, // 当前是否是第一次打开
  dom: null,
  boxW: 0,
  boxH: 0,
  svgShowed: false, //默认显示的svg是否出现了
  svgMaxSize: 1024
};
svgLoader.getSvgBox = function () {
  this.dom = $('#svgbox');
  this.boxW = this.dom.width();
  this.boxH = this.dom.height();
};
svgLoader.loadSvg = function (key, url, ico, flag, title, cb) {
  // 当key值是数字是,第一次储存的key是number类型的,而对象使用数字作为键值时会自动转换为string类型
  key += '';
  //给vue的svg按钮数组的数组添加一条数据
  myStore.commit('addSvgKeys', { key: key, title: title, flag: !!ico });
  if (ico) {
    //加载svg的示意图标
    Snap.load(ico, function (s) {
      var iconSvg = s.select('svg');
      if (!iconSvg) {
        console.error("iconSvg is null");
        return
      }
      myVueApp.appendSvgIcon && myVueApp.appendSvgIcon(key, iconSvg.node);
      iconSvg.attr('id', 'icon' + key);
      var myIcon = iconSvg.selectAll('*'), i = 0, len = myIcon.length, color = null;
      for (i; i < len; i++) {
        color = myIcon[i].attr('fill');
        if (typeof color === 'string' && Snap.getRGB(color).hex === '#595757') myIcon[i].attr({ class: 'spc', fill: '#999999' });
      }
    });
  }

  //加载svg
  Snap.load(url, function (s) {
    var svg = this.container[key] = s.select('svg'), i = 0, len2 = 10, idStr, allEl = null;
    if (!svg) {
      console.error("svg null");
      return
    }
    //先将svg放入dom里,svg不在dom里使用snap做某些操作时会出现奇怪的bug
    this.dom.append(svg.node);
    //获取svg的宽高
    this.getWH(svg);
    // 获取svg的缩放比例
    this.getRatio(svg, this.boxW, this.boxH);
    //给svg添加id防止svg的id相同
    svg.attr('id', 'svg' + key);
    //创建转换svg的canvas
    this.createCanvas(key, svg, cb);
    svg.caipian = svg.select('#id' + key + 'caipian');
    if (svg.caipian) {
      svg.caipian.attr('id', 'caipian' + key);
    } else {
      svg.caipian = svg.select('#caipian' + key);
    }
    if (svg.caipian) {
      this.fristTime = false;
      //如果不是第一次打开 获取用来裁切的g标签
      this.getClipG(key, svg);
    } else {
      // 是第一次打开
      for (i; i < len2; i++) {
        idStr = i ? '_' + i + '_' : '';
        svg.caipian = svg.select('#caipian' + idStr);
        if (svg.caipian) break;
      }
      //防止没有id是caipian的元素,将第一个不是g标签等没有大小的标签定为裁片
      if (!svg.caipian) {
        allEl = svg.selectAll('*');
        i = 0;
        len2 = allEl.length;
        for (i; i < len2; i++)if (!this.noColorEls.includes(allEl[i].type)) {
          svg.caipian = allEl[i];
          break;
        }
      }
      this.fristTime = true;
      //将id名为caipian的元素改名 避免同名id 上架时规定必须有一个元素id是caipian,保存svg时会保存为更改id后的svg,可以也可以用来区分是否第一次打开svg
      svg.caipian.attr({ id: 'caipian' + key, strokeWidth: 5, strokeDasharray: 26 });
      //有些svg中caipian元素可能是填充为none
      //填充为none的元素会在接下来的颜色分组中被判断为无意义的元素移除掉
      //为了防止出现这个问题,手动给caipian元素添加一个白色填充
      if (svg.caipian.attr('fill') === 'none') {
        svg.caipian.attr('fill', '#ffffff')
      }
      //如果是第一次打开 创建裁切元素
      this.createClip(key, svg);
      //兼容老版本定制器做的svg
      this.compatible(key, svg);
    }
    //给裁片添加边框色
    svg.caipian.attr('stroke', '#333399');
    //重新设置图片事件 以及对应的用户图片取消删除按钮(已经在svg中的图片不能在服务器里删除)
    this.reSetImg(svg);
    //检索出所有能填充的裁片
    this.searchEls(key, svg);
    if (!this.svgShowed && flag) {
      //设置svg默认图标
      myStore.commit('setWhichSvg', key);
      this.svgShowed = true;
      this.currentKey = key;
      this.currentSvg = svg;
    } else {
      svg.attr('display', 'none');
    }
    this.addToRenderLoop(key);
  }, this);
};
//切换svg函数
svgLoader.changeSvg = function (key) {
  if (this.currentSvg) this.currentSvg.attr('display', 'none');
  this.currentSvg = this.container[key].attr('display', 'block');
  this.currentKey = key;
};
//获取svg宽高函数
svgLoader.getWH = function (svg) {
  var viewBoxNow = svg.attr('viewBox'),
    svgW = viewBoxNow.width | 0,
    svgH = viewBoxNow.height | 0,
    myScale = svgW > svgH ? this.svgMaxSize / svgW : this.svgMaxSize / svgH;
  svg.svgW = svgW;
  svg.svgH = svgH;
  svg.myScale = myScale;
  // 打开后自动设置为缩放后宽高,减小渲染后的canvas尺寸
  svg.attr({ height: svg.myScale * svg.svgH | 0, width: svg.myScale * svg.svgW | 0 });
};
//获取svg缩放比例及svg左上角坐标
svgLoader.getRatio = function (svg, boxW, boxH) {
  var rw = 1, rh = 1;
  rw = boxW / svg.svgW;
  rh = boxH / svg.svgH;
  svg.startX = svg.startY = 0;
  if (rw < rh) {
    svg.ratio = rw;
    svg.startY = boxH - svg.svgH * svg.ratio >> 1;
  } else {
    svg.ratio = rh;
    svg.startX = boxW - svg.svgW * svg.ratio >> 1;
  }
};
//给当前选中裁片加边框
svgLoader.triggerPart = function (part) {
  if (this.currentPart) this.currentPart.attr('stroke', 'none');
  if (part && part !== this.currentSvg.caipian) {
    part.attr({ stroke: '#333399', strokeWidth: 5, strokeDasharray: 26 });
    this.currentPart = part;
  }
};
//没有使用新版本定制器打开过svg时执行
svgLoader.compatible = function (key, svg) {
  var imgs = svg.selectAll('image'), i = 0, len = imgs.length, dataType, dataId, totalM, imgG, dataUrl, oldClip;
  //移除老版本的裁剪元素
  oldClip = svg.paper.select('#clip_path' + key);
  if (oldClip) {
    oldClip.parent().remove();
    //兼容老版本的定制器添加的图片
    for (i; i < len; i++)if (imgs[i].attr('data_type')) {
      dataType = imgs[i].attr('data_type');
      if (dataType === '2') {
        //老版本的文字
        imgs[i].parent().parent().parent().parent().remove();
      } else {
        if (dataType === '3') {
          //老版本的默认图库图片
          dataId = 'default';
        } else if (dataType === '4') {
          //老版本的用户上传的图片
          dataId = imgs[i].attr('data_id');
        }
        dataUrl = imgs[i].attr('xlink:href').replace('http:', 'https:');
        imgs[i].attr('xlink:href', dataUrl);
        totalM = imgs[i].transform().totalMatrix;
        imgs[i].parent().parent().parent().parent().remove();
        imgG = svg.clipG.g(imgs[i]);
        imgG.transform(totalM);
        imgG.attr({ imgid: dataId, dataurl: dataUrl });
      }
    }
  }
};
export default svgLoader;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-loader.js
