/**
 * 用原生 JS 封装一个 Toast 组件
 js封装toast组件——常用工具函数
 https://segmentfault.com/a/1190000018012740
 20200424不删除domToastWaka节点，这样Toast,init()只需开始时调用一次
  */
var Toast = {
    // 隐藏的 setTimeOut 引用
    hideTimeOut: null,
    /**
     * 初始化
     */
    init: function () {
        var toastNode = document.createElement('div');//section
        toastNode.innerHTML = '<i class="iconfont icon-success"></i><i class="iconfont icon-error"></i><span class="text" id="child">This is an example of toast. </span>';
        toastNode.id = 'toastWaka'; // 设置id，一个页面有且仅有一个Toast
        toastNode.setAttribute('class', 'toast');   // 设置类名
        toastNode.style.display ='none';   // 设置隐藏 
        document.body.appendChild(toastNode);
    },
    /**
     * 显示Toast
     * @param text 文本内容
     * @param type 类型 success error
     * @param duration 持续时间
     */
    show: function (text, type, duration) {
        // 确保上一次的 TimeOut 已被清空
        if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
            // console.error('上一次的 TimeOut 还未走完!');
            // return;
        }
        if (!text) {
            console.error('text 不能为空!');
            return;
        }
        var domToastWaka = document.getElementById('toastWaka');
        //console.log('domToastWaka', domToastWaka);
        if (!domToastWaka) {
            console.error('toastWaka DOM 不存在!');
            return;
        }
        var domIconSuccess = domToastWaka.querySelector('.icon-success');   // 成功图标
        var domIconError = domToastWaka.querySelector('.icon-error');   // 错误图标
        var domToastText = domToastWaka.querySelector('.text');   // 文字
        //domToastText.innerHTML = text || '';
		domToastWaka.innerHTML = text || '';
		//domToastText.style.height = "";
		//放弃原来的父子元素双层模型，避免更新内容后父级div无法撑开的问题，直接将内容写在toastWaka这个div里
		//损失就是少了装饰的图标元素，不影响功能
        /*switch (type) {
            case 'success':
                domIconSuccess.style.display = 'inline-block';
                domIconError.style.display = 'none';
                break;
            case 'error':
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'inline-block';
                break;
            default:
                domIconSuccess.style.display = 'none';
                domIconError.style.display = 'none';
                break;
        }*/
        domToastWaka.style.display ='block';//
		//console.log('child offsetHeight', document.getElementById('child').offsetHeight);
		//domToastWaka.style.height = document.getElementById('child').offsetHeight + 'px';
        //domToastWaka.style.height = document.querySelector('#child').offsetHeight + 'px';
        // 不传的话默认2s
        var that = this;
        this.hideTimeOut = setTimeout(function () {
            domToastWaka.style.display = 'none';
            that.hideTimeOut = null;    // 置 TimeOut 引用为空
        }, duration || 2000);
    },
    /**
     * 隐藏 Toast
     */
    hide: function () {
        // 如果 TimeOut 存在
        if (this.hideTimeOut) {
            // 清空 TimeOut 引用
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
        var domToastWaka = document.getElementById('toastWaka');
        if (domToastWaka) {
			domToastWaka.style.display = 'none';
			//20200424不删除domToastWaka节点，这样Toast.init()只需开始时调用一次
            //document.body.removeChild(domToastWaka);
            
        }
    }
};