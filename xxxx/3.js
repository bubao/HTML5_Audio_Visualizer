/**
 * @Description: 
 * @author: bubao
 * @Date: 2021-12-22 16:38:07
 * @LastEditors: bubao
 * @LastEditTime: 2021-12-23 00:59:46
 */
class wave {
	constructor() {
		this.c = document.getElementById("study");
		this.ctx = this.c.getContext("2d");
		const ctx = this.ctx
		this.dong = 1
		this.time = 1000 / 60
		this.cango;
		//画图函数
		this.Drawing = {
			// line: function (starxy, endxy, lineWidth, color) {
			// 	ctx.strokeStyle = color;
			// 	ctx.lineWidth = lineWidth;
			// 	ctx.beginPath();
			// 	ctx.moveTo(starxy[0], starxy[1]);
			// 	ctx.lineTo(endxy[0], endxy[1]);
			// 	ctx.stroke();
			// },
			ract: function (starxy, ractWH, color) {
				ctx.fillStyle = color;
				ctx.fillRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
			},
			// ractBorder: function (starxy, ractWH, color, lineWidth) {
			// 	ctx.lineWidth = lineWidth;
			// 	ctx.strokeStyle = color;
			// 	ctx.strokeRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
			// },

			/*Drawing.triCurve(triangle, star, cp, color)
			  triangle:三角函数
			  star：{x：开始x坐标，y：开始的y坐标}
			  cp：{xw：控制x的宽度，yh：控制y的高度，s：位移}
			  color：线条颜色
			*/
			triCurve: function (triangle, star, cp, color) {
				ctx.strokeStyle = color;
				ctx.beginPath();
				ctx.moveTo(star.x, star.y);
				//中心判断
				var change = false;
				//中点计算
				var count = cp.yh;
				for (var i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 600; i += 0.1) {
					count += 0.5;
				}
				var center = parseInt(count / 2);
				//三角函数曲线
				for (let i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 630; i += 0.1) {
					if (change === false && cp.yh < center) { cp.yh += 0.5; }
					if (change === false && cp.yh === center) { change = true; cp.yh -= 0.5; }
					if (change === true && cp.yh < center) { cp.yh -= 0.5; }
					var x = i * cp.xw - cp.xw * cp.s + star.x;
					var y = Math[triangle](i * cp.angle) * cp.yh + star.y;
					ctx.lineTo(x, y);
				}
				ctx.stroke();
				ctx.closePath();

			},
		}

		//背景填充
		this.Drawing.ract([0, 0], [600, 360], "#333333");
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);


		window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
		window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
		try {
			this.audioContext = new AudioContext();
		} catch (e) {
			// this._updateInfo('!Your browser does not support AudioContext', false);
			console.log(e);
		}
		// 	this.analyser = this.audioContext.createAnalyser();

		// this.distortion = this.audioContext.createWaveShaper();
		// 	this.gainNode = this.audioContext.createGain();
		var that = this,
			audioInput = document.getElementById('uploadedFile');

		if (navigator.getUserMedia) {
			var audioContext = this.audioContext;

			console.log('浏览器支持getUserMedia');
			// apiMedia.className = "checked";
			navigator.mediaDevices.getUserMedia(
				// 我们只获取麦克风数据，这里还可以设置video为true来获取摄像头数据
				{
					video: false,
					audio: true
				}).then((stream) => {
					this.audioContext = new AudioContext();
					// console.log("xxxx")
					let inputPoint = this.audioContext.createGain();
					this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
					this.realAudioInput.connect(inputPoint);
					this.analyserNode = this.audioContext.createAnalyser();
					this.analyserNode.fftSize = 1024;
					inputPoint.connect(this.analyserNode);
					this._drawSpectrum()
				})
		} else {
			console.log('浏览器不支持getUserMedia');
		};
	}
	_drawSpectrum = () => {
		if (this.setTime) {
			return
		}
		this.setTime = setInterval(() => {
			var freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);
			this.analyserNode.getByteFrequencyData(freqByteData);
			this.cwave(freqByteData[4],freqByteData[5])
			window.requestAnimationFrame(this._drawSpectrum);
			clearInterval(this.setTime)
			this.setTime = null
		}, 100)
	}
	cwave(ad1 = 0,ad2 =0) {
		var adjust1;
		var adjust2;
		ad1 == 0 ? adjust1 = 240 : adjust1 = (ad1 >= 250) ? 7 : 100 - ((ad1 / 250) * 100)+7;
		ad2 == 0 ? adjust2 = 240 : adjust2 = (ad2 >= 250) ? 7 : 100 - ((ad2 / 250) * 100)+7;
		this.ctx.clearRect(0, 130, 600, 360);
		this.Drawing.ract([0, 130], [600, 360], "#333333");
		if (this.dong === 1) { this.cango = false; }
		if (!this.cango && this.dong < 3) { this.dong += 1; }
		if (this.dong === 3) { this.cango = true; }
		if (this.cango && this.dong <= 3) { this.dong -= 1; }
		this.time=(this.time+1)%(40*2*3);

		this.Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: this.f(adjust2), yh: 5 * (1 + this.dong / 10), angle: Math.PI /3, s: this.time / 10 }, "orange");
		this.Drawing.triCurve("cos", { x: 0, y: 238 }, { xw: this.f(adjust1), yh: 5 * (1 + this.dong / 10), angle: Math.PI / 2, s: this.time / 10 }, "red");
	}

	rad(deg) {
		return deg / 180 * Math.PI;
	}
	/**
	 * 对应法则
	 *
	 * @param x 原像(自变量)
	 * @return 像(因变量)
	 */
	f(x) {
		let min = -600;//最小x
		let φ = 0;
		let max = 600;
		let len = max - min;
		let A = 200;
		let a = 4 / (4 + Math.pow(this.rad(x / Math.PI * 800 / len), 4));
		let aa = Math.pow(a, 1);

		let ω = 2 * Math.PI / (this.rad(len) / 2);
		let y = aa * A * Math.sin(ω * this.rad(x) - φ);
		return y;
	}
}

window.onload = function () {
	new wave();
};