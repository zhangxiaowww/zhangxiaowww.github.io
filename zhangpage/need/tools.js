function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}

/*
           参数：obj：要执行动画的对象
                attr: 要执行动画的样式
                target:执行动画的目的地
                speed：移动的速度
                callback:回调函数，动画执行完毕后执行

           */
function move(obj, attr, target, speed, callback) {

    //关闭上一个定时器
    clearInterval(obj.timer);

    var current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }
    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, attr))
        var newValue = oldValue + speed;
        if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
            newValue = target;
        }
        obj.style[attr] = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();//如果没有传入callback 就不执行了
        }
    }, 5)
}

function addClass(obj, classname) {
    if (!hasClass(obj, classname)) {
        obj.className += " " + classname;
    }
}
//判断是否有类
function hasClass(obj, classname) {
    var reg = new RegExp("\\b" + classname + "\\b")

    return reg.test(obj.className);
}

function removeClass(obj, classname) {
    var reg = new RegExp("\\b" + classname + "\\b");

    obj.className = obj.className.replace(reg, " ");
}
//有改类，删除 没有，加上
function toggleClass(obj , classname){
    if(!hasClass(obj,classname)){
        addClass(obj,classname);
    }else{
        removeClass(obj,classname);
    };

}
