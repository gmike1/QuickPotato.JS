//<![CDATA[
<!--
/*
cemike@126.com
20181001
quickpotato.matchx.template.js
注意：使用x以区别于旧版：quickpotato.match.template.js
主要改进：
1. 适配Android手机无法拖放的问题：改为先点击右边项目，再点击左边项目实现匹配；
2. 在实现上，旧版用div作为容器；matchx版本改为用button，并通过style设置使其保持旧版风格。
3. 旧版拖放后不管对错都能从右边一栏拖放到中间一栏，只有点击Check按钮后才知道对错；matchx版本改为只有匹配正确的才移动，否则不会移动到中间栏。
4. matchx版本保持与旧版兼容，既可在电脑上以旧版拖放方式运行，又可在Android手机上运行，iOS上未测试；

*/
function Client(){
//if not a DOM browser, hopeless
	this.min = false; if (document.getElementById){this.min = true;};

	this.ua = navigator.userAgent;
	this.name = navigator.appName;
	this.ver = navigator.appVersion;  

//Get data about the browser
	this.mac = (this.ver.indexOf('Mac') != -1);
	this.win = (this.ver.indexOf('Windows') != -1);

//Look for Gecko
	this.gecko = (this.ua.indexOf('Gecko') > 1);
	if (this.gecko){
		this.geckoVer = parseInt(this.ua.substring(this.ua.indexOf('Gecko')+6, this.ua.length));
		if (this.geckoVer < 20020000){this.min = false;}
	}
	
//Look for Firebird
	this.firebird = (this.ua.indexOf('Firebird') > 1);
	
//Look for Safari
	this.safari = (this.ua.indexOf('Safari') > 1);
	if (this.safari){
		this.gecko = false;
	}
	
//Look for IE
	this.ie = (this.ua.indexOf('MSIE') > 0);
	if (this.ie){
		this.ieVer = parseFloat(this.ua.substring(this.ua.indexOf('MSIE')+5, this.ua.length));
		if (this.ieVer < 5.5){this.min = false;}
	}
	
//Look for Opera
	this.opera = (this.ua.indexOf('Opera') > 0);
	if (this.opera){
		this.operaVer = parseFloat(this.ua.substring(this.ua.indexOf('Opera')+6, this.ua.length));
		if (this.operaVer < 7.04){this.min = false;}
	}
	if (this.min == false){
		//alert('Your browser may not be able to handle this page.');
	}
	
//Special case for the horrible ie5mac
	this.ie5mac = (this.ie&&this.mac&&(this.ieVer<6));
}

var C = new Client();

//for (prop in C){
//	alert(prop + ': ' + C[prop]);
//}



//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

//[strNavBarJS]
function NavBtnOver(Btn){
	if (Btn.className != 'NavButtonDown'){Btn.className = 'NavButtonUp';}
}

function NavBtnOut(Btn){
	Btn.className = 'NavButton';
}

function NavBtnDown(Btn){
	Btn.className = 'NavButtonDown';
}
//[/strNavBarJS]

function FuncBtnOver(Btn){
	if (Btn.className != 'FuncButtonDown'){Btn.className = 'FuncButtonUp';}
}

function FuncBtnOut(Btn){
	Btn.className = 'FuncButton';
}

function FuncBtnDown(Btn){
	Btn.className = 'FuncButtonDown';
}

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');
	ShowElements(true, 'object', 'FeedbackContent');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName, ContainerToReverse){
// added third argument to allow objects in the feedback box to appear
//IE bug -- hide all the form elements that will show through the popup
//FF on Mac bug : doesn't redisplay objects whose visibility is set to visible
//unless the object's display property is changed

	//get container object (by Id passed in, or use document otherwise)
	TopNode = document.getElementById(ContainerToReverse);
	var Els;
	if (TopNode != null) {
		Els = TopNode.getElementsByTagName(TagName);
	} else {
		Els = document.getElementsByTagName(TagName);
	}

	for (var i=0; i<Els.length; i++){
		if (TagName == "object") {
			//manipulate object elements in all browsers
			if (Show == true){
				Els[i].style.visibility = 'visible';
				//get Mac FireFox to manipulate display, to force screen redraw
				if (C.mac && C.gecko) {Els[i].style.display = '';}
			}
			else{
				Els[i].style.visibility = 'hidden';
				if (C.mac && C.gecko) {Els[i].style.display = 'none';}
			}
		} 
		else {
			// tagName is either input or select (that is, Form Elements)
			// ie6 has a problem with Form elements, so manipulate those
			if (C.ie) {
				if (C.ieVer < 7) {
					if (Show == true){
						Els[i].style.visibility = 'visible';
					}
					else{
						Els[i].style.visibility = 'hidden';
					}
				}
			}
		}
	}
}



