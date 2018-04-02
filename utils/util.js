var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');

String.prototype.format = function (args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        if (args[key] != undefined) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          var reg = new RegExp("({[" + i + "]})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}

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

function Format(data, fmt) { //author: meizz 
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

function ajax_promise(url, data, ) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: url,
      login: true,
      data: urlEncode(data),
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(result) {
        let code = parseInt(result.data.code)
        if (0 == code) {
          resolve(result);
        } else if(1 == code){
          reject(new Error("已检查异常"))
        } else if (2 == code) {
          reject(new Error("权限错误"))
        } else if (3 == code) {
          reject(new Error("参数错误，请重新填写"))
        } else if (-99 == code) {
          reject(new Error("未知错误，请联系管理员"))
        } else {
          reject(new Error("与服务器连接异常"))
        }
      },
      fail(error) {
        reject(new Error("与服务器连接异常"))
      },
      complete() {
        console.log('request complete');
      }

    });
  })
}

function ajax_promise_json(url, data, ) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: url,
      login: true,
      data: data,
      method: 'POST',
      success(result) {
        let code = parseInt(result.data.code)
        if (0 == code) {
          resolve(result);
        } else if (1 == code) {
          reject(new Error("已检查异常"))
        } else if (2 == code) {
          reject(new Error("权限错误"))
        } else if (3 == code) {
          reject(new Error("参数错误，请重新填写"))
        } else if (-99 == code) {
          reject(new Error("未知错误，请联系管理员"))
        } else {
          reject(new Error("与服务器连接异常"))
        }
      },
      fail(error) {
        reject(new Error("与服务器连接异常"))
      },
      complete() {
        console.log('request complete');
      }

    });
  })
}

function urlEncode(data) {
  var urlencode = '';
  for (var key in data) {
    if (data[key] == null) data[key] = '';
    urlencode += '&{0}={1}'.format(key, data[key])
  }
  return urlencode.substr(1);
}
function formateId(id) {
  var tempZero = '';
  id = id.toString();
  var len = id.length;
  for (var cnt = 0; cnt < 8 - len; cnt++) {
    tempZero = tempZero.concat('0');
  }
  return tempZero.concat(id)
}

module.exports = {
  formatTime: formatTime,
  Format: Format,
  ajax_promise: ajax_promise,
  ajax_promise_json: ajax_promise_json,
  formateId: formateId,
}
