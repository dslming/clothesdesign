<template>
  <div class="toolbox" v-show="$store.state.whatTool===2">
    <div class="tooltop">Choose A File To Upload</div>
    <div class="toolboxmain">
      <div class="upload-box ovtext">
        <div class="bgi"></div><input :disabled="uploadState" type="file" name="upimg" @change="uploadImg">
      </div>
      <div class="uploadpicturebox">
        <div class="one-picture-box" v-show="uploadState">
          <img class="one-picture" src="/static/image/loading2.gif" alt="img">
        </div>
        <div class="one-picture-box" v-for="(item,ind) in usesImgArr" :key="item.id">
          <img class="one-picture" :src="item.img_100" alt="img" style="display:none;" @load="loadingImage">
          <img class="one-picture" src="/static/image/loading2.gif" alt="img">
          <div class="one-picture-shade">
            <img class="delbtn" src="/static/image/shanchu.svg" alt="shanchu" @click="delPic(item.id,ind)" v-show="!$store.state.imageTimes[item.id]">
            <span class="addbtn" @click="addImg(item.id,item.img)">add</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usesImgArr: [],
      uploadState: false
    };
  },
  methods: {
    uploadImg(e) {
      var that = this,
        myFiles = e.target.files[0],
        arr = myFiles.type.trim().split("/");
      if (!myFiles) return;
      if (
        arr[0] != "image" ||
        (arr[1] != "jpg" &&
          arr[1] != "jpeg" &&
          arr[1] != "png" &&
          arr[1] != "pneg" &&
          arr[1] != "svg+xml")
      ) {
        e.target.value = "";
        alert("Format must be jpg jpeg png pneg svg");
        return;
      }
      if (myFiles.size > 10 * 1024 * 1024) {
        alert("The image size is greater than 10M");
        e.target.value = "";
        return;
      }
      var myFormData = new FormData();
      myFormData.append("upimg", myFiles);
      this.uploadState = true;
      // $.ajax({
      //   context: this,
      //   type: "POST",
      //   url: resourceUrl.uploadImage,
      //   data: myFormData,
      //   processData: false,
      //   contentType: false,
      //   success: function(res) {
      //     var data = JSON.parse(res),
      //       obj = {};
      //     e.target.value = "";
      //     that.uploadState = false;
      //     if (data.id === 0) {
      //       alert("Upload failed, please try again");
      //     } else {
      //       obj.id = data.id;
      //       obj.img = globalData.base1 + data.url.replace(".", "_800.");
      //       obj.img_100 = globalData.base1 + data.img_100;
      //       that.usesImgArr.unshift(obj);
      //     }
      //   },
      //   error: function(err) {
      //     e.target.value = "";
      //     alert("Upload failed, please try again");
      //   }
      // });
    },
    delPic(id, i) {
      // $.ajax({
      //   context: this,
      //   url: resourceUrl.deleteImage + id,
      //   success: function(res) {
      //     var data = JSON.parse(res);
      //     if (data.code === 0) {
      //       this.usesImgArr.splice(i, 1);
      //     } else {
      //       alert("Delete failed,please try again");
      //     }
      //   }
      // });
    },
    addImg(id, src) {
      svgTool.addImg(src, id, "none");
    },
    loadingImage(e) {
      e.target.style.display = "block";
      $(e.target)
        .siblings(".one-picture")
        .remove();
    }
  },
  created() {
    // 获取用户上传图
    // $.ajax({
    //   context: this,
    //   url: resourceUrl.getImage,
    //   success: function(res) {
    //     var data = JSON.parse(res),
    //       i = 0,
    //       len = data.length;
    //     var obj = null;
    //     for (i; i < len; i++) {
    //       obj = {};
    //       obj.id = data[i].id;
    //       obj.img = globalData.base1 + data[i].img.replace(".", "_800.");
    //       obj.img_100 = globalData.base1 + data[i].img.replace(".", "_100.");
    //       this.usesImgArr.unshift(obj);
    //     }
    //   }
    // });
  },
  components: {},
  mounted() {}
};
</script>
<style>
.upload-box {
  position: relative;
  height: 58px;
  width: 398px;
  margin: 0 auto 30px;

  border: 1px solid #dbd9da;
}
.bgi {
  width: 119px;
  height: 58px;
  position: absolute;
  top: 0;
  left: 140px;
  background-image: url("/static/image/sprite2.png");
  background-position-x: -140px;
  background-position-y: 0;
}
.upload-box input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.upload-box:hover .bgi {
  background-position-y: -60px;
  border-color: #339;
}
.uploadpicturebox {
  height: calc(100% - 90px);
  overflow: auto;
}
.delbtn {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 20px;
  height: 20px;
}
</style>



// WEBPACK FOOTER //
// src/components/picture-box.vue
