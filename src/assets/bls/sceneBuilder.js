var camera = null, scene = null;
var keyFramesR = [], frameRate = 10;
var yRot = new BABYLON.Animation("yRot", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var build = {
  //创建场景
  createScene: function (engine, canvas, sceneConfig) {

    //创建一给场景
    scene = new BABYLON.Scene(engine, sceneConfig);
    //创建一给照相机
    camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    //相机配置
    camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(0, 0, -10));
    camera.upperBetaLimit = Math.PI / 2 + Math.PI / 16
    camera.lowerBetaLimit = Math.PI / 2 - Math.PI / 16
    camera.upperBetaLimit = Math.PI / 2
    camera.lowerBetaLimit = Math.PI / 2
    window.BLS.camera = camera;
    //调试
    // BABYLON.DebugLayer.InspectorURL = 'https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js';
    // BABYLON.DebugLayer.InspectorURL = './lib/babylon.inspector.bundle.js';
    // scene.debugLayer.show({
    //   overlay: false,
    //   globalRoot: document.getElementById('mydiv')
    // });
    // scene.debugLayer.onPropertyChangedObservable.add((result) => {
    //   console.error(result)
    // });
    return scene;
  },
  //旋转
  rotation: function (key) {
    scene.animationTimeScale = 5;
    var r = window.BLS.RES.mtlfile[key].part_pic.part_pic_angle;
    if (!r) return;
    //Rotation Animation
    keyFramesR = [];
    r = parseInt(r) + 90;
    r = 2 / 360 * Math.PI * r;
    keyFramesR.push({
      frame: 0,
      value: camera.alpha
    });
    keyFramesR.push({
      frame: frameRate,
      value: r
    });
    if (keyFramesR.length <= 0) return;
    yRot.setKeys(keyFramesR);
    scene.beginDirectAnimation(camera, [yRot], 0, 2 * frameRate, false);
  }

}

export default build



// WEBPACK FOOTER //
// ./src/assets/bls/sceneBuilder.js
