//找到url中匹配的字符串
function findInUrl(str){
	url = location.href;
	return url.indexOf(str) == -1 ? false : true;
}
//获取url参数
function queryString(key){
    return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}

//产生指定范围的随机数
function randomNumb(minNumb,maxNumb){
	var rn=Math.round(Math.random()*(maxNumb-minNumb)+minNumb);
	return rn;
	}
	
var wWidth;//窗口宽度
var wHeight;//窗口高度
var nb1,nb2,nb3,nb4;//延时显示内容 距离页面顶部距离
var sb1,sb2,sb3,sb4;//缓动内容 距离页面顶部距离
var sbh1,sbh2,sbh3,sbh4;//缓动内容 距离页面顶部距离+容器高度
var sbw1,sbw2,sbw3,sbw4;//缓动内容 容器高度

var isMobile=false;//是否移动端 宽度小于等于767
var isSwipe=false;//底部内容滑动
var fcpLen=0;//底部内容块数
var fcpNumb=0;//底部内容滑动索引值

//通用位置初始化
function getPos(){
	
	wWidth=parseInt($(window).width());
	wHeight=parseInt($(window).height());
	if(wWidth>1340){
		wWidth=1340;
		}
	
	//底部内容块数获取
	fcpLen=$('.footContent').length;
	
	$('.vGallery').hover(function(){
		$(this).find('.vCover').css('opacity','1');
		},function(){
			$(this).find('.vCover').css('opacity','0');
			});
	
	if(wWidth<=767){//初始化移动端
		isMobile=true;
		$('.footTopContent').width(wWidth*fcpLen);
		$('.footTopContent').css('transform','translateX('+(-fcpNumb*wWidth)+'px)');
		
		if(!isSwipe){
			isSwipe=true;
			$('.footTopContent').swipe( {
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
					ftcSwipe('left');
					},
				swipeRight:function(event, direction, distance, duration, fingerCount) {
					ftcSwipe('right');
					}
				});
			}
		}
		else{//初始化PC端
			isMobile=false;
			isSwipe=false;
			$(".footTopContent").swipe("destroy");
			$('.footTop').removeAttr('style');
			$(".footTopContent").removeAttr('style');
			$('.footNav span').removeClass('fnActive').eq(0).addClass('fnActive');
			}
	}
	
//底部内容滑动
function ftcSwipe(dir){
	if(dir=='right'){
		fcpNumb=fcpNumb-1;
		if(fcpNumb<0){
			fcpNumb=fcpLen-1;
			}
		$('.footTopContent').css('transform','translateX('+(-fcpNumb*wWidth)+'px)');
		}
		else if(dir=='left'){
			fcpNumb++;
			if(fcpNumb>=fcpLen){
				fcpNumb=0;
				}
			$('.footTopContent').css('transform','translateX('+(-fcpNumb*wWidth)+'px)');
			}
	$('.footNav span').removeClass('fnActive').eq(fcpNumb).addClass('fnActive');
	}
	
//通用加载完毕
$(document).ready(function(){
	getPos();
	});
//通用窗口大小改变
$(window).resize(function(){
	getPos();
	});
//通用滚动
$(window).scroll(function(){
	
	});
	
//首页位置获取
function indexPos(){
	//首页kv全屏
	if((wHeight-50)>720){
		$('.container .jumbotron').height(720);
		}
		else{
			$('.container .jumbotron').height(wHeight-50);
			}
	if(wWidth/(wHeight-50)>=1.73){
		$('.jumbotron').css('background-size','100% auto');
		}
		else{
			$('.jumbotron').css('background-size','auto 100%');
			}
		
	//首页 内容块1 延时显示内容、缓动内容
	nb1=parseInt($('.indexLine1 .needShowa').offset().top);
	sb1=parseInt($('.indexLine1left').offset().top)+200;
	sbw1=parseInt($('.indexLine1left').height());
	sbh1=sb1+sbw1;
	
	//首页 内容块2 延时显示内容、缓动内容
	nb2=parseInt($('.indexLine2 .needShowa').offset().top);
	sb2=parseInt($('.indexLine2left').offset().top)+200;
	sbw2=parseInt($('.indexLine2left').height());
	sbh2=sb2+sbw2;
	}
	
//首页滚动事件
function indexScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
    if(this_scrollTop1>=nb1){
		$('.indexLine1 .needShowa,.indexLine1 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.indexLine1left').css('transform','translate(0,0)');
		$('.indexLine1Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb1&&this_scrollTop2<(sbh1+wHeight)){
				var sy=(this_scrollTop2-sb1);
				$('.indexLine1left').css('transform','translate(0,'+(50-sy/10)+'px)');
				$('.indexLine1Right').css('transform','translate(0,'+sy/3+'px)');
				}
			}
	
		
	if(this_scrollTop1>=nb2){
		$('.indexLine2 .needShowa,.indexLine2 .needShowb,.lineBlock2').css('opacity',1);
		}
	if(wWidth<=767){
		$('.indexLine2left').css('transform','translate(0,0)');
		$('.indexLine2Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb1&&this_scrollTop2<(sbh2+wHeight)){
				var sy=(this_scrollTop2-sb2);
				$('.indexLine2left').css('transform','translate(0,'+(50-sy/10)+'px)');
				$('.indexLine2Right').css('transform','translate(0,'+sy/3+'px)');
				}
			}
	}
	
//首页KV视频
function playSingleVideo(vid){
	player = new YKU.Player('videoYouku',{
		styleid: '0',
		client_id: '876cd40a21540f7f',
		vid: vid,
		newPlayer: true
        });
	$('.videoPop').show();
	}
	
function closeSingleVideo(){
	$('.videoPop').hide();
	$('.videoPop .videoYouku').html('');
	}
	
//文章详情
function closeArticleDetail(){
	$('.articleDetail').hide();
	$('.mCSB_container').html('');
	}
