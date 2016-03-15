var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function rgba(r, g, b, a) {
    return "rgba(" + r + ", " + g + ", " + b + "," + a + ")"
}

function aline(x, y, x1, y1, x2, y2, scale) {
    line(x1 * scale + x, (10 - y1) * scale + y, x2 * scale + x , (10 - y2) * scale + y);
}

function line(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
}

function drawChar(x, y, size, fontdata, str) {
    var font;
    for (var i = 0; i < fontdata.length; i++) {
        if (fontdata[i][0] === str) {
            font = fontdata[i];
            break;
        }
    }

    if (font) {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        font[1].forEach(function (stroke) {
            console.log(stroke[0], stroke[1], stroke[2], stroke[3]);
            aline(x, y,stroke[0], stroke[1], stroke[2], stroke[3], size);
        })
        ctx.stroke();
    }
}

function drawString(x, y, size, fontdata, str){
    var ratio = size / 10;
    
    var offset = 0;
    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        drawChar( x + offset, y, ratio, fontdata, ch);
        if(str.match(/^(\w| |'|,|&)+$/)){
            offset += ratio * 5;
        }else{
            offset += ratio * 10;
        }
    }
}

var request = require("superagent");

var parser = require("./lib/lff/parser")

request.get("kst32b.lff")
    .end(function (err, data) {
        var parsed = parser(data.text.split("\n"));
        var left = 20;
        var top = 20;
        drawString(left, top, 40, parsed, "あいうえお");
        drawString(left, top + 40, 40, parsed, "ABCDE123");
    })
