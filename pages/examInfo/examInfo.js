Page({
    data: {
      isSelect:false,
      selectdata:{
        isSelect:false,
        selectedId:0
      },
      answers:{
      isShowRemove:false,//是否显示移除按钮
      onLoadUrl:'weixin/small/1.0/?m=SmallApp&c=weixin&a=questionID',//题目号链接    
      start:0,//初始题号
      end:0,//结束题号
     allLists: [
        {
         content:'1驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？\n　　123',
        options:[
            {tip:'A',content:'test1',color:"black"},
            {tip:'B',content:'test2',color:"red"},
            {tip:'C',content:'test3',color:"yellow"},
            {tip:'D', content:'test3',color: "green" },
            {tip:'E', content:'test3',color: "white" }
            ]
    },
    {
    content:'2驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？',
        options:[
          { tip: 'A', content: 'test1', color: "black" },
          { tip: 'B', content: 'test2', color: "red" },
          { tip: 'C', content: 'test3', color: "yellow" },
          { tip: 'D', content: 'test3', color: "green" },
          { tip: 'E', content: 'test3', color: "white" }
            ]
    },
    {
    content:'3驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？',
        options:[
          { tip: 'A', content: 'test1', color: "black" },
          { tip: 'B', content: 'test2', color: "red" },
          { tip: 'C', content: 'test3', color: "yellow" },
          { tip: 'D', content: 'test3', color: "green" },
          { tip: 'E', content: 'test3', color: "white" }
            ]
    },
    {
    content:'4驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？',
        options:[
          { tip: 'A', content: 'test1', color: "black" },
          { tip: 'B', content: 'test2', color: "red" },
          { tip: 'C', content: 'test3', color: "yellow" },
          { tip: 'D', content: 'test3', color: "green" },
          { tip: 'E', content: 'test3', color: "white" }
            ]
    },
    {
    content:'5驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？',
        options:[
          { tip: 'A', content: 'test1', color: "black" },
          { tip: 'B', content: 'test2', color: "red" },
          { tip: 'C', content: 'test3', color: "yellow" },
          { tip: 'D', content: 'test3', color: "green" },
          { tip: 'E', content: 'test3', color: "white" }
            ]
    },
    {
    content:'6驾驶车辆进入高速公路加速车道后，应尽快将车速提高到每小时多少公里以上？',
        options:[
          { tip: 'A', content: 'test1', color: "black" },
          { tip: 'B', content: 'test2', color: "red" },
          { tip: 'C', content: 'test3', color: "yellow" },
          { tip: 'D', content: 'test3', color: "green" },
          { tip: 'E', content: 'test3', color: "white" }
            ]
    }
    ],//题号数据
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
          return 'right';
        }
        if(pi<30 && pi>-30 && x<0 && Math.abs(x) > 20){
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
      this.animationDisap.opacity(0.1).step();
      setTimeout(function () {
        this.data.isSelect = true;
        this.animationDisap.opacity(1).step();
        this.data.animationDisap = this.animationDisap.export();
        this.data.selectdata.selectedId = tapId;
        this.setData(this.data);
      }.bind(this), 300);
      this.setData({
        //输出动画
        animationDisap: this.animationDisap.export()
      });
    },
    touchInsure:function(e){
      console.log("tapInsure");
      this.data.isSelect = true;
      this.setData(this.data);
      if (this.data.answers.activeNum == this.data.answers.allLists.length - 1){
        wx.redirectTo({
          url: '../examResult/examResult'
        });
      }
      this.onSwiper('left');
      return false;
    },

    bindTips :function(e){
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    onLoad (params) {
      this.getSubject();
    },
    onReady: function () {
      // 页面渲染完成
      //实例化一个动画
      this.animationDisap = wx.createAnimation({
        // 动画持续时间，单位ms，默认值 400
        duration: 300,
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