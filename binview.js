var fs = require("fs");

var buf = fs.readFileSync("kst32b.bin");

for(var i = 0; i < 100; i++){
    var u = buf.readUInt8(i);
    console.log(u);
}

