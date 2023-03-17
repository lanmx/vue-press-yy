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
export default formatjs = {
  minuteseconds, secondsminute
}