function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
	if (Finished == true){
		Finish();
	}
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].clientWidth;
	this.H = document.getElementsByTagName('body')[0].clientHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (typeof(window.pageYOffset) == 'number'){
		return window.pageYOffset;
	}
	else{
		if ((document.body)&&(document.body.scrollTop)){
			return document.body.scrollTop;
		}
		else{
			if ((document.documentElement)&&(document.documentElement.scrollTop)){
				return document.documentElement.scrollTop;
			}
			else{
				return 0;
			}
		}
	}
}

function GetViewportHeight(){
	if (typeof window.innerHeight != 'undefined'){
		return window.innerHeight;
	}
	else{
		if (((typeof document.documentElement != 'undefined')&&(typeof document.documentElement.clientHeight !=
     'undefined'))&&(document.documentElement.clientHeight != 0)){
			return document.documentElement.clientHeight;
		}
		else{
			return document.getElementsByTagName('body')[0].clientHeight;
		}
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	if (C.ie) {
		thisKey = window.event.keyCode;
	}
	else {
		thisKey = e.keyCode;
	}

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
	}

	if (Suppress == true){
		if (C.ie){
			window.event.returnValue = false;	
			window.event.cancelBubble = true;
		}
		else{
			e.preventDefault();
		}
	}
}

if (C.ie){
	document.attachEvent('onkeydown',SuppressBackspace);
	window.attachEvent('onkeydown',SuppressBackspace);
}
else{
	if (window.addEventListener){
		window.addEventListener('keypress',SuppressBackspace,false);
	}
}

/////////////////////////////////////////////////////////////
/*
随机删除一些项目，直到显示的项目数等于QsToShow。
改写自ReduceItems(InArray, ReduceToSize)
*/
function ReduceItems2(){
	var ItemToDump=0;
	var j=0;
	while (F.length > QsToShow){
		ItemToDump = Math.floor(F.length*Math.random());
		for (j=ItemToDump; j<(F.length-1); j++){
			F[j] = F[j+1];
		}
		for (j=ItemToDump; j<(D.length-1); j++){
			D[j] = D[j+1];
		}		
		F.length = F.length-1;
		D.length = D.length-1;
	}
}



/*
随机删除题项，直至剩下ReduceToSize个题项。

*/
function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

/*
随机打乱数组的顺序，用于StartUp()方法。

*/
function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}

//EXTENSION TO ARRAY OBJECT
function Array_IndexOf(Input){
	var Result = -1;
	for (var i=0; i<this.length; i++){
		if (this[i] == Input){
			Result = i;
		}
	}
	return Result;
}
Array.prototype.indexOf = Array_IndexOf;

//IE HAS RENDERING BUG WITH BOTTOM NAVBAR
function RemoveBottomNavBarForIE(){
	if ((C.ie)&&(document.getElementById('Reading') != null)){
		if (document.getElementById('BottomNavBar') != null){
			document.getElementById('TheBody').removeChild(document.getElementById('BottomNavBar'));
		}
	}
}




//HOTPOTNET-RELATED CODE

var HPNStartTime = (new Date()).getTime();
var SubmissionTimeout = 30000;
var Detail = ''; //Global that is used to submit tracking data

function Finish(){
//If there's a form, fill it out and submit it
	if (document.store != null){
		Frm = document.store;
		Frm.starttime.value = HPNStartTime;
		Frm.endtime.value = (new Date()).getTime();
		Frm.mark.value = Score;
		Frm.detail.value = Detail;
		Frm.submit();
	}
}

/*
Card对象定义
function Card(ID, OverlapTolerance)
*/
function Card(ID, OverlapTolerance){
	this.elm=document.getElementById(ID);
	this.name=ID;
	this.css=this.elm.style;
	this.elm.style.left = 0 +'px';
	this.elm.style.top = 0 +'px';
	this.HomeL = 0;
	this.HomeT = 0;
	this.tag=-1;//初始值为-1，只有右边栏的使用到此属性，当右边卡片停泊在左边栏旁边时(不管是否匹配正确)赋值为拖放对象的编号+1，参考DC[CurrDrag].tag = DropTarget+1;
	this.index=-1;//DC[i].index=D[i][1];指示正确答案，FC[i].index = F[i][1];右边栏会随机打乱顺序，所以index不对应界面显示顺序，参考StartUp()。
	this.OverlapTolerance = OverlapTolerance;
}

function CardGetL(){return parseInt(this.css.left)}
Card.prototype.GetL=CardGetL;

function CardGetT(){return parseInt(this.css.top)}
Card.prototype.GetT=CardGetT;

