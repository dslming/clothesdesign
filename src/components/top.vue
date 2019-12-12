<template>
  <div class="top">
    <h2 class="myh2">{{$store.state.title}}</h2>
    <div class="topright">
      <div class="topbtn" style="background-position-y: -180px;" @click="done"></div>
      <div class="topbtn" style="background-position-y: -120px;" @click="service"></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    choiseTool(msg) {
      this.$store.commit("setWhatTool", msg);
      if (!this.$store.state.svgBoxShow)
        this.$store.commit("setSvgBoxShow", true);
    },
    service() {
      if (globalData.query.scene !== "shop") {
        alert("only for client");
      } else {
        window.parent &&
          window.parent.product &&
          window.parent.product.clickInquiry &&
          window.parent.product.clickInquiry();
      }
    },
    done() {
      // console.log(svgTool.getSvgStr(svgTool.currentSvg,svgTool.currentKey,true));
      if (globalData.query.scene === "tontos") {
        if (confirm("确定关闭页面?")) location.href = globalData.base5;
      } else if (globalData.query.scene === "shop") {
        this.$store.commit("setShadeState", 4);
      }
    }
  },
  created() {},
  components: {},
  mounted() {}
};
</script>
<style>
.top {
  height: 60px;
  position: relative;
  border-bottom: 1px solid #dbd9da;
}
.logo {
  position: absolute;
  left: 95px;
  top: 9px;
}
.myh2 {
  height: 100%;
  text-indent: 2%;
  line-height: 60px;
  font-size: 28px;
  font-weight: 700;
}
.topright {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  margin-right: 95px;
  cursor: pointer;
  width: 256px;
}
.topbtn {
  float: right;
  width: 50%;
  height: 100%;
  background-image: url("/static/image/sprite2.png");
  background-position-x: -252px;
}
.topbtn:hover {
  background-position-x: -124px;
}
</style>



// WEBPACK FOOTER //
// src/components/top.vue
