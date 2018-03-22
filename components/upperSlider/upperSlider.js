// components/upperSlider/upperSlider.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  attached() {
    console.log('uPosition:' + this.properties.uPosition)
    this.setData(this.properties)
    if (this.properties.uPosition == 'top') {
      this.setData({
        full_offset: -110,
        move_offset: -110,
      })
    } else {
      this.setData({
        full_offset: 110,
        move_offset: 110,
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    uPosition: {
      type: String,
      value: 'bottom',
      observer: "__onPropChange"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    move_offset: -100,
    full_offset: 100,
    animation: false,
    uPosition: 'bottom',
    active:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    __onPropChange(newVal, oldVal) {
      this.setData(this.properties)
    },
    isActive() {
      return this.data.active;
    },
    show:function(e){
      this.setData({
        animation:true,
        move_offset:0,
        active:true,
      })
    },
    hide: function (e) {
      this.setData({
        animation: true,
        move_offset: this.data.full_offset,
        active:flase,
      })
    },
    ontouch: function (e) {
      this.setData({
        start_x: e.touches[0].pageX,
        start_y: e.touches[0].pageY,
        old_offset: this.data.move_offset,
        animation: false,
      })
    },
    onmove: function (e) {
      var move_offset = this.data.old_offset + (e.touches[0].pageY - this.data.start_y) / 3;

      var flag = this.data.full_offset > 0 ? 1 : -1;
      if (flag * move_offset > 100) {
        move_offset = this.data.full_offset;
      }
      if (flag * move_offset < 0) {
        move_offset = 0;
      }

      this.setData({
        move_offset: move_offset,
      })
    },
    onend: function (e) {
      var move_offset = this.data.move_offset;

      var flag = this.data.full_offset > 0 ? 1 : -1;
      this.setData({
        animation: true,
      })
      if (this.data.old_offset == 0 && flag * move_offset >= 10) {
        this.setData({
          move_offset: this.data.full_offset,
          active:false,
        })
        return;
      }
      if (flag * this.data.old_offset > 0 && flag * move_offset <= 60) {
        this.setData({
          move_offset: 0,
          active:true,
        })
        return;
      }
      this.setData({
        move_offset: this.data.old_offset,
      })
    }
  }
})
