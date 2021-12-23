/**
 * @Description: 
 * @author: bubao
 * @Date: 2021-12-23 10:41:30
 * @LastEditors: bubao
 * @LastEditTime: 2021-12-23 13:54:50
 */
 var curve = function () {
    var c = document.getElementById("study");
    var ctx = c.getContext("2d");

    //线条主色
    var mianColor = "#e2dedb"

    //画图函数
    var Drawing = {
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
    Drawing.ract([0, 0], [600, 360], "#333333");

    //播放条
    var play = function (btn) {
        ctx.clearRect(0, 0, 600, 130);
        Drawing.ract([0, 0], [600, 130], "#333333");
        var playLineStar = [93, 105];
        var playLineWH = [494, 105];
        var playBtnWH = [11, 21];
        Drawing.line(playLineStar, playLineWH, 4, mianColor);
        var playBtnStarX;
        var playBtnStarY = playLineWH[1] - playBtnWH[1] / 2;
        btn == undefined ? playBtnStarX = (playLineWH[0] + playLineStar[0]) / 2 - playBtnWH[0] / 2 : playBtnStarX = 4 * btn + playLineStar[0];
        Drawing.ractBorder([playBtnStarX, playBtnStarY], playBtnWH, "#9d9996", 1);
        Drawing.ract([playBtnStarX += 1, playBtnStarY += 1], [playBtnWH[0] - 2, playBtnWH[1] - 2], mianColor);
    }
    play();

    //鼠标滚动控制播放条
    var waveGo;
    var distance = 0;
    var scrollFunc = function (e) {
        e = e || window.event;
        var mouseMove;
        e.wheelDelta ? mouseMove = e.wheelDelta : mouseMove = e.detail;
        if (mouseMove > 0) {
            distance += 1;
            if (distance >= 100) distance = 100;
        }//up
        if (mouseMove < 0) {
            distance -= 1;
            if (distance <= 0) distance = 0;
        }//down
        play(distance);
        clearInterval(waveGo);
        waveGo = setInterval(function () {
            wave(distance);
        }, 100)
    }
    if (document.addEventListener) {//firefox
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome


    //三角函数曲线动画
    var dong = 1, time = 1000 / 60, cango;
    var wave = function (ad) {
        var adjust;
        // ad == undefined ? adjust = 28 : adjust = ad + 14 >= 100 ? 100 : ad + 14;
		ad == undefined ? adjust = 28 :ad>=100?adjust=14:adjust = 0.01*(100-ad)**2
        console.log(ad,adjust);
		adjust = adjust<14?14:adjust
        ctx.clearRect(0, 130, 600, 360);
        Drawing.ract([0, 130], [600, 360], "#333333");
        if (dong === 1) { cango = false; }
        if (!cango && dong < 3) { dong += 1; }
        if (dong === 3) { cango = true; }
        if (cango && dong <= 3) { dong -= 1; }
        time++;
        // Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: adjust, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#9a9a9a");
        // Drawing.triCurve("cos", { x: 0, y: 238 }, { xw: adjust + 12, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#424242");
        // Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: adjust + 22, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#5e5e5e");
        // Drawing.triCurve("cos", { x: 0, y: 238 }, { xw: adjust + 22, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#a2a2a2");
        Drawing.triCurve("sin", { x: 0, y: 238 }, { xw: adjust, yh: 5 * (1 + dong / 10), angle: Math.PI / 2, s: time / 10 }, "#5e5e5e");
    }
    waveGo = setInterval(wave, 100)
}