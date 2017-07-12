//顶部图片3D运动

// 导航栏点击事件开始
var navBar = document.getElementById('navBar');
var stairMune = navBar.getElementsByClassName("stair-mune");
var hideMenu = document.getElementById('hideMenu');
var hideGameUl = document.getElementById('hide-game-ul');//第一个隐藏下拉框
var gameUlLis = hideGameUl.children;

var hideGameMatchUl = document.getElementById('hide-gameMatch-ul');//第二个隐藏下拉框
var gameMatchUlLis = hideGameMatchUl.children;

var owNav = document.getElementById('owNav');
var owNavGame = document.getElementById('owNavGame');
var bodyMask = document.getElementById("body-mask");
// 游戏下拉菜单
for(var i = 0;i<stairMune.length;i++){
	var a  = true;
	var b = 0;
	stairMune[i].index = i;
	stairMune[i].onclick = function(){
		if(b !== this.index){ 
		//判断当前点的是否是自己，如果是自己，隐藏自己
		//如果不是自己，使 a = true; 全部隐藏；
			for(var m = 0;m<stairMune.length;m++){
			replaceClassName(hideMenu.children[m],"show", "hide");//替换类名函数,排他
			this.firstElementChild.style.transform = "rotate(0deg)";
			a = true;
			}
		}
		if(a){ //点击游戏按钮，箭头方向改变
			this.firstElementChild.style.transform = "rotate(180deg)";
			replaceClassName(hideMenu.children[this.index],"hide", "show");//替换类名函数
			hideMenu.children[this.index].style.border = "1px solid #454C5A"; //当隐藏栏显示时 加边框
			replaceClassName(bodyMask,"hide","show");//显示遮罩层
			if(this.index === 0){
				for(var k = 0;k<gameUlLis.length;k++){
					gameUlLis[k].children[0].style.top = "-"+((k+1)*50)+"px"; //每次点击前都恢复以前的位置
					gameUlLis[k].children[0].style.opacity = 0;
					animate(gameUlLis[k].children[0],{"top":0,"opacity":1,});
				}
			}
			if(this.index === 1){
				for(var k = 0;k<gameMatchUlLis.length;k++){
					gameMatchUlLis[k].style.top = "-"+((gameMatchUlLis.length-k)*50)+"px"; //每次点击前都恢复以前的位置
					gameMatchUlLis[k].style.opacity = 0;
					animate(gameMatchUlLis[k],{"top":0,"opacity":1,});
				}
			}
			a = false;
		}
		else{
			this.firstElementChild.style.transform = "rotate(0deg)";//关闭菜单栏（隐藏）
			replaceClassName(hideMenu.children[this.index],"show","hide");
			replaceClassName(bodyMask,"show","hide");//去除遮罩层

			a = true;
		}
		b = this.index;
	}
}
bodyMask.onclick = function(){ //去除遮罩层
	for(var i = 0;i<stairMune.length;i++){
		replaceClassName(hideMenu.children[i],"show", "hide");
		a = true;
	}
	replaceClassName(bodyMask,"show","hide");
	replaceClassName(myVideo.parentNode,"show","hide");
}
//owNav导航栏
var flag = true;
owNavGame.onclick = function(){
	if(flag){
		replaceClassName(owNav.lastElementChild,'hide','show');	
		this.lastElementChild.style.transform = "rotate(180deg)";
		this.style.background = "rgba(73,83,108,0.8)";
		this.children[0].style.color = "#fff";
	}else{
		replaceClassName(owNav.lastElementChild,'show','hide');	
		this.lastElementChild.style.transform = "rotate(0deg)";
	}
	flag = !flag;
}
owNavGame.onmouseover = function(){
	this.style.background = "rgba(73,83,108,0.8)";
	this.children[0].style.color = "#fff";
}
owNavGame.onmouseout = function(){
		this.style.background = "rgba(73,83,108,0)";
		this.children[0].style.color = "#B5B8C2";
}

//owNav导航栏固定 
var topBtn = document.getElementById('top-btn'); 
window.onscroll = function(){
	if(scroll().top>owNav.offsetTop){
		owNav.className = "fixed";
		owNav.style.zIndex = "10000";
		owNav.style.width = "100%";
		owNav.style.transition = "width 1s";
		// owNav.style.transformOrigin="center center";
		// animate(owNav,{"width":100%,});  //  % 报错
		
	}else{
		owNav.className = "";
		owNav.style.width= "96%";
		owNav.style.transition = "width 1s";
	}
	//返回顶部按钮
	if(scroll().top>180){
		animate(topBtn,{"opacity":1});
	}else{
		animate(topBtn,{"opacity":0});
	}
}


