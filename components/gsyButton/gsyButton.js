// components/gsyButton/gsyButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formType:{
      type: String,
      value: '',
      observer: '__onPropChange'
    },
    withShadow: {
      type:Boolean,
      value: true,
      observer: '__onPropChange'
    },
    fontSize:{
      type: String,
      value: '',
      observer: '__onPropChange'
    },
    plain:{
      type:Boolean,
      value:'',
      observer: '__onPropChange'
      },
    borderColor: {
      type: String,
      value: '',
      observer: '__onPropChange'
      },
    fontColor: {
      type: String,
      value: '',
      observer: '__onPropChange'
      },
    background: {
      type: String,
      value: '',
      observer: '__onPropChange'
      },
    textContent: {
      type: String,
      value: '',
      observer: '__onPropChange'
      },
    defaultType: {
      type: String,
      value: '',
      observer: '__onPropChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fontColor: '#6A6869',
    bacground: '',
    plain:true,
  },
  ready:function(){
    if (this.properties.defaultType==''){
      this.properties.defaultType = 'genenal'
    }
    if (this.properties.plain == true){
      this.properties.defaultType = ''
    }
    this.setData(this.properties)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    __onPropChange(newVal,oldVal){
      this.setData(this.properties)
    },
    click(e){
      this.triggerEvent('touchstart', e, { bubbles: true, composed: true, capturePhase:true});
      console.log(e);
    }

  }
})
