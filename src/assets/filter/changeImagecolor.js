var myCanvas = document.createElement('canvas'),
  maxSize = 500,
  myCtx, imgData = null;

myCanvas.width = maxSize;
myCanvas.height = maxSize;
myCanvas.style.width = maxSize + 'px';
myCanvas.style.height = maxSize + 'px';
myCtx = myCanvas.getContext('2d');

window.changeCommonImageColor = function changeCommonImageColor(url, color, cb, commonG) {
  var myImg = document.createElement('img');
  myImg.crossOrigin = true;
  myImg.src = url;
  myImg.onload = function (e) {
    imgLoad.bind(this)(color, cb, commonG);
  };
  myImg.onerror = imgError;
}

function imgLoad(color, cb, commonG) {
  myCtx.clearRect(0, 0, maxSize, maxSize);
  myCtx.drawImage(this, 0, 0, maxSize, maxSize);
  imgData = myCtx.getImageData(0, 0, maxSize, maxSize);
  var i = 0, len = imgData.data.length;
  for (i; i < len; i += 4) {
    imgData.data[i] = color[0];
    imgData.data[i + 1] = color[1];
    imgData.data[i + 2] = color[2];
  }
  myCtx.putImageData(imgData, 0, 0);
  imgData = null;
  cb && cb(myCanvas.toDataURL(), color, commonG);
};

function imgError(e) {
  alert('Failed to load picture');
};



// WEBPACK FOOTER //
// ./src/assets/filter/changeImagecolor.js