//游戏介绍视频
var gameMedia = document.getElementById('game-media');
var videoMask = gameMedia.parentNode.nextElementSibling;
videoMask.onmouseover =function(){//mask层
	this.style.opacity = "1";
	this.nextElementSibling.src = "images/youtube-btn-wh.png";
	videoMask.previousElementSibling.previousElementSibling.style.opacity = ".85";
}
videoMask.onmouseout =function(){//mask层
	this.style.opacity = "0";
	this.nextElementSibling.src = "images/youtube-btn-ylw.png";
	videoMask.previousElementSibling.previousElementSibling.style.opacity = "1";

}
videoMask.nextElementSibling.onmouseover =function(){
	videoMask.style.opacity = "1";
	this.src = "images/youtube-btn-wh.png";
	videoMask.previousElementSibling.previousElementSibling.style.opacity = ".85";
}
//游戏视频播放
var myVideo = document.getElementById('game-video');
var playerBut = videoMask.nextElementSibling;//播放按钮
var closeBut = document.getElementById('close-btn');
playerBut.onclick = function(event){//视频没有停止播放
	replaceClassName(myVideo.parentNode,"hide","show");
	replaceClassName(bodyMask,"hide","show");//遮罩层
	myVideo.children[0].play();//播放视频
	myVideo.parentNode.style.top = (event.pageY-event.clientY)+"px";//使窗口出现的位置在body顶部
}
closeBut.onclick = function(){
	replaceClassName(myVideo.parentNode,"show","hide");
	replaceClassName(bodyMask,"show","hide");
	myVideo.children[0].pause();//停止播放

}
//inner背景图片切换
var bgs = inner.getElementsByClassName('bg');
var config = [
	{
		"opacity":1,
	},
	{
		"opacity":0,
	},
	{
		"opacity":0,
	},
];
function assign() {
        for (var i = 0; i < bgs.length; i++) {
            animateSlow(bgs[i], config[i]);
        }
}
setInterval(function(){
	assign();
 	config.push(config.shift());
},5000);


// heroLiest 列表
var herosList = document.getElementById("heros-list");
var arrHeroName = ["源氏","麦克雷","法老之鹰","死神","士兵：76","黑影","猎空","堡垒","半藏","狂鼠","美","托比昂","黑百合","D.Va","奥丽莎","莱因哈特","路霸","温斯顿","查莉娅","卢西奥","天使","秩序之光","禅雅塔"];
var arr = [];
for(var i = 0;i<arrHeroName.length;i++){
	var str = '<li>'+
			  '<a href = "javascript:;">'+
			  '<div>'+
			  '<img src="images/img/img-list/'+i+'.png" id = "img">'+
			  '</div>'+
			  '<span>'+arrHeroName[i]+'</span>'+
			  '</a>'+
			  '</li>';
	arr.push(str);		  
}
herosList.innerHTML = arr.join("");
herosList.children[14].style.marginLeft = "165px"
var lis = herosList.children;

// hero 名字，介绍，大图
var heroIntroduce = [{"源氏":
					"一名致命的半机械忍者，通过他的机械躯体寻得了身心的和谐。"},
					{"麦克雷":
					"一名亡命天涯的神枪手，以自己的方式伸张正义。"},
					{"法老之鹰":
					"一名恪守岗位的战士，用实验性的“猛禽”作战服确保天空的安全。"},
					{"死神":
					"一名无情的杀手，一直在追杀前守望先锋的特工们。"},
					{"士兵：76":
					"一名试图自己将守望先锋敌人绳之于法的独行侠。"},
					{"黑影":
					"臭名昭著的黑客，沉迷于揭秘——及其带来的权力。"},
					{"猎空":
					"一名前守望先锋特工，同时也是可以穿梭时间的充满正义的冒险家。"},
					{"堡垒":
					"一名可以切换形态的机器人，为自然着迷而探索世界，同时也对人类保持着戒心。"},
					{"半藏":
					"一名强大而致命的弓箭大师。"},
					{"狂鼠":
					"一名满脑子都是爆炸的变态疯子，只为了混乱和破坏而活。"},
					{"美":
					"一名能够操控天气，为了保护环境而选择战斗的科学家。"},
					{"托比昂":
					"一名天才工程师，可以在战场上打造武器系统。"},
					{"黑百合":
					"一名完美的杀手：耐心、果断、无情。没有任何情感且事后毫无悔意。"},
					{"D.Va":
					"一名前职业玩家，而现在则利用自己的技巧驾驶一台尖端机甲保卫国家。"},
					{"奥丽莎":
					"维护努巴尼秩序并保护努巴尼人民的维和机器人。"},
					{"莱因哈特":
					"一名属于过去的勇士，时刻铭记着骑士的信条：无畏、公正、勇敢。"},
					{"路霸":
					"一名残暴的杀手，因残忍和肆意破坏而臭名昭著。"},
					{"温斯顿":
					"一只经过基因改造，拥有高等智慧的大猩猩，也是一位出色的科学家和代表着人类潜力的勇士。"},
					{"查莉娅":
					"世界上最强壮的女性之一。为了保卫祖国，毅然放弃了个人荣誉。"},
					{"安娜":
					"守望先锋的创始成员之一，“起死回生”重返战场保护亲人和朋友。"},
					{"卢西奥":
					"一位国际名人，通过音乐和巡演激发社会正能量。"},
					{"天使":
					"一名集顶尖的治疗者、出色的科学家和坚定的和平主义者于一身的守护天使。"},
					{"秩序之光":
					"一名通过控制高强度光束，将世界改造成她心目中完美、有序的模样的光子建筑师。"},
					{"禅雅塔":
					"一位游走于世界寻找灵魂升华之道的机械僧侣。"}];
var heroName = document.getElementById('hero-name');
var heroImg = document.getElementById('hero-img');
for(var j = 0;j<lis.length;j++){
	lis[j].children[0].children[0].index = j;//div
	lis[j].children[0].children[0].onmouseover = function(){
		for(var n = 0;n<lis.length;n++){
			lis[n].children[0].children[0].className = "";
			lis[n].children[0].children[1].className = "";
			lis[n].children[0].children[0].style.background = "#474645";
		}
		heroImg.children[0].src = "images/img/"+this.index+".png";
		this.className = "current1";
		this.style.background = "#F7931E";
		this.nextElementSibling.className = "current2";
		for(var k in heroIntroduce[this.index]){
			heroImg.children[0].style.marginLeft = "0px"
			heroName.children[0].innerText = k;
			heroName.children[1].innerText = heroIntroduce[this.index][k];
		}
	}
}
