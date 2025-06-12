/*
20241226 目前支持ABCDEFG七个选择项。参考：
	var choices=choiceline.split(/[ABCDEFG]\.|\\t+/);//20200224选项支持跳格\t或任意空格分隔 


将人类阅读的填空题或多项选择题文件格式（可读格式）转换为gift格式（机器格式），同时兼容选择题和填空题。
用于：
d:\adroidstudioprojects\QuickPotato.Android\app\src\main\assets\GiftConverter.js
d:\LeanCloud\se\public\GiftConverter.js
*/
class GiftConverter {

	constructor(name) {
		this.name = name;
		this.choices=[];
		this.data=[
			/*{'id':1,'entry':'名词', 'parent':0},
			{'id':2,'entry':'名词种类', 'parent':1},
			{'id':3,'entry':'名词复数', 'parent':1},
			{'id':4,'entry':'名词所有格', 'parent':1},
			{'id':5,'entry':'冠词', 'parent':0},
			{'id':6,'entry':'不定冠词的基本用法', 'parent':5},
			{'id':7,'entry':'定冠词的基本用法', 'parent':5},
			{'id':8,'entry':'不用冠词的情况', 'parent':5},
			{'id':9,'entry':'应注意的问题', 'parent':5},
			{'id':10,'entry':'代词', 'parent':0},
			{'id':11,'entry':'人称代词', 'parent':10},
			{'id':12,'entry':'物主代词', 'parent':10},
			{'id':13,'entry':'反身代词', 'parent':10},
			{'id':14,'entry':'指示代词', 'parent':10},
			{'id':15,'entry':'疑问代词', 'parent':10},
			{'id':16,'entry':'相互代词', 'parent':10},
			{'id':17,'entry':'不定代词', 'parent':10},
			{'id':18,'entry':'数词', 'parent':0},
			{'id':19,'entry':'基数词', 'parent':18},
			{'id':20,'entry':'序数词', 'parent':18},
			{'id':21,'entry':'分数词', 'parent':18},
			{'id':22,'entry':'数词的其他用法', 'parent':18}*/

		];
    //this.init();
    //this.getChildren(0);
    //this.getSiblings(10);
	}
	init() {
		
	}
	/*
	将人类阅读的填空题或多项选择题文件格式（可读格式）转换为json格式，其中包括gift格式（机器格式），带kid信息，同时兼容选择题和填空题。
	人类阅读的多项选择题文件格式参考workspace\QuickPotato\quickpotato.multiplechoice.normal.txt
	填空题可读格式样例：
	The house was surrounded by trees and ____[invisible#] (visible) from the road.
	 1.每行一个填空题，支持每题多个空；
	 2.注意：任意连续下划线表示填空，后跟圆括号的提示（可选），再后跟[]包括的答案和解析；答案和解析用#分隔，解析没有内容也要有#；
	 3.不要有空行，每行首不要有空格；
	
	选择题可读格式样例：
	(C)The young men walked ______ the forest and came to a big river at last.
	A. on	B. over	C. through	D. across
	[解析]考察介词through的用法。through往往表示从某物的内部贯穿。 
	type NUMBER 1-Cloze（填空题）；2-MultipleChoice（选择题）；3-Match（匹配题）；4-Spell（逐字母拼写）；5-Sort（排序题）；6-Classify（分类题）；
	要点：
     1.每两行或三行一个选择题，第一行题干，第二行所有A.B.C.D.四个选项（每选项必须以A.B.C.D.四个之一开头，不要分行），四个选项之间用英文跳格键tab分隔。第三行可选，如果有的话必须用[解析]开头后跟解析内容；
     2.一题之内不要有空行，每行首不要有空格；题与题之间空行分隔；
     3.答案在题干行开头用英文括号包括，必须用大写字母ABCD之一；
	
	机器格式样例：
	[{"content":"1.We will be traveling by {~/; the# ~the; /# =/; /#by camel 表示乘坐交通工具，中间不用任何冠词;go to university 上大学固定搭配。 ~the; a#} camel across the desert before we go to {~/; the# ~the; /# =/; /#by camel 表示乘坐交通工具，中间不用任何冠词;go to university 上大学固定搭配。 ~the; a#} university."},{"content":"2. Richard Powers\' The Echo Maker, {~the; the# ~a; a;# =a; the#一本小说，可数;特指某个城镇，用定冠词。 ~/; the#} novel set in {~the; the# ~a; a;# =a; the#一本小说，可数;特指某个城镇，用定冠词。 ~/; the#} small t own of Kearney, Nebraska, US, has won the 57th US National Book Award for fiction."},{"content":"3.He is in {~the; /# =/; the#in control of 人控制某事某物;in the control of 某事某物在人的控制下。 ~the; the# ~/; /#} control of the company. I mean, the company is in {~the; /# =/; the#in control of 人控制某事某物;in the control of 某事某物在人的控制下。 ~the; the# ~/; /#} control of him."},{"content":"4.Now that Tom hates{~a;a# =/;a#学校专有名词这个时候不加，泛指;像一座监狱，可数名词。 ~a;/# ~/;/#} school, the school becomes{~a;a# =/;a#学校专有名词这个时候不加，泛指;像一座监狱，可数名词。 ~a;/# ~/;/#} prison to him"},{"content":"5.In {~the; the# ~a; /# =/; a#in preparation for 固定搭配;a knowledge of 某一门知识，这个时候可数。 ~the; a#} preparation for the launching of ShenzhouⅦ, scientists need {~the; the# ~a; /# =/; a#in preparation for 固定搭配;a knowledge of 某一门知识，这个时候可数。 ~the; a#} knowledge of weather changes."},{"content":"6.Because of {~the; the# ~/; /# ~/; the# =a; the#a demand for 固定搭配一个…需求;专指前面AB 血型的供给。} high demand for Type AB blood, {~the; the# ~/; /# ~/; the# =a; the#a demand for 固定搭配一个…需求;专指前面AB 血型的供给。} supplies of it are usually limited."},{"content":"7.The sign reads \'In case of {~/;a# =/;the#fire 表示火，抽象不可数，那个红色的按钮特指。 ~the; the# ~a; a#} fire, break the glass and push {~/;a# =/;the#fire 表示火，抽象不可数，那个红色的按钮特指。 ~the; the# ~a; a#} red button. \'"},{"content":"8.I earn 10 dollars {~a; an# ~the; a# =an; a#一个小时可数，而且读音开头是元音，所以用 an;作为一个超市收银员也是泛指 可数. ~an; the#} hour as {~a; an# ~the; a# =an; a#一个小时可数，而且读音开头是元音，所以用 an;作为一个超市收银员也是泛指 可数. ~an; the#} supermarket cashier on Saturdays."},{"content":"9.There\'s {=a; the#桌子上有一本词典，不具体所指;你身边的桌子特指。 ~a; a# ~the; a# ~the; the#} dictionary on {=a; the#桌子上有一本词典，不具体所指;你身边的桌子特指。 ~a; a# ~the; a# ~the; the#} desk by your side."},{"content":"10.— Where is my blue shirt? — It\'s in the washing machine. You have to wear {~any# ~the# =a#泛指另外一件 T 恤。 ~other#} different one."}]
	
	
	type: 1-Cloze（填空题）；2-MultipleChoice（选择题）；3-Match（匹配题）；4-Spell（逐字母拼写）；5-Sort（排序题）；6-Classify（分类题）；
	*/
	process(input, type, kid) {
		let that=this;
		var rst='';
		console.log("process input:",input,"type=",type,"kid=",kid);
		if(input==null ||  input.length<1){
			input="The house was surrounded by trees and ____[invisible#] (visible) from the road.\nYour advice has been ____[invaluable#] (value) to us.";
			if(type==2)input="(D)1. I always ____ school at 7:00 am.\nA. arrive	B. arrive in	C. get	D. reach\n[解析] reach vt. arrrive in +大地点; arrive at+ 小地点\n\n"
						+"(A)2. Tom can often ____ strange sounds recently.\nA. hear	B. listen	C. see	D. look\n[解析]hear vt. listen to + sth.\n\n";
		}
		var seprator='\n';
		if(type==2)seprator='\n\n';
		var items = input.split(seprator);
		//去掉空行
		for(var j=0;j<items.length;j++){
			if(items[j]==null||items[j].length<1)
				items.splice(j,1);
		}
		console.log("GiftConverter.process(input, type, kid) items:",items);
		if(type==1||type==3||type==4||type==5){
			for(var j=0;j<items.length;j++){
				var item=items[j].trim();
				if(item==null||item.length<1)continue;
				rst+="{\"id\":"+(j+1)+",\"kid\":"+kid+",\"point\":1, \"content\":\""+that.processClozeItem(item, type).trim()+"\"}";//'\n';
				if(j<items.length-1)rst+=",";
			}
		}else if(type==2){
			for(var j=0;j<items.length;j++){
				var item=items[j];
				if(item==null||item.length<1)continue;
				rst+="{\"id\":"+(j+1)+",\"kid\":"+kid+",\"point\":1, \"content\":\""+that.processMultipleChoiceItem(item)+"\"}";
				if(j<items.length-1)rst+=",";
				
			}
		}
		return '['+rst+']';
	}

