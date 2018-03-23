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
    return { comment: '你可能对工作和生活中经常出现的问题存在一定的认知误区，判断和解决问题的思维能力还有提升的空间。\n\n尝试和不同的人交流，也可以购买解析，了解更多的想法，作出更好的选择！', score: '<70%', titleScore: '<70', realScore: score, color: gsy_red};
  }
  if (score < 54) {
    return { comment: '你可能对工作和生活中经常出现的问题还存在一些认知误区，判断和解决问题的思维能力还可以提高。\n\n尝试和不同的人交流，也可以购买解析，了解更多的想法，作出更好的选择！', score: '70-89%', titleScore: '70+', realScore: score, color:gsy_yellow };
  }
  if (score == 54 || score == 55) {
    return { comment: '如果你很清楚为什么作出这样的选择，说明你的判断和解决问题的思维能力优于一般人！\n\n不过，也还有提升的空间。和更多的人交流，总会有更好的想法出现！', score: '90-92%', titleScore: '90+', realScore: score, color: gsy_green};
  }
  if (score == 54.2 || score == 55.2) {
    return { comment: '如果你很清楚为什么作出这样的选择，说明你的判断和解决问题的思维能力优于一般人！\n\n不过，也还有提升的空间。和更多的人交流，总会有更好的想法出现！', score: '91-94%', titleScore: '91+', realScore: score, color: gsy_green};
  }
  if (score > 56) {
    return { comment: '如果你很清楚为什么作出这样的选择，说明你的判断和解决问题的思维能力优于一般人！\n\n如果你还有些疑问，可以看看解析，帮助你深入思考。\n\n去挑战下一组话题吧！', score: '95%+', titleScore: '95+', realScore: score, color:gsy_green};
  }
}

module.exports = {
  calculateScore: calculateScore,
  getCommentByScore: getCommentByScore

}