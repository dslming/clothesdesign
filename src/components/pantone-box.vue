<template>
  <div class="toolbox" v-show="$store.state.pantoneBoxShow">
    <h3 class="tooltop ovtext">{{$store.state.colorTitle}}
      <div class="closebtn" @click="cl"></div>
    </h3>
    <div class="toolboxmain">
      <div class="onepantone"
        v-for="item in $store.state.pantoneData"
        :key="item.rgb"
        :title="item.pantone"
        :style="{backgroundColor:'#'+item.rgb}"
        :class="{active:item.rgb===$store.state.choisePantone.rgb}"
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
        :class="{active:item.rgb===$store.state.choisePantone.rgb}"
        @mousedown="clickColor(item,'lately')">
        <div class="juanjiao"></div>
        <img class="gouxuan" src="/static/image/gouxuan.png" alt="choise" />
      </div>
      <div class="addtextbtn" style="float: right;margin: 20px;" @click="cl">Done</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      latelyColor: JSON.parse(localStorage.getItem("latelyColor")) || []
    };
  },
  methods: {
    clickColor(obj, type) {
      var myuri;
      if (this.$store.state.choisePantone.rgb !== obj.rgb) {
        if (type === "color") this.$store.commit("addLatelyColor", obj);
        if (this.$store.state.colorTitle === "Choose Your Colour") {
          svgTool.addHistoryEndToStart();
          this.$store.commit("setChoisePantone", obj);
          svgTool.changeColor(obj);
        } else if (this.$store.state.colorTitle === "Font Colors") {
          this.$store.commit("setTextObj", {
            key: "fill_color",
            value: obj.rgb
          });
          this.$store.commit("setTextObj", {
            key: "pantone1",
            value: obj.pantone
          });
          myuri = encodeURIComponent(JSON.stringify(this.$store.state.textObj));
          getFontPic(this.$store.state.textObj, function(url) {
            svgTool.changeImg(url, myuri);
          });
        }
      }
    },
    cl() {
      this.$store.commit("setPantoneBoxShow", false);
    }
  },
  created() {},
  components: {},
  mounted() {}
};
</script>
<style>
.latelyp {
  width: 100%;
  float: left;
  height: 30px;
  line-height: 30px;
  text-indent: 20px;
}
</style>



// WEBPACK FOOTER //
// src/components/pantone-box.vue
