var gsy_green =  "#2BB675" 
var gsy_red =    "#ED662C" 
var gsy_yellow = "#FFE51A" 
var gsy_black =  "#6A6869" 
var gsy_white =  "#FFFFFF" 
var gsy_gray =   "#999999" 


function calculateScore(questionType, choose) {
  var score = 0;
  if(typeof questionType != 'string') return;
  switch (questionType.toUpperCase()) {
    case 'Z': score = calculateZ(choose);
      break;
    case 'S': score = calculateS(choose);
      break;
    case 'A': score = calculateA(choose);
      break;
    case 'M': score = calculateM(choose);
      break;
  }
  return score;
}

function calculateZ(choose) {
  var score = 0;
  switch (choose) {
    case 0: score = 10;
      break;
    case 1: score = 7.6;
      break;
    case 2: score = 1;
      break;
    case 3: score = 5;
      break;
    case 4: score = 3;
      break;
    default: break;
  }
  return score;
}

function calculateS(choose) {
  var score = 0;
  switch (choose) {
    case 0: score = 3;
      break;
    case 1: score = 5;
      break;
    case 2: score = 1;
      break;
    case 3: score = 7.6;
      break;
    case 4: score = 10;
      break;
  }
  return score;
}

function calculateA(choose) {
  var score = 0;
  switch (choose) {
    case 0: score = 9;
      break;
    case 1: score = 9;
      break;
    case 2: score = 9;
      break;
    case 3: score = 9;
      break;
    case 4: score = 9;
      break;
    default: break;
  }
  return score;
}

function calculateM(choose) {
  var score = 0;
  switch (choose) {
    case 0: score = 1;
      break;
    case 1: score = 1;
      break;
    case 2: score = 10;
      break;
    case 3: score = 1;
      break;
    case 4: score = 1;
      break;
    default: break;
  }
  return score;
}

