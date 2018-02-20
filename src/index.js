module.exports =function solveEquation(equation) {  //module.exports = 
    var coefficients = [];

    equation = equation.split("*");  //extracting numbers from expression
    for(var i = 0; i < equation.length; i++){  
      equation[i] = equation[i].split(" ").join("");
    }

    equation[1] = equation[1].slice(3); //remove x^2
    equation[2] = equation[2].slice(1); //remove x

    for(var i = 0; i < equation.length; i++)
      coefficients[i] = getNumbetWithSign(equation[i]);
    
    decrementNumbers(coefficients);   //some numbers are very big, when multypling they lose presicion

     return quadraticEquation(coefficients).sort(function(a,b){ return a - b}); 
}

function getNumbetWithSign(number){
  if(number[0] == '-') return +number;

  return +number.slice(0);  
}

function quadraticEquation(coefficients){
  var a = coefficients[0], b = coefficients[1], c = coefficients[2];

  var result = [];
  var disc = Math.pow(b, 2) - 4 * a * c;
  result.push(Math.floor((-b + Math.sqrt(disc)) / (2 * a))); // first root
  result.push(Math.floor((-b - Math.sqrt(disc)) / (2 * a))); //second root
  
  return result;
}

function decrementNumbers(coefficients){
  for(var i = 1000; i > 1; i--){
      if(coefficients[0] % i == 0 && coefficients[1] % i == 0 && coefficients[2] % i == 0){
          for(var j = 0; j < coefficients.length; j++)
            coefficients[j] = Math.floor(coefficients[j] / i);
          break;
      } 
  }
}