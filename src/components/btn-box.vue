<template>
  <div class="btnbox" :style="{left:comLeft}">
    <div class="one-svgbtn"
      style="height:50px;"
      @click="$store.commit('setSvgBoxShow',!$store.state.svgBoxShow)">
      <img src="/static/image/op.png" v-show="!$store.state.svgBoxShow" alt="img" />
      <img src="/static/image/op1.png" v-show="$store.state.svgBoxShow" alt="img" />
    </div>
    <div class="one-svgbtn"
      v-for="(item,key) in comHasIcon"
      :key="key"
      :ref="key"
      :class="{active:key===$store.state.whichSvg}"
      :title="item"
      @click="clickSvgBtn(key)">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    appendSvgIcon(key, node) {
      this.$refs[key][0].appendChild(node);
    },
    clickSvgBtn(key, flag) {
      svgTool.cancelFun();
      if (!this.$store.state.svgBoxShow)
        this.$store.commit("setSvgBoxShow", true);
      if (!this.$store.state.svgKeys[key]) return;
      if (this.$store.state.whichSvg !== key) {
        this.$store.commit("setWhichSvg", key);
        svgTool.changeSvg(key);
        if (!flag && window.BLS && window.BLS.rotation)
          window.BLS.rotation(key);
      }
    }
  },
  created() {
    var that = this;
    myVueApp.appendSvgIcon = this.appendSvgIcon;
    window.myVueApp.clikcPart = that.clickSvgBtn;
  },
  components: {},
  mounted() {},
  computed: {
    comLeft() {
      var myLeft;
      if (this.$store.state.smallScreen) {
        myLeft = "446px";
      } else {
        myLeft = this.$store.state.svgBoxShow ? "calc(50% + 224px)" : "446px";
      }
      return myLeft;
    },
    comHasIcon() {
      var iconObj = {};
      for (var k in this.$store.state.svgKeys)
        if (this.$store.state.svgKeys[k].flag)
          iconObj[k] = this.$store.state.svgKeys[k].title;
      return iconObj;
    }
  }
};
</script>
<style>
.btnbox {
  position: absolute;
  max-height: 100%;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 0 1px #dbd9da;
  overflow: auto;
  transition: left 0.5s;
}
.one-svgbtn {
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  padding: 15px;
  cursor: pointer;
  text-align: center;
}
.one-svgbtn:hover {
  background-color: #dbd9da;
}
.one-svgbtn.active {
  padding: 0;
}
.one-svgbtn.active svg .spc {
  fill: #339;
}
</style>



// WEBPACK FOOTER //
// src/components/btn-box.vue
