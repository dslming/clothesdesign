<template>
  <div class="toolbox" v-show="$store.state.shapeShow">
    <h3 class="tooltop ovtext">Text Shape
      <div class="closebtn" @click="cl"></div>
    </h3>
    <div class="toolboxmain">
      <div class="shapeoptbox">
        <div class="oneshape" :class="{active:index===$store.state.textObj.text_shape}" v-for="(item,index) in shapeData" :key="index" @click="clickShape(index)" :title="index">
          <img class="one-picture" :src="item" alt="shape" style="display:none;" @load="loadingImage">
          <img class="one-picture" src="/static/image/loading2.gif" alt="img">
        </div>
      </div>
      <div v-show="$store.state.textObj.text_shape!=='NORMAl'">
        <p class="myp ovtext">Choose Outline Thichness</p>
        <slide v-bind:num="$store.state.textObj.shape_set" v-on:change1="change1" v-on:change2="change2"></slide>
      </div>
      <div class="addtextbtn" @click="cl">Done</div>
    </div>
  </div>
</template>
<script>
import slide from "./slide";
export default {
  props: ["shapeData"],
  methods: {
    clickShape(value) {
      if (value !== this.$store.state.textObj.text_shape) {
        this.$store.commit("setTextObj", { key: "text_shape", value: value });
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    },
    loadingImage(e) {
      e.target.style.display = "block";
      $(e.target)
        .siblings(".one-picture")
        .remove();
    },
    change1(c) {
      myStore.commit("setTextObj", { key: "shape_set", value: c + "" });
    },
    change2() {
      if (this.$store.state.textObj.text_shape !== "NORMAl") {
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    },
    cl() {
      this.$store.commit("setShapeShow", false);
    }
  },
  created() {},
  components: { slide },
  mounted() {}
};
</script>
<style>
.shapeoptbox {
  margin: 20px;
  height: 240px;
}
.oneshape {
  float: left;
  position: relative;
  box-sizing: border-box;
  width: 135px;
  height: 80px;
  border: 1px solid rgb(240, 236, 238);
}
.oneshape:hover {
  border-color: #339;
}
.oneshape.active {
  border-width: 2px;
  border-color: #339;
}
</style>



// WEBPACK FOOTER //
// src/components/shape-box.vue
