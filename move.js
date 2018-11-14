//获取非行间样式  , 在move函数中 利用这个方法去获取元素原有位置，做元素初始化（起始点）
function getStyle(obj,attr){
//    if(obj.currentStyle){
//        return obj.currentStyle[attr];
//    } else{
//        return getComputedStyle(obj,0)[attr];  
//    }
    
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,0)[attr];
}

function move(obj,json,option){
    clearInterval(obj.timer)
    var option = option || {};
    option.type = option.type || 'linear';
    option.time = option.time || 30;//步数
    obj.timer = null;
    //s 起始点  d 可移动范围
    var s = {},d = {},n=0;
    
    //算出来 起始点
    for(var attr in json){
//        console.log(getStyle(obj,attr));
        //起始点
        s[attr] = parseInt(getStyle(obj,attr));
        //目标点 (可移动范围)
        d[attr] = json[attr] - s[attr];
//        console.log(s,d);
    }
    
    //移动物体
    
    obj.timer = setInterval(function (){
        n++;
        for(var attr in json){
            //算速度
            switch(option.type) {
                case 'linear':
                    var cur = s[attr] + d[attr]/option.time*n;
                    break;
            }
            if(attr == 'opacity'){
                obj.style.opacity = cur;
//                obj.style.filter = 'alpha(opacity='+cur*100+')';
            }
            else{
                obj.style[attr] = cur + 'px'
            }
        }
        if(n == option.time){
            clearInterval(obj.timer);
            option.fn && option.fn();
        }
    },15)
}


