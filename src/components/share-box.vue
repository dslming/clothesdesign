<template>
  <div class="sharebox" v-show="$store.state.shadeState === 5">
    <div class="closesave" @click="closeShare"></div>
    <div id="sharetitle" class="sharetitle">{{$store.state.title}}</div>
    <div id="mysharebox"></div>
    <div class="a2a_kit a2a_kit_size_32 a2a_default_style sharebottom"
      :data-a2a-url="$store.state.shareUrl">
      <!-- <a class="a2a_dd" href="https://www.addtoany.com/share"></a> -->
      <a class="a2a_button_facebook"></a>
      <a class="a2a_button_twitter"></a>
      <a class="a2a_button_linkedin"></a>
      <a class="a2a_button_pinterest"></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeShare() {
      $("#mycanvas").append($("#canvasbox"));
      this.$store.commit("setShadeState", 0);
      this.$nextTick(function() {
        window.BLS && window.BLS.resize && window.BLS.resize();
      });
    }
  },
  components: {},
  created() {}
};
</script>

<style>
.sharebox {
  background-color: #fff;
  width: 500px;
  height: 610px;
  border-radius: 5px;
}
.sharetitle {
  height: 29px;
  line-height: 29px;
  text-align: center;
  border-bottom: 1px solid #e0e0e1;
  font-weight: 700;
}
#mysharebox {
  position: relative;
  height: 520px;
  width: 100%;
}
.sharebottom {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
}
</style>



// WEBPACK FOOTER //
// src/components/share-box.vue
