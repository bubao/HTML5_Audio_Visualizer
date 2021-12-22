/**
 * @Description: 
 * @author: bubao
 * @Date: 2021-12-22 21:41:29
 * @LastEditors: bubao
 * @LastEditTime: 2021-12-22 21:46:00
 */
var audioContext = new AudioContext();
var inputPoint = null, zeroGain = null, analyserNode;
var str = ""
function updateWave() {
	var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
	analyserNode.getByteFrequencyData(freqByteData);
	var multiplier = analyserNode.frequencyBinCount
	str = ""
	for (let i = 0; i < 500; i++) {
		str += '<span>' + freqByteData[i] + '</span>'
	}
	document.getElementById('arrlist').innerHTML = str
	window.requestAnimationFrame(updateWave);
}

var handleSuccess = function (stream) {
	var audioContext = new AudioContext();
	inputPoint = audioContext.createGain();
	var realAudioInput = audioContext.createMediaStreamSource(stream);
	realAudioInput.connect(inputPoint);
	analyserNode = audioContext.createAnalyser();
	analyserNode.fftSize = 2048;
	inputPoint.connect(analyserNode);
	updateWave()
};
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
	.then(handleSuccess)