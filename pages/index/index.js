//index.js
//获取应用实例
var app = getApp()
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');
var utils= require('../../utils/util.js')
let parseHtml = require('../../utils/richTextParse/richText.js')


var picUrls = {
  'rcmd-star-1': 'https://s1.ax1x.com/2018/03/09/9Rk1oV.jpg',
  'rcmd-star-2': 'https://s1.ax1x.com/2018/03/09/9RkGJU.jpg',
  'rcmd-star-3': 'https://s1.ax1x.com/2018/03/09/9Rk8iT.jpg',
  'index-icon': 'https://s1.ax1x.com/2018/02/14/9YGa59.jpg',
}

//
var introdoce = "<h4>1、求职/工作/恋爱关键能力</h4>\
\
<ul class='ul'><li>思维能力（判断/解决问题）</li><li>沟通能力（表达/理解/共识）</li></ul>\
\
<h4>2、思维与沟通训练</h4>\
\
<ul class='ul'><li>这里提供很多事例和观点。</li><li>自己思考，与恋人、朋友交流，加深爱情、友情。</li></ul>\
\
<h4>3、成功案例</h4>\
\
<ul class='ul'><li>LG电子新员工培训，半年后问卷调查反馈说很实用！之后，该公司与我们订了正式协议，承诺优先面试我们推荐的人（所有企业都可复制）！</li><li>华夏幸福基业新员工培训，反馈说“对公司增加了理解。”</li></ul>\
\
<h4>4、星级学员益处</h4>\
\
<ul class='ul'><li>求职、找对象很容易证明自己思维很积极，沟通能力很好。</li><li>可安排名优企面试，详情请点击“我”。</li></ul>\
\
<h4>5、愿景</h4>\
\
<ul class='ul'><li>推动全国高校和职教开设“思维与沟通”课为必修课。</li><li>清华已将“写作与沟通训练”设为必修课</li><li>思维与语言沟通是更基本的能力，全国高校开设“思维与沟通训练”课是必然趋势！</li><li>我们模式与内容是绝佳方案！</li><li>下一步推动所有年轻员工补此必修课！所有年轻员工补此必修课！</li></ul>\
";
var slogan = '致力于积极教育\n（Positiveness Education）\n的社会企业';
var floatText = '清华x-lab培育'

Page({
  data: {
    floatText: floatText,
    motto: '欢迎进入高商联盟',
    userInfo: {},
    showPicStyle: '',
    showToast: false,
    introdoce: introdoce,
    requestUserInfo: `https://${config.service.host}//ajax/user/detailInfo`,
    slogan: slogan,
    introdoce: introdoce,
    height: '100',
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

  scrollHeight() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#up').boundingClientRect()
    query.select('#down').boundingClientRect()
    query.selectViewport()
    query.exec(function (res) {
      console.log(res[0].bottom)
      console.log(res[1].top)
      let delta = res[1].top - res[0].bottom
      that.setData({
        height: delta
      })
    })

  },
  onReady(e) {
    this.scrollHeight()
  },

  onLoad: function (e) {
    console.log(e)
    console.log('onLoad')
    introdoce = parseHtml.go(introdoce)
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