function CardGetW(){return parseInt(this.elm.offsetWidth)}
Card.prototype.GetW=CardGetW;

function CardGetH(){return parseInt(this.elm.offsetHeight)}
Card.prototype.GetH=CardGetH;

function CardGetB(){return this.GetT()+this.GetH()}
Card.prototype.GetB=CardGetB;

function CardGetR(){return this.GetL()+this.GetW()}
Card.prototype.GetR=CardGetR;

function CardSetL(NewL){this.css.left = NewL+'px'}
Card.prototype.SetL=CardSetL;

function CardSetT(NewT){this.css.top = NewT+'px'}
Card.prototype.SetT=CardSetT;

function CardSetW(NewW){this.css.width = NewW+'px'}
Card.prototype.SetW=CardSetW;

function CardSetH(NewH){this.css.height = NewH+'px'}
Card.prototype.SetH=CardSetH;

function CardInside(X,Y){
	var Result=false;
	if(X>=this.GetL()){if(X<=this.GetR()){if(Y>=this.GetT()){if(Y<=this.GetB()){Result=true;}}}}
	return Result;
}
Card.prototype.Inside=CardInside;

function CardSwapColours(){
	var c=this.css.backgroundColor;
	this.css.backgroundColor=this.css.color;
	this.css.color=c;
}
Card.prototype.SwapColours=CardSwapColours;

function CardHighlight(){
	this.css.backgroundColor='#477EC1';//淡蓝
	this.css.color='#bbbbee';//紫蓝
}
Card.prototype.Highlight=CardHighlight;

function CardUnhighlight(){
	this.css.backgroundColor='#bbbbee';//紫蓝
	this.css.color='#477EC1';//淡蓝
}
Card.prototype.Unhighlight=CardUnhighlight;

function CardOverlap(OtherCard){
	var smR=(this.GetR()<(OtherCard.GetR()+this.OverlapTolerance))? this.GetR(): (OtherCard.GetR()+this.OverlapTolerance);
	var lgL=(this.GetL()>OtherCard.GetL())? this.GetL(): OtherCard.GetL();
	var HDim=smR-lgL;
	if (HDim<1){return 0;}
	var smB=(this.GetB()<OtherCard.GetB())? this.GetB(): OtherCard.GetB();
	var lgT=(this.GetT()>OtherCard.GetT())? this.GetT(): OtherCard.GetT();
	var VDim=smB-lgT;
	if (VDim<1){return 0;}
	return (HDim*VDim);	
}
Card.prototype.Overlap=CardOverlap;

/*
卡片移动到左边栏的右边（正确答案位置）
OtherCard-目标卡片
*/
function CardDockToR(OtherCard){
	this.SetL(OtherCard.GetR() + 5);
	this.SetT(OtherCard.GetT());
}

Card.prototype.DockToR=CardDockToR;

function CardSetHome(){
	this.HomeL=this.GetL();
	this.HomeT=this.GetT();
}
Card.prototype.SetHome=CardSetHome;

/*
卡片移动到右边栏的原始位置
OtherCard-目标卡片
*/
function CardGoHome(){
	this.SetL(this.HomeL);
	this.SetT(this.HomeT);
}

Card.prototype.GoHome=CardGoHome;

//Fix for 6.2.5.2: avoid image dragging problem in draggable cards
function CardSetHTML(HTML){
	this.elm.innerHTML = HTML;
	var DragImgs = this.elm.getElementsByTagName('img');
	if (DragImgs.length > 0){
		for (var i=0; i<DragImgs.length; i++){
			DragImgs[i]. onmousedown = function(){return false;}
		}
	}
}

Card.prototype.SetHTML = CardSetHTML;

function doDrag(e) {
	if (CurrDrag == -1) {return};
	if (C.ie){var Ev = window.event}else{var Ev = e}
	var difX = Ev.clientX-window.lastX; 
	var difY = Ev.clientY-window.lastY; 
	var newX = DC[CurrDrag].GetL()+difX; 
	var newY = DC[CurrDrag].GetT()+difY; 
	DC[CurrDrag].SetL(newX); 
	DC[CurrDrag].SetT(newY);
	window.lastX = Ev.clientX; 
	window.lastY = Ev.clientY; 
	return false;
} 
function endMatch(e, DragNum) { 
	alert('endMatch: '+DragNum);
}

