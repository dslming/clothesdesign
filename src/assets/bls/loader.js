import { a } from './mode'
window.lm = []
function loadRes() {
  //加载显示
  // window.BLS.Engine.displayLoadingUI();
  myStore.commit('setCanvasLoading', true);

  // console.error(result);
  let result = a
  if ((typeof result) != 'object') result = $.parseJSON(result);
  getSaveObj(result.design_title);

  if (result) {
    // console.log(result)
    window.BLS.RES = result;
    baseUrl = window.globalData.base1 + result.folder;
    var file = window.globalData.base1 + result.folder + result.objfile;
    let zipFile = "./res/1545203017183.zip"
    // 获取config 文件 并加载obj
    JSZipUtils.getBinaryContent(zipFile, function (err, data) {
      if (err) return conosle.log(err);
      var zip = new JSZip();
      zip.loadAsync(data).then(function (zip) {
        return zip.file("config.json").async("string");
      }).then(function (config) {
        //console.log($.parseJSON(config).name)
        return zip.file($.parseJSON(config).name).async("string");
      }).then(function (txt) {
        // console.error(txt);

        var objloader = new BABYLON.OBJFileLoader();
        BABYLON.OBJFileLoader.INVERT_Y = true;
        objloader.INVERT_Y = true;
        return objloader._parseSolid(null, scene, txt, null);
        //  BABYLON.OBJFileLoader.prototype.loadAsync(scene, txt, '/static/gltf/')
      }).then(function (meshes) {
        // console.error(txt);
        scene.cameras[0].setTarget(BABYLON.Vector3.Zero());
        scene.cameras[0].setPosition(new BABYLON.Vector3(0, 0, result.camera_z))
        scene.cameras[0].target = meshes[0].position;
        scene.cameras[0].storeState()
        //scene.cameras[0].upperRadiusLimit=result.camera_z
        scene.cameras[0].lowerRadiusLimit = result.camera_z - 25
        // console.error(meshes);
        // window.lm = meshes
        meshes.forEach(function (o) {
          // meshes 设置
          o.position.y = result.product_y;
          o.rotation.z = Math.PI;

          if (o.name && o.name.toLowerCase() == 'button') {
            loader.createPBRMaterial(o.name, scene, o)
          } else {
            if (!result.mtlfile[o.name]) return;
            result.mtlfile[o.name].name = o.name;

            loader.createStandardMaterial(o.name, scene, o, result.mtlfile[o.name])
          }
          o.actionManager = new BABYLON.ActionManager(scene);
          o.actionManager.registerAction(action);
          o.actionManager.registerAction(action2);
          o.actionManager.registerAction(action3);
          // console.error(o.name);

        })

      }).catch(function (err) {
        console.warn(err)
      })
    })
  }
}
var baseUrl, cubeTexture, i = 0, action, action2, action3, scene, mouseOverUnit, mouseOutUnit, clickMeshEvent = null, materiales = {}, textures = {};
var lastOveredMesh = null;
var hl1 = null, hl2;//hove 灯
var patt = [/stitch/i, /topstitch/i, /wire/i, /Topstitch_1/i, /Topstitch_2/i];
var svgName = {}
//

