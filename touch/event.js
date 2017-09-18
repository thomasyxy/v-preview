import EMIT from './emit'
import swipeDirection from './direction'

const supportTouch = "ontouchend" in document ? true : false;

export default function eventListener (DOM) {
  let this_touch = this;

  //轻击开始时间
  let touchStartTime = 0;

  //记录上一次点击时间
  let lastTouchTime = 0;

  //记录初始轻击的位置
  let x1,y1,x2,y2;

  //轻击事件的延时器
  let touchDelay;

  //测试长按事件的延时器
  let longTap;

  //记录当前事件是否已为等待结束的状态
  let isActive = false;
  //记录有坐标信息的事件
  let eventMark = null;
  //单次用户操作结束
  function actionOver(e){
    isActive = false;
    clearTimeout(longTap);
    clearTimeout(touchDelay);
  }

  //断定此次事件为轻击事件
  function isSingleTap(){
    actionOver();
    EMIT.call(this_touch, 'singleTap', eventMark);
  }
  //触屏开始
  function touchStart(e){
    //缓存事件
    eventMark = e;
    x1 = e.touches[0].pageX;
    y1 = e.touches[0].pageY;
    x2 = 0;
    y2 = 0;
    isActive = true;
    touchStartTime = new Date();
    EMIT.call(this_touch,'swipeStart',e);
    //检测是否为长按
    clearTimeout(longTap);
    longTap = setTimeout(function(){
      actionOver(e);
      //断定此次事件为长按事件
      EMIT.call(this_touch,'longTap',e);
    },500);
  }
  //触屏结束
  function touchend(e){
    //touchend中，拿不到坐标位置信息，故使用全局保存下数据
    e.plugStartPosition = eventMark.plugStartPosition;
    e.plugTouches = eventMark.touches;

    EMIT.call(this_touch,'swipeEnd',e);
    if(!isActive){
      return;
    }
    let now = new Date();
    //若未监听doubleTap，直接响应
    if(!this_touch._events.doubleTap || this_touch._events.doubleTap.length == 0){
      isSingleTap();
    }else if(now - lastTouchTime > 200){
      //延迟响应
      touchDelay = setTimeout(isSingleTap,190);
    }else{
      clearTimeout(touchDelay);
      actionOver(e);
      //断定此次事件为连续两次轻击事件
      EMIT.call(this_touch,'doubleTap',eventMark);
    }
    lastTouchTime = now;
  }

  //手指移动
  function touchmove(e){
    //缓存事件
    eventMark = e;
    //在原生事件基础上记录初始位置（为swipe事件增加参数传递）
    e.plugStartPosition = {
      pageX : x1,
      pageY : y1
    };
    //断定此次事件为移动事件
    EMIT.call(this_touch,'swipe',e);

    if(!isActive){
      return;
    }
    x2 = e.touches[0].pageX;
    y2 = e.touches[0].pageY;
    if(Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2){
      //断定此次事件为移动手势
      let direction = swipeDirection(x1, x2, y1, y2);
      EMIT.call(this_touch,'swipe' + direction,e);
    }else{
      //断定此次事件为轻击事件
      isSingleTap();
    }
    actionOver(e);
  }
  if (supportTouch) {
    DOM.addEventListener('touchstart',touchStart);
    DOM.addEventListener('touchend',touchend);
    DOM.addEventListener('touchmove',touchmove);
    DOM.addEventListener('touchcancel',actionOver);
  } else {
    DOM.addEventListener('MSPointerDown',touchStart);
    DOM.addEventListener('pointerdown',touchStart);

    DOM.addEventListener('MSPointerUp',touchend);
    DOM.addEventListener('pointerup',touchend);

    DOM.addEventListener('MSPointerMove',touchmove);
    DOM.addEventListener('pointermove',touchmove);

    DOM.addEventListener('MSPointerCancel',actionOver);
    DOM.addEventListener('pointercancel',actionOver);
  }
}