/*
此方法在html页面中右边卡片上按下鼠标时调用
参数：e, DragNum 鼠标当前拖动的右边卡片编号（从上至下依次递增，从0开始）

*/
function beginDrag(e, DragNum) { 
	//e.preventDefault();
	CurrRight= DragNum;//鼠标当前拖动的右边卡片编号（从上至下依次递增，从0开始）
	CurrDrag = DragNum;//鼠标当前拖动的右边卡片编号（从上至下依次递增，从0开始）
	if (C.ie){
		var Ev = window.event;
		document.onmousemove=doDrag;
		document.onmouseup=endDrag;
	}
	else{
		var Ev = e;
		window.onmousemove=doDrag; 
		window.onmouseup=endDrag;
	} 
	DC[CurrDrag].Highlight();
	topZ++;
	DC[CurrDrag].css.zIndex = topZ;
	window.lastX=Ev.clientX; 
	window.lastY=Ev.clientY;
	return false;  
} 

function endDrag(e) { 
	if (CurrDrag == -1) {return};
	DC[CurrDrag].Unhighlight();
	if (C.ie){
		document.onmousemove=null
	}else{window.onmousemove=null;}
	onEndDrag();	
	CurrDrag = -1;
//Need a bugfix for Opera focus problem here
	if (C.opera){FocusAButton();}
	return true;
} 

var CurrDrag = -1;
var topZ = 100;

CurrLeft = -1;//鼠标当前拖动的左边卡片index（从上至下依次递增，从0开始）
CurrRight = -1;//鼠标当前拖动的右边卡片index（从上至下依次递增，从0开始）





//JMATCH-SPECIFIC CORE JAVASCRIPT CODE

var CorrectResponse = 'Correct! Well done.';
var IncorrectResponse = 'Sorry! Try again. Incorrect matches have been removed.';
var YourScoreIs = 'Your score is ';
var DivWidth = 600; //default value
var FeedbackWidth = 200; //default
var ExBGColor = '#bbbbee';
var PageBGColor = '#ffffff';
var TextColor = '#000000';
var TitleColor = '#000033';
var Penalties = 0;
var Score = 0;
var TimeOver = false;
var Locked = false;
var ShuffleQs = false;
var QsToShow = 10;//Items to show (default 10), more items will be reduced randomly

var DragWidth = 200;
var LeftColPos = 100;
var RightColPos = 300;
var DragTop = 120;
var Finished = false;
var AnswersTried = '';

/*
F二维数组，D二维数组，FC对象数组，DC对象数组定义，用于所有方法，初始化于webview-matchx-8.0.html->loadAll()方法

F二维数组存储左边卡片相关信息
D二维数组存储右边卡片相关信息;D[i][2]初始值为0，拖放后（不管是否匹配正确）赋值为F[DropTarget][1](大于0的值)，参考onEndDrag()方法
FC数组存储左边卡片对象
DC数组存储右边卡片对象（参考Card对象定义function Card(ID, OverlapTolerance)）；拖放后（不管是否匹配正确）DC[CurrDrag].tag赋值为F[DropTarget][1](大于0的值)，参考onEndDrag()方法
onEndDrag()方法->D[CurrDrag][2] = F[DropTarget][1];拖放结束时，将当前拖动的右边卡片的D[CurrDrag][2]数组元素值赋值为左边卡片拖放目标卡片F[DropTarget][1]的值（起始编号），如果D[CurrDrag][2]==D[DropTarget][1]且这个值>0(0为未拖放前的初始值)则匹配正确
*/
F = new Array();//F二维数组存储左边卡片相关信息
D = new Array();//D二维数组存储右边卡片相关信息，D[i][1]==F[i][1]==DC[i].index，如果(D[i][2] == D[i][1])&&(D[i][2] > 0)(0为未拖放前的初始值)则匹配正确

//Fixed and draggable card arrays
FC = new Array();//左边栏固定卡片数组，存储Card对象（参考Card对象定义function Card(ID, OverlapTolerance)）
DC = new Array();//右边栏可拖放卡片数组，存储Card对象（参考Card对象定义function Card(ID, OverlapTolerance)），D[i][1]==F[i][1]==DC[i].index

