	/*
	（无需联网）只对基于chrome核心的浏览器有效；只有手机chrome浏览器有效，PC上chrome浏览器无效

	*/
	function speakText(text) {
		console.log('speakText:',text);
		// 获取文本输入框的内容
		//const text = document.getElementById('textToRead').value;
		if (text.trim() === '') return; // 如果文本为空，则不执行
		const utterance = new SpeechSynthesisUtterance(text); // 创建语音合成实例
		utterance.lang = 'zh-CN'; // 设置语言为中文
		utterance.volume = 1;      // 设置音量（0 到 1）
		utterance.rate = 1;        // 设置语速（0.1 到 10）
		utterance.pitch = 1;       // 设置音调（0 到 2）
		window.speechSynthesis.speak(utterance); // 播放语音
	}

	//已经失效：百度文字转语音免费接口使用实例（需要联网）
	//https://blog.csdn.net/ztblog/article/details/52209308
	//百度语音合成接口
	//http://yuyin.baidu.com/docs/tts/136
	//
	function readAloud(text){
		console.log('readAloud:',text);
		//var text=document.getElementById("text").value;
		var zhText = text;
		zhText = encodeURI(zhText);
		document.getElementById("player").innerHTML="<audio autoplay=\"autoplay\">"+
			"<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&per=4&text="+ zhText +"\" type=\"audio/mpeg\">"+
			"<embed height=\"0\" width=\"0\" src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&per=4&text="+ zhText +"\">"+
			"</audio>";
	}

/*
PC上chrome浏览器无效
此方法通过测试连接www.baidu.com返回状态获取网络状态是否可上网，
而不管是WIFI还是运营商流量。

return 1-可上网，0-不可上网;

*/
function checkNetworkStatus() {
            console.log("checkNetworkStatus");
    try {
    //
	console.show();
    var r = http.get("www.baidu.com");
    alert("code = " + r.statusCode);
    //log("code = " + r.statusCode);
    //log("html = " + r.body.string());
    if (r.statusCode == "200") {
        console.log("网络正常")
        return 1;
    }

    } catch (err) {
        //log(err.name)
        if (err.name == "JavaException"){
            console.log("网络未连接，请打开网络重试");
            return 0;
        }
    }
}
	/*
text2voice
	*/
	function speakText2(text) {
		console.log('speakText2:',text);
		if(checkNetworkStatus()==1){
			readAloud(text);
		}else{
			speakText2(text);
		}

	}

