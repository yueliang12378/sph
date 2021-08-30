<template>
  <div class="spec-preview">
    
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    mounted(){
      this.$bus.$on('changeImg',this.changeImg)
    },
    methods:{
      changeImg(index){
        this.defaultIndex = index
      },
      // 鼠标移动（放大镜）
      move(event){
        //鼠标移动，蒙版也要动（想办法让蒙版动）
        //根据鼠标位置 去移动蒙版位置
        //event.clientX 相对视口左上角，视口是不变的
        //event.pageX  相对页面左上角
        //event.offsetX  相对元素本身左上角

        //获取两个元素
        let mask = this.$refs.mask
        let bigImg = this.$refs.big

        //获取鼠标的位置
        let mouseX = event.offsetX
        let mouseY = event.offsetY
        //根据鼠标位置 计算蒙板位置
        // 因为鼠标始终在mask的中心，所以 要offsetWidth 的一半
        //  mask.offsetWidth 表示mask盒子的宽度 （包含边框）
        // clientWidth 不包含边框 这里没有边框 所以用哪个都行
        let maskX = mouseX - mask.offsetWidth/2
        let maskY = mouseY - mask.offsetHeight/2

         //限定临界值
        if(maskX < 0){
          maskX = 0
          // 因为这个mask是正方向 而且他的宽度
          // 正好是父盒子的一半 所以这里有边界可以写成mask的宽度
        }else if(maskX > mask.offsetWidth){
          maskX = mask.offsetWidth
        }
        if(maskY < 0){ //同理
          maskY = 0
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight
        }
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'

        //3、大图动(大图的宽高是小图的两倍)
        //所以要想反方向移动两倍（因为是定位）
        bigImg.style.left = -maskX * 2 + 'px'
        bigImg.style.top = -maskY * 2 + 'px'
      }

    },

    data(){
      return{
        defaultIndex:0,
      }
    },
    computed:{
      // 这里将这个存到计算属性是为了防止假报错
      //因为有可能一开始数据还没有 imgList[0] 是一个undefined 如果再.imgUrl会报错
      //等到数据回来的时候 虽然页面成功渲染了，但是已经报错了... 所以我们需要要避免这种情况
      imgObj(){
        return this.imgList[this.defaultIndex] || {}
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>