/**
 * @Description: 
 * @author: bubao
 * @Date: 2021-12-22 16:38:07
 * @LastEditors: bubao
 * @LastEditTime: 2021-12-22 17:24:16
 */
// var curve = function () {
//     // var c = document.getElementById("study");
//     // var ctx = c.getContext("2d");
//     // //画图函数
//     // var Drawing = {
//     //     line: function (starxy, endxy, lineWidth, color) {
//     //         ctx.strokeStyle = color;
//     //         ctx.lineWidth = lineWidth;
//     //         ctx.beginPath();
//     //         ctx.moveTo(starxy[0], starxy[1]);
//     //         ctx.lineTo(endxy[0], endxy[1]);
//     //         ctx.stroke();
//     //     },
//     //     ract: function (starxy, ractWH, color) {
//     //         ctx.fillStyle = color;
//     //         ctx.fillRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
//     //     },
//     //     ractBorder: function (starxy, ractWH, color, lineWidth) {
//     //         ctx.lineWidth = lineWidth;
//     //         ctx.strokeStyle = color;
//     //         ctx.strokeRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
//     //     },

//     //     /*Drawing.triCurve(triangle, star, cp, color)
//     //       triangle:三角函数
//     //       star：{x：开始x坐标，y：开始的y坐标}
//     //       cp：{xw：控制x的宽度，yh：控制y的高度，s：位移}
//     //       color：线条颜色
//     //     */
//     //     triCurve: function (triangle, star, cp, color) {
//     //         ctx.strokeStyle = color;
//     //         ctx.beginPath();
//     //         ctx.moveTo(star.x, star.y);
//     //         //中心判断
//     //         var change = false;
//     //         //中点计算
//     //         var count = cp.yh;
//     //         for (var i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 600 ; i += 0.1) {
//     //             count += 0.5;
//     //         }
//     //         var center = parseInt(count / 2);
//     //         //三角函数曲线
//     //         for (var i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 600; i += 0.1) {
//     //             if (change === false && cp.yh < center) { cp.yh += 0.5; }
//     //             if (change === false && cp.yh === center) { change = true; cp.yh -= 0.5; }
//     //             if (change === true && cp.yh < center) { cp.yh -= 0.5; }
//     //             var x = i * cp.xw - cp.xw * cp.s + star.x;
//     //             var y = Math[triangle](i * cp.angle) * cp.yh + star.y;
//     //             ctx.lineTo(x, y);
//     //         }
//     //         ctx.stroke();
//     //         ctx.closePath();

//     //     },
//     // }

//     // //背景填充
//     // Drawing.ract([0, 0], [600, 360], "#333333");

//     //鼠标滚动控制播放条
//     var waveGo;
//     // var distance = 0;
//     // var scrollFunc = function (e) {
//     //     e = e || window.event;
//     //     var mouseMove;
//     //     e.wheelDelta ? mouseMove = e.wheelDelta : mouseMove = e.detail;
//     //     if (mouseMove > 0) {
//     //         distance += 5;
//     //         if (distance >= 100) distance = 100;
//     //     }//up
//     //     if (mouseMove < 0) {
//     //         distance -= 5;
//     //         if (distance <= 0) distance = 0;
//     //     }//down
//     //     play(distance);
//     //     clearInterval(waveGo);
//     //     waveGo = setInterval(function () {
//     //         wave(distance);
//     //     }, 100)
//     // }
//     // if (document.addEventListener) {//firefox
//     //     document.addEventListener('DOMMouseScroll', scrollFunc, false);
//     // }
//     // window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome


