<template>
  <div class="customize">
    <mytop></mytop>
    <tool-bar></tool-bar>
    <mymain></mymain>
    <div class="shade" v-show="$store.state.shadeState">
      <help-box></help-box>
      <save-box></save-box>
      <loading-box></loading-box>
      <warm-prompt></warm-prompt>
      <share-box></share-box>
    </div>
  </div>
</template>
<script>
import mytop from "./components/top";
import mymain from "./components/main";
import toolBar from "./components/tool-bar";
import helpBox from "./components/help-box";
import saveBox from "./components/save-box";
import loadingBox from "./components/loading-box";
import warmPrompt from "./components/warm-prompt";
import shareBox from "./components/share-box";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    mytop,
    mymain,
    toolBar,
    helpBox,
    saveBox,
    loadingBox,
    warmPrompt,
    shareBox
  },
  mounted() {
    window.parent &&
      window.parent.perLoadingHide &&
      window.parent.perLoadingHide();
    this.$store.commit("setSmallScreen", window.innerWidth < 1367);
    window.myTimerSpc = null;
    window.addEventListener("resize", function() {
      svgTool.cancelFun();
      myStore.commit("setSmallScreen", window.innerWidth < 1367);
      if (window.myTimerSpc) clearTimeout(window.myTimerSpc);
      window.myTimerSpc = setTimeout(function() {
        var dom = $("#svgbox"),
          boxW = dom.width(),
          boxH = dom.height();
        for (var k in svgTool.container)
          svgTool.getRatio(svgTool.container[k], boxW, boxH);
        window.myTimerSpc = null;
      }, 600);
    });
    window.addEventListener("mousedown", function(e) {
      if (
        myStore.state.whatTool === 3 &&
        svgTool.currentImg &&
        svgTool.currentImg.attr("imgid") === "text"
      ) {
        //当界面停留在编辑字体,有选中图片且选中图片是文字时,在触发取消选中事件前使cancelLate处于状态1
        svgTool.cancelLate = 1;
        setTimeout(function() {
          //200毫秒后检查cancelLate的值如果还是处于状态1时正常触发取消选中事件并使这个值归于状态0,否则等待更换图片函数触发取消选中事件
          if (svgTool.cancelLate === 1) {
            svgTool.cancelLate = 0;
            svgTool.cancelFun();
          }
        }, 200);
      } else {
        svgTool.cancelFun();
      }
    });
    // window.onbeforeunload = function(){};
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
.customize {
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.daikaifa {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>



// WEBPACK FOOTER //
// src/my-app.vue
