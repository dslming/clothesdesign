<template>
  <div class="toolbox" v-show="$store.state.whatTool===4" style="overflow-y: scroll;" ref="scrollbox">
    <div v-for="(item,index) in myCategories" :key="index" class="categoriesbox"
      :style="{maxHeight:viewCa.indexOf(index) !== -1? '1500px':'54px'}">
      <div class="catitle" @click="clicktitle(index)">
        {{index}}
        <img v-show="viewCa.indexOf(index) === -1" src="/static/image/op.png" alt="img" class="catitleimg">
        <img v-show="viewCa.indexOf(index) !== -1" src="/static/image/op2.png" alt="img" class="catitleimg">
      </div>
      <div class="clearfix">
        <div class="onedesign" v-for="(ite,ind) in item" :key="ind" @click="chioseProduct(ite.designid,ite.product_id)"
          style="cursor: pointer;" :title="ite.name">
          <img :src="ite.image" alt="img" width="200" height="200">
          <p class="ovtext">{{ite.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCategories: {},
      viewCa: []
    };
  },
  methods: {
    chioseProduct(designid, product_id) {
      globalData.toDesign = designid;
      globalData.toProduct = product_id;
      this.$store.commit("setShadeState", 6);
    },
    clicktitle(i) {
      // this.$refs.scrollbox.scrollTop = '0px';
      var index = this.viewCa.indexOf(i);
      if (index === -1) {
        this.viewCa.push(i);
      } else {
        this.viewCa.splice(index, 1);
      }
    }
  },
  components: {},
  created() {
    // $.ajax({
    //   context:this,
    //   url:resourceUrl.getCategories,
    //   success:function(res){
    //     var categories = res.categories, i = 0,len = categories.length, j = 0,len2=0,arr=null,obj = null,asdf = 0,idArr = null;
    //     for(i=0;i<len;i++){
    //       arr = [];
    //       len2 = categories[i].children.length;
    //       for(j=0;j<len2;j++){
    //         if(categories[i].children[j].design_id.indexOf('_') === -1)continue;
    //         // {
    //         //   console.log(categories[i].name,'---------------',categories[i].children[j].name)
    //         //   ;
    //         // }
    //         idArr = categories[i].children[j].design_id.split('_');
    //         obj = {};
    //         obj.image = encodeURI(window.globalData.base4 + '/image/' + categories[i].children[j].image);
    //         obj.name = categories[i].children[j].name;
    //         obj.designid = idArr[0];
    //         obj.product_id = idArr[1];
    //         arr.push(obj);
    //       }
    //       this.$set(this.myCategories,categories[i].name,arr);
    //       localStorage.setItem('myCategories',JSON.stringify(this.myCategories));
    //     }
    //   }
    // });
  },
  computed: {}
};
</script>

<style>
.categoriesbox {
  overflow: hidden;
  transition: max-height 0.5s;
  cursor: pointer;
}
.catitle {
  position: relative;
  height: 54px;
  font-size: 18px;
  font-weight: 700;
  line-height: 54px;
  text-indent: 20px;
}
.catitleimg {
  height: 23px;
  width: 23px;
  position: absolute;
  right: 40px;
  top: 10px;
}
.onedesign {
  float: left;
  position: relative;
  width: 200px;
  height: 220px;
  margin: 6px;
  overflow: hidden;
}
.onedesign p {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
}
</style>



// WEBPACK FOOTER //
// src/components/categories.vue