/*
（原始代码）
拖放匹配方案）每轮拖放结束（先点击右边一个卡片后点击左边栏一个卡片）时调用，与点击匹配方案不同的是不会立即检查是否匹配正确，只有点击Check按钮才检查。
对应新增专用于平板等拖放无效时用点击替换实现相似效果的方法function onEndMatch(match)
创建卡片的代码参见function StartUp()
//F开头的是左边的卡片，D开头的是右边的卡片

onEndDrag()方法->D[CurrDrag][2] = F[DropTarget][1];拖放结束时，将当前拖动的右边卡片的D[CurrDrag][2]数组元素值赋值为左边卡片拖放目标卡片F[DropTarget][1]的值（起始编号），如果D[CurrDrag][2]==D[DropTarget][1]且这个值>0(0为未拖放前的初始值)则匹配正确

*/
function onEndDrag(){ 
//Is it dropped on any of the fixed cards?
	var Docked = false;
	var DropTarget = DroppedOnFixed(CurrDrag);//获取拖放的目标卡片编号
	if (DropTarget > -1){
//If so, send home any card that is currently docked there如果已经有其他卡片占着当前拖放的目标位置，先把该卡片移动到右边栏的原始位置
		for (var i=0; i<DC.length; i++){
			if (DC[i].tag == DropTarget+1){
				DC[i].GoHome();//=CardGoHome()卡片移动到右边栏的原始位置
				DC[i].tag = 0;
				D[i][2] = 0;
			}
		}
//Dock the dropped card卡片移动到左边栏的右边（正确答案位置）
		DC[CurrDrag].DockToR(FC[DropTarget]);//卡片移动到左边栏的右边（正确答案位置）
		D[CurrDrag][2] = F[DropTarget][1];
		DC[CurrDrag].tag = DropTarget+1;
		Docked = true;
		
		
		//增加一层检测，如果当前拖放匹配正确，检查是否跳到下一组10个测试项目
		if ((D[CurrDrag][2] == D[CurrDrag][1])&&(D[CurrDrag][2] > 0)){
			//20241203
			//console.log("CurrDrag=",CurrDrag,"D[CurrDrag][2]=",D[CurrDrag][2], "D[CurrDrag][1]=",D[CurrDrag][1]);

			D[CurrDrag][3]=D[CurrDrag][1];


				//新增：处理下一组10个测试项目，相应在myclick(event, index, column)方法内增加此段代码
				//仍存在的BUG：同一项目多次拖动匹配正确时重复累加
				//++groupCount;//组内正确当前下标，定义参见webview-matchx-8.0.html
				++current;
				document.getElementById("current").innerHTML =(current+1); 

				var correctCount=0;//2024120 组内正确当前下标
				D.forEach(el => {
					//
					if(el[3]>0){
						//console.log("el=",el);
						++correctCount;//correctCount参见webview-matchx-8.0.html
					}
				});
				//console.log("onEndDrag() correctCount=",correctCount);

				//console.log("groupCount=",groupCount);		
				if(correctCount>9){
					
					++group;//小组下标(单词分为10个一组)，定义参见webview-matchx-8.0.html
					//20241031
					/*setTimeout(function() {
						alert("The current group has finished, will go to the next group.");
						loadAll();
						TimerStartUp();
						document.getElementById("group").innerHTML =(group+1);
						//groupCount=-1;
					}, 1000);*/
				}	
		}//增加一层检测，如果当前拖放匹配正确，检查是否跳到下一组10个测试项目


	}//if (DropTarget > -1)

	if (Docked == false){
		DC[CurrDrag].GoHome();//卡片移动到右边栏的原始位置
		DC[CurrDrag].tag = 0;
		D[CurrDrag][2] = 0;
	}
} 
/*
20181001（新增代码）
每轮点击匹配结束（先点击右边一个卡片后点击左边栏一个卡片）时调用。
参数 match： 0表示匹配正确；-1表示匹配错误
对应原始代码拖放操作结束时调用的方法function onEndDrag()

创建卡片的代码参见function StartUp()
//F开头的是左边的卡片，D开头的是右边的卡片

*/
function onEndMatch(match){
//Is it dropped on any of the fixed cards?
	var Docked = false;
	var DropTarget = -1;//获取拖放的目标卡片编号；拖放方案中用DroppedOnFixed(CurrDrag)方法获取;
	for (var i=0; i<FC.length; i++){
		//console.log("onEndMatch(match) i="+i+" FC[i].index ="+FC[i].index+" CurrRight="+CurrRight);
		if (FC[i].index ==CurrRight){
			DropTarget = i;
			break;
		}
	}
	//console.log("DropTarget="+DropTarget);
	if (match > -1){//匹配正确
//If so, send home any card that is currently docked there如果已经有其他卡片占着当前拖放的目标位置，先把该卡片移动到右边栏的原始位置
		for (var i=0; i<DC.length; i++){
			if (DC[i].tag == DropTarget+1){
				DC[i].GoHome();//卡片移动到右边栏的原始位置
				DC[i].tag = 0;
				D[i][2] = 0;
			}
		}
//Dock the dropped card卡片移动到左边栏的右边（正确答案位置）
		if(DropTarget>-1){
			var DropSource = -1;//
			for (var i=0; i<DC.length; i++){
				//console.log("i="+i+" FC[i].index ="+FC[i].index+" CurrRight="+CurrRight);
				if (DC[i].index ==CurrRight){
					DropSource = i;
					break;
				}
			}
			//Dock the dropped card卡片移动到左边栏的右边（正确答案位置）
			DC[DropSource].DockToR(FC[DropTarget]);//卡片移动到左边栏的右边（正确答案位置）
			D[DropSource][2] = F[DropTarget][1];
			DC[DropSource].tag =DropTarget+1;
			Docked = true;
		}//if(DropTarget>-1)


	}//匹配正确

	if (Docked == false){
		//DC[DropSource].GoHome();//卡片移动到右边栏的原始位置Uncaught TypeError: Cannot read properties of undefined (reading 'GoHome')
		//		DC[DropSource].tag = 0;
		//		D[DropSource][2] = 0;
	}

					
	

}
/*
检测右边栏卡片与左边栏哪个卡片重叠区域最大，即检测并获取拖放的目标卡片编号
参数：DNum右边栏卡片编号
返回值：重叠区域最大的左边栏卡片编号（从0开始）
*/
function DroppedOnFixed(DNum){
	var Result = -1;
	var OverlapArea = 0;
	var Temp = 0;
	for (var i=0; i<FC.length; i++){
		Temp = DC[DNum].Overlap(FC[i]);
		if (Temp > OverlapArea){
			OverlapArea = Temp;
			Result = i;
		}
	}
	return Result;
}

