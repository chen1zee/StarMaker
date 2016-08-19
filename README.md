## StarMaker
a plugin for making full screen star canvas
<br>
一个小脚本，让canvas元素充满整个文档并布满星星，当背景用吧。
##使用方法及例子：

html部分
```html

    <canvas id="canvas"></canvas>
    
```
js部分
```javascript
    
    <script type="text/javascript" src='StarMaker.js'></script>//---引用StarMaker插件
	<script type="text/javascript">
		var canvas = document.getElementById('canvas');//---获取需要作为背景的canvas元素
		var starMaker = new StarMaker();//---通过构造函数 StarMaker创建一个实例

		starMaker.fullScreenStar({//---调用 实例下的 fullScreenStar 方法 ，该方法接收一个对象作为参数,
			element:canvas,//---指定需要操作的canvas元素
		});
	</script>
    
```

##StarMaker实例 各方法及接口 

###fullScreenStar(obj)
<em color='red'>*</em> &nbsp;&nbsp;为必填参数
####obj.element 
<em color='red'>*</em> &nbsp;obj.element 接收一个canvas元素为参数，在此canvas元素下绘画操作。



