function calculateScore(questionType,choose){
  var score = 0;
  switch(questionType.toUpperCase()){
    case 'Z': score =calculateZ(choose);
    break;
    case 'S': score =calculateS(choose);
    break;
    case 'A': score =calculateA(choose);
    break;
    case 'M': score =calculateM(choose);
    break;
  }
  return score;
}

function calculateZ(choose){
  var score = 0;
  switch(choose){
   case 0: score = 10;
    break;
   case 1: score =7.6;
     break;
   case 2: score = 1;
     break;
   case 3: score = 5;
     break;
   case 4: score = 3;
     break;
   default:break;
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
    default:break;
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
    default:break;
  }
  return score;
}

function getCommentByScore(score){
  if(score<=42){
    return { comment:'　　很遗憾！分数不到70分，未过关（90分过关）！\n　　如果很多组都如此，就很可能说明你对工作和生活的不少事情存在认知误区，实用智商（判断能力和解决问题的思维能力）与常人追求的人生目标差距较大。\n　　建议你和他人交流直到过关，这样可以提高实用智商、情商、逆商。\n　　如与他人交流无果可看解析（正在编辑中）！',score:'<70',realScore:score};
  }
  if(score<54){
    return { comment: '　　遗憾！分数在70– 89分之间，未过关（90分过关）！\n　　 如果很多组都如此，就很可能说明你对工作和生活的一些事情还存在认知误区，实用智商（判断能力和解决问题的思维能力）与常人追求的人生目标还有一定的改善空间！\n　　建议你和他人交流直到过关，这样可以提高实用智商、情商、逆商。\n　　如与他人交流无果可看解析（正在编辑中）！', score: '70-89', realScore: score};
  }
  if(score== 54 || score == 55){
    return { comment:'　　恭喜！分数在90 – 92分之间，过关！\n　　　　如果全都如此（含考试）并知其所以然，就说明你在工作和生活中的实用智商（对很多事情的判断能力和解决问题的思维能力）比较好，还有一点改善空间！\n　　建议你和他人交流，确认自己知其所以然。这样可以提高情商、逆商。\n　　如与他人交流无果可看解析（正在编辑中）！',score:'90-92',realScore:score};
  }
  if(score== 54.2 || score == 55.2){
    return { comment: '　　恭喜！分数在91 – 94分之间，过关！\n　　如果全都如此（含考试）并知其所以然，就说明你在工作和生活中的实用智商（对很多事情的判断能力和解决问题的思维能力）很好！\n　　建议你和他人交流，确认自己知其所以然。这样可以提高情商、逆商。\n　　如与他人交流无果可看解析（正在编辑中）！', score: '91-94', realScore: score};
  }
  if(score> 56){
    return { comment: '　　非常好，分数在95分以上！\n　　如果全部都如此（含“潜力评估”里的考试题）并知其所以然，就说明你对工作和生活很多事情的判断能力和解决问题的思维能力非常好，几本上没有什么问题可以难倒你！\n　　自己是否知其所以然，可以购买解析看看！\n　　建议你和他人交流，确认自己知其所以然。这样可以提高情商、逆商。\n　　如与他人交流无果可看解析（正在编辑中）！', score: '95+', realScore: score};
  }
}

module.exports = {
  calculateScore: calculateScore,
  getCommentByScore: getCommentByScore

}