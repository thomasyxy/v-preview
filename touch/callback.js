/**
 * 执行绑定的回调函数，并创建一个事件对象
 * @param[string]事件名
 * @param[function]被执行掉的函数
 * @param[object]指向的dom
 * @param[object]原生event对象
 */
export default function event_callback(name,fn,dom,e){
  //优先使用自定义的touches（目前是为了解决touchEnd无touches的问题）
  var touches = e.plugTouches || e.touches,
    touch = touches.length ? touches[0] : {},
    newE = {
      type : name,
      target : e.target,
      pageX : touch.pageX,
      pageY : touch.pageY,
      clientX : touch.clientX || 0,
      clientY : touch.clientY || 0
    };
  //为swipe事件增加交互初始位置及移动距离
  if(name.match(/^swipe/) && e.plugStartPosition){
    newE.startX = e.plugStartPosition.pageX;
    newE.startY = e.plugStartPosition.pageY;
    newE.moveX = newE.pageX - newE.startX;
    newE.moveY = newE.pageY - newE.startY;
  }
  //执行绑定事件的回调，并记录返回值
  var call_result = fn.call(dom,newE);
  //若返回false，阻止浏览器默认事件
  if(call_result == false){
    e.preventDefault();
    e.stopPropagation();
  }

  return call_result;
}
