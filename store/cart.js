export default {
  // 为当前模块开启命名空间
  namespaced: true,

  state: () => ({
    // state中的数据只能被mutations中的方法所修改
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
     // cart: [],
  }),

  mutations: {
    // goods是传入的参数 this.addToCart(goods)  将goods加入到cart对象中进行存储
    addToCart(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // console.log(findResult)

      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // console.log(findResult)
      // 通过commit方法调用m_cart命名空间下的saveToStorage方法
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      // 持久化存储并命名为cart JSON.stringify数组转字符串
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state
        console.log("2222")
        conso.log(findResult)
        console.log(state.cart)
        console.log("3333333")
        
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_count = goods.goods_count

        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据 Id 删除对应的商品
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)

      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中所有商品的勾选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)

      this.commit('m_cart/saveToStorage')
    }
  },

  getters: {
    // 购物车中所有商品的总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c

      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 购物车中已勾选商品的总数量
    checkedCount(state) {
      // total是回调函数 itemm是初始的值
      return state.cart.filter(x => x.goods_state).reduce((total1, item) => total1 += item.goods_count, 0)
      // state.cart.filter(X=>X.goods_state).reduce((total,item)=>{return total += item.goods_state},0)
    },
    
    
    // 已勾选商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}
