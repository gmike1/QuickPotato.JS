/*quickpotato.multiplechoicexx.template.js

20250104 	answer	String[]	20250104 改为字符串数组。（填空题）仍然存储用户输入字符串；（选择题）由存储用户最后选择的项目索引（0-3,不是ABCD）改为将用户点击选项的文字添加到数组末尾，不考虑顺序；

*/
class MultipleChoiceUtil {
	

	
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
	从Json字符串解析Json对象，其中题目为GIFT格式，如"content": "1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h} the film is worth seeing. "
	参数：var str = '[{"id":1, "kid":1, "content": "1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h} the film is worth seeing. "},{"id":2, "kid":1, "content": "5. {~That# =Whether#[EXPLANATION] ~If# ~Even if#} his dream of going to college will come true is uncertain."}]';
	
	本LMS方案中的题目(Item)以多项选择题为基本原型。即把填空题设计为多选题的一个特例（只有一个选项的多选题）。
	本LMS方案另一个重要概念是题组(group)。题组(group)是一组题目的组合（最少可以只有一个题）。
	题组用以处理英语考试中的特殊情形。如阅读理解题就是一组题目共享一个文本或图片(orientation/导学)的题组，
	而匹配题就是把答案顺序错乱显示的一组题目。
	
	每个题目(Item)包含以下 属性：
	id			int		唯一标识
	kid		int		题目考点对应的KnowledgeID，如'冠词'
	type		int		1-Cloze（填空题）；2-MultipleChoice（选择题）；3-Match（匹配题）；4-Spell（逐字母拼写）；5-Sort（排序题）；6-Classify（分类题）；
	stem		String	题干(要填的空替换为下划线)
	key		String[]	答案(选择题答案也是选项的文本而不是ABCD)；20241204 改为字符串数组可以有多个正确答案（用于classify题型和多个正确选项的多选题），第一个正确答案为key[0]。目前Cloze填空题型仍只能有一个答案，不支持多个备选正确答案，否则会被识别为MultipleChoice选择题型。
	generalExplanation		String	整个题的解析（填空题等同于答案的解析）
	choices Array	包括一个（单选题的空）或多个元素（多选题的选项），每个元素为一个json对象，
	包括以下属性{'choiceText':choiceText,'explanation':explanation}注意：{'answer':answer,'explanation':explanation}改为{'choiceText':choiceText,'explanation':explanation}
	multiplechoiceplus.html->doNextItem()方法var choice=quiz.groups[current].choices[k].choiceText; 引用了此数据
	具体如下：
	answer	String[]	20250104 改为字符串数组。（填空题）仍然存储用户输入字符串；（选择题）由存储用户最后选择的项目索引（0-3,不是ABCD）改为将用户点击选项的文字添加到数组末尾，不考虑顺序；
	explanation		String	（选择题）备选项对应显示给学习者的解析
	status				int		状态（用于统计错题等）：0-初始化；1-显示；2-答题过程中（部分正确）；3-答题正确；4-答题错误；5-查看解析；6-复习//20200417 20250104
	*/
	getItems(str) {//
		var items=[];
		//JSON字符串:
		//if(str==null)
		//var str = '[{"id":1, "kid":1, "content": "1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h} the film is worth seeing. "},{"id":2, "kid":1, "content": "5. {~That# =Whether#[EXPLANATION] ~If# ~Even if#} his dream of going to college will come true is uncertain."}]';
		var jsonObj = JSON.parse(str);
		//console.log('jsonObj',jsonObj);
		for(var i=0;i<jsonObj.length;i++){
			var item={};
			item.id=jsonObj[i].id;
			item.kid=jsonObj[i].kid;
			item.status=0;//20200417
			
			//console.log('jsonObj:'+jsonObj[i].content);//+"->"+jsonObj[i].answer
			//jsonObj[i].content内容格式1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h} the film is worth seeing.
			var stem=jsonObj[i].content.replace(/\{[^}]+\}/g,'____');//正则表达式匹配{}中的内容
			//console.log('stem: ', stem);
			item.stem=stem;
			var subtracted=this.subtract(jsonObj[i].content);//提取{}中的内容，subtract( input) 方法定义参考MultipleChoiceUtil.js
			if(!subtracted)continue;

			//choices_字符串数组，每个字符串以=或~开头
			var choices_= this.processMultipleChoices(subtracted);
			//console.log('choices_: ', choices_);//['=dog# ', '=cat# ', '=panda# ', '=monkey#']
			
			if(choices_.length>1)item.type=2;else item.type=1;//item.type=2;
			
			item.choices=[];
			item.answer=[];//20250104
			item.key=[];//20241204
			var keyindex=0;//20241204
			for(var j=0;j<choices_.length;j++){
				var res=this.processBlank(choices_[j]);
				
				item.choices[j]=res;//JSON格式 {'choiceText':choiceText,'explanation':explanation}
				if(choices_[j].trim().indexOf("=")==0){
					item.key[keyindex++]=res.choiceText;
					item.generalExplanation=res.explanation;
					
				}
				//console.log('choice detail: ', res);
			}
			//console.log('item.key: ', item.key);
			item.status=0;//20250104
			items[i]=item;
		}
		//console.log("items",items);
		return items;//即multiplechoiceplus-5.0.html中的quiz.groups
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
/*
	 * 处理所有选项
	 * @param input	{=Absorbed#过去分词作状语 ~Absorbing# ~Absorb# ~To absorbed#}
	 * @return 返回字符串数组，每个字符串以=或~开头

*/
 processMultipleChoices( input) {
	var reg = /[=~][^=~]+/g;//有g 以=或~开始加上其他字符
	var rs_match = input.substring(1,input.length-1).match(reg);//substring去掉首尾的花括号
	//console.log("match:",rs_match);
	
	return rs_match;
}

/**
 * 处理单个选项，返回{'choiceText':choiceText,'explanation':explanation}
 *注意：{'answer':answer,'explanation':explanation}改为{'choiceText':choiceText,'explanation':explanation}
	multiplechoiceplus.html->doNextItem()方法var choice=quiz.groups[current].choices[k].choiceText; 引用了此数据
 * @param input	以=或~开始，如=Absorbed#过去分词作状语
 * @return 处理后的结果，JSON格式 {'choiceText':choiceText,'explanation':explanation}，如key=Absorbed explanation=过去分词作状语
 */
 processBlank(input) {
	var indsharp=input.indexOf("#");
	var choiceText=input.substring(1, indsharp).trim();//去掉了开头的=或~；注意：input是带有=或~开头的
	var explanation=input.substring(input.indexOf("#")+1);
	/*{'answer':answer,'explanation':explanation}改为{'choiceText':choiceText,'explanation':explanation}
	multiplechoiceplus.html->doNextItem()方法var choice=quiz.groups[current].choices[k].choiceText; 引用了此数据*/
	//console.log("processBlank: ",choiceText+'->'+explanation);
	return {'choiceText':choiceText,'explanation':explanation};
}
/*
提取{}中的内容
*/
subtract( input) {
	//var str = "1.The question is {~if# ~what# =whether#[EXPLANATION] ~how#h } the film is worth seeing.";
	//console.log("input :",input);
	var reg = /\{([^}]+)\}/;//有g//匹配}{}中的内容
	var rs_match = input.match(reg);
	if(rs_match==null || rs_match.length.length<1){
		console.error("no {} section subtracted for :",input);
		return null;
	}
	//console.log("subtract:",rs_match);
	var res=rs_match[0];
	//res=res.substring(1,res.length-1);
	return res;
}

		  
  getChildren(node) {
    var res = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].parent == node) {
        res.splice(res.length,0,this.data[i])
        console.log(this.data[i].id + ' ' + this.data[i].entry);
      }
    }
    console.log('getChildren: ', res);
    return res;
  }

  getSiblings(node) {
    var res=[];
    var parent = this.data[node].parent;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].parent == parent){
        res.splice(res.length, 0, this.data[i])
        console.log(this.data[i].id + ' ' + this.data[i].entry);
      }
    }
    console.log('getChildren: ', res);
    return res;
  }

  /*get choices() {
    return this.choices;
  }
  set choices(value) {
    this.choices=value;
  }*/
	speak() {
		console.log('MultipleChoiceUtil');		
	 }

}

//客户端不要下面这一句，否则报错： Uncaught ReferenceError: module is not defined
//module.exports = MultipleChoiceUtil;
/*
	客户端用法：
	<SCRIPT src="MultipleChoiceUtil.js"></SCRIPT>
	var util=new MultipleChoiceUtil('MultipleChoiceUtil');

*/