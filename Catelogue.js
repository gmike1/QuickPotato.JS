//const AV = require('../utils/av-live-query-weapp-min');
// extends AV.Object
class Catelogue {
	

	
	constructor(name) {
		this.name = name;
		this.data=[
{'id':10001,'entry':'名词', 'parent':10000},
{'id':10002,'entry':'名词种类', 'parent':10001},
{'id':10003,'entry':'名词复数', 'parent':10001},
{'id':10004,'entry':'名词所有格', 'parent':10001},
{'id':10005,'entry':'冠词', 'parent':10000},
{'id':10006,'entry':'不定冠词的基本用法', 'parent':10005},
{'id':10007,'entry':'定冠词的基本用法', 'parent':10005},
{'id':10008,'entry':'不用冠词的情况', 'parent':10005},
{'id':10009,'entry':'应注意的问题', 'parent':10005},
{'id':10010,'entry':'代词', 'parent':10000},
{'id':10011,'entry':'人称代词', 'parent':10010},
{'id':10012,'entry':'物主代词', 'parent':10010},
{'id':10013,'entry':'反身代词', 'parent':10010},
{'id':10014,'entry':'指示代词', 'parent':10010},
{'id':10015,'entry':'疑问代词', 'parent':10010},
{'id':10016,'entry':'相互代词', 'parent':10010},
{'id':10017,'entry':'不定代词', 'parent':10010},
{'id':10018,'entry':'数词', 'parent':10000},
{'id':10019,'entry':'基数词', 'parent':10018},
{'id':10020,'entry':'序数词', 'parent':10018},
{'id':10021,'entry':'分数词', 'parent':10018},
{'id':10022,'entry':'数词的其他用法', 'parent':10018},
{'id':10023,'entry':'形容词', 'parent':10000},
{'id':10024,'entry':'形容词的类型', 'parent':10023},
{'id':10025,'entry':'形容词的句法作用', 'parent':10023},
{'id':10026,'entry':'形容词作定语的位置', 'parent':10023},
{'id':10027,'entry':'形容词的比较级和最高级', 'parent':10023},
{'id':10028,'entry':'副词', 'parent':10000},
{'id':10029,'entry':'副词的类型', 'parent':10028},
{'id':10030,'entry':'副词的句法作用', 'parent':10028},
{'id':10031,'entry':'副词的比较级和最高级', 'parent':10028},
{'id':10032,'entry':'介词', 'parent':10000},
{'id':10033,'entry':'介词的分类', 'parent':10032},
{'id':10034,'entry':'介词短语的句法作用', 'parent':10032},
{'id':10035,'entry':'常用介词的用法', 'parent':10032},
{'id':10036,'entry':'介词与其他词的搭配', 'parent':10032},
{'id':10037,'entry':'含有介词的成语', 'parent':10032},
{'id':10038,'entry':'动词', 'parent':10000},
{'id':10039,'entry':'动词的基本形式', 'parent':10038},
{'id':10040,'entry':'及物动词', 'parent':10038},
{'id':10041,'entry':'不及物动词', 'parent':10038},
{'id':10042,'entry':'系动词', 'parent':10038},
{'id':10043,'entry':'助动词', 'parent':10038},
{'id':10044,'entry':'情态动词', 'parent':10038},
{'id':10045,'entry':'时态', 'parent':10000},
{'id':10046,'entry':'一般现在时', 'parent':10045},
{'id':10047,'entry':'一般过去时', 'parent':10045},
{'id':10048,'entry':'一般将来时', 'parent':10045},
{'id':10049,'entry':'现在进行时', 'parent':10045},
{'id':10050,'entry':'过去进行时', 'parent':10045},
{'id':10051,'entry':'过去将来时', 'parent':10045},
{'id':10052,'entry':'将来进行时', 'parent':10045},
{'id':10053,'entry':'现在完成时', 'parent':10045},
{'id':10054,'entry':'过去完成时', 'parent':10045},
{'id':10055,'entry':'现在完成进行时', 'parent':10045},
{'id':10056,'entry':'被动语态', 'parent':10000},
{'id':10057,'entry':'主动语态与被动语态的转换', 'parent':10056},
{'id':10058,'entry':'不同时态的被动语态', 'parent':10056},
{'id':10059,'entry':'其他形式的被动语态', 'parent':10056},
{'id':10060,'entry':'被动语态的使用场合', 'parent':10056},
{'id':10061,'entry':'应注意的问题', 'parent':10056},
{'id':10062,'entry':'虚拟语气', 'parent':10000},
{'id':10063,'entry':'虚拟语气用于虚拟条件句', 'parent':10062},
{'id':10064,'entry':'虚拟语气用于其他形式的虚拟条件句', 'parent':10062},
{'id':10065,'entry':'虚拟语气用于某些从句', 'parent':10062},
{'id':10066,'entry':'虚拟语气的其他用法', 'parent':10062},
{'id':10067,'entry':'非谓语动词', 'parent':10000},
{'id':10068,'entry':'动词不定式', 'parent':10067},
{'id':10069,'entry':'动名词', 'parent':10067},
{'id':10070,'entry':'现在分词', 'parent':10067},
{'id':10071,'entry':'过去分词', 'parent':10067},
{'id':10072,'entry':'独立结构与with复合结构', 'parent':10000},
{'id':10073,'entry':'独立结构', 'parent':10072},
{'id':10074,'entry':'with复合结构', 'parent':10072},
{'id':10075,'entry':'句子成分', 'parent':10000},
{'id':10076,'entry':'主语', 'parent':10075},
{'id':10077,'entry':'谓语', 'parent':10075},
{'id':10078,'entry':'表语', 'parent':10075},
{'id':10079,'entry':'宾语', 'parent':10075},
{'id':10080,'entry':'补足语', 'parent':10075},
{'id':10081,'entry':'定语', 'parent':10075},
{'id':10082,'entry':'同位语', 'parent':10075},
{'id':10083,'entry':'状语', 'parent':10075},
{'id':10084,'entry':'独立成分', 'parent':10075},
{'id':10085,'entry':'主谓一致', 'parent':10000},
{'id':10086,'entry':'语法一致', 'parent':10085},
{'id':10087,'entry':'意义一致', 'parent':10085},
{'id':10088,'entry':'临近一致', 'parent':10085},
{'id':10089,'entry':'句子种类', 'parent':10000},
{'id':10090,'entry':'陈述句', 'parent':10089},
{'id':10091,'entry':'疑问句', 'parent':10089},
{'id':10092,'entry':'祈使句', 'parent':10089},
{'id':10093,'entry':'感叹句', 'parent':10089},
{'id':10094,'entry':'简单句', 'parent':10000},
{'id':10095,'entry':'简单句概说', 'parent':10094},
{'id':10096,'entry':'简单句的基本句型', 'parent':10094},
{'id':10097,'entry':'并列连词与并列句', 'parent':10000},
{'id':10098,'entry':'并列连词', 'parent':10097},
{'id':10099,'entry':'并列句', 'parent':10097},
{'id':10100,'entry':'名词性从句', 'parent':10000},
{'id':10101,'entry':'主语从句', 'parent':10100},
{'id':10102,'entry':'表语从句', 'parent':10100},
{'id':10103,'entry':'宾语从句', 'parent':10100},
{'id':10104,'entry':'同位语从句', 'parent':10100},
{'id':10105,'entry':'应注意的问题', 'parent':10100},
{'id':10106,'entry':'定语从句', 'parent':10000},
{'id':10107,'entry':'关系代词引导的定语从句', 'parent':10106},
{'id':10108,'entry':'关系副词引导的定语从句', 'parent':10106},
{'id':10109,'entry':'介词+关系代词引导的定语从句', 'parent':10106},
{'id':10110,'entry':'限制性定语从句与非限制性定语从句', 'parent':10106},
{'id':10111,'entry':'as引导的定语从句', 'parent':10106},
{'id':10112,'entry':'应注意的问题', 'parent':10106},
{'id':10113,'entry':'状语从句', 'parent':10000},
{'id':10114,'entry':'时间状语从句', 'parent':10113},
{'id':10115,'entry':'地点状语从句', 'parent':10113},
{'id':10116,'entry':'原因状语从句', 'parent':10113},
{'id':10117,'entry':'结果状语从句', 'parent':10113},
{'id':10118,'entry':'条件状语从句', 'parent':10113},
{'id':10119,'entry':'方式状语从句', 'parent':10113},
{'id':10120,'entry':'让步状语从句', 'parent':10113},
{'id':10121,'entry':'比较状语从句', 'parent':10113},
{'id':10122,'entry':'目的状语从句', 'parent':10113},
{'id':10123,'entry':'直接引语和间接引语', 'parent':10000},
{'id':10124,'entry':'直接引语和间接引语概说', 'parent':10123},
{'id':10125,'entry':'直接引语和间接引语的转换', 'parent':10123},
{'id':10126,'entry':'倒装', 'parent':10000},
{'id':10127,'entry':'全部倒装', 'parent':10126},
{'id':10128,'entry':'部分倒装', 'parent':10126},
{'id':10129,'entry':'省略', 'parent':10000},
{'id':10130,'entry':'省略概说', 'parent':10129},
{'id':10131,'entry':'简单句中的省略', 'parent':10129},
{'id':10132,'entry':'并列句中的省略', 'parent':10129},
{'id':10133,'entry':'复合句中的省略', 'parent':10129},
{'id':10134,'entry':'强调', 'parent':10000},
{'id':10135,'entry':'强调句型', 'parent':10134},
{'id':10136,'entry':'其他类型的强调', 'parent':10134},
{'id':10137,'entry':'构词法', 'parent':10000},
{'id':10138,'entry':'合成法', 'parent':10137},
{'id':10139,'entry':'派生法', 'parent':10137},
{'id':10140,'entry':'转化法', 'parent':10137},
{'id':10141,'entry':'缩写和简写', 'parent':10137}
/**/


		];
    this.init();
    //this.getChildren(0);
    //this.getSiblings(10);
	}

