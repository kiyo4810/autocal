function getTrapezoidArea(upper = 1, lower = 1, height = 1) {
  return (upper + lower) * height / 2;
}

// function getTrapezoidArea(upper = 1, lower = upper, height = upper) {
//   return (upper + lower) * height / 2;
// }

console.log(getTrapezoidArea(10, 5, 3));
console.log(getTrapezoidArea(10, 5))
console.log(getTrapezoidArea(10));