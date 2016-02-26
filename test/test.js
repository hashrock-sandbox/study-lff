var Parsimmon = require("parsimmon");
var regex = Parsimmon.regex;
var string = Parsimmon.string;
var optWhitespace = Parsimmon.optWhitespace;
var lazy = Parsimmon.lazy;


function lexeme(p) { return p.skip(optWhitespace); }

var lparen = lexeme(string('('));
var rparen = lexeme(string(')'));

var expr = lazy('an s-expression', function () { return form.or(atom) });

var number = lexeme(regex(/[0-9]+/).map(parseInt));
var id = lexeme(regex(/[a-z_]\w*/i));

var atom = number.or(id);
var form = lparen.then(expr.many()).skip(rparen);


var assert = require('assert');


var sample = [
    "# JIS    : 23",
    "# UTF-16 : 23",
    "# UTF-8  : 23",
    "[0023] #",
    "0.00,3.44;4.38,3.44",
    "4.38,6.56;0.00,6.56",
    "1.56,8.44;0.31,1.25",
    "2.81,1.25;4.06,8.44",
    "",
    "# JIS    : 74 22",
    "# UTF-16 : 69 c7",
    "# UTF-8  : e6 a7 87",
    "[69c7] 槇",
    "7.50,9.06;5.00,8.75",
    "5.00,8.75;3.75,8.75",
    "3.75,9.38;3.75,7.81",
    "3.75,7.81;4.06,7.50",
    "4.06,7.50;8.12,7.50",
    "8.12,7.50;8.75,8.12",
    "8.75,2.19;3.44,2.19",
    "3.44,2.19;3.44,5.94",
    "4.69,6.56;7.81,6.56",
    "7.81,6.56;7.81,3.12",
    "7.81,3.12;4.69,3.12",
    "4.69,3.12;4.69,6.56",
    "4.69,5.31;7.81,5.31",
    "7.81,4.38;4.69,4.38",
    "2.50,0.62;3.75,1.25",
    "3.75,1.25;4.69,1.88",
    "6.56,1.88;7.81,1.25",
    "7.81,1.25;8.75,0.62",
    "1.88,5.31;2.81,4.06",
    "2.81,7.19;0.00,7.19",
    "0.00,3.12;1.56,6.56",
    "1.56,9.38;1.56,0.62",
    ""
]

var p = require("../lib/parser");
var lff = require("../lib/line");

describe("LineParser", function(){
    it("Parse Char", function(done){
        assert.equal(lff.charNo("# UTF-16 : 23"), null);
        assert.equal(lff.charNo("[69c7] 槇"), "槇");
        done();
    })
});


describe('Parser', function () {
    it('Parse Lines', function () {
        var letterA = p(sample)[0];
        console.dir(letterA);
        assert.equal(letterA[0][0], "#");
        assert.equal(letterA[1][0][0], "0.00");

        var letterB = p(sample)[1];
        console.dir(letterB);
        assert.equal(letterB[0][0], "槇");
        assert.equal(letterB[1][0][0], "7.50");
        
        
    });
});