//     //三角函数曲线动画
//     var dong = 1, time = 1000 / 60, cango;
//     var wave = function (ad) {
//         var adjust;
//         ad == undefined ? adjust = 28 : adjust = ad + 15 >= 100 ? 100 : ad + 15;
//         console.log(adjust);
//         ctx.clearRect(0, 130, 600, 360);
//         Drawing.ract([0, 130], [600, 360], "#333333");
//         if (dong === 1) { cango = false; }
//         if (!cango && dong < 3) { dong += 1; }
//         if (dong === 3) { cango = true; }
//         if (cango && dong <= 3) { dong -= 1; }
//         time++;
//         Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: adjust, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#ffffff");
//     }
//     // waveGo = setInterval(wave, 100)
// }
class wave {
	constructor(){
		this.c = document.getElementById("study");
		this.ctx = this.c.getContext("2d");
		const ctx = this.ctx
		this.dong = 1
		this.time = 1000 / 60
		this.cango;
		//画图函数
		this.Drawing = {
			line: function (starxy, endxy, lineWidth, color) {
				ctx.strokeStyle = color;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.moveTo(starxy[0], starxy[1]);
				ctx.lineTo(endxy[0], endxy[1]);
				ctx.stroke();
			},
			ract: function (starxy, ractWH, color) {
				ctx.fillStyle = color;
				ctx.fillRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
			},
			ractBorder: function (starxy, ractWH, color, lineWidth) {
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.strokeRect(starxy[0], starxy[1], ractWH[0], ractWH[1]);
			},
	
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
				for (var i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 600 ; i += 0.1) {
					count += 0.5;
				}
				var center = parseInt(count / 2);
				//三角函数曲线
				for (var i = cp.s; i * cp.xw - cp.xw * cp.s + star.x < 600; i += 0.1) {
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
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            // this._updateInfo('!Your browser does not support AudioContext', false);
            console.log(e);
        }

		var that = this,
            audioInput = document.getElementById('uploadedFile');
            // dropContainer = document.getElementsByTagName("canvas")[0];
        //listen the file upload
        audioInput.onchange = function() {
            //the if statement fixes the file selction cance,l because the onchange will trigger even the file selection been canceled
            if (audioInput.files.length !== 0) {
                //only process the first file
                that.file = audioInput.files[0];
                that.fileName = that.file.name;
                if (that.status === 1) {
                    //the sound is still playing but we upload another file, so set the forceStop flag to true
                    that.forceStop = true;
                };
                // document.getElementById('fileWrapper').style.opacity = 1;
                // that._updateInfo('Uploading', true);
                //once the file is ready,start the visualizer
                that._start();
            };
        }
		
        //listen the drag & drop
        // dropContainer.addEventListener("dragenter", function() {
        //     document.getElementById('fileWrapper').style.opacity = 1;
        //     that._updateInfo('Drop it on the page', true);
        // }, false);
        // dropContainer.addEventListener("dragover", function(e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     //set the drop mode
        //     e.dataTransfer.dropEffect = 'copy';
        // }, false);
        // dropContainer.addEventListener("dragleave", function() {
        //     document.getElementById('fileWrapper').style.opacity = 0.2;
        //     that._updateInfo(that.info, false);
        // }, false);
        // dropContainer.addEventListener("drop", function(e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     document.getElementById('fileWrapper').style.opacity = 1;
        //     that._updateInfo('Uploading', true);
        //     //get the dropped file
        //     that.file = e.dataTransfer.files[0];
        //     if (that.status === 1) {
        //         document.getElementById('fileWrapper').style.opacity = 1;
        //         that.forceStop = true;
        //     };
        //     that.fileName = that.file.name;
        //     //once the file is ready,start the visualizer
        //     that._start();
        // }, false);
	}
	_start() {
		//read and decode the file into audio array buffer 
		var that = this,
			file = this.file,
			fr = new FileReader();
		fr.onload = function(e) {
			var fileResult = e.target.result;
			var audioContext = that.audioContext;
			if (audioContext === null) {
				return;
			};
			// that._updateInfo('Decoding the audio', true);
			audioContext.decodeAudioData(fileResult, function(buffer) {
				// that._updateInfo('Decode succussfully,start the visualizer', true);
				that._visualize(audioContext, buffer);
			}, function(e) {
				// that._updateInfo('!Fail to decode the file', false);
				console.log(e);
			});
		};
		fr.onerror = function(e) {
			// that._updateInfo('!Fail to read the file', false);
			console.log(e);
		};
		//assign the file to the reader
		// this._updateInfo('Starting read the file', true);
		fr.readAsArrayBuffer(file);
	}

	_visualize(audioContext, buffer) {
		console.log(buffer)
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser(),
            that = this;
        //connect the source to the analyser
        audioBufferSouceNode.connect(analyser);
        //connect the analyser to the destination(the speaker), or we won't hear the sound
        analyser.connect(audioContext.destination);
        //then assign the buffer to the buffer source node
        audioBufferSouceNode.buffer = buffer;
        //play the source
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn //in old browsers use noteOn method
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //in old browsers use noteOn method
        };
        //stop the previous sound if any
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            // this.source.stop(0);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            // that._audioEnd(that);
			console.log("xxxx")
        };
        // this._updateInfo('Playing ' + this.fileName, false);
        this.info = 'Playing ' + this.fileName;
        // document.getElementById('fileWrapper').style.opacity = 0.2;
        this._drawSpectrum(analyser);
    }

	_drawSpectrum(analyser) {
		const monoL = this.c
		setInterval(()=>{
			var array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(array);
			console.log('array',array.length)
			// this.cwave(array[0])
			for (var i = 0; i < array.length; i+=20) {
				this.cwave(array[i])
			}
		}, 100)
        var that = this,
            // monoL = document.getElementById('study'),
            // monoR = document.getElementById('mono-R'),
            cwidth = monoL.width,
            cheight = monoL.height - 2,
            meterWidth = 2, //width of the meters in the spectrum
            gap = 0.1, //gap between meters
            capHeight = 2,
            capStyle = '#fff',
            meterNum = 40 * (2 + 2), //count of the meters
            capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        // this.ctx1 = monoL.getContext('2d'),
        // this.ctx1 = monoR.getContext('2d'),
        // this.gradient = this.ctx.createLinearGradient(0, 0, 0, 300);
        // this.gradient2 = this.ctx1.createLinearGradient(0, 0, 0, 300);
        // this.gradient.addColorStop(1, '#9331CB');
        // this.gradient.addColorStop(0.5, '#0CD7FD');
        // // this.gradient.addColorStop(0, '#f00');

        
        // this.gradient2.addColorStop(1, '#9331CB');
        // this.gradient2.addColorStop(0.5, '#0CD7FD');
        // this.gradient2.addColorStop(0, '#f00');
        // var drawMeter = function() {
        //     var array = new Uint8Array(analyser.frequencyBinCount);
        //     analyser.getByteFrequencyData(array);
        //     if (that.status === 0) {
        //         //fix when some sounds end the value still not back to zero
        //         for (var i = array.length - 1; i >= 0; i--) {
        //             array[i] = 0;
        //         };
        //         allCapsReachBottom = true;
        //         for (var i = capYPositionArray.length - 1; i >= 0; i--) {
        //             allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
        //         };
        //         if (allCapsReachBottom) {
        //             cancelAnimationFrame(that.animationId); //since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
        //             return;
        //         };
        //     };
        //     var step = Math.round(array.length / meterNum); //sample limited data from the total array
		// 	// console.log(that.ctx)
        //     that.ctx.clearRect(0, 0, cwidth, cheight);
        //     that.ctx1.clearRect(0, 0, cwidth, cheight);
        //     for (var i = 0; i < meterNum; i++) {
        //         var value = array[i * step];
        //         if (capYPositionArray.length < Math.round(meterNum)) {
        //             capYPositionArray.push(value);
        //         };
        //         that.ctx.fillStyle = capStyle;
        //         that.ctx1.fillStyle = capStyle;
        //         //draw the cap, with transition effect
        //         if (value < capYPositionArray[i]) {
        //             that.ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
		// 			that.ctx1.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        //         } else {
        //             that.ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
        //             that.ctx1.fillRect(i * 12, cheight - value, meterWidth, capHeight);
        //             capYPositionArray[i] = value;
        //         };
        //         that.ctx.fillStyle =that.gradient; //set the filllStyle to this.gradient for a better look
        //         that.ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
        //         that.ctx1.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
        //     }
        //     that.animationId = requestAnimationFrame(drawMeter);
        // }
        // that.animationId = requestAnimationFrame(drawMeter);
    }
	cwave(ad) {
		var adjust;
		ad == undefined ? adjust = 28 : adjust = ad + 15 >= 100 ? 100 : ad + 15;
		console.log(adjust);
		this.ctx.clearRect(0, 130, 600, 360);
		this.Drawing.ract([0, 130], [600, 360], "#333333");
		if (this.dong === 1) { this.cango = false; }
		if (!this.cango && this.dong < 3) { this.dong += 1; }
		if (this.dong === 3) { this.cango = true; }
		if (this.cango && this.dong <= 3) { this.dong -= 1; }
		this.time++;
		
		this.Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: this.f(adjust), yh: 5 * (1 + this.dong / 10), angle: Math.PI / 2, s: this.time / 10 }, "#ffffff");
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
		// let len = max - min;
		// ω = 2 * Math.PI / (rad(len) / 2);
		// let y =  A * Math.sin(ω * rad(x) - φ);
		// return y;
		let min = -600;//最小x
		let φ = 0;
    let max = 600;
		let len = max - min;
		let A =200;
		let a = 4 / (4 + Math.pow(this.rad(x / Math.PI * 800 / len), 4));
		let aa = Math.pow(a, 2.5);
		let ω = 2 * Math.PI / (this.rad(len) / 2);
		let y = aa * A * Math.sin(ω * this.rad(x) - φ);
		return y;
	}
}

window.onload = function() {
    new wave();
};