//index.js
//获取应用实例
var app = getApp()
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var utils= require('../../utils/util.js')

var picUrls = {
  'rcmd-star-1': 'https://s1.ax1x.com/2018/03/09/9Rk1oV.jpg',
  'rcmd-star-2': 'https://s1.ax1x.com/2018/03/09/9RkGJU.jpg',
  'rcmd-star-3': 'https://s1.ax1x.com/2018/03/09/9Rk8iT.jpg',
  'index-icon': 'https://s1.ax1x.com/2018/02/14/9YGa59.jpg',
}

//
var introdoce = "提供值得思考和交流的话题\n帮助年轻人提高情商、逆商\n协调恋爱婚姻中的常见问题\n提高就业竞争力（仅大学生）";
var slogan = '致力于积极教育\n（Positiveness Education）\n的社会企业';


Page({
  data: {
    motto: '欢迎进入高商联盟',
    userInfo: {},
    showPicStyle: '',
    showToast: false,
    introdoce: introdoce,
    requestUserInfo: `https://${config.service.host}//ajax/user/detailInfo`,
    slogan: slogan,
    introdoce: introdoce,
  },

  //
  requestUserInfo: function (e) {
    var that = this;
    qcloud.request({
      url: this.data.requestUserInfo,
      login: true,
      method: 'POST',
      data: {
        userName: "test"
      },
      success(result) {
        wx.setStorage({
          key: 'userId',
          data: utils.formateId(result.data.data.id.toString()),
        })
        that.setData({
          isEnroll: result.data.data.userChannel == 1
        })
        /*
        if (result.data.data.userChannel != 1) {
          that.setData({
            showToast: true,
          })
          setTimeout(function () {
            that.setData({
              showPicStyle: 'pic-hidden',
            })
          }, 1000)
        }
        */

      },
      fail(error) {
        that.data.ourUserInfo = { userName: "未获取到数据" };
        that.setData(that.data);
      },
      complete() {
      }

    });
  },
  //事件处理函数
  bindViewTap: function () {
    console.log("bindViewTapTest");
    wx.navigateTo({
      url: '../examItems/examItems'
    })
  },

  cancelShow: function (e) {
    console.log(e)
    if (e.target.id != 'enroll') {
      return;
    }
    this.setData({
      showToast: false,
    })
    wx.navigateTo({
      url: '../examInfo/examInfo?type=enroll&item=1&group=1',
    })
  },
  toSee: function () {
    /*
    this.setData({
      showPic: {
        url: 'http://i4.bvimg.com/619221/ebb6c675845cdd09.jpg',
        id:'letter',
      },
      showPicStyle: 'pic-hidden',
      showToast:true,
    })
    */
    var picUrls = wx.getStorageSync('picUrls');
    wx.previewImage({
      urls: [
        picUrls['rcmd-star-1']
      ],
    })
  },

  onClick: function () {
    wx.navigateTo({
      url: '../enterpriseList/enterpriseList',
    })
  },
  navToSmr: function () {
    if (this.data.isEnroll) {
      wx.showToast({
        title: '您已报名！',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../examInfo/examInfo?type=enroll&item=1&group=1',
    })
  },

  onShow: function () {
    var that = this;
    that.requestUserInfo();
  },
  closePic: function (e) {
    if (e.target.id == "closePic") {
      this.setData({
        showToast: false,
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.setStorage({
      key: 'picUrls',
      data: picUrls,
    })
    that.setData({
      picUrls: picUrls
    })
    this.setData({
      showPic: {
        url: 'http://i4.bvimg.com/619221/ebb6c675845cdd09.jpg',
        id: 'enroll',
      },
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
  }
})
