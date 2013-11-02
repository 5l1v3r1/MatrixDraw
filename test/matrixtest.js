var Matrix = require('anmatrix').Matrix;
var Complex = require('anmatrix').Complex;

function toComplex(list) {
    var complexVals = [];
    list.forEach(function(x) {
        complexVals.push(new Complex(x));
    });
    return complexVals;
}

var matrix = toComplex([1, 2, 3, 1, 4, 5, 6, 1, 7, 8, 9, 1]);
var b = new Matrix(toComplex([1, 2, 3]), 3, 1);

console.log('Testing GILBERT STRANG\n');
var aMatrix = new Matrix(matrix, 3, 4);
console.log('A = ' + aMatrix);
console.log('N(A) = ' + aMatrix.nullSpace());
console.log('Span(A) = ' + aMatrix.columnSpace().basis);
console.log('A+*b = ' + aMatrix.pseudoSolve(b));

console.log('\nTesting diagonalization\n');
var dMatrix = new Matrix(toComplex([5, 6, 7, 10, 11, 15, 17, 193, 42]), 3, 3);
console.log('M = ' + dMatrix);
var diag = dMatrix.diagonalize();
console.log('M = ' + diag.S + '*' + diag.V + '*' + diag.Sinv);

console.log('\nTesting Jordan forms of 3x3 matrix!\n');
var jMatrix = new Matrix(toComplex([  -2648/3    ,    -5344/3     ,    1335      , 
  -10649/3   ,    -21346/3    ,     5337       ,
  -18638/3   ,    -37372/3   ,      9343   ]), 3, 3);
console.log('B = ' + jMatrix);
var jordan = jMatrix.jordan();
console.log('B = ' + jordan.P + '*' + jordan.J + '*' + jordan.Pinv);
console.log('Jordan precision (sig figs) = ' + jordan.precision);
