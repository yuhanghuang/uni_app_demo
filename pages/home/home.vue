<template>
  <view>
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
<!--          <swiper-item v-for="(item, i) in swiperList" :key="i">
            <view class="swiper-item">
              <!-- 动态绑定图片的 src 属性 -->
<!--              <image :src="item.image_src"></image>
            </view>
          </swiper-item> --> -->
          <swiper-item v-for="(item, i) in swiperList" :key="i">
              <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
                <!-- 动态绑定图片的 src 属性 -->
                <image :src="item.image_src"></image>
              </navigator>
          </swiper-item>
        </swiper>
      <!-- 分类导航区域 -->
      <view class="nav-list">
        <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
          <image :src="item.image_src" class="nav-img"></image>
        </view>
      </view>

<!-- 楼层区域 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一个楼层的 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
      
      <!-- 楼层图片区域 -->
      <view class="floor-img-box">
        <!-- 左侧大图片的盒子 -->
        <view class="left-img-box">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
        </view>
        <!-- 右侧 4 个小图片的盒子 -->
        <view class="right-img-box">
          <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
            <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
          </view>
        </view>
      </view>
      
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图的数据列表
        swiperList : [],  
        // 分类导航的数据列表
        navList: [],
        // 1. 楼层的数据列表
        floorList: [],
        
      };
    },
    onLoad() {
      this.getSwiperList()
      // 2. 在 onLoad 中调用获取数据的方法
      this.getNavList()
      // 2. 在 onLoad 中调用获取楼层数据的方法
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        // 解构处一个data属性 并重命名为res
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      // const res = await uni.$http.get('/api/public/v1/home/swiperdata')
      console.log(res)
        // 使用async await进行优化
        // const {data: res} = await uni.$http.get('/api/color')
        // const res = await uni.$http.get('/api/color')
        console.log(res)
         if(res.meta.status!==200){
        //   return uni.showToast({
        //     title:'数据请求出错',
        //     duration:1000,
        //     icon:'none'
        //   })
        return uni.$showMsg()
        }
        // console.log(res.header)
        // uni.$showMsg('数据请求成功')
        this.swiperList = res.message
      },
      async getNavList() {
            const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
            if (res.meta.status !== 200) return uni.$showMsg()
            this.navList = res.message
          },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取首页楼层数据的方法
      async getFloorList() {
              const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
              if (res.meta.status !== 200) return uni.$showMsg()
      
              // 对数据进行处理
              res.message.forEach(floor => {
                floor.product_list.forEach(prod => {
                  prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
                })
              })
              this.floorList = res.message
            }
          
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    width: 100%;
    height: 60rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>

