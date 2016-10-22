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
	
$(document).ready(function(e) {
	wHeight=$(window).height();
    $('.navbar-inverse .navbar-collapse').height(wHeight-51);
});
	
var youku_client_id='876cd40a21540f7f';//优酷代码id
var wWidth;//窗口宽度
var wHeight;//窗口高度
var nb1,nb2,nb3,nb4,nb5,nb6,nb7,nb8,nb9,nb10,nb11,nb12,nb13,nb14,nb15,nb16,nb17,nb18,nb19,nb20;//延时显示内容 距离页面顶部距离
var sb1,sb2,sb3,sb4,sb5,sb6,sb7,sb8,sb9,sb10,sb11,sb12,sb13,sb14,sb15,sb16,sb17,sb18,sb19,sb20;//缓动内容 距离页面顶部距离
var sbh1,sbh2,sbh3,sbh4,sbh5,sbh6,sbh7,sbh8,sbh9,sbh10,sbh11,sbh12,sbh13,sbh14,sbh15,sbh16,sbh17,sbh18,sbh19,sbh20;//缓动内容 距离页面顶部距离+容器高度
var sbw1,sbw2,sbw3,sbw4,sbw5,sbw6,sbw7,sbw8,sbw9,sbw10,sbw11,sbw12,sbw13,sbw14,sbw15,sbw16,sbw17,sbw18,sbw19,sbw20;//缓动内容 容器高度

var isMobile=false;//是否移动端 宽度小于等于767
var isSwipe=false;//底部内容滑动
var fcpLen=0;//底部内容块数
var fcpNumb=0;//底部内容滑动索引值
var isFisrtFoot=true;
var footPos;

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
		
		$('body').attr('style','');
		
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
			
			if(wWidth>767){
				if(wWidth%4==0){
					$('body').attr('style','');
					}
					else{
						var w4=wWidth%4;
						$('body').width(wWidth-w4);
						}
				}
				else{
					$('body').attr('style','');
					}
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

//foot effect && backToTop
var isGoingTop=false;
function footeffect(){
	$('.backToTop').click(function(){
		if(!isGoingTop){
			isGoingTop=true;
			$('html,body').animate({scrollTop:'0px'}, 500 ,'linear',function(){
				//$(window).scrollTop(0);
				isGoingTop=false;
				});
			}
		});
	var wstt=$(window).scrollTop();
	if(wstt+50>wHeight){
		$('.backToTop').fadeIn(500);
		}
		else{
			$('.backToTop').fadeOut(500);
			}
	
	if(wWidth>767){
		footPos=parseInt($('.footContent').offset().top);
		var wsf=$(window).scrollTop()+wHeight;
		if(wsf>footPos&&isFisrtFoot){
			isFisrtFoot=false;
			//$('.footContent').css('transform','translate(0,30px)');
			$('.footContent').eq(0).addClass('fc1');
			$('.footContent').eq(1).addClass('fc2');
			$('.footContent').eq(2).addClass('fc3');
			}
		}
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
	footeffect();
	});
	
