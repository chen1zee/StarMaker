;function StarMaker(){//---封装作用域，
		this.fullScreenStar = function (obj) {//---制造全屏星方法
			if (!obj.element) {//---没有指定 {element: ele}//报错并退出
				return console.log('missing canvas element,please make sure element defined');
			}
			obj.element.backgroundColor = 'transparent';//---初始化canvas底色为透明
			// ---兼容各版本的requestAnimationFrame
			window.requestAnimationFrame = (function () {
				return window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame || 
					function (callback) {
						window.setTimeout(callback, 1000/60);
						 /* body... */ 
					};

				 /* body... */ 
			})();

			// ---------变量定义区--------------------------

			var canvas = obj.element,
			wW = window.innerWidth,//---文档宽高
			wH = window.innerHeight,
			ctx = canvas.getContext('2d'),
			particles = [],// 粒子s 数组
			particleNumber = (Math.ceil(wW * wH / 3000)> 300) && 300 || (Math.ceil(wW * wH / 3000)),//---粒子总数
			minNearDistanceSquare = ((wW > wH) && (wW / 15) || (wH / 15)) * ((wW > wH) && (wW / 15) || (wH / 15)),//---碰撞产生连线距离
			lineColor = '#034769',
			particleColor = '#6e3b00';//---粒子公共属性 ： 颜色


			// ---------变量定义区--结束--------------------

			canvas.width = wW;
			canvas.height = wH;

			function drawBg() {//---画夜空背景
				ctx.fillStyle = "#212122";
				ctx.fillRect(0, 0, wW, wH);
				 /* body... */ 
			}
			function CreParticle() {//---构造函数   ，单粒子
				this.r = Math.random() * (5 - 1) + 2;//---radius 2-8
				this.x = Math.random() * (wW + 1);//--- positionX 0-wW
				this.y = Math.random() * (wH + 1);
				this.dirX = Math.random() > 0.5 && 1 || -1;//---x,y行走方向
				this.dirY = Math.random() > 0.5 && 1 || -1;
				this.v = Math.random() * (0.5) + 0.5;//---speed

				 /* body... */ 
			}


			CreParticle.prototype.move = function () {//---例子公共方法： 移动
				this.x += this.v * this.dirX;
				if (this.x > wW || this.x < 0) {//---粒子至尽头 ，取反
					this.dirX = -this.dirX;
				}
				this.y += this.v * this.dirY;
				if (this.y > wH || this.y < 0) {
					this.dirY = -this.dirY;
				}
				 /* body... */ 
			}
			CreParticle.prototype.draw = function () {
				ctx.beginPath();
				// ctx.fillStyle = this.color;//---全部一起画，省去这部
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();

				 /* body... */ 
			}

			function judgeNear(a,b) {
				var distanceSquare = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
				if (distanceSquare < minNearDistanceSquare) {//小于最小距离，连线
					// ctx.fillStyle = "#e0e562";//---统一划线，省略这步
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.closePath();
					ctx.stroke();
				}
				 /* body... */ 
			}




			

			for (var i = 0; i < particleNumber; i++) {//---构造粒子s
				particles.push(new CreParticle());
			}

			// ----主线程函数--------
			
			
			function main() {
				canvas.width = wW;//---重置画布
				drawBg();//---画背景
				ctx.fillStyle = particleColor;
				ctx.strokeStyle = lineColor;
				for (var i = 0; i < particleNumber; i++) {//---遍历星星粒子
					
					particles[i].move();//---每个粒子走动
					particles[i].draw();
					
					for (var j = i+1; j < particleNumber; j++) {
						judgeNear(particles[i],particles[j]);
					}
				}
				requestAnimationFrame(main);

				 /* body... */ 
			}

			// ----执行区---------
			main();



			 /* body... */ 
		}

	}