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

function testComparison() {
    var num1 = null, num2 = null;
    BigReal.withPrecision(16, function() {
        num1 = BigReal.fromFloat(16);
    });
    BigReal.withPrecision(15, function() {
        num2 = BigReal.fromFloat(32);
    });
    console.log('16.0 > 32.0 -> ' + num1.isGreater(num2));
    console.log('16.0 == 32.0 -> ' + num1.isEqual(num2));
    console.log('32.0 > 16.0 -> ' + num2.isGreater(num1));
    BigReal.withPrecision(128, function() {
        num1 = BigReal.fromFloat(12345);
    });
    BigReal.withPrecision(14, function() {
        num2 = BigReal.fromFloat(12345);
    });
    BigReal.withPrecision(128, function() {
        console.log('12345/12345 = ' + num2.div(num1));
        console.log('12345/12345 == 1 = ' + num2.div(num1).isEqual(BigReal.fromFloat(1)));
    });
}

function testPi() {
    BigReal.withPrecision(256, function() {
        var pi = BigReal.fromString('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954');
        var circle = pi.mul(BigReal.fromFloat(2));
        console.log('2*pi = ' + circle);
    });
}

function testSqrt() {
    var numRoot = 3;
    var real1 = BigReal.fromFloat(numRoot);
    var sqrt = null;
    BigReal.withPrecision(256, function() {
        sqrt = real1.sqrt();
    });
    console.log('sqrt(' + numRoot + ') = ' + sqrt);
}

function timeAdd() {
    var start = new Date();
    var a = BigInt.fromString('9228166182613886140');
    var b = BigInt.fromString('15498304000760546492');
    for (var i = 0; i < 20000; i++) {
        var sum = a.add(b);
    }
    var ms = new Date().getTime() - start.getTime();
    console.log('20000 64-bit additions in ' + ms + 'ms');
}

function timeMul() {
    var start = new Date();
    var a = BigInt.fromString('9228166182613886140');
    var b = BigInt.fromString('15498304000760546492');
    for (var i = 0; i < 1000; i++) {
        var prod = a.mul(b);
    }
    var ms = new Date().getTime() - start.getTime();
    console.log('1000 64-bit products in ' + ms + 'ms');
}

console.log('\nTesting int values\n');
testAddSub();
testDiv();
testMul();
testSpecial();

console.log('\nTesting real values\n');
testComparison();
testPi();
testSqrt();

console.log('\nRunning integer speed tests\n');
timeAdd();
timeMul();
