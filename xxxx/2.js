/**
 * @Description: 
 * @author: bubao
 * @Date: 2021-12-22 16:09:05
 * @LastEditors: bubao
 * @LastEditTime: 2021-12-22 17:20:31
 */
/**
 * 作者：张风捷特烈<br/>
 * 时间：2018/11/16 0016:9:04<br/>
 * 邮箱：1981462002@qq.com<br/>
 * 说明：旋律视图
 */
// class RhythmView2 {
// 	mCoo = new Point(800, 500);//原点坐标
// 	mMaxHeight = 200;//最到点
// 	min = -600;//最小x
// 	max = 600;//最大x
// 	φ = 0;//初相
// 	A = mMaxHeight;//振幅
// 	ω;//角频率
// 	mPaint;//主画笔
// 	mPath;//主路径
// 	mReflexPath;//镜像路径

// 	RhythmView2(context) {
// 		this(context, null);
// 	}

// 	RhythmView2(context, attrs) {
// 		// super(context, attrs);
// 		init();//初始化
// 	}

// 	init() {
// 		//初始化主画笔
// 		mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
// 		mPaint.setColor(Color.BLUE);
// 		mPaint.setStyle(Paint.Style.STROKE);
// 		mPaint.setStrokeWidth(6);
// 		//初始化主路径
// 		mPath = new Path();
// 		mReflexPath = new Path();
// 	}

// 	onDraw(canvas) {
// 		mPath.reset();
// 		mReflexPath.reset();
// 		super.onDraw(canvas);
// 		canvas.save();
// 		canvas.translate(mCoo.x, mCoo.y);
// 		formPath();
// 		canvas.drawPath(mPath, mPaint);
// 		canvas.restore();
// 	}

// 	/**
// 	 * 对应法则
// 	 *
// 	 * @param x 原像(自变量)
// 	 * @return 像(因变量)
// 	 */
// 	f(x) {
// 		// let len = max - min;
// 		// ω = 2 * Math.PI / (rad(len) / 2);
// 		// let y =  A * Math.sin(ω * rad(x) - φ);
// 		// return y;
// 		let len = max - min;
// 		let a = 4 / (4 + Math.pow(rad(x / Math.PI * 800 / len), 4));
// 		let aa = Math.pow(a, 2.5);
// 		ω = 2 * Math.PI / (rad(len) / 2);
// 		let y = aa * A * Math.sin(ω * rad(x) - φ);
// 		return y;
// 	}

// 	formPath() {
// 		mPath.moveTo(min, f(min));
// 		for (let x = min; x <= max; x++) {
// 			let y = f(x);
// 			mPath.lineTo(x, y);
// 		}
// 	}

// 	onTouchEvent(event) {
// 		switch (event.getAction()) {
// 			case MotionEvent.ACTION_DOWN:
// 				mAnimator.start();
// 				break;
// 		}
// 		return true;
// 	}

// 	rad(deg) {
// 		return deg / 180 * Math.PI;
// 	}
// }

