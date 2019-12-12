var svgClip = {};
//生成裁切层 和基于这个裁切层裁切图片的容器
svgClip.createClip = function (key, svg) {
  //用来裁切的最外层的g
  var clipG = svg.g();
  svg.el('clipPath', { id: 'clip' + key }).add(svg.caipian.clone().attr('fill', 'none'));
  clipG.attr({ style: 'clip-path: url(#clip' + key + ')', id: 'clipg' + key });
  svg.clipG = clipG;
};
//获取用来裁切的g标签
svgClip.getClipG = function (key, svg) {
  var myClip = svg.select('#id' + key + 'clip');
  if (myClip) {
    myClip.attr('id', 'clip' + key);
  } else {
    myClip = svg.select('#clip' + key + 'clip');
  }
  svg.clipG = svg.select('#id' + key + 'clipg');
  if (svg.clipG) {
    svg.clipG.attr({ style: 'clip-path: url(#clip' + key + ')', id: 'clipg' + key })
  } else {
    svg.clipG = svg.select('#clipg' + key);
  }
};
export default svgClip;



// WEBPACK FOOTER //
// ./src/assets/svg/tools/svg-clip.js
