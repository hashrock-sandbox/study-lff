var fs = require("fs");

var data = fs.readFileSync("kst32b.lff", "utf-8");
var p = require("./lib/parser");

var data = p(data.split("\n"));

fs.writeFileSync( "kst32b.json",JSON.stringify(data), "utf-8");
console.log(data.length + "char done.");

var buf = new Buffer(1000 * 1000);
var offset = 0;

var codemax = 0;

for(var i = 0; i < data.length; i++){
    var font = data[i];
    //文字の書き込み
    buf.write(font[0], offset, 4);
    console.log("@"+ font[0]);
    console.log("@@"+ font[0].codePointAt(0));
    console.log("@@@"+String.fromCodePoint(font[0].codePointAt(0)));
    var cp = font[0].codePointAt(0);
    if(codemax < cp){
        codemax = cp;
    }
    offset += 4;

    //ストロークの数
    buf.writeUInt16LE(font[1].length, offset);
    console.log(":"+ font[1].length);
    offset += 2;
    
    //ストローク（4つ一組）
    for(var x = 0; x < 4; x++){
        var f = parseFloat(font[1][x]);
        var fi = Math.round(256 * f / 10);
        buf.writeUInt8(fi, offset);
        offset += 1;
        console.log(","+ fi);
    }
}

var outbuf = new Buffer(offset);
buf.copy(outbuf, 0, 0, offset);

console.log("MAX: " + codemax);

console.log(offset / 1000 + "KB");

fs.writeFileSync("kst32b.bin", outbuf);