function getCommentByScore(score) {
  if (score <= 42) {
    return {
      comment: "<p>很遗憾，未过关（90%过关）！</p><br /><p>如果多组结果如此就说明你有很多认知误区，看待和解决很多事情的思维能力很不积极。</p><br /><p>建议你和恋人同学朋友交流，直到过关。</p><br /><p>为此，我们设立以下奖励。</p><br /><p>1、 奖励条件及人数</p><br /><p>按照以下顺序达到要求的前111人，弄错顺序无效。</p><br /><p>1）邀请5位以上好友（填写你的ID 号），他们都至少练习一次。</p><br /><p>2）本人一星级思维测试过关。</p><br /><p>3）被邀请人中1人思维测试过关</p><br /><p>* 思维测试至少5次免费</p><br /><p>二、奖励金额（共5000元）</p><br /><p>第1名：奖励5000元</p><br /><p>第2-11名：奖励500元/人</p><br /><p>第12-100名：奖励100元/人</p><br /><p>三、截止：2018年9月15日</p><br /><p>（大家学习的情况及奖励结果，请看高商苑服务号推送信息！）</p><br />", score: '<70%', titleScore: '<70', realScore: score, color: gsy_red};
  }
  if (score < 54) {
    return { comment: '<p>遗憾，未过关（90%过关）！</p><br /><p>如果多组结果如此就说明你有不少认知误区，看待和解决很多事情的思维能力还不够积极。</p><br /><p>建议你和恋人同学朋友交流，直到过关。</p><br /><p>为此，我们设立以下奖励。</p><br /><p>1、 奖励条件及人数</p><br /><p>按照以下顺序达到要求的前111人，弄错顺序无效。</p><br /><p>1）邀请5位以上好友（填写你的ID 号），他们都至少练习一次。</p><br /><p>2）本人一星级思维测试过关。</p><br /><p>3）被邀请人中1人思维测试过关</p><br /><p>* 思维测试至少5次免费</p><br /><p>二、奖励金额（共5000元）</p><br /><p>第1名：奖励5000元</p><br /><p>第2-11名：奖励500元/人</p><br /><p>第12-100名：奖励100元/人</p><br /><p>三、截止：2018年9月15日</p><br /><p>（大家学习的情况及奖励结果，请看高商苑服务号推送信息！）</p><br />', score: '70-89%', titleScore: '70+', realScore: score, color:gsy_yellow };
  }
  if (score == 54 || score == 55) {
    return { comment: '<p>恭喜，过关！</p><br /><p>如果多组结果都如此（含思维测试）就说明你认知误区不多，看待和解决很多事情的思维能力比较积极。</p><br /><p>建议你和恋人同学朋友交流，这样可以加深友情爱情！</p><br /><p>为此，我们设立以下奖励。</p><br /><p>1、 奖励条件及人数</p><br /><p>按照以下顺序达到要求的前111人，弄错顺序无效。</p><br /><p>1）邀请5位以上好友（填写你的ID 号），他们都至少练习一次。</p><br /><p>2）本人一星级思维测试过关。</p><br /><p>3）被邀请人中1人思维测试过关</p><br /><p>* 思维测试至少5次免费</p><br /><p>二、奖励金额（共5000元）</p><br /><p>第1名：奖励5000元</p><br /><p>第2-11名：奖励500元/人</p><br /><p>第12-100名：奖励100元/人</p><br /><p>三、截止：2018年9月15日</p><br /><p>（大家学习的情况及奖励结果，请看高商苑服务号推送信息！）</p><br />', score: '90-92%', titleScore: '90+', realScore: score, color: gsy_green};
  }
  if (score == 54.2 || score == 55.2) {
    return { comment: '<p>恭喜，过关！</p><br /><p>如果多组结果都如此（含思维测试）就说明你认知误区不多，看待和解决很多事情的思维能力比较积极。</p><br /><p>建议你和恋人同学朋友交流，这样可以加深友情爱情！</p><br /><p>为此，我们设立以下奖励。</p><br /><p>1、 奖励条件及人数</p><br /><p>按照以下顺序达到要求的前111人，弄错顺序无效。</p><br /><p>1）邀请5位以上好友（填写你的ID 号），他们都至少练习一次。</p><br /><p>2）本人一星级思维测试过关。</p><br /><p>3）被邀请人中1人思维测试过关</p><br /><p>* 思维测试至少5次免费</p><br /><p>二、奖励金额（共5000元）</p><br /><p>第1名：奖励5000元</p><br /><p>第2-11名：奖励500元/人</p><br /><p>第12-100名：奖励100元/人</p><br /><p>三、截止：2018年9月15日</p><br /><p>（大家学习的情况及奖励结果，请看高商苑服务号推送信息！）</p><br />', score: '91-94%', titleScore: '91+', realScore: score, color: gsy_green};
  }
  if (score > 56) {
    return { comment: '<p>祝贺，过关！</p><br /><p>如果多组结果都如此（含考试）就说明你认知误区很少，看待和解决很多事情的思维能力很积极。</p><br /><p>建议你和恋人同学朋友交流，这样可以加深友情爱情。</p><br /><p>为此，我们设立以下奖励。</p><br /><p>1、 奖励条件及人数</p><br /><p>按照以下顺序达到要求的前111人，弄错顺序无效。</p><br /><p>1）邀请5位以上好友（填写你的ID 号），他们都至少练习一次。</p><br /><p>2）本人一星级思维测试过关。</p><br /><p>3）被邀请人中1人思维测试过关</p><br /><p>* 思维测试至少5次免费</p><br /><p>二、奖励金额（共5000元）</p><br /><p>第1名：奖励5000元</p><br /><p>第2-11名：奖励500元/人</p><br /><p>第12-100名：奖励100元/人</p><br /><p>三、截止：2018年9月15日</p><br /><p>（大家学习的情况及奖励结果，请看高商苑服务号推送信息！）</p><br />', score: '95%+', titleScore: '95+', realScore: score, color:gsy_green};
  }
}

module.exports = {
  calculateScore: calculateScore,
  getCommentByScore: getCommentByScore

}