var qcloud = require('../bower_components/wafer-client-sdk/index');
var config = require('../config');
var utils = require('./util.js');

var urlMap = {
    'companyUrl':`https://${config.service.host}/company/allList`,
    'uploadUrl': `https://${config.service.host}/ajax/user/uploadCompanys`
}

function getCompanyList(ambName,page,count){
    return utils.ajax_promise(urlMap.companyUrl,{
        page:page,
        count:count,
        name:ambName,
    })
}

function uploadCompanys(companys){
  return utils.ajax_promise(urlMap.uploadUrl,{
    companys: companys,
  })
}

module.exports={
  getCompanyList: getCompanyList,
  uploadCompanys: uploadCompanys,
}