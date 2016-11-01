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
var nb=new Array();//延时显示内容 距离页面顶部距离
var sb=new Array();//缓动内容 距离页面顶部距离
var sbh=new Array();//缓动内容 距离页面顶部距离+容器高度
var sbw=new Array();//缓动内容 容器高度
/*var nb1,nb2,nb3,nb4,nb5,nb6,nb7,nb8,nb9,nb10,nb11,nb12,nb13,nb14,nb15,nb16,nb17,nb18,nb19,nb20;
var sb1,sb2,sb3,sb4,sb5,sb6,sb7,sb8,sb9,sb10,sb11,sb12,sb13,sb14,sb15,sb16,sb17,sb18,sb19,sb20;
var sbh1,sbh2,sbh3,sbh4,sbh5,sbh6,sbh7,sbh8,sbh9,sbh10,sbh11,sbh12,sbh13,sbh14,sbh15,sbh16,sbh17,sbh18,sbh19,sbh20;
var sbw1,sbw2,sbw3,sbw4,sbw5,sbw6,sbw7,sbw8,sbw9,sbw10,sbw11,sbw12,sbw13,sbw14,sbw15,sbw16,sbw17,sbw18,sbw19,sbw20;*/

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
	
var isIndexFirst=true;
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
	for(var i=0;i<$('.indexLine').length;i++){
		//首页 延时显示内容、缓动内容
		nb[i]=parseInt($('.indexLine'+(i+1)+' .needShowa').offset().top);
		sb[i]=parseInt($('.indexLine'+(i+1)+'left').offset().top)+200;
		sbw[i]=parseInt($('.indexLine'+(i+1)+'left').height());
		sbh[i]=sb[i]+sbw[i];
		}
	}
		
