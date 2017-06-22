Page({
    data: {
    motto: 'Hello World',
    color: 'green'
  },

  gotoPractice:function(e){
    var star = e.currentTarget.dataset.option;
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/practiceGroup/practiceGroup?star=' + star,
      success: function (res) { },
    })
  },
  gotoExam:function(e){
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/examNotice/examNotice?examNum=1',
      success: function (res) { },
    })
  }

})