var fs = require("fs");

var data = fs.readFileSync("kst32b.lff", "utf-8");
var p = require("./lib/parser");

var data = p(data.split("\n"));

fs.writeFileSync( "kst32b.json",JSON.stringify(data), "utf-8");
console.log(data.length + "char done.");

