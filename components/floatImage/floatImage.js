// components/floatImage/flaotImage.js
Component({

  ready () {
    this.setData(this.properties)
    setTimeout(()=>{
      this.setData({
        appear:true,
      })
    },600)
  },
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc:{
      type:String,
      value:'',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideMe: false,
    appear: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reset () {
      this.setData({
        hideMe: false,
        appear: false,
      })
    },
    closeIt (e) {
      console.log('click close')
      this.data.hideMe = true
      this.setData(this.data)
    }
  }
})
