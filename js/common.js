/**
 * 根据id获取元素
 * @param id
 * @returns {Element}
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * 获取下一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var prev = element.previousSibling;
        while (prev && prev.nodeType !== 1) {
            prev = prev.previousSibling;
        }
        return prev;
    }
}

/**
 * 获取任意对象的内部文本（兼容所有浏览器）
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * 设置任意对象的内部文本 （兼容所有浏览器）
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}

/**
 * 获取第一个子元素的兼容函数
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取最后一个子元素的兼容函数
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType !== 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * [replaceClassName description]
 * @param  {[type]} element [description]
 * @param  {[type]} oldStr  [description]
 * @param  {[type]} newStr  [description]
 * @return {[type]}         [description]
 */
function replaceClassName(element, oldStr, newStr) {
    var nameArr = element.className.split(" ");//把类名切割成一个一个的类名
    for (var i = 0; i < nameArr.length; i++) {
        if (nameArr[i] === oldStr) {
            nameArr[i] = newStr;
        }
    }
    element.className = nameArr.join(" ");
}

/**
 * [getElementsByClassName description]
 * @param  {[type]} element   [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function getElementsByClassName(element, className) {
        if(element.getElementsByClassName(className)){
            return element.getElementsByClassName(className);
        }else{  
        //先找到所有的标签 然后判断类名是否符合要求
        //如果符合要求 就放到数组中 最后返回数组
        var filterArr = [];
        var elements = element.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
            var nameArr = elements[i].className.split(" ");
            for (var j = 0; j < nameArr.length; j++) {//遍历当前元素的类名数组
                if (nameArr[j] === className) {
                    filterArr.push(elements[i]);
                    break;
                }
            }
        }
        return filterArr;
        }
    }
/**
 * [animate 改变任意元素 任意属性 效果]
 * @param  {[type]}   obj  [元素]
 * @param  {[type]}   json [{"属性":值,"属性":值,}]
 * @param  {Function} fn   [调用自身，实现动画效果]
 * @return {[type]}        [description]
 */
 function animate(obj, json, fn) {
     clearInterval(obj.timer);
     obj.timer = setInterval(function () {
         var flag = true;
         for (var k in json) {
             if (k === "opacity") {//特殊处理
                 //var leader = parseInt(getStyle(obj, k)) || 0;
                 var leader = getStyle(obj, k) * 100;//1
                 // 0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
                 //所以这里不能给默认值 而且也没有必要
                 //透明度没有单位px 所以也不用parseInt 参与运算自动变为数字
                 var target = json[k] * 100;//0.5
                 var step = (target - leader) / 10;//0.5-1=-0.5
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
                 leader = leader + step;
                 //obj.style[k] = leader + "px";
                 obj.style[k] = leader / 100;//opacity没有单位
             } else if (k === "zIndex") {
                 obj.style.zIndex = json[k];//无需渐变 直接设置即可
             } else {
                 var leader = parseInt(getStyle(obj, k)) || 0;
                 var target = json[k];
                 var step = (target - leader) / 10;
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
                 leader = leader + step;
                 obj.style[k] = leader + "px";
             }
             if (leader !== target) {
                 flag = false;
             }
         }
         if (flag) {
             clearInterval(obj.timer);
             if (fn) {//如果有才调用
                 fn();//动画执行完成后执行
             }
         }
     }, 15);
 }

 function getStyle(obj, attr) {
     if (window.getComputedStyle) {
         return window.getComputedStyle(obj, null)[attr];
     } else {
         return obj.currentStyle[attr];
     }
 }
 /**
 * [animateSlow 运动速度慢 改变任意元素 任意属性 效果]
 * @param  {[type]}   obj  [元素]
 * @param  {[type]}   json [{"属性":值,"属性":值,}]
 * @param  {Function} fn   [调用自身，实现动画效果]
 * @return {[type]}        [description]
 */
 function animateSlow(obj, json, fn) {
     clearInterval(obj.timer);
     obj.timer = setInterval(function () {
         var flag = true;
         for (var k in json) {
             if (k === "opacity") {//特殊处理
                 //var leader = parseInt(getStyle(obj, k)) || 0;
                 var leader = getStyle(obj, k) * 100;//1
                 // 0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
                 //所以这里不能给默认值 而且也没有必要
                 //透明度没有单位px 所以也不用parseInt 参与运算自动变为数字
                 var target = json[k] * 100;//0.5
                 var step = (target - leader) / 100;//0.5-1=-0.5
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
                 leader = leader + step;
                 //obj.style[k] = leader + "px";
                 obj.style[k] = leader / 100;//opacity没有单位
             } else if (k === "zIndex") {
                 obj.style.zIndex = json[k];//无需渐变 直接设置即可
             } else {
                 var leader = parseInt(getStyle(obj, k)) || 0;
                 var target = json[k];
                 var step = (target - leader) / 10;
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
                 leader = leader + step;
                 obj.style[k] = leader + "px";
             }
             if (leader !== target) {
                 flag = false;
             }
         }
         if (flag) {
             clearInterval(obj.timer);
             if (fn) {//如果有才调用
                 fn();//动画执行完成后执行
             }
         }
     }, 15);
 }

 function getStyle(obj, attr) {
     if (window.getComputedStyle) {
         return window.getComputedStyle(obj, null)[attr];
     } else {
         return obj.currentStyle[attr];
     }
 }
/**
 * [scroll 被滚动条 隐藏的内容高度 调用：scroll().top   / scroll().left]
 * @return {[type]} [description]
 */
 function scroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
    }
/**
 * [client description]
 * @return {[type]} [可视区域宽高]
 */
    function client(){
        return{
            width:window.innerWidth||document.documentElement.clinetWidth||document.body.clientWidth||0,
            height:window.innerHeight||document.documentElement.clientWidth||document.body.clientHeight||0,
        }
    }

/**
 * [client description]
 * @return {[type]} [可视区域宽高]
 */
function client() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        };
    }

/**
 * 事件对象兼容处理
 * 调用方法：
    var event = eventUtils.getEvent(event);
    var pageX = eventUtils.getPageX(event);
    var pageY = eventUtils.getPageY(event);
    eventUtils.stopPropagation(event);
    var target = eventUtils.getTarget(event);
 * 
 */

    var eventUtils = {
        getEvent: function (event) {
            return event || window.event;
        },
        getPageX: function (event) {
            return event.pageX || event.clientX + document.documentElement.scrollLeft;
        },
        getPageY: function (event) {
            return event.pageY || event.clientY + document.documentElement.scrollTop;
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        }
    };