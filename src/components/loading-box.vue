<template>
  <div class="loadingbox" v-show="$store.state.shadeState === 3">
    <img class="loadingimg" src="/static/image/loading2.gif" alt="img" />
    <div class="loadingtext">loading...</div>
  </div>
</template>
<script>
export default {
  methods: {},
  created() {},
  components: {},
  mounted() {}
};
</script>
<style>
.loadingbox {
  width: 120px;
  height: 140px;
}
.loadingimg {
  width: 120px;
  height: 120px;
}
.loadingtext {
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  bottom: 0;
  left: 0;
  color: #fff;
}
</style>



// WEBPACK FOOTER //
// src/components/loading-box.vue
