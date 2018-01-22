var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Format (data,fmt) { //author: meizz 
  var o = {
    "M+": data.getMonth() + 1, //月份 
    "d+": data.getDate(), //日 
    "h+": data.getHours(), //小时 
    "m+": data.getMinutes(), //分 
    "s+": data.getSeconds(), //秒 
    "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
    "S": data.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function ajax_promise(url,data,){
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url: url,
      login: true,
      data: data,
      method: 'POST',
      success(result) {
        resolve(result);
      },
      fail(error) {
        reject(new Error(error))
      },
      complete() {
        console.log('request complete');
      }

    });
  })
}

module.exports = {
  formatTime: formatTime,
  Format: Format,
  ajax_promise: ajax_promise,
}