	/*
	20221120
	将人类阅读的填空题或多项选择题文件格式（可读格式）转换为gift格式（机器格式），不带kid，纯gift格式，同时兼容选择题和填空题。
	20221126 增加type参数
	type: 1-Cloze（填空题）；2-MultipleChoice（选择题）；3-Match（匹配题）；4-Spell（逐字母拼写）；5-Sort（排序题）；6-Classify（分类题）；

	注意JS不能通过不同参数识别不同函数，必须通过不同的函数名
	*/
	process2(input, type) {
		let that=this;
		var rst='';
		console.log("process input:",input,"type=",type);
		if(input==null ||  input.length<1){
			input="The house was surrounded by trees and ____[invisible#] (visible) from the road.\nYour advice has been ____[invaluable#] (value) to us.";
			if(type==2)input="(D)1. I always ____ school at 7:00 am.\nA. arrive	B. arrive in	C. get	D. reach\n[解析] reach vt. arrrive in +大地点; arrive at+ 小地点\n\n"
						+"(A)2. Tom can often ____ strange sounds recently.\nA. hear	B. listen	C. see	D. look\n[解析]hear vt. listen to + sth.\n\n";
		}
		var seprator='\n';
		if(type==2)seprator='\n\n';
		var items = input.split(seprator);
		for(var j=0;j<items.length;j++){
			if(items[j]==null||items[j].length<1)
				items.splice(j,1)
		}
		console.log("GiftConverter.process2() items: ",items);
		if(type==1||type==3||type==4||type==5){
			for(var j=0;j<items.length;j++){
				var item=items[j];
				if(item==null||item.length<1)continue;
				rst+=that.processClozeItem(item, type).trim()+"\n";//'\n';
				//if(j<items.length-1)rst+=",";
			}
		}else if(type==2){
			for(var j=0;j<items.length;j++){
				var item=items[j];
				if(item==null||item.length<1)continue;
				rst+=that.processMultipleChoiceItem(item)+"\n";
				//if(j<items.length-1)rst+=",";
				
			}
		}
		return rst;//'['+rst+']';
	}



