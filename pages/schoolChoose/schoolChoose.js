// schoolChoose.js

var schoolList = [{ school: "北京大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/wHV2E4RoYPG0JXhNGcBic1Twf.vtxdXjTrHPBb*mgs4!/r/dB4BAAAAAAAA" },
{ school: "中国人民大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/SOzqssG5VvSkSncgy2D7c..8YBm4C*ihhcK4kRhS3K4!/r/dPcAAAAAAAAA" },
{ school: "清华大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/uFhv2YssOVvzuxZG7AKy4.06.l68lS71YoXkcsoZ5Rc!/r/dAEBAAAAAAAA" },
{ school: "北京交通大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/s8F29y43Ng2297TD2dqj8TjcNpBo.yEpSCR75QlzGFU!/r/dAwBAAAAAAAA" },
{ school: "北京工业大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/ZJMUdMH4fWKbmv0ggMtUhd3zdRyYcKRojaTXOyHQAO0!/r/dPcAAAAAAAAA" },
{ school: "北京航空航天大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/nUHohjQVRXMdcp4YdFP3BVJG6dGgRuf9302kQ4LG07E!/r/dA0BAAAAAAAA" },
{ school: "北京理工大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/132i84m.9gXxqZpWl4y71vlKldQ7dfndvgvRwB88F2M!/r/dBcBAAAAAAAA" },
{ school: "北京科技大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/VkR3c.w62CoUhIDXJ10HgagKCbplI.G2kcVvSIsMf.A!/r/dI0BAAAAAAAA" },
{ school: "北京工商大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/UtKP6tiniCqTkwDtm41jN62ANG7wjc381NxskkmxNQg!/r/dAsBAAAAAAAA" },
{ school: "北京邮电大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/Z4Iq9x9M8ElzVMSyLIqw5KVRdTAWkgsuY3Vj*ChMP.w!/r/dB4BAAAAAAAA" },
{ school: "北京林业大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/tTW5uYemFthGAXXOEl3EJlV5zmYDQKODjPdokUZegdk!/r/dOQAAAAAAAAA" },
{ school: "北京师范大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/SuHZDWr.RCbLf3.GjKuZfkzhqMi.TZvNogFbzAFQpVk!/r/dA0BAAAAAAAA" },
{ school: "北京外国语大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/eR201bXZKz1LCg8oDTbCYdJUh9q1.nvP0.es8jUhpek!/r/dA0BAAAAAAAA" },
{ school: "中央民族大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/z7yYIlLCB*zpOjVLu6L5nOCKzjrU8gnCI0xl6CppxZU!/r/dHEBAAAAAAAA" },
{ school: "华北电力大学", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/uj6NnEUzgpsI6xII5uaUHzkEBkJmQdNkihZr7r8nwdg!/r/dA0BAAAAAAAA" },
{ school: "中华女子学院", avaUrl: "http://r.photo.store.qq.com/psb?/V10A0ubi2HlTG2/xEzZDjcuFdryuQWs2T0tvNhj.JgFf6XpaJQSuP5VkFc!/r/dAwBAAAAAAAA" }
];

Page({

  /**
   * 页面的初始数据
   */
	data: {
		inputShowed: false,
    isSearch:false,
		inputVal: "",
		schoolInfoList:[]
	},
	inputSchool: function(e){
		this.setData({
      scrollTop:0,
      isSearch:false,
      inputShowed: true,
			inputVal: e.currentTarget.dataset.options
		});
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      schoolName: e.currentTarget.dataset.options
    })
    wx.navigateBack()
		
	},
	showInput: function () {
		this.setData({
			inputShowed: true,
      isSearch: true,
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	saveInput: function(e){
    if (this.data.inputVal == null || this.data.inputVal =='') return
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      schoolName: this.data.inputVal
    })
		wx.navigateBack()
	},
	inputTyping: function (e) {
    this.findShcool(e.detail.value)
		this.setData({
			inputVal: e.detail.value
		});
	},


  findShcool(schoolName){
    var newArray = [];
    for (var items in schoolList){
      var currItem = schoolList[items]
      if (currItem.school.indexOf(schoolName.trim())>=0){
        newArray.push(currItem);
      }
    }
    this.setData({
      schoolInfoList: newArray
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.findShcool('')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})