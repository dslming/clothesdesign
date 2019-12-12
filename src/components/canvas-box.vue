<template>
  <div class="mycanvas" id="mycanvas" :style="comBoxStyle">
    <div class="canvastitle" v-show="$store.state.smallScreen&&$store.state.svgBoxShow">
      <span class="leastbtn" @click="least=!least">{{least?'+':'-'}}</span>
      <h3>Preview</h3>
      <span class="largestbtn" @click="$store.commit('setSvgBoxShow',false)"></span>
    </div>
    <canvas id="canvasbox" ondragstart="return false" oncontextmenu="return false" onselectstart="return false"></canvas>
    <div class="insidebtnbox">
      <div v-show="$store.state.smallScreen&&!$store.state.svgBoxShow" class="bi" @click="$store.commit('setSvgBoxShow',true)"></div>
      <div v-show="$store.state.title&&(!$store.state.smallScreen||!$store.state.svgBoxShow)"
        class="sharebtn" @click="showShare"></div>
    </div>
    <div class="shade" v-show="$store.state.canvasLoading">
      <div class="progress">
        <div class="progress-bar" ref="progressbar"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){return {
    least:false
  }},
  methods:{
    showShare(){
      $('#mysharebox').append($('#canvasbox'));
      this.$store.commit('setShadeState',5);
      this.$nextTick(function () {
        window.BLS && window.BLS.resize && window.BLS.resize();
      });
    }
  },
  created(){},
  components:{},
  mounted(){
    window.perFun = (f)=>{
      if(f){
        globalData.preTimer = setInterval(()=>{
          this.$refs.progressbar.style.width =100 - 100/++globalData.preX + '%';
        },1500);
      }else{
        globalData.preX = 1;
        clearInterval(globalData.preTimer);
        this.$refs.progressbar.style.width = 0;
        globalData.preTimer = null;
      }
    }
  },
  computed:{
    comBoxStyle(){
      var obj = {width:'100%',height:'100%'};
      if(this.$store.state.smallScreen){
        if(this.$store.state.svgBoxShow){
          obj.width = '220px';
          if(this.least){
            obj.height = '30px';
          }else{
            obj.height = '250px';
          }
        }else{
          obj.width = 'calc(100% - 446px)';
          obj.height = '100%';
        }
      }else{
        obj.height = '100%';
        if(this.$store.state.svgBoxShow){
          obj.width = 'calc(50% - 223px)';
        }else{
          obj.width = 'calc(100% - 446px)';
        }
      }
      globalData.count = 0;
      if(!globalData.timer){
        globalData.timer = setInterval(function(){
          window.BLS && window.BLS.resize && window.BLS.resize();
          if(++globalData.count>5){
            clearInterval(globalData.timer);
            globalData.timer = null;
          }
        },89);
      }
      return obj;
    }
  }
}
</script>
<style>
.mycanvas{
  position: absolute;
  box-sizing: border-box;
  top: 0;
  right: 0;
  background-color: #fff;
  transition:all 0.5s;
}
#canvasbox{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.insidebtnbox{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 70px;
  height: 30px;
  z-index: 1;
}
.insidebtnbox div{
  float: right;
}
.bi{
  width: 30px;
  height: 30px;
  background: url('/static/image/bi.png') no-repeat 0 0;
  cursor: pointer;
}
.bi:hover{
  background-image: url('/static/image/bi1.png');
}
.sharebtn{
  margin-right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('/static/image/sprite2.png') no-repeat -283px -490px;
}
.sharebtn:hover{
  background-position-x: -313px;
}
.canvastitle{
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 29px;
  line-height: 29px;
  border-bottom: 1px solid #DBD9DA;
  text-align: center;
  background-color: #fff;
}
.leastbtn,.largestbtn{
  position: absolute;
  width: 29px;
  height: 29px;
  top: 0;
  cursor: pointer;
}
.leastbtn{
  left: 0;
  font-size: 20px;
  font-weight: 700;
}
.leastbtn:hover{
  color: #339;
}
.largestbtn{
  right: 0;
  background: url('/static/image/fangda.png') no-repeat 7px 7px;
}
.largestbtn:hover{
  background-image: url('/static/image/fangda1.png');
}
.progress{
  width: calc(100% - 150px);
  height: 20px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
}
.progress-bar{
  animation: progress-bar-stripes 2s linear infinite;
  background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
  background-size: 40px 40px;
  height: 100%;
  width: 0;
  color: #fff;
  background-color: #339;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
  transition: width 2s;
}
@keyframes progress-bar-stripes{
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
}
</style>



// WEBPACK FOOTER //
// src/components/canvas-box.vue