var isWire = function (name) {
  name = name.toLowerCase();
  var bl = false;
  patt.forEach(function (p) {
    if (p.test(name)) {
      bl = true
    }
  })
  if (bl) {
    return true;
  } else {
    return false;
  }
}
var loader = {
  registerAction: function (fn) {
    //事件注册
    if (!fn) return console.warn('注册事件无效')
    clickMeshEvent = fn;
  },
  //获取对象资源
  getResource: function (url, param, s) {
    //init start
    materiales = {};
    textures = {};
    svgName = {};
    //init end
    window.BLS.NotEditData = {};
    if (s) {
      scene = s;
    } else {
      scene.materials = [];
      scene.geometries = [];
      scene.meshes = [];
    }
    // mouse Over 处理
    mouseOverUnit = function (unit_mesh) {
      if (lastOveredMesh === unit_mesh.meshUnderPointer) {
        return;
      }
      hl1 = new BABYLON.HighlightLayer("hl1", scene);
      hl1.addMesh(unit_mesh.meshUnderPointer, BABYLON.Color3.Green());
      window.BLS.hl1 = hl1;
    }
    // mouse Out 处理
    mouseOutUnit = function (unit_mesh) {
      hl1.dispose();
    }
    // 创建事件
    action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, mouseOverUnit);
    action2 = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, mouseOutUnit);
    action3 = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, loader.mouseClickMesh);
    loader.registerAction(window.myVueApp.clikcPart)
    loadRes(url, param)
    //请求资源
    // $.post(url, param, function (result) {
    //   //加载显示
    //   // window.BLS.Engine.displayLoadingUI();
    //   myStore.commit('setCanvasLoading', true);


    //   console.error(result);
    //   if ((typeof result) != 'object') result = $.parseJSON(result);
    //   getSaveObj(result.design_title);

    //   if (result) {
    //     // console.log(result)
    //     window.BLS.RES = result;
    //     baseUrl = window.globalData.base1 + result.folder;
    //     var file = window.globalData.base1 + result.folder + result.objfile;
    //     //获取config 文件 并加载obj
    //     JSZipUtils.getBinaryContent(file, function (err, data) {
    //       if (err) return conosle.log(err);
    //       var zip = new JSZip();
    //       zip.loadAsync(data).then(function (zip) {
    //         return zip.file("config.json").async("string");
    //       }).then(function (config) {
    //         //console.log($.parseJSON(config).name)
    //         return zip.file($.parseJSON(config).name).async("string");
    //       }).then(function (txt) {
    //         // console.error(txt);

    //         var objloader = new BABYLON.OBJFileLoader();
    //         BABYLON.OBJFileLoader.INVERT_Y = true;
    //         objloader.INVERT_Y = true;
    //         return objloader._parseSolid(null, scene, txt, null);
    //         //  BABYLON.OBJFileLoader.prototype.loadAsync(scene, txt, '/static/gltf/')
    //       }).then(function (meshes) {
    //         // console.error(txt);
    //         scene.cameras[0].setTarget(BABYLON.Vector3.Zero());
    //         scene.cameras[0].setPosition(new BABYLON.Vector3(0, 0, result.camera_z))
    //         scene.cameras[0].target = meshes[0].position;
    //         scene.cameras[0].storeState()
    //         //scene.cameras[0].upperRadiusLimit=result.camera_z
    //         scene.cameras[0].lowerRadiusLimit = result.camera_z - 25
    //         meshes.forEach(function (o) {
    //           // meshes 设置
    //           o.position.y = result.product_y;
    //           o.rotation.z = Math.PI;

    //           if (o.name && o.name.toLowerCase() == 'button') {
    //             loader.createPBRMaterial(o.name, scene, o)
    //           } else {
    //             if (!result.mtlfile[o.name]) return;
    //             result.mtlfile[o.name].name = o.name;
    //             loader.createStandardMaterial(o.name, scene, o, result.mtlfile[o.name])
    //           }
    //           o.actionManager = new BABYLON.ActionManager(scene);
    //           o.actionManager.registerAction(action);
    //           o.actionManager.registerAction(action2);
    //           o.actionManager.registerAction(action3);
    //           console.error(o.name);

    //         })

    //       }).catch(function (err) {
    //         console.warn(err)
    //       })
    //     })
    //   }

    // })

    //创建环境Texture
    cubeTexture = loader.createCubeTexture(scene);

  },
  //创建一个标准的材质
  createStandardMaterial: function (materialName, scene, mesh, params) {

    if (!scene) return console.error('scene is null')
    if (!mesh) return console.error('mesh is null')
    var newMaterial = new BABYLON.StandardMaterial(materialName, scene);
    newMaterial.backFaceCulling = false;
    //线设置
    if (isWire(params.name)) {
      mesh.isPickable = false;
      newMaterial.alpha = 0.25
    }
    newMaterial.reflectionTexture = cubeTexture;
    newMaterial.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0)
    newMaterial.invertNormalMapX = true;
    newMaterial.invertNormalMapY = true;
    newMaterial.maxSimultaneousLights = 6;

    if (params.map.image != '') {
      // lm.push(baseUrl + params.map.image)
      // console.error()
      // loader.createTexture(baseUrl + params.map.image, scene, newMaterial, 'diffuseTexture')
      loader.createTexture("./res/" + params.map.image, scene, newMaterial, 'diffuseTexture')
    }
    // //法线贴图
    if (params.normalMap.image != '') {
      // loader.createTexture(baseUrl + params.normalMap.image, scene, newMaterial, 'bumpTexture')
      loader.createTexture("./res/" + params.normalMap.image, scene, newMaterial, 'bumpTexture')
    }
    // console.log(newMaterial)
    mesh.material = newMaterial;
    //推送SVG

    if (!materiales[params.name]) {
      materiales[params.name] = [newMaterial]
    } else {
      materiales[params.name].push(newMaterial)
    }

    if (!svgName[params.name]) {
      svgName[params.name] = true;
    } else {
      return;
    }

    svgName[params.name] = true;
    if (params.part_pic.image != '') {
      var flag = params.part_pic.part_pic_angle == '0';
      // lm.push(baseUrl + params.part_pic.image)

      // window.svgTool.loadSvg(params.name, baseUrl + params.map.image, baseUrl + params.part_pic.image, flag, params.name, function (key, canvas) {
      window.svgTool.loadSvg(params.name, "./res/" + params.map.image, "./res/" + params.part_pic.image, flag, params.name, function (key, canvas) {
        textures[key] = new BABYLON.DynamicTexture(key, canvas, scene);
        // textures[key].wrapU = textures[key].wrapV = 1;
      })
    } else {

      var extName = params.map.image.split('.');
      extName = extName[extName.length - 1];
      if ('svg' == extName && !isWire(params.name)) {
        window.svgTool.loadSvg(params.name, "./res/" + params.map.image, null, false, params.name, function (key, canvas) {
          textures[key] = new BABYLON.DynamicTexture(key, canvas, scene);
          textures[key].wrapU = textures[key].wrapV = 1;
        })
      } else {
        // console.log("+++++>>>>svg 线")
        window.BLS.NotEditData[params.name] = params.map.image;
      }
    }
  },
  createPBRMaterial: function (name, scene, mesh) {
    if (!scene) return console.error('scene is null')
    if (!mesh) return console.error('mesh is null')
    var material = new BABYLON.PBRMaterial(name, scene);
    material.roughness = 2.0;
    material.metallic = 0.02;
    material.albedoColor = new BABYLON.Color3(0.99, 0.99, 0.99)
    mesh.material = material;
  },
  /**
   * 创建Texture
   * @param {*} url
   * @param {*} scene
   * @param {*} material
   * @param {*} type 类型
   */
  createTexture: function (url, scene, material, type) {
    if (!scene) return console.error('scene is null')
    if (!material) return console.error('material is null')
    i++;
    var texture = new BABYLON.Texture(url, scene, false, true, BABYLON.Texture.NEAREST_LINEAR_MIPLINEAR, function () {
      --i;
      if (i <= 0) {
        // window.BLS.Engine.hideLoadingUI();
        myStore.commit('setCanvasLoading', false);
      }
    });
    texture.hasAlpha = true;
    //texture.wrapU=textures[key].wrapV=1

    switch (type) {
      case 'diffuseTexture':
        material.diffuseTexture = texture
        //material.ambientTexture = texture
        break;
      case 'bumpTexture':
        texture.level = 1.3;
        material.bumpTexture = texture;
        break
      default:

    }
  },
  //创建环境Texture
  createCubeTexture: function (scene) {
    if (!scene) return console.error('scene is null')
    var cubeTexture = new BABYLON.CubeTexture("/static/skybox2/skybox4", scene);
    cubeTexture.coordinatesMode = BABYLON.Texture.EQUIRECTANGULAR_MODE
    cubeTexture.level = 0.06;
    return cubeTexture;
  },
  //鼠标点击模型
  mouseClickMesh: function (unit_mesh) {
    hl2 = new BABYLON.HighlightLayer("hl2", scene);
    hl2.addMesh(unit_mesh.meshUnderPointer, BABYLON.Color3.Blue());
    setTimeout(function () {
      hl2.dispose();
    }, 100)
    if (!clickMeshEvent) return console.warn('事件未注册')
    clickMeshEvent(unit_mesh.meshUnderPointer.id, true);
  },
  //更新渲染
  updateTexture: function (key) {
    if (textures[key]) {
      materiales[key].forEach(function (v, i) {
        v.diffuseTexture = textures[key];
        v.diffuseTexture.update();
      })
    }
  }
}
export default loader



// WEBPACK FOOTER //
// ./src/assets/bls/loader.js
