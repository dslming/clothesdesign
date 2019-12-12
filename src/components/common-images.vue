<template>
  <div class="toolbox" v-show="$store.state.whatTool===5">
    <div class="one-picture-box" v-for="item in commonImages" :key="item.name">
      <img class="one-picture" :src="item.thumb" alt="img" style="display:none;" @load="loadingImage">
      <img class="one-picture" src="/static/image/loading2.gif" alt="img">
      <div class="one-picture-shade">
        <span class="addbtn" @click="addCommonImage(item.href)">add</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      commonImages: [],
      total: 0
    };
  },
  methods: {
    loadingImage(e) {
      e.target.style.display = "block";
      $(e.target)
        .siblings(".one-picture")
        .remove();
    },
    addCommonImage(src) {
      var myuri = encodeURIComponent(JSON.stringify({ url: src, color: "" }));
      svgTool.addImg(src, "common", myuri);
    },
    getdata() {
      // $.ajax({
      //   context: this,
      //   url: resourceUrl.getCommonImages,
      //   data: { page: this.page },
      //   success: function(res) {
      //     this.total = res.total;
      //     var i = 0,
      //       len = res.data.length;
      //     for (i; i < len; i++) {
      //       this.commonImages.push(res.data[i]);
      //     }
      //     if (this.total > this.page * 18) {
      //       this.page++;
      //       this.getdata();
      //     }
      //   }
      // });
    }
  },
  components: {},
  created() {
    this.getdata();
  }
};
</script>

<style>
</style>



// WEBPACK FOOTER //
// src/components/common-images.vue