	init() {
		for (var i = 0; i < this.data.length;i++){
			//console.log(this.data[i].id + ' '+this.data[i].entry);
			//计算childrenCount
			this.data[i].childrenCount=this.getChildrenCount(10001+i);
			//console.log('childrenCount',this.data[i].childrenCount);
		}
	}
	/*
	获取节点中文名称标签(entry)
	参数：node代表节点id的整数
	*/
	getNodeLabel(node) {
		var rst=this.getNode(node);
		if(rst!=null)
			return this.getNode(node).entry;
		else
			return null;
	}
	getNode(node) {
		//console.log('getNode: ', node);
		for (var i = 0; i < this.data.length; i++) {
		 if (this.data[i].id == node) {
			return this.data[i];
		  }
	}
    
    return null;
  }

  getChildren(node) {
    var res = [];
	//node=node-10000;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].parent == node) {
        //res.splice(res.length,0,this.data[i])
		res.push(this.data[i])
        console.log(this.data[i].id + ' ' + this.data[i].entry);
      }
    }
    console.log('getChildren: ', res);
    return res;
  }

  getSiblings(node) {
    var res=[];
	node=node-10000;
	if(!this.data[node]){
		console.log('node not exist: ', node);
		return res;
	}
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

  getChildrenCount(node) {
    var res = 0;
	node=node-10001;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].parent == this.data[node].id) {
		++res;
      }
    }
    //console.log('getChildrenCount: ', res);
    return res;
  }
	speak() {
		console.log(this.name + ' '+this.data[0].entry);
		
	  }
	  


}

//AV.Object.register(Message, 'Message');
//module.exports = Catelogue;