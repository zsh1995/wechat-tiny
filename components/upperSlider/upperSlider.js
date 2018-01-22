// components/upperSlider/upperSlider.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {


  },

  /**
   * 组件的初始数据
   */
  data: {
    move_offset: 100,
    animation:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide:function(e){
      this.setData({
        animation: true,
        move_offset:100,
      })
    },
    ontouch: function (e) {
      
      this.setData({
        start_x: e.touches[0].pageX,
        start_y: e.touches[0].pageY,
        old_offset: this.data.move_offset,
        animation:false,
      })
    },
    onmove: function (e) {
      var move_offset = this.data.old_offset + (e.touches[0].pageY - this.data.start_y)/3;
      if (move_offset > 100) {
        move_offset = 100;
      }
      if (move_offset < 0) {
        move_offset = 0;
      }
      this.setData({
        move_offset: move_offset,
      })
    },
    onend: function (e) {
      var move_offset = this.data.move_offset;
      this.setData({
        animation:true,
      })
      if (this.data.old_offset == 0 && move_offset >= 10) {
        this.setData({
          move_offset: 100,
        })
        return;
      }
      if (this.data.old_offset > 0 && move_offset <= 60) {
        this.setData({
          move_offset: 0,
        })
        return;
      }
      this.setData({
        move_offset: this.data.old_offset,
      })
    }
  }
})
