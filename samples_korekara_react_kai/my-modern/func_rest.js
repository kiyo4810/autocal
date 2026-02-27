function sum(...nums) {
  let result = 0;
  for (const num of nums) {
    result += num;
  }
  return result;
}

console.log(sum(10, 25, 2));
console.log(sum(7, 13, 25, 6, 100));
// console.log(sum([10, 25, 2]));
console.log(sum(...[10, 25, 2]));
