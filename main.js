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
    var offset = 0;
    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        drawChar( x + offset, y, size, fontdata, ch);
        if(str.match(/^(\w| |'|,|&)+$/)){
            offset += size * 5;
        }else{
            offset += size * 10;
        }
    }
}

var request = require("superagent");

request.get("./kst32b.json")
    .end(function (err, data) {
        drawString(0, 0, 2, data.body, "あいうえお");
        drawString(0, 20, 2, data.body, "ABCDE123");
        drawString(0, 40, 2, data.body, "あいうえお");
    })
