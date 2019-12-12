var light, lights = []
var lightsBuild = {
  createLights: function (scene) {
    light = new BABYLON.DirectionalLight("DirectionalLight_F", new BABYLON.Vector3(0, 4.622, -20.000), scene);
    light.intensity = 0.5;
    light = new BABYLON.DirectionalLight("DirectionalLight_B", new BABYLON.Vector3(0, 4.622, 20.000), scene);
    light.intensity = 0.5;
    // light=new BABYLON.DirectionalLight("R_DirectionalLight", new BABYLON.Vector3(-30, 2, 0), scene);
    // light.intensity=0.18;
    light = new BABYLON.HemisphericLight("HemiLight_F", new BABYLON.Vector3(0, 0.974, 0.228), scene);
    light.intensity = 0.61;
    light = new BABYLON.HemisphericLight("HemiLight_B", new BABYLON.Vector3(0, -0.746, -0.666), scene);
    light.intensity = 0.26;
    //点光
    light = new BABYLON.PointLight("P_L_light", new BABYLON.Vector3(-15.106, 8.983, 0), scene);
    light.intensity = 0.12;
    light = new BABYLON.PointLight("P_R_light", new BABYLON.Vector3(15.106, 8.983, 0), scene);
    light.intensity = 0.12;
  }
}
export default lightsBuild


// WEBPACK FOOTER //
// ./src/assets/bls/lightsBuilder.js
