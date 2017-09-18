import event from './event'
import event_callback from './callback'

/**
* class 操作
*/
let supports_classList = !!document.createElement('div').classList;
const hasClass = supports_classList ? function( node, classSingle ){
  return node && node.classList && node.classList.contains( classSingle );
} : function ( node, classSingle ){
  if( !node || typeof( node.className ) !== 'string'  ){
   return false;
  }
  return !! node.className.match(new RegExp('(\\s|^)' + classSingle + '(\\s|$)'));
};


/**
 * @method 事件触发器
 * @description 根据事件最原始被触发的target，逐级向上追溯事件绑定
 *
 * @param string 事件名
 * @param object 原生事件对象
 */

export default function EMIT(eventName,e){
  this._events = this._events || {};
  //事件堆无该事件，结束触发
  if(!this._events[eventName]){
    return;
  }
  //记录尚未被执行掉的事件绑定
  var rest_events = this._events[eventName];

  //从事件源：target开始向上冒泡
  var target = e.target;
  while (1) {
    //若没有需要执行的事件，结束冒泡
    if(rest_events.length ==0){
      return;
    }
    //若已经冒泡至顶，检测顶级绑定，结束冒泡
    if(target == this.dom || !target){
      //遍历剩余所有事件绑定
      for(var i=0,total=rest_events.length;i<total;i++){
        var classStr = rest_events[i]['className'];
        var callback = rest_events[i]['fn'];
        //未指定事件委托，直接执行
        if(classStr == null){
          event_callback(eventName,callback,target,e);
        }
      }
      return;
    }

    //当前需要校验的事件集
    var eventsList = rest_events;
    //置空尚未执行掉的事件集
    rest_events = [];

    //遍历事件所有绑定
    for(var i=0,total=eventsList.length;i<total;i++){
      var classStr = eventsList[i]['className'];
      var callback = eventsList[i]['fn'];
      //符合事件委托，执行
      if(hasClass(target,classStr)){
        //返回false停止事件冒泡及后续事件，其余继续执行
        if(event_callback(eventName,callback,target,e) == false){
          return;
        }
      }else{
        //不符合执行条件，压回到尚未执行掉的列表中
        rest_events.push(eventsList[i]);
      }
    }
    //向上冒泡
    target = target.parentNode;
  }
}