/*
//F开头的是左边的卡片，D开头的是右边的卡片

*/
function StartUp(){
	document.getElementById("group").innerHTML =(group+1);//20241224









//Calculate page dimensions and positions
	pg = new PageDim();
	DivWidth = Math.floor((pg.W*4)/5);
	DragWidth = Math.floor((DivWidth*3)/10);
	LeftColPos = Math.floor(pg.W/15);
	RightColPos = pg.W - (DragWidth + LeftColPos);
	DragTop = parseInt(document.getElementById('CheckButtonDiv').offsetHeight) + parseInt(document.getElementById('CheckButtonDiv').offsetTop) + 10;

	if (C.ie){
		DragTop += 15;
	}

	var CurrTop = DragTop;
	var TempInt = 0;
	var DropHome = 0;
	var Widest = 0;
	var CardContent = '';

	var voiceMode_ = getParam('voice');
	if (voiceMode_!=null)voiceMode=voiceMode_;
	console.log('voiceMode', voiceMode);

	for (var i=0; i<F.length; i++){//被ReduceItems2()方法随机删除后D数组和F数组一定只剩下QsToShow个
		CardContent ='<input type=button  id="FB' + i + '"  style="border:0px;background: transparent;width=300px;word-wrap: break-word;word-break: normal;white-space: normal;text-align:left;"  onclick=\'myclick(event, ' + F[i][1] + ', 1, '+i+', "'+F[i][0].replaceAll("'",'&#39')+'")\'  title="'+F[i][0]+'" value="'+F[i][0]+'"></input>';//+ F[i][0];if('+voiceMode+'==1)speakText(\''+F[i][0]+'\');
		FC[i] = new Card('F' + i, 10);
		FC[i].index = F[i][1];
		FC[i].SetHTML(CardContent);
		//FC[i].elm.innerHTML = CardContent;//old version
		if (FC[i].GetW() > Widest){
			Widest = FC[i].GetW();
		}
		FC[i].css.cursor = 'move';
		FC[i].css.backgroundColor = '#bbbbee';
		FC[i].css.color = '#000000';
	}
	if (Widest > DragWidth){Widest = DragWidth;}

	CurrTop = DragTop;

	DragWidth = Math.floor((DivWidth-Widest)/2) - 24;
	RightColPos = DivWidth + LeftColPos - (DragWidth + 14);
	var Highest = 0;
	var WidestRight = 0;
//class="MyCardStyle"
	//F开头的是左边的卡片，D开头的是右边的卡片
	for (i=0; i<D.length; i++){
		DC[i] = new Card('D' + i, 10);
		//myclick()方法参见quickpotato.matchx.template-5.0.js（从webview-matchx-8.0.html移过来）
		CardContent = '<input type=button id="DB' + i + '"  style="border:0px;background: transparent;width=300px;word-wrap: break-word;word-break: normal;white-space: normal;text-align:left;"  onclick=\'myclick(event, ' + D[i][1] + ', 2, '+i+',"'+D[i][0].replaceAll("'",'&#39')+'")\' title="'+D[i][0]+'" value="'+D[i][0]+'"></input>';//+ D[i][0];if('+voiceMode+'==1)speakText(\''+D[i][0].replaceAll("'",'&#39')+'\');
		DC[i].index=D[i][1];
//Fix for 6.2.5.2 problem with dragging images.
		DC[i].SetHTML(CardContent);
		//DC[i].elm.innerHTML = CardContent;//old version
		if (DC[i].GetW() > DragWidth){DC[i].SetW(DragWidth);}
		DC[i].css.cursor = 'move';
		DC[i].css.backgroundColor = '#bbbbee';
		DC[i].css.color = '#000000';
		TempInt = DC[i].GetH();
		if (TempInt > Highest){Highest = TempInt;}
		TempInt = DC[i].GetW();
		if (TempInt > WidestRight){WidestRight = TempInt;}
	}

//Fix for 6.2: the reduction by 12 seems to be required -- no idea why!
	var HeightToSet = Highest-12;
	var WidthToSet = WidestRight-12;

	for (i=0; i<D.length; i++){
		DC[i].SetT(CurrTop);
		DC[i].SetL(RightColPos);
		if (DC[i].GetH() < Highest){
			DC[i].SetH(HeightToSet);
		}
		if (DC[i].GetW() < WidestRight){
			DC[i].SetW(WidthToSet);
		}
		DC[i].SetHome();
		DC[i].tag = -1;
		CurrTop = CurrTop + DC[i].GetH() + 5;
	}

	CurrTop = DragTop;

	for (var i=0; i<F.length; i++){
		FC[i].SetW(Widest);
		if (FC[i].GetH() < Highest){
			FC[i].SetH(HeightToSet);
		}
		FC[i].SetT(CurrTop);
		FC[i].SetL(LeftColPos);
		FC[i].SetHome();
		TempInt = FC[i].GetH();
		CurrTop = CurrTop + TempInt + 5;
	}



}