//首页位置获取
function indexPos(){
	//首页kv全屏
	if((wHeight-50)>1113){
		$('.container .jumbotron').height(1113);
		}
		else{
			$('.container .jumbotron').height(wHeight-50);
			}
	if(wWidth/(wHeight-50)>=1.73){
		$('.jumbotron').css('background-size','100% auto');
		}
		else if(parseInt($('.jumbotron').width())>1240){
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
	
var manifest;
var preload;
function loadIndexImg() {
	manifest = [];
	for(var i=1;i<=65;i++){
		var s=i;
		s=s.toString();
		if(s.length==1){
			s='00'+s;
			}
			else if(s.length==2){
				s='0'+s;
				}
		manifest.push('images/index/act/'+s+'.png');
		}
	
	startPreload();
}
function startPreload() {
	preload = new createjs.LoadQueue(false);         
    //preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.loadManifest(manifest);
  }
function loadComplete(event) {
	kvt=setInterval(function(){playKv()},35);
	}

var kvt;
var kvs=1;
var kvm=65;
function playKv(){
	if(kvs>kvm){
		clearInterval(kvt);
		return false;
		}
	var kvsstr=kvs.toString();
	if(kvsstr.length==1){
		kvsstr='00'+kvsstr;
		}
		else if(kvsstr.length==2){
			kvsstr='0'+kvsstr;
			}
	$('.kvEf').css('background-image','url(images/index/act/'+kvsstr+'.png)');
	kvs++;
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
				$('.indexLine1left').css('transform','translate(0,'+(parseInt(150-sy/10))+'px)');
				$('.indexLine1Bottom').css('transform','translate(0,'+sy/8+'px)');
				$('.indexLine1Right').css('transform','translate(0,'+sy/8+'px)');
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
			if(this_scrollTop2>sb2&&this_scrollTop2<(sbh2+wHeight)){
				var sy=(this_scrollTop2-sb2);
				$('.indexLine2left').css('transform','translate(0,'+(parseInt(150-sy/10))+'px)');
				$('.indexLine2Bottom').css('transform','translate(0,'+sy/8+'px)');
				$('.indexLine2Right').css('transform','translate(0,'+sy/8+'px)');
				}
			}
	}
	
//首页KV视频
function playSingleVideo(vid){
	player = new YKU.Player('videoYouku',{
		styleid: '0',
		client_id: youku_client_id,
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
	
//Brand位置获取
function brandPos(){
	//brand kv全屏
	if(wWidth>767){
		$('.kvBg').height(wHeight-50);
		$('.kvBg .col-xs-12').height(wHeight-50);
		}
		else{
			$('.kvBg').height('auto');
			$('.kvBg .col-xs-12').height('auto');
			}
	
	
	//brand 内容块1 延时显示内容、缓动内容
	nb1=parseInt($('.brandLine1 .needShowa').offset().top);
	sb1=parseInt($('.brandLine1Left').offset().top)+200;
	sbw1=parseInt($('.brandLine1Left').height());
	sbh1=sb1+sbw1;
	
	//brand 内容块2 延时显示内容、缓动内容
	nb2=parseInt($('.brandLine2 .needShowa').offset().top);
	sb2=parseInt($('.brandLine2Left').offset().top)+200;
	sbw2=parseInt($('.brandLine2Left').height());
	sbh2=sb2+sbw2;
	
	//brand 内容块3 延时显示内容、缓动内容
	nb3=parseInt($('.brandLine3 .needShowa').offset().top);
	sb3=parseInt($('.brandLine3Left').offset().top)+200;
	sbw3=parseInt($('.brandLine3Left').height());
	sbh3=sb3+sbw3;
	
	//brand 内容块4 延时显示内容、缓动内容
	nb4=parseInt($('.brandLine4 .needShowa').offset().top);
	sb4=parseInt($('.brandLine4Left').offset().top)+200;
	sbw4=parseInt($('.brandLine4Left').height());
	sbh4=sb4+sbw4;
	
	//brand 内容块 延时显示内容、缓动内容
	sb5=parseInt($('.biTop').offset().top)+200;
	sbw5=parseInt($('.biTop').height());
	sbh5=sb5+sbw5;
	
	//brand 内容块6 延时显示内容、缓动内容
	sb6=parseInt($('.bibLeft').offset().top)+200;
	sbw6=parseInt($('.bibLeft').height());
	sbh6=sb6+sbw6;
	
	//brand 内容块7 延时显示内容、缓动内容
	nb7=parseInt($('.brandLine5 .needShowa').offset().top);
	sb7=parseInt($('.brandLine5Left').offset().top)+200;
	sbw7=parseInt($('.brandLine5Left').height());
	sbh7=sb5+sbw7;
	}
	
//Brand滚动事件
function brandScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
	brandPos();
	
    if(this_scrollTop1>=nb1){
		$('.brandLine1 .needShowa,.brandLine1 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.brandLine1Left').css('transform','translate(0,0)');
		$('.brandLine1Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb1&&this_scrollTop2<(sbh1)){
				var sy=(this_scrollTop2-sb1);
				$('.brandLine1Left').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.brandLine1Right').css('transform','translate(0,'+sy/10+'px)');
				}
			}
			
	if(this_scrollTop1>=nb2){
		$('.brandLine2 .needShowa,.brandLine2 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.brandLine2Left').css('transform','translate(0,0)');
		$('.brandLine2Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb2&&this_scrollTop2<(sbh2)){
				var sy=(this_scrollTop2-sb2);
				$('.brandLine2Left').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.brandLine2Right').css('transform','translate(0,'+sy/10+'px)');
				}
			}
			
	if(this_scrollTop1>=nb3){
		$('.brandLine3 .needShowa,.brandLine3 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.brandLine3Left').css('transform','translate(0,0)');
		$('.brandLine3Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb3&&this_scrollTop2<(sbh3)){
				var sy=(this_scrollTop2-sb3);
				$('.brandLine3Left').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.brandLine3Right').css('transform','translate(0,'+sy/10+'px)');
				}
			}
			
	if(this_scrollTop1>=nb4){
		$('.brandLine4 .needShowa,.brandLine4 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.brandLine4Left').css('transform','translate(0,0)');
		$('.brandLine4Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb4&&this_scrollTop2<(sbh4)){
				var sy=(this_scrollTop2-sb4);
				$('.brandLine4Left').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.brandLine4Right').css('transform','translate(0,'+sy/10+'px)');
				}
			}
			
	if(wWidth<=767){
		$('.biTop').css('transform','translate(0,0)');
		}
		else{
			if(this_scrollTop2>sb5&&this_scrollTop2<(sbh5)){
				var sy=(this_scrollTop2-sb5);
				$('.biTop').css('transform','translate(0,'+(0-sy/10)+'px)');
				}
			}
			
	if(wWidth<=767){
		$('.bibLeft').css('transform','translate(0,0)');
		$('.bibRight').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb6&&this_scrollTop2<(sbh6)){
				var sy=(this_scrollTop2-sb6);
				$('.bibLeft').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.bibRight').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb7){
		$('.brandLine5 .needShowa,.brandLine5 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.brandLine5Left').css('transform','translate(0,0)');
		$('.brandLine5Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb7&&this_scrollTop2<(sbh7)){
				var sy=(this_scrollTop2-sb7);
				$('.brandLine5Left').css('transform','translate(0,'+(0-sy/15)+'px)');
				$('.brandLine5Right').css('transform','translate(0,'+sy/10+'px)');
				}
			}
	}


//活动位置获取
function eventPos(){
	//活动 内容块1 延时显示内容、缓动内容
	nb1=parseInt($('.eventLine1 .needShowa').offset().top);
	sb1=parseInt($('.eventLine1left').offset().top)+200;
	sbw1=parseInt($('.eventLine1left').height());
	sbh1=sb1+sbw1;
	
	//活动 内容块2 延时显示内容、缓动内容
	nb2=parseInt($('.eventLine2 .needShowa').offset().top);
	sb2=parseInt($('.eventLine2left').offset().top)+200;
	sbw2=parseInt($('.eventLine2left').height());
	sbh2=sb2+sbw2;
	
	//活动 内容块3 延时显示内容、缓动内容
	nb3=parseInt($('.eventLine3 .needShowa').offset().top);
	sb3=parseInt($('.eventLine3left').offset().top)+200;
	sbw3=parseInt($('.eventLine3left').height());
	sbh3=sb3+sbw3;
	}
	
//活动滚动事件
function eventScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
    if(this_scrollTop1>=nb1){
		$('.eventLine1 .needShowa,.eventLine1 .needShowb,.lineBlock2').css('opacity',1);
		}
	if(wWidth<=767){
		$('.eventLine1left').css('transform','translate(0,0)');
		$('.eventLine1Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb1&&this_scrollTop2<(sbh1+wHeight)){
				var sy=(this_scrollTop2-sb1);
				$('.eventLine1left').css('transform','translate(0,'+(parseInt(200-sy/10))+'px)');
				$('.eventLine1Bottom').css('transform','translate(0,'+sy/8+'px)');
				$('.eventLine1Right').css('transform','translate(0,'+sy/8+'px)');
				}
			}
	
		
	if(this_scrollTop1>=nb2){
		$('.eventLine2 .needShowa,.eventLine2 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.eventLine2left').css('transform','translate(0,0)');
		$('.eventLine2Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb2&&this_scrollTop2<(sbh2+wHeight)){
				var sy=(this_scrollTop2-sb2);
				$('.eventLine2left').css('transform','translate(0,'+(parseInt(200-sy/10))+'px)');
				$('.eventLine2Bottom').css('transform','translate(0,'+sy/8+'px)');
				$('.eventLine2Right').css('transform','translate(0,'+sy/8+'px)');
				}
			}
			
	if(this_scrollTop1>=nb3){
		$('.eventLine3 .needShowa,.eventLine3 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.eventLine3left').css('transform','translate(0,0)');
		$('.eventLine3Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb3&&this_scrollTop2<(sbh3+wHeight)){
				var sy=(this_scrollTop2-sb3);
				$('.eventLine3left').css('transform','translate(0,'+(parseInt(200-sy/10))+'px)');
				$('.eventLine3Bottom').css('transform','translate(0,'+sy/8+'px)');
				$('.eventLine3Right').css('transform','translate(0,'+sy/8+'px)');
				}
			}
	}
	
//新点炫饮位置获取
function drinkPos(){
	//新点炫饮 内容块1 延时显示内容、缓动内容
	nb1=parseInt($('.drinkLine1 .needShowa').offset().top);
	sb1=parseInt($('.drinkLine1Left').offset().top)+200;
	sbw1=parseInt($('.drinkLine1Left').height());
	sbh1=sb1+sbw1;
	
	//新点炫饮 内容块2 延时显示内容、缓动内容
	nb2=parseInt($('.drinkLine2 .needShowa').offset().top);
	sb2=parseInt($('.drinkLine2Left').offset().top)+200;
	sbw2=parseInt($('.drinkLine2Left').height());
	sbh2=sb2+sbw2;
	
	//新点炫饮 内容块3 延时显示内容、缓动内容
	nb3=parseInt($('.drinkLine3 .needShowa').offset().top);
	sb3=parseInt($('.drinkLine3Left').offset().top)+200;
	sbw3=parseInt($('.drinkLine3Left').height());
	sbh3=sb3+sbw3;
	
	//新点炫饮 内容块4 延时显示内容、缓动内容
	nb4=parseInt($('.drinkLine4 .needShowa').offset().top);
	sb4=parseInt($('.drinkLine4Left').offset().top)+200;
	sbw4=parseInt($('.drinkLine4Left').height());
	sbh4=sb4+sbw4;
	
	//新点炫饮 内容块5 延时显示内容、缓动内容
	nb5=parseInt($('.drinkLine5 .needShowa').offset().top);
	sb5=parseInt($('.drinkLine5Left').offset().top)+200;
	sbw5=parseInt($('.drinkLine5Left').height());
	sbh5=sb5+sbw5;
	
	//新点炫饮 内容块6 延时显示内容、缓动内容
	nb6=parseInt($('.drinkLine6 .needShowa').offset().top);
	sb6=parseInt($('.drinkLine6Left').offset().top)+200;
	sbw6=parseInt($('.drinkLine6Left').height());
	sbh6=sb6+sbw6;
	
	//新点炫饮 内容块7 延时显示内容、缓动内容
	nb7=parseInt($('.drinkLine7 .needShowa').offset().top);
	sb7=parseInt($('.drinkLine7Left').offset().top)+200;
	sbw7=parseInt($('.drinkLine7Left').height());
	sbh7=sb7+sbw7;
	
	//新点炫饮 内容块8 延时显示内容、缓动内容
	nb8=parseInt($('.drinkLine8 .needShowa').offset().top);
	sb8=parseInt($('.drinkLine8Left').offset().top)+200;
	sbw8=parseInt($('.drinkLine8Left').height());
	sbh8=sb8+sbw8;
	
	//新点炫饮 内容块9 延时显示内容、缓动内容
	nb9=parseInt($('.drinkLine9 .needShowa').offset().top);
	sb9=parseInt($('.drinkLine9Left').offset().top)+200;
	sbw9=parseInt($('.drinkLine9Left').height());
	sbh9=sb9+sbw9;
	
	//新点炫饮 内容块10 延时显示内容、缓动内容
	nb10=parseInt($('.drinkLine10 .needShowa').offset().top);
	sb10=parseInt($('.drinkLine10Left').offset().top)+200;
	sbw10=parseInt($('.drinkLine10Left').height());
	sbh10=sb10+sbw10;
	
	//新点炫饮 内容块11 延时显示内容、缓动内容
	nb11=parseInt($('.drinkLine11 .needShowa').offset().top);
	sb11=parseInt($('.drinkLine11Left').offset().top)+200;
	sbw11=parseInt($('.drinkLine11Left').height());
	sbh11=sb11+sbw11;
	}
	
//新点炫饮滚动事件
function drinkScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
    if(this_scrollTop1>=nb1){
		$('.drinkLine1 .needShowa,.drinkLine1 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine1Left').css('transform','translate(0,0)');
		$('.drinkLine1Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb1&&this_scrollTop2<(sbh1+wHeight)){
				var sy=(this_scrollTop2-sb1);
				$('.drinkLine1Left').css('transform','translate(0,0)');
				$('.drinkLine1Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
		
	if(this_scrollTop1>=nb2){
		$('.drinkLine2 .needShowa,.drinkLine2 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine2Left').css('transform','translate(0,0)');
		$('.drinkLine2Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb2&&this_scrollTop2<(sbh2+wHeight)){
				var sy=(this_scrollTop2-sb2);
				$('.drinkLine2Left').css('transform','translate(0,0)');
				$('.drinkLine2Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb3){
		$('.drinkLine3 .needShowa,.drinkLine3 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine3Left').css('transform','translate(0,0)');
		$('.drinkLine3Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb3&&this_scrollTop2<(sbh3+wHeight)){
				var sy=(this_scrollTop2-sb3);
				$('.drinkLine3Left').css('transform','translate(0,0)');
				$('.drinkLine3Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb4){
		$('.drinkLine4 .needShowa,.drinkLine4 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine4Left').css('transform','translate(0,0)');
		$('.drinkLine4Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb4&&this_scrollTop2<(sbh4+wHeight)){
				var sy=(this_scrollTop2-sb4);
				$('.drinkLine4Left').css('transform','translate(0,0)');
				$('.drinkLine4Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb5){
		$('.drinkLine5 .needShowa,.drinkLine5 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine5Left').css('transform','translate(0,0)');
		$('.drinkLine5Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb5&&this_scrollTop2<(sbh5+wHeight)){
				var sy=(this_scrollTop2-sb5);
				$('.drinkLine5Left').css('transform','translate(0,0)');
				$('.drinkLine5Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb6){
		$('.drinkLine6 .needShowa,.drinkLine6 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine6Left').css('transform','translate(0,0)');
		$('.drinkLine6Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb6&&this_scrollTop2<(sbh6+wHeight)){
				var sy=(this_scrollTop2-sb6);
				$('.drinkLine6Left').css('transform','translate(0,0)');
				$('.drinkLine6Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb7){
		$('.drinkLine7 .needShowa,.drinkLine7 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine7Left').css('transform','translate(0,0)');
		$('.drinkLine7Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb7&&this_scrollTop2<(sbh7+wHeight)){
				var sy=(this_scrollTop2-sb7);
				$('.drinkLine7Left').css('transform','translate(0,0)');
				$('.drinkLine7Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb8){
		$('.drinkLine8 .needShowa,.drinkLine8 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine8Left').css('transform','translate(0,0)');
		$('.drinkLine8Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb8&&this_scrollTop2<(sbh8+wHeight)){
				var sy=(this_scrollTop2-sb8);
				$('.drinkLine8Left').css('transform','translate(0,0)');
				$('.drinkLine8Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb9){
		$('.drinkLine9 .needShowa,.drinkLine9 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine9Left').css('transform','translate(0,0)');
		$('.drinkLine9Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb9&&this_scrollTop2<(sbh9+wHeight)){
				var sy=(this_scrollTop2-sb9);
				$('.drinkLine9Left').css('transform','translate(0,0)');
				$('.drinkLine9Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb10){
		$('.drinkLine10 .needShowa,.drinkLine10 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine10Left').css('transform','translate(0,0)');
		$('.drinkLine10Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb10&&this_scrollTop2<(sbh10+wHeight)){
				var sy=(this_scrollTop2-sb10);
				$('.drinkLine10Left').css('transform','translate(0,0)');
				$('.drinkLine10Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
			
	if(this_scrollTop1>=nb11){
		$('.drinkLine11 .needShowa,.drinkLine11 .needShowb').css('opacity',1);
		}
	if(wWidth<=767){
		$('.drinkLine11Left').css('transform','translate(0,0)');
		$('.drinkLine11Right').css('transform','translate(0,0');
		}
		else{
			if(this_scrollTop2>sb11&&this_scrollTop2<(sbh11+wHeight)){
				var sy=(this_scrollTop2-sb11);
				$('.drinkLine11Left').css('transform','translate(0,0)');
				$('.drinkLine11Right').css('transform','translate(0,'+sy/15+'px)');
				}
			}
	}
	
var at;
function drinkNav(){
	$(".dnCol a").click(function(){
		at=$(this).attr('at');
		var ath=$(at).offset().top;
		$('html,body').animate({scrollTop: ath}, 500 ,'linear');
    }); 
	}
	
function drinkNavInit(){
	if(wWidth<=767){
		$('.dnCol ul').slideUp();
		}
		else{
			$('.dnCol ul').slideDown();
			$('.drinkIcon3').css('transform','rotate(0deg)');
			}
	}
	
function showThisDirks(e){
	if(wWidth<=767){
		var uld=$(e).siblings('ul').css('display');
		if(uld=='none'){
			$(e).siblings('ul').slideDown();
			$(e).find('.drinkIcon3').css('transform','rotate(-180deg)');
			}
			else{
				$(e).siblings('ul').slideUp();
				$(e).find('.drinkIcon3').css('transform','rotate(0deg)');
				}
		}
	}
	
function changeDnTab(e){
	$('.dnTab').removeClass('dnTabActive');
	$('.dtContent').hide();
	$('.dnTab').eq(e).addClass('dnTabActive');
	$('.dtContent').eq(e).show();
	}
	
function showNavQc(){
	$('.navQcBlock').show();
	}
function closeNavQc(){
	$('.navQcBlock').hide();
	}