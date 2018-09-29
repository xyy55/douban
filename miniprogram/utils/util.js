function convertToStarsArray(stars) {
  var score =stars/2;
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= score) {
      array.push(2);
    } else if (i < score+1){
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

module.exports = {
  convertToStarsArray: convertToStarsArray
}