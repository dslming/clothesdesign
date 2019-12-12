<template>
  <div class="nav">
    <div class="navbtn" :class="{active:$store.state.whatTool===1}" @click="choiseTool(1)" style="background-position-y: -408px;"></div>
    <div class="navbtn" :class="{active:$store.state.whatTool===2}" @click="choiseTool(2)" style="background-position-y: -270px;"></div>
    <div class="navbtn" :class="{active:$store.state.whatTool===5}" @click="choiseTool(5)" style="background-position-y: -508px;"></div>
    <div class="navbtn" :class="{active:$store.state.whatTool===3}" @click="choiseTool(3)" style="background-position-y: -135px;"></div>
    <div class="navbtn" v-show="$store.state.categoriesTabShow" :class="{active:$store.state.whatTool===4}" @click="choiseTool(4)" style="background-position-y: -5px;"></div>
  </div>
</template>
<script>
export default {
  methods: {
    choiseTool(msg) {
      this.$store.commit("setWhatTool", msg);
      if (!this.$store.state.svgBoxShow)
        this.$store.commit("setSvgBoxShow", true);
    }
  },
  created() {},
  components: {},
  mounted() {}
};
</script>
<style>
.nav {
  position: absolute;
  left: -60px;
  top: 0;
  height: 100%;
  width: 60px;
  background-color: #4b4b4b;
}
.navbtn {
  height: 105px;
  cursor: pointer;
  background-image: url("/static/image/sprite2.png");
  background-position-x: -62px;
}
.navbtn:hover {
  background-color: #333;
}
.navbtn.active {
  background-color: #fff;
  background-position-x: 0;
}
</style>



// WEBPACK FOOTER //
// src/components/nav-box.vue
