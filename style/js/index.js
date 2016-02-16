/*页面布局部分*/
window.onload=function(){
    var oHeader=$('header');
    var oContent=$('content');
    var oMenu=$('menu');
    var aLiMenu=oMenu.getElementsByTagName('li');
    var oIndicator=$('indicator');
    var oList=$('list');
    var aLiList=getByClass(oList,'liList');
    var aDivList=getByClass(oList,'divList');
    var iNow=0;
    var prevIndex = 0;
    var iContentHeight=0;
    var oNav = $('nav');
    var aLiNav = oNav.getElementsByTagName('li');
    contentAuto();
    listContentAuto();
    bindNav();
    mouseWheel();
    window.onresize=fnResize;
    /*自动根据页面可视区高度设置Li的高度*/
    function contentAuto(){
        iContentHeight=viewHeight()-oHeader.offsetHeight;
        oContent.style.height=iContentHeight+'px';
        for (var i = 0; i < aLiList.length; i++) {
            aLiList[i].style.height=iContentHeight+'px';
        };
        oList.style.top=-iNow*iContentHeight+'px';
    }
    /*载入完成的特效*/
    function bindNav(){
        var oDiv=aLiMenu[0].getElementsByTagName('div')[0];
        oDiv.style.width='100%';
        oIndicator.style.left=aLiMenu[0].offsetLeft+aLiMenu[0].offsetWidth/2-oIndicator.offsetWidth/2+'px';
        for (var i = 0; i < aLiMenu.length; i++) {
            aLiMenu[i].index=i;
            aLiMenu[i].onmousedown=function(){
                prevIndex = iNow;
                iNow = this.index;
                toMove(this.index);
            }
        };
        for(var i=0;i<aLiNav.length;i++){
            aLiNav[i].index = i;
            aLiNav[i].onclick = function(){
                prevIndex = iNow;
                iNow = this.index;
                toMove( this.index);
            };
        }
    }
    /*导航特效*/
    // toMove(4);
    function toMove(index){
        for (var i = 0; i < aLiNav.length; i++) {
            var oDiv=aLiMenu[i].getElementsByTagName('div')[0];
            oDiv.style.width='0';
        };
        var oDiv=aLiMenu[index].getElementsByTagName('div')[0];
        oDiv.style.width='100%';
        oIndicator.style.left = aLiMenu[index].offsetLeft + aLiMenu[index].offsetWidth/2 - oIndicator.offsetWidth/2 + 'px';
        oList.style.top = - index * iContentHeight + 'px';
        for(var i=0;i<aLiNav.length;i++){
            aLiNav[i].className = '';
        }
        aLiNav[index].className = 'active';
        if( cjAnimate[index].inAn ){
            cjAnimate[index].inAn();
        }
        if( cjAnimate[prevIndex].outAn ){
            cjAnimate[prevIndex].outAn();
        }

    }
    /* Li里面的DIV距离Margin计算*/
    function listContentAuto(){
        var mt=(iContentHeight-520)/2;
        for (var i = 0; i < aDivList.length; i++) {
            aDivList[i].style.marginTop=mt+'px';
        };
    }
    /*设置发现变化触发的函数*/
    function fnResize(){
        contentAuto();
        listContentAuto();
    }
    /*鼠标滚动移动*/
    function mouseWheel(){
        var bBtn=true;
        var timer=null;
        if (oContent.addEventListener) {
            oContent.addEventListener('DOMMouseScroll',function(ev){
                var ev=ev||window.event;
                clearTimeout(timer);
                timer=setTimeout(function(){
                    toChange(ev);
                },200)
            },false)
        };
        oContent.onmousewheel = function(ev){
            var ev = ev || window.event;
            clearTimeout(timer);
            timer = setTimeout(function(){
                toChange(ev);
            },200);
        };
        // function toChange(ev){
        //     if (ev.detail) {
        //         bBtn=ev.datail>0?true:false;
        //     } else{
        //         bBtn=ev.wheelDelta< 0 ? true:false;
        //     };
        //     prevIndex = iNow;
        //     if (bBtn) {
        //         if (iNow!=aLiList.length-1) {
        //             iNow++;
        //         };
        //         toMove(iNow);
        //     } else{
        //         if (iNow!=0) {
        //             iNow--;
        //         };
        //         toMove(iNow);
        //     };
        //     if (ev.preventDefault) {
        //         ev.preventDefault();
        //     } else{
        //         return false;
        //     };
        // }
        function toChange(ev){
            //alert(ev.detail);  //↓ 3  ↑ -3
            //alert(ev.wheelDelta); //↓ -120  ↑ 120

            if(ev.detail){
                bBtn = ev.detail > 0 ? true : false;
            }
            else{
                bBtn = ev.wheelDelta < 0 ? true : false;
            }

            if( (iNow == 0 && !bBtn) || (iNow == aLiList.length-1 && bBtn) ){return;}

            prevIndex = iNow;
            if(bBtn){   //↓
                if(iNow != aLiList.length-1){
                    iNow++;
                }
                toMove(iNow);
            }
            else{   //↑
                if(iNow != 0){
                    iNow--;
                }
                toMove(iNow);
            }

            if(ev.preventDefault){
                ev.preventDefault();
            }
            else{
                return false;
            }
        }
    }
    /*首屏3D特效*/
    var oHomeContent=$('homeContent');
    var oHomeContent1=getByClass(oHomeContent,'homeContent1')[0];
    var oHomeContent2=getByClass(oHomeContent,'homeContent2')[0];
    homeContent();

    function homeContent(){
        var aLi1=oHomeContent1.getElementsByTagName('div');
        var aLi2=oHomeContent2.getElementsByTagName('li');
        var oldIndex=0;
        var iNowHome=0;
        var data=[
            {'img':'style/images/show1.jpg'},
            {'img':'style/images/show2.jpg'},
            {'img':'style/images/show3.jpg'},
            {'img':'style/images/show4.jpg'},
            {'img':'style/images/show5.jpg'}
        ];
        create();
        function create(){
            for (var i = 0; i < data.length; i++) {
                var oDiv=document.createElement('div');
                oDiv.innerHTML='<img class="worksImg" src="'+(data[i].img)+'">';
                var oLi = document.createElement('li');
                if(i == 0){
                    oDiv.className = 'show';
                    oLi.className = 'active';
                }
                oHomeContent1.appendChild(oDiv);
                oHomeContent2.appendChild(oLi);
            };
        }
        for (var i = 0; i < aLi2.length; i++) {
            aLi2[i].index=i;
            aLi2[i].onclick=function(){
                for (var i = 0; i < aLi2.length; i++) {
                    aLi2[i].className='';
                };
                this.className='active';
                if (oldIndex < this.index) { //从左到右
                    aLi1[oldIndex].className = 'leftHide';
                    aLi1[this.index].className = 'rightShow';
                } else  if( oldIndex > this.index ){ //从右到左
                    console.log(this.index);
                    console.log(oldIndex);
                    aLi1[oldIndex].className = 'rightHide';
                    aLi1[this.index].className = 'leftShow';
                };
                oldIndex=this.index;
                iNowHome = this.index;

            }
        }
        var timer=setInterval(change,3000);
        oHomeContent.onmouseover=function(){
            clearInterval(timer);
        }
        function change(){
            iNowHome++;
            if (iNowHome==aLi2.length) {
                iNowHome=0;
            };
            for (var i = 0; i < aLi2.length; i++) {
                aLi2[i].className='';
            };
            aLi2[iNowHome].className='active';
            aLi1[oldIndex].className='leftHide';
            aLi1[iNowHome].className='rightShow';
            oldIndex=iNowHome;
        }
     }
     /*第二屏效果*/
     var oCourseContent=$('courseContent');
     var oCourseContent3=getByClass(oCourseContent,'courseContent3')[0];
     courseContent();
     function courseContent(){
        var data=[
            {'img':'style/images/icon_1.png','text' : '滚轮操作：onmousewheel DOMMouseScroll'},
            {'img':'style/images/icon_2.png','text' : '获取class，getByClass封装'},
            {'img':'style/images/icon_3.png','text' : '可视区宽高获取：clientWidth'},
            {'img':'style/images/icon_4.png','text' : '统一的前缀设置：setStyle'},
            {'img':'style/images/icon_5.png','text' : '入场与出场的设置：inAn outAn'},
            {'img':'style/images/icon_6.png','text' : '曲线算法：sin与单位圆'},
            {'img':'style/images/icon_7.png','text' : '数据的创建：{}与createElement'},
            {'img':'style/images/icon_8.png','text' : 'loading效果：new Image'},
            {'img':'style/images/icon_9.png','text' : 'CSS3事件：transitionend'},
            {'img':'style/images/icon_10.png','text' : 'canvas操作：getContext("2d")'},
            {'img':'style/images/icon_11.png','text' : '音乐播放：play pause'},
            {'img':'style/images/icon_12.png','text' : 'keyframes animation transform'}
        ];
        create();
        function create(){
            var l=120;
            for (var i = 0; i <5; i++) {
                var oLine=document.createElement('div');
                oLine.className='courseLine';
                oLine.style.left=i*120+'px';
                oCourseContent3.appendChild(oLine);
            };
            for (var i = 0; i < data.length; i++) {
                var oDiv=document.createElement('div');
                oDiv.className='courseLogo';
                oDiv.innerHTML = '<div class="courseBefore" style="background-image:url('+(data[i].img)+');"></div><div class="courseAfter">'+(data[i].text)+'</div>';
                oCourseContent3.appendChild(oDiv);
            };
        }
     }
    /*第三屏数据动态生成*/
    var oWorksContent=$('worksContent');
    var oWorksContent2=getByClass(oWorksContent,'worksContent2')[0];
    worksContent();
    function worksContent(){
        var data=[
            {'img':'style/images/worksimg1.jpg','text':'keyframes'},
            {'img':'style/images/worksimg2.jpg','text':'animation'},
            {'img':'style/images/worksimg3.jpg','text':'transform perspective'},
            {'img':'style/images/worksimg4.jpg','text':'rotate translate transition'},
        ];
        for (var i = 0; i < data.length; i++) {
            var oDivParent=document.createElement('div');
            oDivParent.className='worksImgParent';
            oDivParent.innerHTML = '<img class="worksImg" src="'+(data[i].img)+'"><div class="worksImgMark"><span>'+(data[i].text)+'</span><div></div></div>';
            oWorksContent2.appendChild(oDivParent);
        };
    }
    /*第四屏*/
    var oAboutContent = $('aboutContent');
    var oAboutContent3 = getByClass(oAboutContent , 'aboutContent3')[0];
    aboutContent();
    function aboutContent(){
        var aUl=oAboutContent3.getElementsByTagName('ul');
        var aSpan = oAboutContent3.getElementsByTagName('span');
        for(var i=0;i<aUl.length;i++){
            change(aUl[i],aSpan[i]);
        }
        function change(ul,span){
            var w=ul.offsetWidth/2;
            var h=ul.offsetHeight/2;
            var src=ul.dataset.src;
            for (var i = 0; i < 4; i++) {
                var oLi=document.createElement('li');
                oLi.style.width=w+'px';
                oLi.style.height=h+'px';
                var oImg=document.createElement('img');
                oImg.src=src;
                oImg.style.left=-i%2*w+'px';
                oImg.oldleft = - i%2 * w;
                oImg.style.top=-Math.floor(i/2)*h+'px';
                oImg.oldtop = - Math.floor(i/2) * h;
                oLi.appendChild(oImg);
                ul.appendChild(oLi);
            }
            var data=[
                {'name':'top','value':h},
                {'name':'left','value':-w*2},
                {'name':'left','value':w},
                {'name':'top','value':-h*2},
            ]
            var aImg=ul.getElementsByTagName('img');
            ul.onmouseover=function(){
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name]=data[i].value + 'px';
                };
                // span.style.transform = 'scale(1)';
                // span.style.webkitTransform = 'scale(1)';
                setStyle(span,'transform','scale(1)');
            }
            ul.onmouseout=function(){
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[ data[i].name ] = aImg[i]['old'+data[i].name] + 'px';
                };
                setStyle(span,'transform','scale(1.5)');
            }
        }
    }
    /*最后一屏*/
    var oTeamContent = $('teamContent');
    var oTeamContent3 = getByClass(oTeamContent , 'teamContent3')[0];
    teamContent();
    function teamContent(){
        var aLi=oTeamContent3.getElementsByTagName('li');
        var oC=null;
        var w=118;
        var h=300;
        var timer1=null;
        var timer2=null;
        create();
        bindlist();
        function create(){
            var oUl=document.createElement('ul');
            for (var i = 0; i < 8; i++) {
                var oLi=document.createElement('li');
                oLi.style.backgroundPosition = -(i*w) +'px 0';
                oUl.appendChild(oLi);
            };
            oTeamContent3.appendChild(oUl);
        }
        function bindlist(){
            oTeamContent3.onmouseleave = function(){
                removeCanvas();
                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.opacity = 1;
                }
            };
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index=i;
                aLi[i].onmouseover=function(){
                    addCanvas();
                    oC.style.left = this.index * w + 'px';
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].style.opacity = 0.5;
                    }
                    this.style.opacity = 1;
                }
            };
        }
        function addCanvas(){
            if (!oC) {
                oC=document.createElement('canvas');
                oC.id='teamBubble';
                oC.width = w;
                oC.height = h;
                oTeamContent3.appendChild(oC);
                bindCanvas();
            };
        }
        function removeCanvas(){
            clearInterval(timer1);
            clearInterval(timer2);
            oTeamContent3.removeChild(oC);
            oC = null;
        }
        function bindCanvas(){
            var oGC = oC.getContext('2d');

            var setArr = [];   //存储要绘制的所有图形的数据

            timer1 = setInterval(function(){

                oGC.clearRect(0,0,oC.width,oC.height);

                for(var i=0;i<setArr.length;i++){

                    setArr[i].num += 5;

                    setArr[i].x = setArr[i].startX - Math.sin(setArr[i].num*Math.PI/180)*setArr[i].step;
                    setArr[i].y = setArr[i].startY - (setArr[i].num*Math.PI/180)*setArr[i].step;

                    if( setArr[i].y < 50 ){
                        setArr.splice(i,1);
                    }

                }

                for(var i=0;i<setArr.length;i++){
                    oGC.fillStyle = 'rgba('+setArr[i].c1+','+setArr[i].c2+','+setArr[i].c3+','+setArr[i].c4+')';
                    oGC.beginPath();
                        oGC.moveTo(setArr[i].x,setArr[i].y);
                        oGC.arc(setArr[i].x,setArr[i].y,setArr[i].r,0,360*Math.PI/180);
                    oGC.closePath();
                    oGC.fill();
                }

            },1000/60);

            timer2 = setInterval(function(){

                var x = Math.random()*oC.width;
                var y = oC.height - 10;
                var r = Math.random()*6 + 2;
                var c1 = Math.round(Math.random()*255);
                var c2 = Math.round(Math.random()*255);
                var c3 = Math.round(Math.random()*255);
                var c4 = 1;
                var num = 0;
                var step = Math.random()*20 + 10;
                var startX = x;
                var startY = y;

                setArr.push({
                    x : x,
                    y : y,
                    r : r,
                    c1 : c1,
                    c2 : c2,
                    c3 : c3,
                    c4 : c4,
                    num : num,
                    step : step,
                    startX : x,
                    startY : y
                });

            },100);
        }
    }
    /*页面移入移出特效*/
    var cjAnimate = [
        {
            inAn:function(){
                oHomeContent1.style.opacity=1;
                oHomeContent2.style.opacity=1;
                setStyle(oHomeContent1,'transform','translate(0,0)');
                setStyle(oHomeContent2,'transform','translate(0,0)');
            },
            outAn:function(){
                oHomeContent1.style.opacity =0;
                oHomeContent2.style.opacity =0;
                setStyle(oHomeContent1,'transform','translate(0,-150px)');
                setStyle(oHomeContent2,'transform','translate(0,100px)');
            }
        },
        {
                    inAn : function(){
                        var oPlane1 = getByClass(oCourseContent,'plane1')[0];
                        var oPlane2 = getByClass(oCourseContent,'plane2')[0];
                        var oPlane3 = getByClass(oCourseContent,'plane3')[0];
                        setStyle(oPlane1 , 'transform','translate(0,0)');
                        setStyle(oPlane2 , 'transform','translate(0,0)');
                        setStyle(oPlane3 , 'transform','translate(0,0)');
                    },
                    outAn : function(){
                        var oPlane1 = getByClass(oCourseContent,'plane1')[0];
                        var oPlane2 = getByClass(oCourseContent,'plane2')[0];
                        var oPlane3 = getByClass(oCourseContent,'plane3')[0];
                        setStyle(oPlane1 , 'transform','translate(-200px,-200px)');
                        setStyle(oPlane2 , 'transform','translate(-200px,200px)');
                        setStyle(oPlane3 , 'transform','translate(200px,-200px)');
                    }
        },
        {
            inAn : function(){
                var oPencel1 = getByClass(oWorksContent,'pencel1')[0];
                var oPencel2 = getByClass(oWorksContent,'pencel2')[0];
                var oPencel3 = getByClass(oWorksContent,'pencel3')[0];
                setStyle(oPencel1 , 'transform','translate(0,0)');
                setStyle(oPencel2 , 'transform','translate(0,0)');
                setStyle(oPencel3 , 'transform','translate(0,0)');
            },
            outAn : function(){
                //oWorksContent
                var oPencel1 = getByClass(oWorksContent,'pencel1')[0];
                var oPencel2 = getByClass(oWorksContent,'pencel2')[0];
                var oPencel3 = getByClass(oWorksContent,'pencel3')[0];
                setStyle(oPencel1 , 'transform','translate(0,-200px)');
                setStyle(oPencel2 , 'transform','translate(0,200px)');
                setStyle(oPencel3 , 'transform','translate(0,200px)');
            }
        },
        {
            inAn : function(){
                var aAboutImg = getByClass( oAboutContent , 'aboutImg' );
                setStyle(aAboutImg[0],'transform','rotate(0)');
                setStyle(aAboutImg[1],'transform','rotate(0)');
            },
            outAn : function(){
                //oAboutContent
                var aAboutImg = getByClass( oAboutContent , 'aboutImg' );
                setStyle(aAboutImg[0],'transform','rotate(45deg)');
                setStyle(aAboutImg[1],'transform','rotate(-45deg)');
            }
        },
        {
            inAn : function(){
                var oTeamContent1 = getByClass(oTeamContent , 'teamContent1')[0];
                var oTeamContent2 = getByClass(oTeamContent , 'teamContent2')[0];
                oTeamContent1.style.opacity = 1;
                oTeamContent2.style.opacity = 1;
                setStyle(oTeamContent1,'transform','translate(0,0)');
                setStyle(oTeamContent2,'transform','translate(0,0)');
            },
            outAn : function(){
                var oTeamContent1 = getByClass(oTeamContent , 'teamContent1')[0];
                var oTeamContent2 = getByClass(oTeamContent , 'teamContent2')[0];
                oTeamContent1.style.opacity = 0;
                oTeamContent2.style.opacity = 0;
                setStyle(oTeamContent1,'transform','translate(-200px,0)');
                setStyle(oTeamContent2,'transform','translate(200px,0)');
            }
        }
    ];
    for(var i=0;i<cjAnimate.length;i++){
        cjAnimate[i].outAn();
    }
    /*
    音乐播放
     */
     var oMusic = $('music');
     var oAudio = $('audio1');
     showMusic();
     function showMusic(){
        var onoff = true;
        oMusic.onclick = function(){
            if(onoff){
                this.style.background = 'url(style/images/musicon.gif)';
                oAudio.play();
            }
            else{
                this.style.background = 'url(style/images/musicoff.gif)';
                oAudio.pause();
            }
            onoff = !onoff;
        };
     }
     /*首页开屏loading*/
     var oLoading = $('loading');
     showLoading();
     function showLoading(){
        var oSpan=oLoading.getElementsByTagName('span')[0];
        var aDiv =oLoading.getElementsByTagName('div');
        var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg'];

        var iNow=0;
        for (var i = 0; i < arr.length; i++) {
            var objImg=new Image();
            objImg.src='style/images/'+arr[i];
            objImg.onload=function(){
                iNow++;
                oSpan.style.width=iNow/arr.length*100 + '%';
            }
        };
        oSpan.addEventListener('webkitTransitionend',spanChange,false);
        oSpan.addEventListener('transitionend',spanChange,false);

        function spanChange(){
            if(oSpan.style.width == '100%'){
                oSpan.style.display = 'none';
                aDiv[0].style.height = 0;
                aDiv[1].style.height = 0;
            }
        }

        aDiv[0].addEventListener('webkitTransitionend',divChange,false);
        aDiv[0].addEventListener('transitionend',divChange,false);

        function divChange(){
            oLoading.parentNode.removeChild(oLoading);
            oMusic.onclick();
            cjAnimate[0].inAn();
        }

     }
}

/* 获取页面指定ID的对象 */
function $(id){
    return document.getElementById(id);
}
/*获取可视区宽度*/
function viewWidth(){
    return window.innerWidth||document.documentElement.clientWidth;
}
/*获取可视区高度*/
function viewHeight(){
    return window.innerHeight||document.documentElement.clientHeight;
}
/* 获取指定父级下的Class集合*/
function getByClass(oParent,sClass){
    var aEle=oParent.getElementsByTagName('*');
    var arr=[];
    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className==sClass) {
            arr.push(aEle[i]);
        };
    };
    return arr;
}
function setStyle(obj,attr,value){
    obj.style[attr]=value;
obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
}