function TimerStartUp(){
	setTimeout('StartUp()', 1000);
}
/*
检查答案
点击Check按钮时调用，正确答案停留在左边栏卡片右侧（正确位置），错误答案高亮显示(Highlight()方法)
*/
function CheckAnswers(){
	if (Locked == true){return;}
//Set the default score and response
	var TotalCorrect = 0;
	Score = 0;
	var Feedback = '';

//for each fixed, check to see if the tag value for the draggable is the same as the fixed
	if (AnswersTried.length > 0){AnswersTried += ' | ';}
	var i;//, j
	for (i=0; i<D.length; i++){
		if (i>0){AnswersTried += ',';}
		AnswersTried += D[i][1] + '.' + D[i][2] + '';
		/*
		onEndDrag()方法->D[CurrDrag][2] = F[DropTarget][1];拖放结束时，将当前拖动的右边卡片的D[CurrDrag][2]数组元素值赋值为左边卡片拖放目标卡片F[DropTarget][1]的值（起始编号），如果D[CurrDrag][2]==D[DropTarget][1]且这个值>0(0为未拖放前的初始值)则匹配正确
		*/
		if ((D[i][2] == D[i][1])&&(D[i][2] > 0)){
			TotalCorrect++;
		}else{
//Change made for version 6.0.3.41: don't send wrong items home, 
//show them in a more conspicuous(引人注目的) way.
//			DC[i].GoHome();
				DC[i].SetL(DC[i].GetL() + 10);
				DC[i].Highlight();
		}
	}

	Score = Math.floor((100*(TotalCorrect-Penalties))/F.length);

	var AllDone = false;

	if (TotalCorrect == F.length) {
		AllDone = true;
	}

	if (AllDone == true){
		Feedback = YourScoreIs + ' ' + Score + '%.';
		ShowMessage(Feedback + '<br />' + CorrectResponse);
	}
	else {
		Feedback = IncorrectResponse + '<br />' + YourScoreIs + ' ' + Score + '%.';
		ShowMessage(Feedback);
		Penalties++; // Penalty for inaccurate check
	}
//If the exercise is over, deal with that
	if ((AllDone == true)||(TimeOver == true)){


		TimeOver = true;
		Locked = true;
		Finished = true;
		setTimeout('Finish()', SubmissionTimeout);
		WriteToInstructions(Feedback);
	}

}

var cardsClickedArray= new Array();//20241103

