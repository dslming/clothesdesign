<template>
  <div class="toolbox ovtext" v-show="$store.state.fontShow">
    <h3 class="tooltop">Select The Font</h3>
    <div class="toolboxmain">
      <div class="one-font"
        v-for="(item,key) in fontData"
        :key="key"
        :class="{active:key===$store.state.textObj.font}"
        @click="pickFont(key)"
        :title="item.name"><img :src="item.ico" alt="img"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["fontData"],
  methods: {
    pickFont(k) {
      this.$store.commit("setFontShow", false);
      if (this.$store.state.textObj.font !== k) {
        this.$store.commit("setTextObj", { key: "font", value: k });
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
  components: {},
  mounted() {}
};
</script>
<style>
.one-font {
  position: relative;
  height: 40px;
  border: 1px solid transparent;
  cursor: pointer;
  overflow: hidden;
}
.one-font img {
  position: absolute;
  height: 20px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.one-font:hover {
  border-color: #339;
}
.one-font.active {
  /* border-color: transparent; */
  background-color: #dbd9da;
}
</style>



// WEBPACK FOOTER //
// src/components/font-box.vue
