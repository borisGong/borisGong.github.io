var Dial = (function () {
    var context = null;
    var deg = Math.PI / 180;
    var canvas_Width = 400;
    var canvas_Height = 400;

    (function () {
        var canvas = document.getElementById("drawDial");
        canvas.width = canvas_Width;
        canvas.height = canvas_Height;
        if (canvas.getContext) {
            context = canvas.getContext("2d");
        }
    })();

    function BeginDraw() {
        context && DrawDial();
    }
    function DrawDial() {
        ClearDial();
        DrawDialCircle();
        DrawDialScale();
        DrawDialNumber();
        DrawHours();
        DrawMinuteHand();
        DrawDecondHand();
    }
    function ClearDial() {
        context.clearRect(0, 0, canvas_Width, canvas_Height);
    }
    function DrawDialCircle() {
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.beginPath();
        context.arc(200, 200, 124, 2 * Math.PI, false);
        var rGradient = context.createRadialGradient(200, 200, 124, 200, 200, 129);
        rGradient.addColorStop(0.5, '#000');
        rGradient.addColorStop(1, '#fff');
        context.moveTo(319, 200);
        context.arc(200, 200, 119, 2 * Math.PI, false);
        context.stroke();
    }
    function DrawDialScale() {
        for (var i = 0; i < 12; i++) {
            context.beginPath();
            context.moveTo(200 + (Math.sin(i * 30 * deg) * 100), 200 - (Math.cos(i * 30 * deg) * 100));
            context.lineTo(200 + (Math.sin(i * 30 * deg) * (100 + 20)), 200 - (Math.cos(i * 30 * deg) * (100 + 20)));
            context.stroke();
        }
    }
    function DrawDialNumber() {
        for (var i = 0; i < 12; i++) {
            var txts = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            context.beginPath();
            context.font = '25px KaiTi';
            context.fillStyle = 'black'
            context.fillText(txts[i], 192 + (Math.sin(i * 30 * deg) * 90), 210 - (Math.cos(i * 30 * deg) * 88))
            context.stroke();
        }
    }
    function DrawHours() {
        var now = new Date();
        var hour_x = 200 + 50 * (Math.sin(now.getHours() * 30 * deg + now.getMinutes() * 0.5 * deg));
        var hour_y = 200 - 50 * (Math.cos(now.getHours() * 30 * deg + now.getMinutes() * 0.5 * deg));

        context.beginPath();
        context.moveTo(200, 200);
        context.lineTo(hour_x, hour_y);
        context.strokeStyle = 'black';
        context.lineCap = 'round';
        context.lineWidth = 5;
        context.stroke();
    }
    function DrawMinuteHand() {
        var now = new Date();
        var minute_x = 200 + 60 * (Math.sin(now.getMinutes() * 6 * deg + now.getSeconds() * 0.1 * deg));
        var minute_y = 200 - 60 * (Math.cos(now.getMinutes() * 6 * deg + now.getSeconds() * 0.1 * deg));

        context.beginPath();
        context.moveTo(200, 200);
        context.lineTo(minute_x, minute_y);
        context.strokeStyle = 'black';
        context.lineWidth = 4;
        context.stroke();
    }
    function DrawDecondHand() {
        var now = new Date();
        var second_x = 200 + 80 * (Math.sin(now.getSeconds() * 6 * deg + now.getMilliseconds() * 0.006 * deg));
        var second_y = 200 - 80 * (Math.cos(now.getSeconds() * 6 * deg + now.getMilliseconds() * 0.006 * deg));

        context.beginPath();
        context.moveTo(200, 200);
        context.lineTo(second_x, second_y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();

    }
    return {
        BeginDraw: BeginDraw
    }
})();
var BackGround = (function () {
    var context = null;
    var window_width = window.innerWidth;
    var window_height = window.innerHeight;
    var circlesEffect = null;

    (function () {
        var canvas = document.getElementById("backGround");
        canvas.width = window_width;
        canvas.height = window_height;
        if (canvas.getContext) {
            context = canvas.getContext("2d");
            circlesEffect = new CirclesEffect();
        }
    })();

    function CirclesEffect() {
        var _this = this;
        _this.circles = [];



        _this.batchCreateCircles = function () {
            for (var i = 0; i < window_width * 0.5; i++) {
                var circle = new Circle();
                _this.circles.push(circle);
            }
        }

        _this.circlesAnimate = function () {
            context.clearRect(0, 0, window_width, window_height);
            for (var i in _this.circles) {
                _this.circles[i].draw();
            }
        }

        function Circle() {
            var _this = this;

            (function () {
                _this.pos = {};
                init();
            })();

            function init() {
                _this.pos.x = Math.random() * window_width;
                _this.pos.y = window_height + Math.random() * 100;
                _this.alpha = 0.1 + Math.random() * 0.3;
                _this.scale = 0.1 + Math.random() * 0.3;
                _this.velocity = Math.random();
            }

            this.draw = function () {
                if (_this.alpha <= 0) {
                    init();
                }
                _this.pos.y -= _this.velocity + 0.5;
                _this.alpha -= 0.0005;
                context.beginPath();
                context.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
                context.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
                context.fill();
            };
        }

        (function () {
            _this.batchCreateCircles();
        })();
    }

    function BeginDraw() {
        context && circlesEffect.circlesAnimate();
    }

    return {
        BeginDraw: BeginDraw
    }
})()
var FontUp = (function () {
    var context = null;
    var canvas_Width = 300;
    var canvas_Height = 100;
    (function () {
        var canvas = document.getElementById("fontUp");
        canvas.width = canvas_Width;
        canvas.height = canvas_Height;
        if (canvas.getContext) {
            context = canvas.getContext("2d");
        }
    })();

    function BeginDraw() {
        context && DrawFont();
    }

    function DrawFont() {
        context.font = "25px Cursive";
        // context.fillStyle = "black"; 
        context.fillText("As time passed", 0, 60);
    }

    return {
        BeginDraw: BeginDraw
    }
})()
var FontDown = (function () {
    var context = null;
    var canvas_Width = 600;
    var canvas_Height = 100;
    (function () {
        var canvas = document.getElementById("fontDown");
        canvas.width = canvas_Width;
        canvas.height = canvas_Height;
        if (canvas.getContext) {
            context = canvas.getContext("2d");
        }
    })();

    function BeginDraw() {
        context && DrawFont();
    }

    function DrawFont() {
        context.font = "25px Cursive";
        context.fillStyle = "black"; 
        context.fillText("everything continued to change in some manner.", 0, 40);
    }

    return {
        BeginDraw: BeginDraw
    }
})()
window.onload = function () {
    setInterval(function () {
        Dial.BeginDraw();
        BackGround.BeginDraw();
    }, 50)
    FontUp.BeginDraw();
    FontDown.BeginDraw();
}