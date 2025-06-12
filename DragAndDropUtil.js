//class DragAndDropUtil{
		//var outTextarea = document.getElementById('outTextarea');
		//enableDragAndDrop(outTextarea,outTextarea);
		
		/*
		将原文代码片段改写为方法实现灵活设置
		listeningElement即为一个监听拖拽事件的对象，可以为显示读取的文件内容Textarea（与targetElement相同）或其它（如DIV）
		targetElement参数，一般为Textarea等有innerText属性的对象，用于显示读取的文件内容
		*/
		function enableDragAndDrop(listeningElement,targetElement){
			var oDiv = listeningElement;
			var outTextarea = targetElement;
			//var oDiv = document.getElementById('outTextarea');//oDiv
			//var outTextarea = document.getElementById('outTextarea');
			
			oDiv.addEventListener("dragenter", function(e){
				e.stopPropagation();
				e.preventDefault();
			}, false);
			
			oDiv.addEventListener("dragover", function(e){
				e.stopPropagation();
				e.preventDefault();
			}, false);
			
			oDiv.addEventListener("drop", function(e){
				e.stopPropagation();
				e.preventDefault();
				console.log(e)
				console.log(e.dataTransfer)
				
				var dt = e.dataTransfer;
				var files = dt.files;
			
				handle("filelist",files,outTextarea);


			}, false);
		}


		/*
		自定义方法
		data即为一个FileList数组
		增加target参数，一般为Textarea等有innerText属性的对象，用于显示读取的文件内容
		*/
		function handle(type,data,target){
			console.log('data',data);
			// 处理结果
			var reader = new FileReader();
			//3,调用FileReader的方法
			//reader.readAsDataURL(fileList);
			reader.readAsText(data[0]);//data即为一个FileList数组
			//4，调用事件，当操作成功/失败后进行操作
			reader.onload=function(e){
				console.log('result',e.target.result);
				target.value =e.target.result;//target.innerText无法更改编辑状态下的textarea内容。解决方法：改成value即可
				//target.innerText =e.target.result;
				//document.write(this.result)
			}

			/*
			//不起作用，替换为上面处理
			var handleResult = function(file){
				var reader = new FileReader();
			    reader.onload = function(e){
				console.log('result',e.target.result);
			      outTextarea.innerText = e.target.result;
			    };
			    reader.readAsText(file);
			};*/
		};
//}
