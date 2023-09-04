var formatjs = {}


/**分转秒 */
var minuteseconds = function(time) {
  let timearr = time.split(':')
  return Number(timearr[0]) * 60  + Number(timearr[1])
}
/**秒转分 */
var secondsminute = function(second) {
  let result = ''
  if(Number(second) >= 60) {
    result = zero(Math.floor(second / 60)) + ':' + zero(second % 60)
  } else {
    result = '00:' + zero(second)
  }
  function zero(sec) {
    return String(sec).length == 1 ? '0' + sec : sec
  }
  return result
}


var transNumberToShort = (value, decimal = 2) => {
  const BASE = 10000;
  const SIZES = ["", "万", "亿", "万亿"];
  let i = undefined;
  let str = "";
  if (isNaN(value)) {
    throw new Error("The input parameter is not a number.");
  }
  if (typeof decimal !== "number" || decimal < 0) {
    throw new Error("The 'decimal' parameter should be a non-negative number.");
  }
  if (value < BASE) {
    str = value;
  } else {
    i = Math.floor(Math.log(value) / Math.log(BASE));
    str = `${((value / Math.pow(BASE, i))).toFixed(decimal)}${SIZES[i]}`;
  }
  return str;
}
export default formatjs = {
  minuteseconds, secondsminute, transNumberToShort
}