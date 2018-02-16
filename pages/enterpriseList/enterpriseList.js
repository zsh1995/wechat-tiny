// enterpriseList.js
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');

// 引入配置
var config = require('../../config');

var companyUtil=require('../../utils/company')

var currentPage = 0;
var searchName = null;
var allCount = 0;
var lockPull = false;
var scrollTop = 0;
var lockOfPull = {
  lockPull: false,
  lock: function () {
    this.lockPull = true;
  },
  unlock: function () {
    this.lockPull = false;
  },
  isLocked: function () {
    return this.lockPull;
  }
};

var schoolList = [{ "id": 1, "enterpriseName": "华为集团", "state": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "iconArray": [0, 1, 1] }, { "id": 2, "enterpriseName": "小米集团", "state": 1, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "iconArray": [0, 1, 1] }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "iconArray": [0, 1, 1] }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "iconArray": [0, 1, 1] }];

var schoolList2 = [{ "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 1 }, { "id": 1, "enterpriseName": "小米科技", "state": 1, "normalFlag": 1, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 1 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 1 }, { "id": 1, "enterpriseName": "华为集团", "state": 1, "normalFlag": 1, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 0, "managerFlag": 1 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }, { "id": 1, "enterpriseName": "华为集团", "state": 0, "normalFlag": 0, "imgUrl": "http://img3.imgtn.bdimg.com/it/u=724439046,647125257&fm=27&gp=0.jpg", "hrFlag": 1, "managerFlag": 0 }];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    isSearch: false,
    inputVal: "",
    schoolInfoList: [],
    lastItem: "#4",
    load: true,
    oneMore: false,
    enableShowPic: false,
    pictureUrl: "",
    companyUrl: `https://${config.service.host}/company/getAllCompany`,
  },

  cancelShow: function (e) {
    this.setData({
      enableShowPic: false,
    })
  },

  bindblur:function(e){
    var inputVal = this.data.inputVal;
    console.log('blur:'+inputVal)
    if (inputVal == null || inputVal ==''){
      this.searchAction('')
    }
    
  },
  showSelfPic: function (e) {
    var index = e.target.dataset.set;
    if (typeof (index) == "undefined") {
      return;
    }     
    var imgUrl = this.data.schoolInfoList[parseInt(e.currentTarget.dataset.set)].iconArray[index].imgUrl
    console.log(imgUrl);
    if(imgUrl ==null || imgUrl =="") return;
    this.setData({
      pictureUrl: imgUrl,
      enableShowPic: true,
    })
  },
  onScroll: function (e) {
    if(this.data.schoolInfoList.length == 0) return;
    this.setData({
      oneMore: true,
    })
  },

  showInput: function () {
    this.data.oneMore = false;
    this.data.inputShowed = true;
    this.data.isSearch = true;
    this.data.schoolInfoList = [];
    this.data.load = true;
    
    this.setData(this.data);
    currentPage = 0;
    allCount = 0;

  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  onFocus: function () {
    var that = this;
    that.setData({
      
      schoolInfoList: [],
      isSearch: false,
      oneMore: false,
    })
  },
  clearInput: function () {
    currentPage = 0;
    searchName = null;
    allCount = 0;
    var that = this;
    this.getPages(0, 15, function (dataList) {
      that.setData({
        schoolInfoList: dataList,
        inputVal: "",
        load: true,
        oneMore: false,
      })
    })

  },
  searchAction:function(seachName){
    currentPage = 0;
    searchName = seachName;
    var that = this;
    this.getPages(0, 15, function (dataList) {
      that.setData({
        schoolInfoList: dataList,
        load: true,
        oneMore: false,
      })
    })
  },
  doSearch: function (e) {
    if (this.data.inputVal == null || this.data.inputVal == '') {
      currentPage = 0;
      
    }
    searchName = this.data.inputVal;
    this.searchAction(searchName)
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.searchAction(e.detail.value)
  },
  onBottom: function (e) {
    console.log("onBottom")
    var that = this;
    
    if (lockOfPull.isLocked()) return;
    lockOfPull.lock();
    this.getNextPage();
    /*
    //加载新数据
    setTimeout(function () {
      schoolList2[0].enterpriseName = currentPage
      that.data.schoolInfoList = that.data.schoolInfoList.concat(schoolList2);
      //that.data.load = false;
      that.setData(that.data);
      lockOfPull.unlock();
    }, 2000)
    */
  },
  onTop: function (e) {
    if (lockPull) return;
    if (currentPage <= 1) {
      return;
    }
    lockPull = true;
    console.log("锁定")
    this.data.hideHeadFlag = false;
    this.getPreviewPage();
    console.log("add old")
    this.setData(this.data);
    console.log("onTop" + currentPage);
    var that = this;
    /*
    setTimeout(function () {
      that.data.schoolInfoList = schoolList.concat(that.data.schoolInfoList);
      that.data.schoolInfoList = that.data.schoolInfoList.slice(0, 2 * schoolList.length)
      that.data.hideHeadFlag = true;
      that.data.lastItem = "green"+schoolList.length
      lockPull = false;
      console.log("解锁")
      that.setData(that.data)
    }, 2000)
    */
  },
  getNextPage: function () {
    currentPage++;
    var that = this;
    this.getPages(currentPage * 15, 15, function (dataList) {
      if (currentPage * 15 >= allCount) that.data.load = false;
      that.data.schoolInfoList = that.data.schoolInfoList.concat(dataList),
        that.data.hideHeadFlag = true;
      lockOfPull.unlock();
      that.setData(that.data)
    });
  },
  getPreviewPage: function () {
    currentPage--;
    console.log("page-- = " + currentPage)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    currentPage = 0;
    searchName = null;
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
    var that = this;
    var dataList;
    var that = this;
    searchName = null;
    this.getPages(0, 15, function (dataList) {
      that.setData({
        schoolInfoList: dataList,
      })
    });
  },
  getPages: function (page, count, doSome) {
    companyUtil.getCompanyList(searchName,page,count)
      .then(result=>{
        allCount = result.data.data.allCount
        var dataList = result.data.data.list;
        doSome(dataList)
      })
    
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