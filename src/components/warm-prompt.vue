<template>
  <div class="savebox" v-show="$store.state.shadeState === 4 || $store.state.shadeState ===6">
    <div class="savetitle">Warm tips</div>
    <div class="closesave" @click="$store.commit('setShadeState',0)"></div>
    <div style="height:190px;font-size: 20px;line-height: 190px;" v-show="$store.state.shadeState === 4">
      {{$store.state.title === ''?'Your design has not been saved!Save or leave?':'You have finished your design.Inquiry or leave?'}}
    </div>
    <div style="height:190px;font-size: 20px;line-height: 190px;" v-show="$store.state.shadeState === 6">
      Are you sure you want to leave this model?
    </div>
    <div class="addtextbtn spcbtn leavebtn" @click="leave" v-show="$store.state.shadeState === 4">Leave</div>
    <div class="addtextbtn spcbtn surebtn" @click="saveOrInquiry" v-show="$store.state.shadeState === 4">
      {{$store.state.title === ''?'Save':'Inquiry'}}
    </div>
    <div class="addtextbtn spcbtn leavebtn" @click="handleConfirm" v-show="$store.state.shadeState === 6">Confirm</div>
    <div class="addtextbtn spcbtn surebtn" @click="$store.commit('setShadeState',0)" v-show="$store.state.shadeState === 6">Cancel</div>
  </div>
</template>
<script>
export default {
  methods: {
    leave() {
      window.parent &&
        window.parent.product &&
        window.parent.product.closedesign &&
        window.parent.product.closedesign();
    },
    saveOrInquiry() {
      if (this.$store.state.title === "") {
        this.$store.commit("setShadeState", 3);
        saveInServer(function() {
          window.myStore.commit("setShadeState", 3);
          window.parent &&
            window.parent.product &&
            window.parent.product.addtocart(
              globalData.query.product_id,
              globalData.saveDesign,
              true
            );
        });
      } else {
        window.parent &&
          window.parent.product &&
          window.parent.product.clickInquiry &&
          window.parent.product.clickInquiry();
      }
    },
    handleConfirm() {
      this.$store.commit("initVue");
      svgTool.init();
      initConfig({
        designid: globalData.toDesign,
        product_id: globalData.toProduct
      });
      window.BLS &&
        window.BLS.getResourceById &&
        window.BLS.getResourceById(globalData.toDesign);
    }
  },
  created() {},
  components: {},
  mounted() {}
};
</script>
<style>
.addtextbtn.spcbtn {
  display: inline-block;
}
.addtextbtn.surebtn {
  margin: 0;
  color: #339;
  border-color: #339;
}
.addtextbtn.leavebtn:hover {
  color: #fff;
  background-color: #dbd9da;
  border-color: #fff;
}
.addtextbtn.surebtn:hover {
  color: #fff;
  background-color: #339;
}
</style>



// WEBPACK FOOTER //
// src/components/warm-prompt.vue
