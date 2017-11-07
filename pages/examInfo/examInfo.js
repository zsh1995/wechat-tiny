// 引入算分算法
var util = require('../../utils/score')
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../bower_components/wafer-client-sdk/index');
//
var coupond = require('../../utils/coupon');
// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000,
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

var chooseList=[];

var score = 0;

var groupId;

var stars;

var type;

var execCount = 0;

var intFunction = null;


var screenWidth = wx.getSystemInfoSync().screenWidth ;


// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};


Page({
    data: {
      type:"交流基地",
      commBaseMessage:"以下交流基地在每周一至六14:00 – 15:30都有交流会，建议你一周来一次，可以认识很多高质量朋友（含异性朋友）。需喝一瓶水或一杯茶（咖啡）\n 参加六次可申请教育部“职业沟通能力证书”（详情请看高商联盟简介 – 加盟训练）。 \n 1、北京 \n 1）学院路地区：清华大学观畴园地下一层紫荆书咖 \n 2）回龙观地区：（待定）",
      showPullTips: false,
      loginUrl: config.service.loginUrl,
      requestUrl: config.service.requestUrl,
      questionUrl:`https://${config.service.host}/getQuestions`,
      examUrl: `https://${config.service.host}/exam/getExamQuestions`,
      paymentUrl: `https://${config.service.host}/pay/payEncap`,
      checkUrl: `https://${config.service.host}/pay/checkPurchRecord`,
      couponInfoUrl: `https://${config.service.host}/coupon/userCoupon`,
      couponUseUrl: `https://${config.service.host}/coupon/useCoupon`,
      isSelect:false,
      attitude: ['非常支持', '比较支持', '中立/不必探讨', '比较反对','非常反对'],
      selectdata:{
        isSelect:false,
        selectedId:0
      },
      answers:{
      isShowRemove:false,//是否显示移除按钮
      onLoadUrl:'weixin/small/1.0/?m=SmallApp&c=weixin&a=questionID',//题目号链接    
      start:0,//初始题号
      end:0,//结束题号
      allLists: [],//题号数据
      activeNum:0,//当前条数
      showActiveNum:0,//当前显示条数
      onceLoadLength:5,//一次向俩端加载条数
      url:'weixin/small/1.0/?m=SmallApp&c=weixin&a=getQuestion',//题目详情链接
      isShowTip:false//默认是否显示提示
    },

    swiper:{
      active:0,
    },
    
    color: 'green'
  },
    bindCommBase:function(e){
      wx.showModal({
        title: ' ',
        showCancel: false,
        confirmText: "关 闭",
        content: this.data.commBaseMessage,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    bindViewTap: function() {
        this.setData({
            color:'blue'
        }) 
  },
  //swiper切换
  setEvent:function(e){
    console.log('setEvent');
    this.data.swiper.touchstartEvent = e;
    this.setData(this.data);
    return false;
  },
  //滑动结束
  touchEnd:function(e){
    console.log('touchEnd');
    this.onSwiper(this.getDirection(this.data.swiper.touchstartEvent,e));
    return false;
  },
  //swiper切换
    onSwiper:function(dire){
    var that = this,
        active = 0,
        storeSetTime,
        animationO = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 200,
          timingFunction: "linear",
          delay: 0
        }),
        animationT = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 200,
          timingFunction: "linear",
          delay: 0
        }),
        animationS = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 200,
          timingFunction: "linear",
          delay: 0
        });

    if(!this.$isLock){//锁屏控制

      this.$isLock = true;
      
      if(dire == 'bottom' || dire == 'top' || !dire){
        this.$isLock = false;
        return false;
      }

      if(this.data.answers.activeNum >= this.data.answers.allLists.length - 1 && dire == 'left'){
        this.$isLock = false;
        return false;
      }
      if(this.data.answers.activeNum <= 0 && dire == 'right'){
        this.$isLock = false;
        return false;
      }
      
      if(dire == 'right'){
        animationO.translate3d('0',0,0).step();
        animationT.translate3d('100%',0,0).step();
        if(this.data.answers.activeNum > this.data.answers.start){
          active = - 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      if(dire == 'left'){
        animationT.translate3d('-100%',0,0).step();
        animationS.translate3d('0',0,0).step();
        if(this.data.answers.activeNum < this.data.answers.end){
          active = 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      this.data.swiper.animationO = animationO.export();
      this.data.swiper.animationT = animationT.export();
      this.data.swiper.animationS = animationS.export();
      this.data.answers.showActiveNum = this.data.answers.activeNum + active;
      this.data.isSelect = false;
      this.setData(this.data);
      setTimeout(function(){ 
        that.setHtmlsetHtml(active);
      },200);
    }
  },
  //获得手势方向
  getDirection:function(startEvent,endEvent){
    var x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX,
        y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY,
        pi=360*Math.atan(y/x)/(2*Math.PI);
        if(pi<30 && pi>-30 && x>0 && Math.abs(x) > 20){
          this.setData({
            showPullTips: false
          })
          return 'right';
        }
        if(pi<30 && pi>-30 && x<0 && Math.abs(x) > 20){
          this.setData({
            showPullTips:false
          })
          return 'left';
        }
        if((pi<-60 || pi>60) && y>0 && Math.abs(y) > 20){
          return 'bottom';
        }
        if((pi<-60 || pi>60) && y<0 && Math.abs(y) > 20){
          return 'top';
        }
  },
   //修改页面至正常位置
  setHtmlsetHtml:function(active){
    var that = this
    setTimeout(function () {
      console.log("debug:")
      that.getFields()
    }, 200)
    var animationO = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          delay: 0
        }),
        animationT = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          delay: 0
        }),
        animationS = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          delay: 0
        });     
      animationO.translate3d('-100%',0,0).step();
      animationT.translate3d('0',0,0).step();
      animationS.translate3d('100%',0,0).step();
      this.data.answers.activeNum = this.data.answers.activeNum + active;
      this.data.answers.showActiveNum = this.data.answers.activeNum;
      this.data.swiper.animationO = animationO;
      this.data.swiper.animationT = animationT;
      this.data.swiper.animationS = animationS;
      this.setSwiperList();
      this.setData(this.data);
      //调用加载数据方法
      if((this.data.answers.activeNum-this.data.answers.start == 2 && this.data.answers.start > 0) || (this.data.answers.activeNum+2 == this.data.answers.end && this.data.answers.end+1 < this.data.answers.allLists.length)){
        this.getSubject();
      }
      //调用滑动结束回调
      if(this.isLockCall && typeof this.isLockCall == 'function'){
        this.isLockCall();
        this.isLockCall = false;
      }
      this.$isLock = false;
  },
  //切换题目逻辑
  getSubject:function(callBack){
    var that = this;
    var that=this,start = this.data.answers.activeNum - this.data.answers.onceLoadLength,end = this.data.answers.activeNum + this.data.answers.onceLoadLength,params;
    start = start > 0 ? start : 0 ;
    end = end+1 >= this.data.answers.allLists.length ? this.data.answers.allLists.length : end ;
    //存放下次展示allallList数据
    params = this.data.answers.allLists.slice(start,end+1);
    //存放展示allallList数据ID
    params = params.map(function(data){
      //后台需要int型
      return data.id-0
    });
    var temp = {
      data:params
    };
    this.callBackGetSubject(temp,start,end);
  },
  //详情数据加载的回调
  callBackGetSubject:function(d,start,end){
    var bool = true;
      d.data.forEach((data,i) => {
        if(!!this.data.answers.allLists[start+ i] && this.data.answers.allLists[start+ i].id == data.id){
          this.data.answers.allLists[start+ i] = Object.assign({},data,this.data.answers.allLists[start + i]);
        }else{
          bool = false;
        }
      })
      if(!bool){
        this.getSubject();
        return false;
      }
      this.data.answers.list = d.data;
      this.data.isLoading = true;  
      this.data.answers.list = d.data;   
      this.data.answers.start = start;
      this.data.answers.end = end;
      this.setSwiperList();
      this.setData(this.data);
      var that = this;
      setTimeout(function (){
        console.log("debug:")
        that.getFields()
      },200)
  },
  setSwiperList(){
      var oldStar = this.data.answers.activeNum-1,
          oldEnd = this.data.answers.activeNum+1,
          star = oldStar >= 0 ? oldStar : 0 ,
          end = oldEnd <= this.data.answers.allLists.length ? oldEnd : this.data.answers.allLists.length;
      this.data.swiper.list = this.data.answers.allLists.slice(star,end+1);    
      
      if(oldStar < 0 ){
        this.data.swiper.list.unshift({});
      }
      if(oldEnd > this.data.answers.allLists.length){
        this.data.swiper.list.push({});
      }
      this.setData(this.data)
  },
  //错误的回调
  callBackError:function(e){
      wx.showModal({
        title: '错误',
        content: '错误提示是：'+ e ,
        showCancel:false,
        confirmText:'确认关闭',
        success: function(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // }
        }
      })
  },
  touchViewStart:function(e){
    console.log("touchViewStart");
    this.data.isSelect = false;
    this.setData(this.data);
  },
  touchViewEnd:function(e){
    console.log("touchViewEnd");
  },
    tapCheckbox:function(e){
      var tapId = e.currentTarget.dataset.option;
    console.log("tapCheckbox"+tapId);
      var options = this.data.swiper.list[1].options;
      this.data.isSelect = true;
      this.data.selectdata.selectedId = tapId;
      this.setData(this.data);
    },
    touchInsure:function(e){
      console.log("tapInsure");
      this.data.isSelect = true;
      var allLists = this.data.answers.allLists;
      var currentPage =this.data.answers.activeNum;
      chooseList[currentPage] = this.data.selectdata.selectedId;
      /*
      var temp = util.calculateScore(allLists[currentPage].type, chooseList[currentPage]);
      score += temp;
      console.log("score:" + score + ",temp:" + temp + "\ntype:" + allLists[currentPage].type + ",number:" + chooseList[currentPage]);
      */
      this.data.chooseList = chooseList;
      this.setData(this.data);
      var itemNoChoose = this.checkIsAllChoose(chooseList)
      if (itemNoChoose.length == 0){
        var mScore = 0;
        for (var index in chooseList){
          mScore += util.calculateScore(allLists[index].type, chooseList[index]);
        }

        wx.redirectTo({
          url: '../examResult/examResult?score=' + mScore + '&group_id=' + groupId + '&stars=' + stars + '&type=' + type
        });
      }
      if (this.data.answers.activeNum == this.data.answers.allLists.length - 1){
        if(itemNoChoose.length > 0){
          wx.showModal({
            content: '还有未完成的题目（' + itemNoChoose +'）',
            showCancel:false
          })
        }
      }
      this.onSwiper('left');
      return false;
    },
    onScroll:function(e){
      this.setData({
        showPullTips:false
      })
    },
    
    checkIsAllChoose:function (chooseList){
      var noChooseList =[]
      for(var item in chooseList){
        if(chooseList[item] == -1){
          noChooseList.push(parseInt(item)+1)
        }
      }
      return noChooseList
    },
    



    checkUserRight: function (star, callback_success, callback_fail) {
      var that = this;
      var currentPage = this.data.answers.activeNum;
      var currentItem = this.data.answers.allLists[currentPage];
      var questionId = currentItem.questionId
      
      console.log('is checking UserRight')
      qcloud.request({
        url: this.data.checkUrl,
        login: true,
        data: {
          type: 1,
          star: parseInt(star),
          questionId: questionId
        },
        method: 'POST',
        success(result) {
          that.data.remainTimes = result.data.data.remainTime;
          console.log('remainTimes:' + result.data.data.remainTime);
          that.setData(that.data)
          if (result.data.data.remainTime > 0)
            callback_success();
          else
            callback_fail();
        },
        fail(error) {
          console.log('request fail', error);
        },
        complete() {
          console.log('request complete');
        }

      });

    },

    _checkUserRight: function (star, callback_success, callback_fail, whos) {
      return function () {
        whos.checkUserRight(star, callback_success, callback_fail)
      }
    },




    requestPayment: function (obj) {
      console.log("requestPay:" + obj);
      var currentPage = this.data.answers.activeNum;
      var currentItem = this.data.answers.allLists[currentPage];
      var questionId = currentItem.questionId
      var that = this;
      wx.requestPayment({
        'timeStamp': obj.timeStamp,
        'nonceStr': obj.nonceStr,
        'package': obj.package,
        'signType': obj.signType,
        'paySign': obj.paySign,
        'success': function (res) {
          console.log("success");
          wx.showLoading({
            title: '后台处理中',
            mask: true
          });
          intFunction = setInterval(
            that._checkUserRight(stars,
              function () {
                console.log('ss')
                wx.hideLoading()
                clearInterval(intFunction)
                that.data.answers.allLists[currentPage].isPurchAnalyse = 1;
                that.setData(that.data)
                //跳转
                wx.navigateTo({
                  url: '../analysePage/analysePage?star=' + stars + '&questionId=' + questionId,
                })
              },
              function () {
                console.log('ff' + execCount)
                execCount = execCount + 1;
                if (execCount >= 5) {
                  wx.hideLoading()
                  console.log('stop')
                  clearInterval(intFunction)
                }
              }, that)
            , 1000
          )
        },
        'fail': function (res) {
          console.log("fail");
        }
      })
    },



    bindAnalyse:function(e){
      var currentPage = this.data.answers.activeNum;
      var currentItem = this.data.answers.allLists[currentPage];
      var questionId = currentItem.questionId
      var that = this;
      if (currentItem.isPurchAnalyse != 0){
        wx.navigateTo({
          url: '../analysePage/analysePage?star='+stars+'&questionId='+questionId,
        })
      } else{

        var analyseTimes = 0;

        try {
          analyseTimes = wx.getStorageSync('couponInfos').analyseTimes

        } catch (e) {
          console.log("analyseTims erro")
        }

        var countString =""
        var url ;
        if(analyseTimes > 0){
          //countString = "但您有" + analyseTimes +"次免费机会，点击确定使用。"
          url = this.data.couponUseUrl
        }else{
          //countString = '点击确定进行购买'
          url = this.data.paymentUrl
        }


        wx.showModal({
          title: '温馨提示',
          content: '前三个解析免费（您当前还有' + analyseTimes +'次免费机会），之后收费5元/个，鼓励共享！此收入捐赠给佛山启智和北京美新路公益机构。你本人或身边的人需要资助，也可以联系我们！',
          success:function(res){
            if(res.confirm){
              qcloud.request({
                url: url,
                login: true,
                data: {
                  type: 1,
                  star: parseInt(stars),
                  questionId: questionId,
                  couponId:1
                },
                method: 'POST',
                success(result) {
                  if(analyseTimes > 0 ){
                    that.data.answers.allLists[currentPage].isPurchAnalyse = 1;
                    that.setData(that.data)
                    wx.setStorageSync('couponInfos', {
                      analyseTimes: analyseTimes - 1
                    })
                    wx.navigateTo({
                      url: '../analysePage/analysePage?star=' + stars + '&questionId=' + questionId,
                    })
                  }else that.requestPayment(result.data);
                },
                fail(error) {
                  console.log('request fail', error);
                },
                complete() {
                  console.log('request complete');
                }

              });


            }
            
          }
        })
      }
    },


    bindTips :function(e){
      var currentPage = this.data.answers.activeNum;
      var that = this;
      wx.showModal({
        title: ' ',
        showCancel:false,
        confirmText:"关 闭",
        content: "tips" in that.data.answers.allLists[currentPage] ? that.data.answers.allLists[currentPage].tips : "no message",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    getFields: function () {
      var that = this;
      wx.createSelectorQuery().select('#mainContent1').boundingClientRect(function (rect) {
        console.log("debug:height" + rect.height + "width" + rect.width)
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度
        if (rect.height *750 /screenWidth > 530){
          console.log("debug:true!")

          that.setData({
            showPullTips:true
          })
        }
      }).exec()
    },

    pullQuestions : function(e,requestType){
      var that = this;
      qcloud.request({
        url: e,
        login:true,
        method:'POST',
        data:{
          groupId:groupId,
          stars:stars,
          star:parseInt(stars),
          questionId:0,
          type: requestType
        },
        success(result) {
      
		  if(requestType == 0) var resultData = result.data.data.questionList;
		  else var resultData = result.data.data.questionlist;
          var cnt = 0;
          var colors=["#ffffff","#18BC9B","#F1C40F","#E97053","#343B41"]
          var mOptions = [{ color: "#ffffff" }, { color: "#18BC9B" }, { color: "#F1C40F" }, { color: "#E97053" }, { color:"#343B41"}]
          for(var i = 0;i< resultData.length;i++){
            resultData[i].content=resultData[i].content.replace(/\\n/,"\n");
            resultData[i].index = i;
			      resultData[i].options=mOptions
          }          
          that.data.answers.allLists = resultData;
          that.setData(that.data);
          that.getSubject();
        },
        fail(error) {
          showModel('请求失败', error);
          console.log('request fail', error);
        },
        complete() {
          console.log('request complete');
        }
      })
    },

    getCoupons(){
      qcloud.request({
        url: this.data.couponInfoUrl,
        login: true,
        method: 'POST',
        data: {
        },
        success(result) {
          wx.setStorage({
            key: 'couponInfos',
            data: {
             analyseTimes: coupond.calculateAnalyseTimes(result.data.data)
            }
          })
        }
      });

    },

    onLoad (params) {
      console.log('1:'+params.item+";2:"+params.group);
      console.log('Debug score:'+score);
      chooseList=[-1,-1,-1,-1,-1,-1];
      this.data.chooseList = chooseList;
      this.getCoupons();
      stars = params.item;
      type = params.type;
      this.data.type = params.type;
      if(params.type == 'exam'){
        groupId = 0;
        this.pullQuestions(this.data.examUrl,0);
      }else{
        groupId = params.group;
        this.pullQuestions(this.data.questionUrl,1);
      }      
      var res = wx.getSystemInfoSync()
      screenWidth = res.screenWidth;
      this.setData(this.data)
    },

    onShow:function(e){
      score = 0;
    },
    onReady: function () {
      // 页面渲染完成
      //实例化一个动画
      this.animationDisap = wx.createAnimation({
        // 动画持续时间，单位ms，默认值 400
        duration: 200,
        /**
         * http://cubic-bezier.com/#0,0,.58,1  
         *  linear  动画一直较为均匀
         *  ease    从匀速到加速在到匀速
         *  ease-in 缓慢到匀速
         *  ease-in-out 从缓慢到匀速再到缓慢
         * 
         *  http://www.tuicool.com/articles/neqMVr
         *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
         *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
         */
        timingFunction: 'ease',
        // 延迟多长时间开始
        delay: 0,
        /**
         * 以什么为基点做动画  效果自己演示
         * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
         * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
         */
        transformOrigin: 'left top 0',
        success: function (res) {
          debugger;
          console.log("res!!!!!!!!!!")
        }
      })
    },
})