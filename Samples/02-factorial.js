"use strict";

function factorial(n) {
  let p=1;
  for(let i=2; i<=n; i++) {
    p*=i;
  }
  return p;
}

console.log(factorial(10));
console.log(process.argv);
console.log(factorial(process.argv[2]||1));
