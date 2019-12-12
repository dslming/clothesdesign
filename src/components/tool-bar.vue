<template>
  <div class="toolbar" @mousedown.stop>
    <div class="spritebtn active" style="background-position-x:0px;" @click="save"></div>
    <div class="spritebtn" title="ctrl+z" @click="undo" :class="{active:$store.state.canUndo}" style="background-position-x:-68px;"></div>
    <div class="spritebtn" title="ctrl+y" @click="redo" :class="{active:$store.state.canRedo}" style="background-position-x:-136px;border-right:1px solid #DBD9DA ;"></div>
    <div class="spritebtn" @click="full(false)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-204px;"></div>
    <div class="spritebtn" @click="full(true)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-272px;"></div>
    <div class="spritebtn" @click="mirrorM(false)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-340px;"></div>
    <div class="spritebtn" @click="mirrorM(true)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-408px;"></div>
    <div class="spritebtn" @click="layer(false)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-476px;"></div>
    <div class="spritebtn" @click="layer(true)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-544px;"></div>
    <div class="spritebtn" @click="copyStepOne" :class="{active:$store.state.imageToolShow}" style="background-position-x:-612px;"></div>
    <div class="copybox" v-show="$store.state.copyBoxShow">
      <div class="single"
        v-for="(item,key) in $store.state.svgKeys"
        :key="key"
        :class="{active:key===$store.state.whichSvg}"
        @click="copyTo(key)">
        <div class="singlecanvas" :ref="key"></div>
        <div class="singletitle ovtext">{{item.title}}</div>
      </div>
    </div>
    <div class="spritebtn" @click="align(false)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-680px;"></div>
    <div class="spritebtn" @click="align(true)" :class="{active:$store.state.imageToolShow}" style="background-position-x:-748px;"></div>
    <div v-show="$store.state.commonColorBtn" id="colorselector"></div>
    <!-- <color-picker targetElem="#abcdefg"></color-picker> -->
    <div class="wenhao" @click="$store.commit('setShadeState',1)">?</div>
  </div>
</template>
<script>
// import colorPicker from './color-picker';
export default {
  methods: {
    undo() {
      if (this.$store.state.canUndo) svgTool.undo();
    },
    redo() {
      if (this.$store.state.canRedo) svgTool.redo();
    },
    clearBox(key) {
      //canvas在dom结构太深而且打开的设计里有细条的渐变时渲染会报一个奇怪的错误 先清掉
      this.$refs[key][0].innerHTML = "";
    },
    appendCanvas(key, node) {
      this.$refs[key][0].appendChild(node);
    },
    mirrorM(flag) {
      if (!this.$store.state.imageToolShow) return;
      this.$store.commit("setCopyBoxShow", false);
      svgTool.mirrorM(flag);
    },
    full(flag) {
      if (!this.$store.state.imageToolShow) return;
      this.$store.commit("setCopyBoxShow", false);
      svgTool.fullSvg(flag);
    },
    layer(flag) {
      if (!this.$store.state.imageToolShow) return;
      this.$store.commit("setCopyBoxShow", false);
      svgTool.layerCtrl(flag, true);
    },
    copyTo(key) {
      if (!this.$store.state.imageToolShow) return;
      this.$store.commit("setCopyBoxShow", false);
      svgTool.copyTo(key);
    },
    copyStepOne() {
      if (!this.$store.state.imageToolShow) return;
      this.$store.commit("setCopyBoxShow", !this.$store.state.copyBoxShow);
    },
    save() {
      if (this.$store.state.canvasLoading)
        return alert("Unable to save during loading");
      if (
        globalData.query.scene === "tontos" &&
        this.$store.state.title === ""
      ) {
        this.$store.commit("setShadeState", 2);
      } else {
        this.$store.commit("setShadeState", 3);
        saveInServer(function() {
          window.myStore.commit("setShadeState", 0);
          if (globalData.query.scene === "shop" && myStore.state.title === "") {
            window.parent &&
              window.parent.product &&
              window.parent.product.addtocart(
                globalData.query.product_id,
                globalData.saveDesign,
                false
              );
          }
        });
      }
    },
    align(flag) {
      if (!this.$store.state.imageToolShow) return;
      svgTool.alignSvg(flag);
    },
    clickColorTool() {
      $("#colorselector").ColorPickerShow();
    }
  },
  created() {
    myVueApp.appendCanvas = this.appendCanvas;
    myVueApp.clearBox = this.clearBox;
    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 17) {
        window.ctrlKeyDown = true;
      }
    });
    window.addEventListener("keyup", function(e) {
      if (e.keyCode === 17) {
        window.ctrlKeyDown = false;
      } else if (
        window.ctrlKeyDown &&
        e.keyCode === 90 &&
        myStore.state.canUndo
      ) {
        svgTool.undo();
      } else if (
        window.ctrlKeyDown &&
        e.keyCode === 89 &&
        myStore.state.canRedo
      ) {
        svgTool.redo();
      }
    });
  },
  // components:{colorPicker},
  mounted() {
    $("#colorselector").ColorPicker({
      color: "#0000ff",
      onShow: function(colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function(colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onChange: function(hsb, hex, rgb) {
        var uriObj = JSON.parse(
          decodeURIComponent(svgTool.currentImg.attr("myuri"))
        );
        changeCommonImageColor(uriObj.url, [rgb.r, rgb.g, rgb.b], function(
          base64,
          color
        ) {
          uriObj.color = color.join(",");
          var myuri = encodeURIComponent(JSON.stringify(uriObj));
          svgTool.changeImg(base64, myuri);
        });
      }
    });
  }
};
</script>
<style>
.toolbar {
  position: relative;
  height: 50px;
  border-bottom: 1px solid #dbd9da;
}
.spritebtn {
  cursor: not-allowed;
  float: left;
  height: 100%;
  width: 68px;
  background-image: url("/static/image/sprite.png");
  background-position-y: 50px;
}
.spritebtn.active {
  background-position-y: 100px;
  cursor: pointer;
}
.spritebtn.active:hover {
  background-position-y: 0;
}
.copybox {
  position: absolute;
  width: 150px;
  top: 100%;
  left: 612px;
  border: 1px solid #dbd9da;
  background-color: #fff;
  z-index: 1;
}
.single {
  height: 40px;
  cursor: pointer;
}
.single.active {
  background-color: #dbd9da;
  color: #fff;
}
.single:hover {
  background-color: #dbd9da;
  color: #fff;
}
.singlecanvas {
  float: left;
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.singletitle {
  line-height: 40px;
  text-indent: 5px;
}
.wenhao {
  position: absolute;
  height: 24px;
  width: 24px;
  top: 10px;
  right: 10px;
  line-height: 24px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #666;
  color: #666;
}
.wenhao:hover {
  color: #339;
  border-color: #339;
}
#colorselector {
  cursor: pointer;
  float: left;
  height: 100%;
  width: 68px;
  background: url("/static/image/color.png") no-repeat 0 0;
}
</style>



// WEBPACK FOOTER //
// src/components/tool-bar.vue