/*
（新增代码）
点击匹配方案（用于手机平板，手机平板上无法拖放）每轮点击匹配时检查是否匹配正确，不正确时卡片返回右边栏
对应onEndDrag()方法（拖放匹配方案），与点击匹配方案不同的是不会立即检查是否匹配正确，只有点击Check按钮才检查
用于quickpotato.matchx.template-5.0.js->function StartUp()
参数：
event 事件cardClicked=event.target;用来获取当前点击的卡片对象
index 数据源元素下标（如果数据源元素大于QsToShow（10）个，不一定显示在当前界面上，可能被ReduceItems2()方法随机删除，有可能在下一组），左边栏元素下标=F[i][1]，右边栏元素下标=D[i][1]；D[i][1]==F[i][1]==DC[i].index都是起始编号，即使卡片打乱顺序显示，这个值不会变，用来指示答案，参见CheckAnswers()方法及StartUp()方法
column 1-左边栏；2-左边栏；
seq 20241203 显示在当前界面上的卡片下标，注意：index为数据源元素下标，不一定显示在当前界面上，要引用当前显示的左右栏卡片请用FC[seq]（左边栏）和DC[seq]（右边栏），seq从0起始，按界面从上至下排列依次递增。
text 卡片上显示的文本 20241231增加text参数，用于语音朗读。

*/
function myclick(event, index, column, seq, text){
		console.log('myclick index=', index, 'column=',column, ' CurrLeft=', CurrLeft,' CurrRight=',CurrRight,'text:', text);//, 'event.target.style.border=',event.target.style.border
		if(voiceMode==1){
			//正则\u4e00-\u9fa5匹配的中不文包括中文标点符号[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]。 ； ， ： “ ”（ ） 、 ？ 《 》 
			if(column==1)text=text.replace(/[^\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/g, "");//所有非汉字字符替换为空字符串
			console.log('text: ',text);
			speakText(text);
			
		}
		cardClicked=event.target;// [object HTMLInputElement]HTML元素
		cardsClickedArray.splice(0, 0, cardClicked);
		cardClicked.style.border="1px red solid";
		cardClicked.style.backgroundColor='#477EC1';//淡蓝
		//cardClicked.style.color='#bbbbee';//紫蓝
		/**/
		if(column==1){
			FC[seq].Highlight();//Uncaught TypeError: Cannot read properties of undefined (reading 'Highlight')
		}else{
			DC[seq].Highlight();
		}

		setTimeout(function() {
			//cardClicked.style.border="0px red solid";
			cardsClickedArray.forEach(card => {//20241103 即使瞬间连续点击多个卡片，也能在稍后全部隐藏提示性的红色边框
				//console.log(card);
				card.style.border="0px red solid";
				card.style.backgroundColor='#bbbbee';//紫蓝
				//card.style.color='#477EC1';//淡蓝
				/**/
				if(column==1){
					FC[seq].Unhighlight();
				}else{
					DC[seq].Unhighlight();
				}

			});
		}, 1000);


		//CurrLeft当前点击的左边卡片下标CurrRight 当前点击的右边卡片下标；定义参见quickpotato.matchx.template-5.0.js

		if(column==1){//点击的是左边栏目，开始判断对错
			if(CurrLeft !=-1){
				alert("You have already  clicked the left column!");
				CurrLeft = -1;
			}else{
				if(CurrRight==-1){
					alert("Please click the right column first!");
				}
			}

			CurrLeft = index;
			//alert(CurrLeft+"<-> "+CurrRight);
			if(CurrLeft==CurrRight){
				//alert("Match!");
				onEndMatch(0);//匹配

				//console.log("seq=",seq);
				//console.log("D[CurrDrag][3]=",D[CurrDrag][3]);//CurrDrag==-1,Uncaught TypeError: Cannot read properties of undefined
				D[seq][3]=D[seq][1];

				//新增：处理下一组10个测试项目，相应在onEndDrag()方法内增加此段代码
				//++groupCount;//组内正确当前下标，定义参见webview-matchx-8.0.html
				++current;
				document.getElementById("current").innerHTML =(current+1); 
				//console.log("myclick() groupCount=",groupCount);

				var correctCount=0;//2024120 增加组内正确计数correctCount，不能为全局变量，只能为方法内局部变量，代替groupCount，因同一项目多次匹配成功时groupCount累计增加，会造成未完成本组10题提前进入下一组

				D.forEach(el => {
					//console.log("el=",el);
					if(el[3]>0){
						++correctCount;//correctCount参见webview-matchx-8.0.html
					}
				});
				//console.log("correctCount=",correctCount);


				if(correctCount>9){					
					++group;//小组下标(单词分为10个一组)，定义参见webview-matchx-8.0.html
					//20241031
					setTimeout(function() {
						alert("The current group has finished, will go to the next group.");
						loadAll();TimerStartUp();
						
						//组内正确当前下标();
						//groupCount=-1;
					}, 1000);/**/
				}	

				
			}else{
				//alert("Not match!");
				Toast.show('Not match， please try again.', 'success', 1000);
				onEndMatch(-1);//不匹配
				++wrong;
				var rate=(total-wrong)/total *100;
				rate=rate.toFixed(2);
				//console.log('myclick rate=', rate);
				document.getElementById("correct").innerHTML =(total-wrong);
				document.getElementById("rate").innerHTML= rate+"%";
			}
			CurrLeft = -1;
			CurrRight = -1;
			
		}else{//column!=1点击的是右边栏目
			
			CurrRight = index;
			//alert("Right column index ="+index);
		}

		

}








//-->

//]]>

