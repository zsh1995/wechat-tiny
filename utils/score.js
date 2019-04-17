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
      comment: "<p>遗憾，未过关（B、A过关）！</p><p>此组未过关的原因可能是：</p><p>1）有认知误区（就像当年很多人认为重物会先落地一样）</p><p>2）对自己的想法不够确信</p><p>3）回避重要的问题</p><p>4）不会甄别无关紧要的问题</p><p>5）想的是这个，选的是那个</p><p>6）过于追求学术严谨而忽略生活化情景</p><p>7）已过青年期（^-^）</p><p>如果很多组测试结果都如此，遇到稍微复杂的问题就有可能处理不好，无法共赢。</p><p>建议你和恋人同学朋友交流，发表己见，听取他人的意见，尽量达成共识，尽量做到知其所以然，直到过关。在这个过程中， 你们会更加了解对方，加深友情或爱情，提高解决问题的思维与沟通能力（含情商）。这个过程比自己闷着头测试过关的结果更重要！</p><p>如果你认为这里的案例和观点值得思考和交流，却因多次不过关而气馁、放弃，就说明你逆商较低。</p><p>屡次未过关的人不要急于质疑我们的权威性，因为我们本来就不主张任何权威，只是讲理而已。我们深信你认真、虚心地和他人交流，就一定能过关！反之，如果你不与他人交流也能过关，就不符合本平台“思维与沟通”训练的定位。</p><p>我们欢迎大家和我们联系，尤其欢迎质疑我们“权威”的人和我们联系！我们一定认真、虚心地探讨！</p>", score: 'D', titleScore: 'D', realScore: score, color: gsy_red};
  }
  if (score < 54) {
    return { comment: '<p>遗憾，未过关（B、A过关）！</p><p>此组未过关的原因可能是：</p><p>1）有认知误区（就像当年很多人认为重物会先落地一样）</p><p>2）对自己的想法不够确信</p><p>3）回避重要的问题</p><p>4）不会甄别无关紧要的问题</p><p>5）想的是这个，选的是那个</p><p>6）过于追求学术严谨而忽略生活化情景</p><p>7）已过青年期（^-^）</p><p>如果很多组测试结果都如此，遇到比较复杂的问题就有可能处理不好，无法共赢。</p><p>建议你和恋人同学朋友交流，发表己见，求同存异，尽量达成共识，知其所以然，直到过关。在这个过程中，你们会加深感情，提高解决问题的思维与沟通能力（含情商）。这个过程比自己闷着头测试过关的结果更重要！</p><p>屡次未过关的人不要急于质疑我们的权威性，因为我们本来就不主张任何权威，只是讲理而已。我们深信你认真、虚心地和他人交流，就一定能过关！反之，如果你不与他人交流也能过关，就不符合本平台“思维与沟通”训练的定位。</p><p>我们欢迎大家和我们联系，尤其欢迎质疑我们“权威”的人和我们联系！我们一定认真、虚心地探讨！</p>', score: 'C', titleScore: 'C', realScore: score, color:gsy_yellow };
  }
  if (score == 54 || score == 55) {
    return { comment: '<p>恭喜，过关！</p><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！在此过程中你可以持续提高解决各种问题的思维与沟通能力，还能提高逆商！</p><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'B', titleScore: 'B', realScore: score, color: gsy_green};
  }
  if (score == 54.2 || score == 55.2) {
    return { comment: '<p>恭喜，过关！</p><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！在此过程中你可以持续提高解决各种问题的思维与沟通能力，还能提高逆商！</p><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'B', titleScore: 'B', realScore: score, color: gsy_green};
  }
  if (score > 56) {
    return { comment: '<p>祝贺，很棒！</p><p>希望你再接再厉，全部测试（含收费测试）都能过关，并且知其所以然！在此过程中你可以持续提高解决各种问题的思维与沟通能力，还能提高逆商！</p><p>建议你和恋人、同学、朋友交流，这样可以加深友情爱情！</p>', score: 'A', titleScore: 'A', realScore: score, color:gsy_green};
  }
}

module.exports = {
  calculateScore: calculateScore,
  getCommentByScore: getCommentByScore

}