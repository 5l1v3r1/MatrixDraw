var BigInt = require('dynum').BigInt;
var BigReal = require('dynum').BigReal;

function testAddSub() {
    // test positive plus positive
    var number1 = BigInt.fromString('123');
    var number2 = BigInt.fromString('321');
    console.log(number1 + ' + ' + number2 + ' = ' + number1.add(number2));
    // test positive plus negative
    number2 = BigInt.fromString('-321');
    console.log(number1 + ' + ' + number2 + ' = ' + number1.add(number2));
    // test negative plus positive
    console.log(number2 + ' + ' + number1 + ' = ' + number2.add(number1));
    // test negative plus negative
    number1 = BigInt.fromString('-123');
    console.log(number1 + ' + ' + number2 + ' = ' + number1.add(number2));
}

function testDiv() {
    var number1 = BigInt.fromString('1337');
    var number2 = BigInt.fromString('123');
    console.log(number1 + ' / ' + number2 + ' = ' + number1.div(number2));
    console.log(number1 + ' % ' + number2 + ' = ' + number1.mod(number2));
    console.log(number2 + ' / ' + number1 + ' = ' + number2.div(number1));
    console.log(number2 + ' % ' + number1 + ' = ' + number2.mod(number1));
}

function testMul() {
    var number1 = BigInt.fromString('1234567891123123');
    var number2 = BigInt.fromString('9876543213123123');
    console.log(number1 + ' * ' + number2 + ' = ' + number1.mul(number2));
    console.log(number1.neg() + ' * ' + number2 + ' = ' + number1.neg().mul(number2));
    console.log(number1 + ' * ' + number2.neg() + ' = ' + number1.mul(number2.neg()));
    console.log(number1.neg() + ' * ' + number2.neg() + ' = ' + number1.neg().mul(number2.neg()));
}

function testSpecial() {
    console.log('0*0=' + BigInt.fromInt(0).mul(BigInt.fromInt(0)));
    try {
        BigInt.fromInt(0).div(BigInt.fromInt(0));
        console.log('0/0 should have triggered exception');
    } catch (e) {
        console.log('0/0 triggered expected exception');
    }
    console.log('0+0=' + BigInt.fromInt(0).add(BigInt.fromInt(0)));
}

console.log('Testing int values');
testAddSub();
testDiv();
testMul();
testSpecial();

console.log('Testing real values');
var numRoot = 3;
var real1 = BigReal.fromFloat(numRoot);
var sqrt = null;
BigReal.withPrecision(256*8, function() {
    sqrt = real1.sqrt();
});
console.log('sqrt(' + numRoot + ') = ' + sqrt);
