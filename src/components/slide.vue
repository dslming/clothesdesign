<template>
  <div class="slidebox">
    <div class="slideblock" ref="slideBlock">
      <span class="smallpint" @click="clicksp(1)" style="left: 0;"></span>
      <span class="smallpint" @click="clicksp(2)" style="left: 16.66%;"></span>
      <span class="smallpint" @click="clicksp(3)" style="left: 33.33%;"></span>
      <span class="smallpint" @click="clicksp(4)" style="left: 50%;"></span>
      <span class="smallpint" @click="clicksp(5)" style="left: 66.66%;"></span>
      <span class="smallpint" @click="clicksp(6)" style="left: 83.33%;"></span>
      <span class="smallpint" @click="clicksp(7)" style="left: 100%;"></span>
      <div class="slidepoint" :class="{active:startFlag}" @mousedown="slideStart" :style={left:comLeft}></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slideStepW: 58,
      startX: 0,
      moveX: 0,
      nowNum: 0,
      startNum: 0,
      startFlag: false
    };
  },
  props: ["num"],
  methods: {
    slideStart(e) {
      this.startFlag = true;
      this.startX = e.pageX;
      this.startNum = this.num * 1;
      this.moveX = 0;
      this.nowNum = 0;
      document.body.style.cursor = "grabbing";
    },
    clicksp(num) {
      this.$emit("change1", num);
      this.$emit("change2");
    }
  },
  created() {
    var that = this;
    window.addEventListener("mousemove", function(e) {
      var a;
      if (that.startFlag) {
        a = e.pageX - that.startX;
        if (Math.abs(a - that.moveX) > that.slideStepW >> 1) {
          a - that.moveX > 0 ? that.nowNum++ : that.nowNum--;
          if (
            that.startNum + that.nowNum < 8 &&
            that.startNum + that.nowNum > 0
          ) {
            that.moveX = that.slideStepW * that.nowNum;
            that.$emit("change1", that.startNum + that.nowNum);
          }
        }
      }
    });
    window.addEventListener("mouseup", function(e) {
      if (that.startFlag) {
        that.startFlag = false;
        document.body.style.cursor = "default";
        if (that.num * 1 !== that.startNum) that.$emit("change2");
      }
    });
  },
  computed: {
    comLeft() {
      return Math.ceil(((this.num - 1) / 6) * 100) + "%";
    }
  },
  components: {},
  mounted() {}
};
</script>

<style>
.slidebox {
  position: relative;
  height: 4px;
  margin: 30px 20px;
}
.slideblock {
  position: relative;
  height: 4px;
  background-color: #ccc;
}
.slidepoint {
  position: absolute;
  top: -8px;
  transform: translateX(-10px);
  width: 18px;
  height: 18px;
  background-color: #fff;
  cursor: grab;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.slidepoint:hover {
  border-color: #339;
}
.slidepoint.active {
  border-color: #339;
  cursor: grabbing;
}
.smallpint {
  position: absolute;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.smallpint:hover {
  width: 15px;
  height: 15px;
}
</style>



// WEBPACK FOOTER //
// src/components/slide.vue