class Visualizer {
	constructor(){
		// this._addEventListner()
		this.file = null, //the current file
    this.fileName = null, //the current file name
    this.audioContext = null,
    this.source = null, //the audio source
    this.info = document.getElementById('info').innerHTML, //this used to upgrade the UI information
    this.infoUpdateId = null, //to sotore the setTimeout ID and clear the interval
    this.animationId = null,
    this.status = 0, //flag for sound is playing 1 or stopped 0
    this.forceStop = false,
	this.ctx = null;
	this.ctx1 = null;
    this.allCapsReachBottom = false
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
    let max = 600;
		let len = max - min;
		let A =200;
		let a = 4 / (4 + Math.pow(this.rad(x / Math.PI * 800 / len), 4));
		let aa = Math.pow(a, 2.5);
		let ω = 2 * Math.PI / (this.rad(len) / 2);
		let y = aa * A * Math.sin(ω * this.rad(x) - φ);
		return y;
	}
	init() {
        this._prepareAPI();
        this._addEventListner();
    }
    _prepareAPI() {
        //fix browser vender for AudioContext and requestAnimationFrame
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            this._updateInfo('!Your browser does not support AudioContext', false);
            console.log(e);
        }
    }
    _addEventListner() {
        var that = this,
            audioInput = document.getElementById('uploadedFile'),
            dropContainer = document.getElementsByTagName("canvas")[0];
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
                document.getElementById('fileWrapper').style.opacity = 1;
                that._updateInfo('Uploading', true);
                //once the file is ready,start the visualizer
                that._start();
            };
        };
        //listen the drag & drop
        dropContainer.addEventListener("dragenter", function() {
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Drop it on the page', true);
        }, false);
        dropContainer.addEventListener("dragover", function(e) {
            e.stopPropagation();
            e.preventDefault();
            //set the drop mode
            e.dataTransfer.dropEffect = 'copy';
        }, false);
        dropContainer.addEventListener("dragleave", function() {
            document.getElementById('fileWrapper').style.opacity = 0.2;
            that._updateInfo(that.info, false);
        }, false);
        dropContainer.addEventListener("drop", function(e) {
            e.stopPropagation();
            e.preventDefault();
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Uploading', true);
            //get the dropped file
            that.file = e.dataTransfer.files[0];
            if (that.status === 1) {
                document.getElementById('fileWrapper').style.opacity = 1;
                that.forceStop = true;
            };
            that.fileName = that.file.name;
            //once the file is ready,start the visualizer
            that._start();
        }, false);
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
            that._updateInfo('Decoding the audio', true);
            audioContext.decodeAudioData(fileResult, function(buffer) {
                that._updateInfo('Decode succussfully,start the visualizer', true);
                that._visualize(audioContext, buffer);
            }, function(e) {
                that._updateInfo('!Fail to decode the file', false);
                console.log(e);
            });
        };
        fr.onerror = function(e) {
            that._updateInfo('!Fail to read the file', false);
            console.log(e);
        };
        //assign the file to the reader
        this._updateInfo('Starting read the file', true);
        fr.readAsArrayBuffer(file);
    }
    _visualize(audioContext, buffer) {
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
            this.source.stop(0);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };
        this._updateInfo('Playing ' + this.fileName, false);
        this.info = 'Playing ' + this.fileName;
        document.getElementById('fileWrapper').style.opacity = 0.2;
        this._drawSpectrum(analyser);
    }
    _drawSpectrum(analyser) {
        var that = this,
            monoL = document.getElementById('mono-L'),
            monoR = document.getElementById('mono-R'),
            cwidth = monoL.width,
            cheight = monoL.height - 2,
            meterWidth = 2, //width of the meters in the spectrum
            gap = 0.1, //gap between meters
            capHeight = 2,
            capStyle = '#fff',
            meterNum = 40 * (2 + 2), //count of the meters
            capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        this.ctx = monoL.getContext('2d'),
        this.ctx1 = monoR.getContext('2d'),
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, 300);
        this.gradient2 = this.ctx1.createLinearGradient(0, 0, 0, 300);
        this.gradient.addColorStop(1, '#9331CB');
        this.gradient.addColorStop(0.5, '#0CD7FD');
        this.gradient.addColorStop(0, '#f00');

        
        this.gradient2.addColorStop(1, '#9331CB');
        this.gradient2.addColorStop(0.5, '#0CD7FD');
        this.gradient2.addColorStop(0, '#f00');
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if (that.status === 0) {
                //fix when some sounds end the value still not back to zero
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                };
                allCapsReachBottom = true;
                for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                };
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId); //since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                    return;
                };
            };
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
			// console.log(that.ctx)
            that.ctx.clearRect(0, 0, cwidth, cheight);
            that.ctx1.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                };
                that.ctx.fillStyle = capStyle;
                that.ctx1.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    that.ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
					that.ctx1.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    that.ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    that.ctx1.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                };
                that.ctx.fillStyle =that.gradient; //set the filllStyle to this.gradient for a better look
                that.ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
                that.ctx1.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        that.animationId = requestAnimationFrame(drawMeter);
    }
    _audioEnd(instance) {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;
        var text = 'HTML5 Audio Spectrum Visualizer - Alexandre Juca';
        document.getElementById('fileWrapper').style.opacity = 1;
        document.getElementById('info').innerHTML = text;
        instance.info = text;
        document.getElementById('uploadedFile').value = '';
    }
    _updateInfo(text, processing) {
        var infoBar = document.getElementById('info'),
            dots = '...',
            i = 0,
            that = this;
        infoBar.innerHTML = text + dots.substring(0, i++);
        if (this.infoUpdateId !== null) {
            clearTimeout(this.infoUpdateId);
        };
        if (processing) {
            //animate dots at the end of the info text
            var animateDot = function() {
                if (i > 3) {
                    i = 0
                };
                infoBar.innerHTML = text + dots.substring(0, i++);
                that.infoUpdateId = setTimeout(animateDot, 250);
            }
            this.infoUpdateId = setTimeout(animateDot, 250);
        };
    }
}

window.onload = function() {
    new Visualizer().init();
};