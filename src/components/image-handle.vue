<template>
  <div class="imagehandle" ref="imgHandle" v-show="$store.state.imageToolShow" @mousedown.stop>
    <div class="lt" @mousedown="buttonDown(1,$event)"></div>
    <div class="rt" @mousedown="buttonDown(2,$event)"></div>
    <div class="rb" @mousedown="buttonDown(3,$event)"></div>
    <div class="lb" @mousedown="buttonDown(4,$event)"></div>
    <div class="mydel" @mousedown="delImg"></div>
    <div class="myrot" @mousedown="buttonDown(5,$event)"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      whichOne: 0,
      pageX: 0,
      pageY: 0
    };
  },
  methods: {
    move(w, h, x, y) {
      this.$refs.imgHandle.style.width = w + "px";
      this.$refs.imgHandle.style.height = h + "px";
      this.$refs.imgHandle.style.left = x + 40 + "px";
      this.$refs.imgHandle.style.top = y + 40 + "px";
    },
    delImg() {
      svgTool.delImg();
    },
    buttonDown(whichOne, e) {
      this.whichOne = whichOne;
      this.pageX = e.pageX;
      this.pageY = e.pageY;
      this.$store.commit("setImageToolShow", false);
      svgTool.needAddToHistory = false;
      svgTool.loc = svgTool.currentImg.transform().local;
      svgTool.addHistoryStart({
        type: "matrix",
        matrix: svgTool.loc,
        image: svgTool.currentImg,
        key: svgTool.currentKey
      });
    }
  },
  created() {
    myVueApp.move = this.move;
    var that = this;
    window.addEventListener("mousemove", function(e) {
      var dx, dy, cx, cy, myCom;
      if (that.whichOne) {
        dx = e.pageX - that.pageX;
        dy = e.pageY - that.pageY;
        svgTool.needAddToHistory = true;
        switch (that.whichOne) {
          case 1:
            cx = svgTool.bbox.x2;
            cy = svgTool.bbox.y2;
            dx = -1 * dx;
            break;
          case 2:
            cx = svgTool.bbox.x;
            cy = svgTool.bbox.y2;
            break;
          case 3:
            cx = svgTool.bbox.x;
            cy = svgTool.bbox.y;
            break;
          case 4:
            cx = svgTool.bbox.x2;
            cy = svgTool.bbox.y;
            dx = -1 * dx;
            break;
          case 5:
            cx = svgTool.bbox.cx;
            cy = svgTool.bbox.cy;
            break;
        }
        if (that.whichOne !== 5) {
          myCom = dx / svgTool.currentSvg.ratio / svgTool.bbox.w + 1;
          svgTool.computeM({ type: "s", x: myCom, y: myCom, z: cx, u: cy });
        } else {
          myCom =
            (Math.atan2(
              -dx,
              dy + (svgTool.bbox.h / 2) * svgTool.currentSvg.ratio
            ) *
              180) /
            Math.PI;
          svgTool.computeM({ type: "r", x: myCom, y: cx, z: cy });
        }
      }
    });
    window.addEventListener("mouseup", function(e) {
      if (that.whichOne) {
        that.whichOne = 0;
        that.$store.commit("setImageToolShow", true);
        if (svgTool.needAddToHistory) {
          svgTool.addToRenderLoop(svgTool.currentKey);
          svgTool.addHistoryEnd({
            type: "matrix",
            matrix: svgTool.currentImg.transform().local,
            image: svgTool.currentImg,
            key: svgTool.currentKey
          });
          svgTool.bbox = svgTool.currentImg.getBBox();
          svgTool.computedHandle();
        }
      }
    });
  },
  components: {},
  mounted() {}
};
</script>
<style>
.imagehandle {
  position: absolute;
  border: 1px dashed #000;
  box-sizing: border-box;
  pointer-events: none;
}
.imagehandle div {
  position: absolute;
  pointer-events: auto;
}
.lt,
.rt,
.rb,
.lb {
  width: 12px;
  height: 12px;
  background-color: #fff;
  border: 1px solid #000;
}
.lt,
.lb {
  left: -7px;
}
.rt,
.rb {
  right: -7px;
}
.lt,
.rt {
  top: -7px;
}
.lb,
.rb {
  bottom: -7px;
}
.lb,
.rt {
  cursor: ne-resize;
}
.lt,
.rb {
  cursor: nw-resize;
}
.mydel,
.myrot {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-size: 100% 100%;
}
.mydel {
  top: -25px;
  background: url("/static/image/shanchu.svg") no-repeat 0 0;
  cursor: pointer;
}
.myrot {
  bottom: -25px;
  background: url("/static/image/xuanzhuang.svg") no-repeat 0 0;
  cursor: crosshair;
}
</style>



// WEBPACK FOOTER //
// src/components/image-handle.vue
