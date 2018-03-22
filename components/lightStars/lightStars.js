// components/lightStars/lightStars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    marginStyle:{
      type: String,
      value: 'huge',
      observer: '__onPropChange'
    },
    sWidth:{
      type: Number,
      value: 50,
      observer: '__onPropChange'
    },
    sHeight: {
      type: Number,
      value: 50,
      observer: '__onPropChange'
    },
    sTotal:{
      type: Number,
      value: 3,
      observer: '__onPropChange'
    },
    sRest:{
      type: Boolean,
      value: true,
      observer: '__onPropChange'
    },
    sStars:{
      type: String,
      value: '0',
      observer: '__onPropChange'
    },
    iconSize:{
      type:String,
      value:'medium',
      observer: '__onPropChange'
    }
  },
  ready: function () {
    console.log('sShowRest:' + this.properties.sRest)
    this.setData(this.properties);
    this.data.starList = new Array(this.properties.sTotal);
    this.data.endHalf = (parseFloat(this.properties.sStars) - parseInt(this.properties.sStars)) > 0;
    this.data.stars = parseInt(this.properties.sStars);
    switch(this.properties.iconSize){
      case 'small': this.data.sWidth = 30; this.data.sHeight = 30;break;
      case 'medium': this.data.sWidth = 60; this.data.sHeight = 60;break;
      case 'big': this.data.sWidth = 80; this.data.sHeight = 80;break;
    }
    this.setData(this.data);
  },

  /**
   * 组件的初始数据
   */
  data: {
    starList:[],
    endHalf:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    __onPropChange(newVal,oldVal){
      this.setData(this.properties);
      this.data.starList = new Array(this.properties.sTotal);
      this.data.endHalf = (parseFloat(this.properties.sStars) - parseInt(this.properties.sStars)) > 0;
      this.data.stars = parseInt(this.properties.sStars);
      this.setData(this.data);
    }
  }
})
