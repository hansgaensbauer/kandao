var canvas = document.getElementById('myCanvas');
var clear = document.getElementById('clear');
var image = document.getElementById('image');
var submit = document.getElementById('submit');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 10;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'black';

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

clear.addEventListener('mouseup', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

submit.addEventListener('mouseup', function() {
   httpGet("check", "image=" + canvas.toDataURL("image/png"), drawingCallback);
   ctx.closepath();
});

function drawingCallback(data) {
  console.log(data)
}

function httpGet(theUrl, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl + "?" + data, true); // true for asynchronous
    xmlHttp.send(null);
}

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
}
