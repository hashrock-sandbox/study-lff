var fs = require("fs");

var inputFile = "azomix";

var data = fs.readFileSync(inputFile + ".lff", "utf-8");
var p = require("./lib/parser");

var data = p(data.split("\n"));

//fs.writeFileSync("kst32b.json",JSON.stringify(data), "utf-8");
console.log(data.length + "char done.");

var buf = new Buffer(1000 * 1000 * 100);
var offset = 0;

var codemax = 0;
var lengthmax = 0;

function norm(str){
    var f = parseFloat(str);
    return Math.round(256 * f / 10);
}

function lim(val, limit){
    if(val > limit){
        return limit;
    }
    return val;
}

for(var i = 0; i < data.length; i++){
    var font = data[i];
    //文字の書き込み
    var cp = font[0].codePointAt(0)
    buf.writeUInt16LE(cp, offset);
    console.log("@"+ font[0]);
    console.log("@@"+ cp);
    if(codemax < cp){
        codemax = cp;
    }
    offset += 2;

    //ストロークの数
    var strokeNum = font[1].length;
    buf.writeUInt16LE(strokeNum, offset);
    console.log(":"+ strokeNum);
    if(lengthmax < strokeNum){
        lengthmax = strokeNum;
    }
    offset += 2;
    
    //ストローク（4つ一組）
    for(var x = 0; x < strokeNum; x++){
        var f = [
            norm(font[1][x][0]),
            norm(font[1][x][1]),
            norm(font[1][x][2]),
            norm(font[1][x][3])
        ];
        if(f.length > 4){
            buf.writeUInt8(lim(f[0], 255), offset);
            buf.writeUInt8(lim(f[1], 255), offset + 1);
            buf.writeUInt8(lim(f[2], 255), offset + 2);
            buf.writeUInt8(lim(f[3], 255), offset + 3);
        }
        offset += f.length;
    }
}

var outbuf = new Buffer(offset);
buf.copy(outbuf, 0, 0, offset);

console.log("CODE_POINT_MAX: " + codemax);
console.log("LENGTH_MAX: " + lengthmax);

console.log(offset / 1000 + "KB");

fs.writeFileSync(inputFile + ".bin", outbuf);

