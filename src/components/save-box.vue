<template>
  <div class="savebox" v-show="$store.state.shadeState === 2">
    <div class="savetitle">Name of design</div>
    <div class="closesave" @click="$store.commit('setShadeState',0)"></div>
    <input type="text" placeholder="Enter text here" class="textipt" v-model="designName" style="margin:70px auto;">
    <div class="addtextbtn" style="margin:0 auto;" @click="saveFirst">Add To Design</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      designName: ""
    };
  },
  methods: {
    saveFirst() {
      if (this.designName !== "") {
        this.$store.commit("setShadeState", 3);
        globalData.saveObj.title = this.designName;
        this.$store.commit("setTitle", this.designName);
        saveInServer(function() {
          // $.ajax({
          //   url: resourceUrl.saveC2m,
          //   type: "GET",
          //   data: { designid: globalData.saveDesign },
          //   xhrFields: { withCredentials: true },
          //   crossDomain: true,
          //   success: function(data) {
          //     window.myStore.commit("setShadeState", 0);
          //   },
          //   error: function(error) {
          //     window.myStore.commit("setShadeState", 0);
          //     alert("保存失败");
          //   }
          // });
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
</style>



// WEBPACK FOOTER //
// src/components/save-box.vue
