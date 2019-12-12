<template>
  <div class="main">
    <div class="movingbox"
      :style="{transform:$store.state.svgBoxShow?'translateX(0)':'translateX(-100%)',
      width:$store.state.smallScreen?'calc(100% - 446px)':'calc(50% - 223px)'}">
      <svg-box></svg-box>
    </div>
    <canvas-box></canvas-box>
    <btn-box></btn-box>
    <nav-box></nav-box>
    <div class="fixedbox" @mousedown.stop>
      <color-tool></color-tool>
      <picture-box></picture-box>
      <text-box></text-box>
      <pantone-box></pantone-box>
      <categories></categories>
      <common-images></common-images>
    </div>
  </div>
</template>
<script>
import colorTool from "./color-tool";
import pantoneBox from "./pantone-box";
import svgBox from "./svg-box";
import btnBox from "./btn-box";
import pictureBox from "./picture-box";
import textBox from "./text-box";
import navBox from "./nav-box";
import canvasBox from "./canvas-box";
import categories from "./categories";
import commonImages from "./common-images";
export default {
  methods: {},
  created() {},
  components: {
    colorTool,
    pantoneBox,
    svgBox,
    btnBox,
    pictureBox,
    textBox,
    navBox,
    canvasBox,
    categories,
    commonImages
  },
  mounted() {}
};
</script>
<style>
.main {
  height: calc(100% - 112px);
  margin-left: 60px;
  position: relative;
}
.movingbox {
  position: absolute;
  top: 0;
  left: 446px;
  height: 100%;
  box-shadow: 1px 0 0 0 #dbd9da;
  transition: transform 0.5s;
}
.fixedbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 445px;
  height: 100%;
  right: 0;
  border-right: 1px solid #dbd9da;
  background-color: #fff;
}
svg {
  vertical-align: top; /* 没有这个属性是svg会默认对齐base-line,当容器overflow: auto;时svg与容器明明一样大却会出现滚动条 */
  width: 100%;
  height: 100%;
}
svg image {
  cursor: pointer;
}
</style>



// WEBPACK FOOTER //
// src/components/main.vue
