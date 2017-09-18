import event from './event'

/**
 * touch类
 *
 */
export default function Touch(DOM){

	this.dom = DOM;
	//存储监听事件的回调
	this._events = {};
	//监听DOM原生事件
	event.call(this,this.dom);
}
/**
 * @method 增加事件监听
 * @description 支持链式调用
 *
 * @param string 事件名
 * @param [string] 事件委托至某个class（可选）
 * @param function 符合条件的事件被触发时需要执行的回调函数
 *
 **/
Touch.prototype.on = function ON(eventStr,a,b){
	let className,fn;
	if(typeof(a) == 'string'){
		className = a.replace(/^\./,'');
		fn = b;
	}else{
		className = null;
		fn = a;
	}
	//检测callback是否合法,事件名参数是否存在·
	if(typeof(fn) == 'function' && eventStr && eventStr.length){
		let eventNames = eventStr.split(/\s+/);
		for(let i=0,total=eventNames.length;i<total;i++){

			let eventName = eventNames[i];
			//事件堆无该事件，创建一个事件堆
			if(!this._events[eventName]){
				this._events[eventName] = [];
			}
			this._events[eventName].push({
				className : className,
				fn : fn
			});
		}
	}

	//提供链式调用的支持
	return this;
};
