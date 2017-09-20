
function calculateAnalyseTimes(dataList){

  var base={
    analyTime : 0,
    calcTimes:function(item){
      if (item.couponId == 1){
        this.analyTime = this.analyTime + item.remainTimes;
      }
    }
  }
  dataList.forEach(base.calcTimes,base);
  return base.analyTime
}

function calculateExamTimes(dataList) {

  var base = {
    examTime: 0,
    calcTimes: function (item) {
      if (item.couponId == 2) {
        this.examTime = this.examTime + item.remainTimes;
      }
    }
  }
  dataList.forEach(base.calcTimes, base);
  return base.examTime
}

module.exports = {
  calculateAnalyseTimes: calculateAnalyseTimes,
  calculateExamTimes: calculateExamTimes

}