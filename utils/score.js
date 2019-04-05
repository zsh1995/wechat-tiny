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
      comment: "<p>遗憾，未过关（B、A过关）！</p><br /><p>此组未过关的原因可能是：</p><br /><p>1）有认知误区</p><br /><p>2）对自己的想法不够确信</p><br /><p>3）回避重要的问题</p><br /><p>4）不会甄别无关紧要的问题</p><br /><p>5）想的是这个，选的是那个</p><br /><p>6）过于追求学术严谨而忽略生活化情景</p><br /><p>7）已过青年期（^-^）</p><br /><br /><p>如果很多组测试结果都如此就说明你在很多人际关系方面的思维比较消极，如没遇到什么冲突还好，遇到稍大的冲突就很可能无法达到共赢，甚至失去较大的利益，还不容易把握新的机会（很多机会来自各种人际关系）。</p><br /><br /><p>建议你和恋人同学朋友交流，发表己见，听取他人的意见，尽量达成共识，尽量做到知其所以然，根据共识重新回答，直到过关。在这个过程中， 你们会更加了解对方，加深友情或爱情，提高情商和逆商。</p><br /><br /><p>如对测试结果有异议，欢迎和我们联系、探讨！</p>", score: 'D', titleScore: 'D', realScore: score, color: gsy_red};
  }
  if (score < 54) {
    return { comment: '<p>遗憾，未过关（B、A过关）！</p><br /><p>如果很多组测试结果都如此就说明你在人际关系方面的思维还不够积极，如遇到较大的冲突就很可能无法达到共赢，甚至损失较大的利益，或把握不住新的机会（很多机会来自各种人际关系）。</p><br /><br /><p>建议你和恋人同学朋友交流，发表己见，听取他人的意见，求同存异，尽量达成共识，知其所以然，根据共识重新回答，直到过关。在这个过程中，你们会加深感情，提高情商和逆商。</p><br /><br /><p>如对测试结果有异议，欢迎和我们联系、探讨！</p>', score: 'C', titleScore: 'C', realScore: score, color:gsy_yellow };
  }
  if (score == 54 || score == 55) {
    return { comment: '<p>恭喜，过关！</p><br /><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！这样你在求职、交友、找对象时都能很容易证明你看待和解决问题的思维方式都很积极，情商和逆商都较高，还能获得较多较好的发展机会（很多机会来自朋友、同事）！</p><br /><br /><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'B', titleScore: 'B', realScore: score, color: gsy_green};
  }
  if (score == 54.2 || score == 55.2) {
    return { comment: '<p>恭喜，过关！</p><br /><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！这样你在求职、交友、找对象时都能很容易证明你看待和解决问题的思维方式都很积极，情商和逆商都较高，还能获得较多较好的发展机会（很多机会来自朋友、同事）！</p><br /><br /><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'B', titleScore: 'B', realScore: score, color: gsy_green};
  }
  if (score > 56) {
    return { comment: '<p>祝贺，很棒！</p><br /><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！这样你在求职、交友、找对象时都能很容易证明你看待和解决问题的思维方式都很积极，情商和逆商都较高，还能获得较多较好的发展机会（很多机会来自朋友、同事）！</p><br /><br /><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'A', titleScore: 'A', realScore: score, color:gsy_green};
  }
}

module.exports = {
  calculateScore: calculateScore,
  getCommentByScore: getCommentByScore

}