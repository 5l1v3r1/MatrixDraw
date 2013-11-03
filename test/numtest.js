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
    // test big subtraction
    number1 = BigInt.fromString('90582382938929');
    number2 = BigInt.fromString('12093812309');
    console.log(number1 + ' - ' + number2 + ' = ' + number1.sub(number2));
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
        var pi = BigReal.fromString(BigReal.piString);
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

function testTrig() {
    BigReal.withPrecision(32, function() {
        var pi = BigReal.fromString(BigReal.piString);
        var angle = pi.mul(BigReal.fromFloat(2/3));
        console.log('sin(2*pi/3) = ' + angle.sin());
        console.log('cos(2*pi/3) = ' + angle.cos());
        console.log('tan(2*pi/3) = ' + angle.tan());
    });
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
    var a = BigInt.fromString('92281661826138860');
    var b = BigInt.fromString('154983040007605464');
    for (var i = 0; i < 2000; i++) {
        var prod = a.mul(b);
    }
    var ms = new Date().getTime() - start.getTime();
    console.log('2000 64-bit products in ' + ms + 'ms');
}

function timeDiv() {
    var start = new Date();
    var b = BigInt.fromString('9228166182613');
    var a = BigInt.fromString('1549830400076054');
    var c = BigInt.fromString('1293');
    for (var i = 0; i < 1000; i++) {
        var quot = a.div(b);
    }
    for (var i = 0; i < 1000; i++) {
        var quot = a.div(c);
    }
    var ms = new Date().getTime() - start.getTime();
    console.log('2000 64-bit quotients in ' + ms + 'ms');
}

function timeSub() {
    var start = new Date();
    var b = BigInt.fromString('9228166182613');
    var a = BigInt.fromString('1549830400076054');
    for (var i = 0; i < 20000; i++) {
        var diff = a.sub(b);
    }
    var ms = new Date().getTime() - start.getTime();
    console.log('20000 64-bit subtractions in ' + ms + 'ms');
}

function timeTrig() {
    BigReal.withPrecision(32, function() {
        var pi = BigReal.fromString(BigReal.piString);
        var angle = pi.mul(BigReal.fromFloat(2/3));
    
        var start = new Date();
        for (var i = 0; i < 10; i++) {
            var a = angle.tan();
        }
        var ms = new Date().getTime() - start.getTime();
        console.log('10 32-bit tan() in ' + ms + 'ms');
    });
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
testTrig();

console.log('\nRunning integer speed tests\n');
timeAdd();
timeSub();
timeMul();
timeDiv();
timeTrig();
