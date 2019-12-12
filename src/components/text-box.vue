<template>
  <div class="toolbox" v-show="$store.state.whatTool===3">
    <h3 class="tooltop ovtext">{{$store.state.changeText?'Edit Text':'Add Text'}}
      <div v-show="$store.state.changeText" class="closebtn" @click="cl"></div>
    </h3>
    <div class="toolboxmain">
      <input type="text" placeholder="Enter text here" :value="$store.state.textObj.txt" class="textipt" @change="changeText">
      <div class="addtextbtn" v-show="!$store.state.changeText" @click="addText">Add To Design</div>
      <div v-show="$store.state.changeText">
        <div class="oneopt ovtext" @click="$store.commit('setFontShow',true)">
          <div class="fonticobox"><img v-if="fontData" :src="fontData[$store.state.textObj.font].ico" alt="ico" :title="fontData[$store.state.textObj.font].name"></div>Font Family
        </div>
        <div class="oneopt ovtext" @click="openpantone">Text Color
          <div class="myfr">
            {{$store.state.textObj.pantone1}}<span class="onepantone" style="float:right; margin: 20px 0 0 10px;" :style="{backgroundColor:'#'+$store.state.textObj.fill_color}"></span>
          </div>
        </div>
        <div class="oneopt ovtext" @click="$store.commit('setOutlineShow',true)">Text Outline
          <strong v-show="!$store.state.textObj.stroke">Add Outline</strong>
          <div class="myfr" v-show="!!$store.state.textObj.stroke">
            <span style="float:left;">{{$store.state.textObj.pantone2}}</span>
            <span class="onepantone" style="margin: 20px 0 0 10px;" :style="{backgroundColor:'#'+$store.state.textObj.stroke}"></span>
            <span class="line"></span>
            <span class="spcspan">{{$store.state.textObj.strokewidth}}</span>
          </div>
        </div>
        <div class="oneopt ovtext" @click="$store.commit('setShapeShow',true)">Text Shape
          <strong v-show="$store.state.textObj.text_shape==='NORMAl'">Add Text Shape</strong>
          <div class="myfr" v-show="$store.state.textObj.text_shape!=='NORMAl'">
            <img class="mypic" v-if="shapeData" :src="shapeData[$store.state.textObj.text_shape]" alt="img">
          </div>
        </div>
      </div>
    </div>
    <font-box :fontData="fontData"></font-box>
    <outline-box></outline-box>
    <shape-box :shapeData="shapeData"></shape-box>
  </div>
</template>
<script>
import fontBox from "./font-box";
import outlineBox from "./outline-box";
import shapeBox from "./shape-box";
export default {
  data() {
    return {
      fontData: null,
      shapeData: null
    };
  },
  methods: {
    addText() {
      if (!!this.$store.state.textObj.txt) {
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.addImg(url, "text", myuri);
        });
      }
    },
    changeText(e) {
      if (!e.target.value) {
        e.target.value = this.$store.state.textObj.txt;
        return;
      }
      this.$store.commit("setTextObj", { key: "txt", value: e.target.value });
      // 触发更改图片时查看cancelLate状态,如果为1时则让它为状态2 (这个事件会在200毫秒内被触发)
      if (svgTool.cancelLate === 1) svgTool.cancelLate = 2;
      if (this.$store.state.changeText) {
        var myuri = encodeURIComponent(
          JSON.stringify(this.$store.state.textObj)
        );
        getFontPic(this.$store.state.textObj, function(url) {
          svgTool.changeImg(url, myuri);
        });
      }
    },
    openpantone() {
      this.$store.commit("setPantoneBoxShow", true);
      this.$store.commit("setChoisePantone", {
        rgb: this.$store.state.textObj.fill_color,
        pantone: this.$store.state.textObj.pantone1
      });
      this.$store.commit("setColorTitle", "Font Colors");
    },
    cl() {
      svgTool.cancelFun();
    }
  },
  created() {
    var str = [globalData.uuid, this.$store.state.salt].sort().join("");
    var mydata = { signature: abcde(str), uuid: globalData.uuid };
    // $.ajax({
    //   context: this,
    //   url: resourceUrl.getFonts,
    //   data: mydata,
    //   success: function(res) {
    //     if (res.error_code === 0) {
    //       for (var k in res.data.fonts)
    //         res.data.fonts[k].ico = globalData.base2 + res.data.fonts[k].ico;
    //       this.fontData = res.data.fonts;
    //       for (var l in res.data.shape_ico)
    //         res.data.shape_ico[l] = globalData.base2 + res.data.shape_ico[l];
    //       this.shapeData = res.data.shape_ico;
    //     }
    //   }
    // });
  },
  components: { fontBox, outlineBox, shapeBox },
  mounted() {},
  computed: {}
};
</script>
<style>
.oneopt {
  height: 70px;
  border-bottom: 1px solid #dbd9da;
  line-height: 70px;
  margin: 0 20px;
  cursor: pointer;
}
.fonticobox {
  overflow: hidden;
  float: right;
  height: 50px;
  width: 300px;
  text-align: right;
  margin-top: 10px;
}
.fonticobox img {
  height: 50px;
}
.oneopt strong {
  float: right;
  color: #339;
  font-weight: 700;
}
.myfr {
  float: right;
  position: relative;
  height: 70px;
}
.line {
  float: left;
  height: 24px;
  margin: 22px 10px;
  border: 1px solid #eee;
}
.spcspan {
  font-size: 22px;
  font-weight: 500;
  color: #aaa;
}
.mypic {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
}
</style>



// WEBPACK FOOTER //
// src/components/text-box.vue
