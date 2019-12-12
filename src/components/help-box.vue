<template>
  <div class="helpbox" v-show="$store.state.shadeState === 1">
    <p><img src="/static/image/moxing.png" alt="img">click the cuttng piece to find out more</p>
    <p><img src="/static/image/left-jiang.png" alt="img">left click the modle for rotating</p>
    <p><img src="/static/image/right-jiang.png" alt="img">right click the modle for moving</p>
    <p><img src="/static/image/center-jiang.png" alt="img">slide the mouse to zoom in and out</p>
    <div @click="$store.commit('setShadeState',0)">i got it!</div>
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
.helpbox {
  width: 310px;
  height: 190px;
  color: #fff;
}
.helpbox p {
  height: 26px;
  line-height: 26px;
  margin-bottom: 10px;
}
.helpbox img {
  vertical-align: middle;
  margin-right: 10px;
}
.helpbox div {
  width: 80px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  background-color: #8e9da2;
  border-radius: 5px;
  cursor: pointer;
}
.helpbox div:hover {
  color: #339;
}
</style>



// WEBPACK FOOTER //
// src/components/help-box.vue
