<template>
  <div class="toolbox" v-show="$store.state.whatTool===1">
    <h3 class="tooltop ovtext">{{comColorName}}</h3>
    <div class="clearfix">
      <div class="onesvgcolor"
        v-for="(item,index) in comPartColor"
        :key="index"
        :title="item.pantone"
        :style="{backgroundColor:'#'+item.rgb}"
        @click="clickColor(item,true)">
      </div>
    </div>
    <h3 class="tooltop ovtext">All the colors</h3>
    <div class="clearfix">
      <div class="onesvgcolor"
        v-for="item in comAllColor"
        :key="item.rgb"
        :title="item.pantone"
        :style="{backgroundColor:'#'+item.rgb}"
        @click="clickColor(item,false)">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clickColor(obj, flag) {
      svgTool.cancelFun();
      var key = "",
        piceArr;
      this.$store.commit("setPantoneBoxShow", true);
      this.$store.commit("setChoisePantone", obj);
      this.$store.commit("setColorTitle", "Choose Your Colour");
      if (flag) {
        key = svgTool.currentKey;
        if (!this.$store.state.svgBoxShow)
          this.$store.commit("setSvgBoxShow", true);
      } else if (this.$store.state.svgBoxShow) {
        this.$store.commit("setSvgBoxShow", false);
      }
      piceArr = svgTool.getColorInGroupByColor(obj.rgb, key);
      svgTool.choiseColor(obj, piceArr, key, true);
    }
  },
  created() {},
  components: {},
  mounted() {},
  computed: {
    comColorName() {
      return this.$store.state.whichSvg + " colors";
    },
    comPartColor() {
      return this.$store.state.svgColorObj[this.$store.state.whichSvg];
    },
    comAllColor() {
      var allColor = [],
        k,
        i,
        len,
        j,
        len2,
        flag;
      for (k in this.$store.state.svgColorObj) {
        len = this.$store.state.svgColorObj[k].length;
        for (i = 0; i < len; i++) {
          flag = true;
          len2 = allColor.length;
          for (j = 0; j < len2; j++) {
            if (allColor[j].rgb === this.$store.state.svgColorObj[k][i].rgb) {
              flag = false;
              break;
            }
          }
          flag && allColor.push(this.$store.state.svgColorObj[k][i]);
        }
      }
      return allColor;
    }
  }
};
</script>
<style>
.pantonep {
  text-indent: 10px;
  height: 20px;
  line-height: 20px;
}
.pantonep span {
  font-weight: 700;
  color: #339;
}
.onesvgcolor {
  float: left;
  width: 48px;
  height: 48px;
  cursor: pointer;
  margin: 22px 0 0 22px;
  box-shadow: 2px 2px 2px #eee;
}
.onesvgcolor:hover {
  box-shadow: 2px 2px 2px #aaa;
}
</style>



// WEBPACK FOOTER //
// src/components/color-tool.vue
