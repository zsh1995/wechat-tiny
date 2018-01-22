// components/swipperPage/swipperPage.js
let _callback = {
  method: null,
  prop: null,
};
let _anicallback = {
  method: null,
  prop: null,
};
let _pageChangeCallback = {
  method: null,
  prop: null,
};
let _onloadcallback = {
  method: null,
  prop: null,
};
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageNums: Number,
  },
  ready: function () {
    var array = new Array(this.properties.pageNums);
    for (var item in array) {
      array[item] = {
        id: item
      }
    }
    this.setData(
      {
        arrayLen: array,
      }
    )
    _onloadcallback.method != null ? _onloadcallback.method(_onloadcallback.prop) : null;
  },

  /**
   * 组件的初始数据
   */
  data: {
    settedCurrentId: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _checkPageOutIndex: function (page) {
      if (page >= 0 && page < this.properties.pageNums) {
        return true;
      }
      return false;
    },
    setOnLoadPage: function (callback, prop) {
      _onloadcallback.method = callback;
      _onloadcallback.prop = prop;
    },
    setOnLastPage: function (callback, prop) {
      _callback.method = callback;
      _callback.prop = prop;
    },
    setPageChangeCallback: function (callback, prop) {
      _pageChangeCallback.method = callback;
      _pageChangeCallback.prop = prop;
    },
    setOnAnimationFinished(callback, prop) {
      _anicallback.method = callback;
      _anicallback.prop = prop;
    },
    getCurrentPageId: function () {
      return this.data.settedCurrentId;
    },
    isOnLast: function () {
      return this.getCurrentPageId() + 1 == this.properties.pageNums
    },
    nextPage: function () {
      var toPage = this.data.settedCurrentId + 1
      this.givenPage(toPage)
    },
    prePage: function () {
      var toPage = this.data.settedCurrentId - 1
      this.givenPage(toPage)
    },
    givenPage: function (pageId) {
      if (!this._checkPageOutIndex(pageId)) return;
      this.setData({
        settedCurrentId: pageId
      })
    },
    bindchange: function (e) {
      if (e.detail.source == 'touch') {
        this.setData({
          settedCurrentId: e.detail.current
        })
      }
      _pageChangeCallback.method != null ? _pageChangeCallback.method(_pageChangeCallback.prop) : null;
      if (this.isOnLast()) {
        _callback.method != null ? _callback.method(_callback.prop) : null;
      }
      _onloadcallback.method != null ? _onloadcallback.method(_onloadcallback.prop) :null;
    },
    bindanimationfinish: function (e) {
      _anicallback.method != null ? _anicallback.method(this._anicallback.prop) : null;
    }
  }
})
