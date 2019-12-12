/**
 * Created by Chen ju wei on 2019/2/28.
 */
import SceneBuilder from './sceneBuilder.js'
import Loader from './loader.js'
import LightsBuilder from './lightsBuilder.js'
//定义Babylon
window.BLS = {};
var canvas, engine, scene;

var init = function (mold_id) {
  //事件注册
  window.BLS.rotation = SceneBuilder.rotation;
  window.BLS.updateTexture = Loader.updateTexture;
  //获取canvas
  canvas = document.getElementById("canvasbox");
  //创建一个3D引擎
  //引擎配置对象
  var engineConfig = {
    alpha: true,
    stencil: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: true,
    limitDeviceRatio: window.devicePixelRatio,
    preserveDrawingBuffer: true,
    lockstepMaxSteps: 24
  };
  engine = new BABYLON.Engine(canvas, true, engineConfig, true);
  window.BLS.Engine = engine;
  engine.loadingUIText = "Loading...";
  //engine.loadingUIBackgroundColor = "#fff000";
  scene = SceneBuilder.createScene(engine, canvas);
  window.scene = scene;

  //场景配置start
  scene.defaultCursor = "grab";//hove 游标手形
  //场景配置end
  //设置背景
  scene.clearColor = new BABYLON.Color3(245 / 255, 247 / 255, 247 / 255)
  //配置灯光
  LightsBuilder.createLights(scene)
  //渲染
  engine.runRenderLoop(function () {
    scene.render();
  })
  //加载模型7602 7860 7861 7607 7686 7696
  Loader.getResource(window.resourceUrl.getMoldById, { designid: mold_id }, scene)
  //监听缩放事件
  window.addEventListener('resize', function () {
    engine.resize();
  });
  //canvas 大小变化
  window.BLS.resize = function () {
    engine.resize();
  }
  //
};
window.BLS.saveImage = function (num, cb, size) {
  //保存效果图片
  var tw = canvas.width, th = canvas.height;
  canvas.width = size || 800;
  canvas.height = size || 800;
  window.BLS.hl1 && window.BLS.hl1.dispose();
  //
  window.BLS.camera.restoreState()
  if (num <= 0) return;
  var count = 0;
  scene.registerAfterRender(function () {
    if (count++ < num) {
      window.BLS.camera.alpha = 2 * Math.PI * (count / num + 0.25)
      BABYLON.Tools.CreateScreenshot(engine, window.BLS.camera, size || 800, function (data) {
        if (cb) {
          cb(data, count)
        }
      });
    }
    if (count == num) {
      canvas.width = tw;
      canvas.height = th;
    }
  })

  //  console.log(i);

}
window.BLS.init = init;
window.BLS.getResourceById = function (mold_id) {
  if (!mold_id) return;
  if (!window.resourceUrl.getMoldById) return;

  Loader.getResource(window.resourceUrl.getMoldById, { designid: mold_id })
};
//
//模型7602 7860 7861 7607 7686 7696
// setTimeout(function () {
//   init(7861)
// }, 2000)



// WEBPACK FOOTER //
// ./src/assets/bls/main.js
