<template>
  <div class="toolbox" v-show="$store.state.outlineShow">
    <h3 class="tooltop ovtext">Text Outline
      <div class="closebtn" @click="cl"></div>
    </h3>
    <div class="toolboxmain">
      <p class="myp ovtext">Choose Outline Thichness</p>
      <slide v-bind:num="$store.state.textObj.strokewidth" v-on:change1="change1" v-on:change2="change2"></slide>
      <p class="myp ovtext">Choose Outline Color</p>
      <div class="onepantone"
        v-for="item in $store.state.pantoneData"
        :key="item.rgb"
        :title="item.pantone"
        :style="{backgroundColor:'#'+item.rgb}"
        :class="{active:item.rgb===$store.state.textObj.stroke}"
        @mousedown="clickColor(item,'color')">
        <div class="juanjiao"></div>
        <img class="gouxuan" src="/static/image/gouxuan.png" alt="choise" />
      </div>
      <p class="latelyp ovtext">Recently Used Colors</p>
      <div class="onepantone"
        v-for="item in $store.state.latelyColor"
        :key="item.pantone"
        :title="item.pantone"
        :style="{backgroundColor:'#'+item.rgb}"
        :class="{active:item.rgb===$store.state.textObj.stroke}"
        @mousedown="clickColor(item,'lately')">
        <div class="juanjiao"></div>
        <img class="gouxuan" src="/static/image/gouxuan.png" alt="choise" />
      </div>
      <div class="addtextbtn" style="float: right;margin: 20px;" @click="cl">Done</div>
      <div class="addtextbtn dellinebtn" :class="{isdisabled:!$store.state.textObj.stroke}" style="float: right;margin: 20px 0;" @click="deleteOutLine">Delete</div>

    </div>
  </div>
</template>
<script>
import slide from "./slide";
export default {
  methods: {
    change1(c) {
      myStore.commit("setTextObj", { key: "strokewidth", value: c + "" });
    },
    change2() {
      if (this.$store.state.textObj.stroke !== "") {
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    },
    clickColor(obj, type) {
      if (this.$store.state.textObj.stroke !== obj.rgb) {
        if (type === "color") this.$store.commit("addLatelyColor", obj);
        this.$store.commit("setTextObj", { key: "stroke", value: obj.rgb });
        this.$store.commit("setTextObj", {
          key: "pantone2",
          value: obj.pantone
        });
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    },
    cl() {
      this.$store.commit("setOutlineShow", false);
    },
    deleteOutLine() {
      if (this.$store.state.textObj.stroke) {
        this.$store.commit("setTextObj", { key: "stroke", value: "" });
        this.$store.commit("setTextObj", { key: "pantone2", value: "" });
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    }
  },
  created() {},
  computed: {},
  components: { slide },
  mounted() {}
};
</script>
<style>
</style>



// WEBPACK FOOTER //
// src/components/outline-box.vue