	/*
	将人类阅读的多项选择题文件格式转换为gift格式
	人类阅读的多项选择题文件格式参考workspace\QuickPotato\quickpotato.multiplechoice.normal.txt;
	The house was surrounded by trees and ____[invisible#] (visible) from the road.
	保留分隔符。
"1、2、3".split("、") == ["1", "2", "3"]
"1、2、3".split(/(、)/g) == ["1", "、", "2", "、", "3"]
"1、2、3".split(/(?=、)/g) == ["1", "、2", "、3"]
"1、2、3".split(/(?!、)/g) == ["1、", "2、", "3"]
"1、2、3".split(/(.*?、)/g) == ["", "1、", "", "2、", "3"]
警告：第四部分只适用于分割单个字符
	*/
	processMultipleChoiceItem(input) {
		//console.log("processMultipleChoiceItem input:",input);
		if(input==null || input.length<1)return '';//input="(D)1. I always ____ school at 7:00 am.\nA. arrive	B. arrive in	C. get	D. reach\n[解析] reach vt. arrrive in +大地点; arrive at+ 小地点";
		var rst='',node='';
		var lines = input.split('\n');
		var stem=lines[0].trim();
		var choiceline=lines[1].replace('．', '.').replace('、', '.').replace('。', '.');//20200221全角点或顿号替换为半角点
		var explanation='';
		if(lines.length>2 && lines[2].trim().startsWith("[解析]"))//20200224如果存在'[解析]'行
			explanation=lines[2].replace('[解析]', '').replace('[Explanation]', '').replace('[explanation]', '').replace('[Explain]', '').replace('[explain]', '');
		var key=stem.substring(0, stem.indexOf(')')).replace('(','').replace(')','').trim();
		console.log("stem=",stem,"key=",key,"choiceline=",choiceline, "explanation=",explanation);
		//var choices=choiceline.split(/\t+/);
		var choices=choiceline.split(/[ABCDEFG]\.|\\t+/);//20200224选项支持跳格\t或任意空格分隔 20241226目前支持ABCDEFG七个选择项
		//console.log("choices",choices);
		//console.log("choices size=",choices.length);
		var j=0;
		for(var i=0;i<choices.length;i++){
			var choice=choices[i].trim();
			console.log("choice=",choice);
			if( choice.trim()==''|| choice.trim().length<1)continue;
			//var letter=choice.substring(0, choice.indexOf('.')).trim();
			//65对应A，其他以此类推。js char ascill 转换 https://www.jianshu.com/p/2b207b6cc46a
			var letter=String.fromCharCode(65+j);
			var choicestr=choice.trim();//20201001上一步正则表达式已经去除点号
			//var choicestr=choice.substring(choice.indexOf('.')+1).trim();
			console.log("key=",key,"letter=",letter,"choicestr=",choicestr);
			if(key==letter){
				node+='='+choicestr+'#'+explanation+' ';
			}else{
				node+='~'+choicestr+'# ';
			}
			j++;
		}

		var reg = /[_]+/g;//有g
		var replaced = stem.substring(stem.indexOf(')')+1).replace(reg, '{'+node+'}');
		if(replaced==null || replaced.length.length<1){
			console.error("err found for:",input);
			return null;
		}
		//console.log("val:",rs_match);
		//var res=rs_match[0];
		//res=res.substring(1,res.length-1);
		return replaced;
	}
	/*
	将人类阅读的多项选择题文件格式转换为gift格式
	人类阅读的多项选择题文件格式参考workspace\QuickPotato\quickpotato.multiplechoice.normal.txt;
	The house was surrounded by trees and ____[invisible#] (visible) from the road.
	*/
	processClozeItem(input, type) {
		console.log("processClozeItem input:",input);
		if(input==null || input.length<1)return '';//input="The house was surrounded by trees and ____[invisible#] (visible) from the road.";
		var subtracted=this.subtract(input);
		console.log("subtracted:",subtracted);
		if(!subtracted)return null;
		//return subtracted;

		var key=subtracted.substring(1, subtracted.indexOf('#')).trim();
		var explanation=subtracted.substring(subtracted.indexOf('#')+1,subtracted.length-1).trim();
		console.log("stem=",input,"key=",key, "explanation=",explanation);
		//var node= this.processMultipleChoices(subtracted);
		var reg = /\[([^\]]+)\]/g;//有g，将方括号[]包括的部分替换为大括号{}包括的部分
		var replaced = input.replace( /_+/g,'').replace(reg, '{='+key+'#'+explanation+'}');
		if(replaced==null || replaced.length.length<1){
			console.error("no [ ] section subtracted for :",input);
			return null;
		}
		//console.log("subtract:",rs_match);
		//var res=rs_match[0];
		//res=res.substring(1,res.length-1);
		return replaced;
	}

/*
提取[]中的内容
*/
subtract( input) {
	//var str = "1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h } the film is worth seeing.";
	//console.log("input :",input);
	var reg = /\[([^\]]+)\]/;//匹配[]中的内容
	var rs_match = input.match(reg);
	if(rs_match==null || rs_match.length<1){
		console.error("no {} section subtracted for :",input);
		return null;
	}
	//console.log("subtract:",rs_match);
	var res=rs_match[0];
	//res=res.substring(1,res.length-1);
	return res;
}

 formatString(str, str2){
  if (typeof(str) != "string"){
    console.log('去除回车换行空格失败！参数不是字符串类型')
    return;
  }
  str = str.replace(/_+/g, str2);//
  //str = str.replace(/\ +/g, "");//去掉空格
  //str = str.replace(/[\r\n]/g, "");//去掉回车换行
  return str;
 }

	speak() {
		//alert('convert')
		console.log('MultipleChoiceUtil');
	 }

}

//AV.Object.register(Message, 'Message');
//module.exports = MultipleChoiceUtil;