var manifest;
var preload;
function loadIndexImg() {
	manifest = [];
	manifest.push('images/index/kvBg.jpg');
	for(var i=1;i<=66;i++){
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
var kvm=66;
function playKv(){
	if(kvs==1){
		$('.staticKv .jumbotron').css('opacity',1);
		}
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
	
	for(var i=0;i<$('.indexLine').length;i++){
		if(this_scrollTop1>=nb[i]){
			$('.indexLine'+(i+1)+' .needShowa,.indexLine'+(i+1)+' .needShowb,.lineBlock'+(i+1)+'').css('opacity',1);
			}
		if(wWidth<=767){
			$('.indexLine'+(i+1)+'left').css('transform','translate(0,0)');
			$('.indexLine'+(i+1)+'Right').css('transform','translate(0,0');
			}
			else{
				if(this_scrollTop2>sb[i]&&this_scrollTop2<(sbh[i]+wHeight)){
					var sy=(this_scrollTop2-sb[i]);
					$('.indexLine'+(i+1)+'left').css('transform','translate(0,'+(parseInt(150-sy/10))+'px)');
					$('.indexLine'+(i+1)+'Bottom').css('transform','translate(0,'+sy/8+'px)');
					$('.indexLine'+(i+1)+'Right').css('transform','translate(0,'+sy/8+'px)');
					}
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
	for(var i=0;i<($('.brandLine').length);i++){
		//brand 延时显示内容、缓动内容
		if((i+1)==($('.brandLine').length)){
			sb[i]=parseInt($('.bibLeft').offset().top)+200;
			sbw[i]=parseInt($('.bibLeft').height());
			sbh[i]=sb[i]+sbw[i];
			
			sb[i+1]=parseInt($('.biTop').offset().top)+200;
			sbw[i+1]=parseInt($('.biTop').height());
			sbh[i+1]=sb[i]+sbw[i];
			}
			else{
				nb[i]=parseInt($('.brandLine'+(i+1)+' .needShowa').offset().top);
				sb[i]=parseInt($('.brandLine'+(i+1)+'Left').offset().top)+200;
				sbw[i]=parseInt($('.brandLine'+(i+1)+'Left').height());
				sbh[i]=sb[i]+sbw[i];
				}
		}
	}
	
//Brand滚动事件
function brandScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
	brandPos();
	
	for(var i=0;i<($('.brandLine').length);i++){
		if((i+1)==($('.brandLine').length)){
			if(wWidth<=767){
				$('.bibLeft').css('transform','translate(0,0)');
				$('.bibRight').css('transform','translate(0,0');
				}
				else{
					if(this_scrollTop2>sb[i]&&this_scrollTop2<(sbh[i])){
						var sy=(this_scrollTop2-sb[i]);
						$('.bibLeft').css('transform','translate(0,'+(0-sy/15)+'px)');
						$('.bibRight').css('transform','translate(0,'+sy/15+'px)');
						}
					}
					
			if(wWidth<=767){
				$('.biTop').css('transform','translate(0,0)');
				}
				else{
					if(this_scrollTop2>sb[i+1]&&this_scrollTop2<(sbh[i+1])){
						var sy=(this_scrollTop2-sb[i+1]);
						$('.biTop').css('transform','translate(0,'+(0-sy/10)+'px)');
						}
					}
			}
			else{
				if(this_scrollTop1>=nb[i]){
					$('.brandLine'+(i+1)+' .needShowa,.brandLine'+(i+1)+' .needShowb').css('opacity',1);
					}
				if(wWidth<=767){
					$('.brandLine'+(i+1)+'Left').css('transform','translate(0,0)');
					$('.brandLine'+(i+1)+'Right').css('transform','translate(0,0');
					}
					else{
						if(this_scrollTop2>sb[i]&&this_scrollTop2<(sbh[i])){
							var sy=(this_scrollTop2-sb[i]);
							$('.brandLine'+(i+1)+'Left').css('transform','translate(0,'+(0-sy/15)+'px)');
							$('.brandLine'+(i+1)+'Right').css('transform','translate(0,'+sy/10+'px)');
							}
						}
				}
		}
	}


//活动位置获取
function eventPos(){
	for(var i=0;i<$('.eventLine').length;i++){
		//活动 延时显示内容、缓动内容
		nb[i]=parseInt($('.eventLine'+(i+1)+' .needShowa').offset().top);
		sb[i]=parseInt($('.eventLine'+(i+1)+'left').offset().top)+200;
		sbw[i]=parseInt($('.eventLine'+(i+1)+'left').height());
		sbh[i]=sb[i]+sbw[i];
		}
	}
	
//活动滚动事件
function eventScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
	for(var i=0;i<$('.eventLine').length;i++){
		if(this_scrollTop1>=nb[i]){
			$('.eventLine'+(i+1)+' .needShowa,.eventLine'+(i+1)+' .needShowb,.lineBlock'+(i+2)+'').css('opacity',1);
			}
		if(wWidth<=767){
			$('.eventLine'+(i+1)+'left').css('transform','translate(0,0)');
			$('.eventLine'+(i+1)+'Right').css('transform','translate(0,0');
			}
			else{
				if(this_scrollTop2>sb[i]&&this_scrollTop2<(sbh[i]+wHeight)){
					var sy=(this_scrollTop2-sb[i]);
					$('.eventLine'+(i+1)+'left').css('transform','translate(0,'+(parseInt(200-sy/10))+'px)');
					$('.eventLine'+(i+1)+'Bottom').css('transform','translate(0,'+sy/8+'px)');
					$('.eventLine'+(i+1)+'Right').css('transform','translate(0,'+sy/8+'px)');
					}
				}
		}
	}
	
//新点炫饮位置获取
function drinkPos(){
	for(var i=0;i<$('.drinkLine').length;i++){
		//新点炫饮 延时显示内容、缓动内容
		nb[i]=parseInt($('.drinkLine'+(i+1)+' .needShowa').offset().top);
		sb[i]=parseInt($('.drinkLine'+(i+1)+'Left').offset().top)+200;
		sbw[i]=parseInt($('.drinkLine'+(i+1)+'Left').height());
		sbh[i]=sb[i]+sbw[i];
		}
	}
	
//新点炫饮滚动事件
function drinkScorll(){
	var wst=$(window).scrollTop();
	var this_scrollTop1 = (wst+wHeight*0.8);
	var this_scrollTop2 = (wst+wHeight);
	
	for(var i=0;i<$('.drinkLine').length;i++){
		if(this_scrollTop1>=nb[i]){
			$('.drinkLine'+(i+1)+' .needShowa,.drinkLine'+(i+1)+' .needShowb').css('opacity',1);
			}
		if(wWidth<=767){
			$('.drinkLine'+(i+1)+'Left').css('transform','translate(0,0)');
			$('.drinkLine'+(i+1)+'Right').css('transform','translate(0,0');
			}
			else{
				if(this_scrollTop2>sb[i]&&this_scrollTop2<(sbh[i]+wHeight)){
					var sy=(this_scrollTop2-sb[i]);
					$('.drinkLine'+(i+1)+'Left').css('transform','translate(0,0)');
					$('.drinkLine'+(i+1)+'Right').css('transform','translate(0,'+sy/15+'px)');
					}
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
	
