<template>
  <div id="svgbox">
    <image-handle></image-handle>
  </div>
</template>
<script>
import imageHandle from "./image-handle";
export default {
  methods: {},
  created() {},
  components: { imageHandle },
  mounted() {
    setTimeout(() => {
      svgTool.getSvgBox();
      window.BLS &&
        window.BLS.init &&
        window.BLS.init(globalData.query.designid);

      // getSaveObj('jkl');
      // svgTool.loadSvg('Right__','/static/testsvg/aaa.svg','/static/testsvg/0.svg', true,'a');
      // svgTool.loadSvg('Front_','/static/testsvg/b.svg','/static/testsvg/1.svg', true,'b');
      // svgTool.loadSvg('Left_','/static/testsvg/c.svg','/static/testsvg/2.svg', true,'c');
      // svgTool.loadSvg('Back_','/static/testsvg/d.svg','/static/testsvg/3.svg', true,'d');
      // svgTool.loadSvg('Left_sleeve__','/static/testsvg/e.svg','/static/testsvg/4.svg', true,'e');
      // svgTool.loadSvg('Left_cuff_','/static/testsvg/f.svg','/static/testsvg/5.svg', true,'f');
      // svgTool.loadSvg('Left_shoulder_','/static/testsvg/g.svg','/static/testsvg/6.svg', true,'g');
      // svgTool.loadSvg('Right_shoulder','/static/testsvg/h.svg','/static/testsvg/7.svg', true,'h');
      // svgTool.loadSvg('Right_sleeve_','/static/testsvg/i.svg','/static/testsvg/8.svg', true,'i');
      // svgTool.loadSvg('right_cuff_','/static/testsvg/j.svg','/static/testsvg/9.svg', true,'j');
    }, 601);
  }
};
</script>
<style>
#svgbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 40px;
  background: url("/static/image/dian.png") repeat 0 0;
}
</style>



// WEBPACK FOOTER //
// src/components/svg-box.vue
