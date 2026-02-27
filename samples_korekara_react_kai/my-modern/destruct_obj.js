const member = {
  fullname: '佐藤理央',
  sex: 'female',
  age: 18
};
const { fullname, sex, memo = '---' } = member;

// let fullname, sex, memo;
// ({ fullname, sex, memo = '---' } = member);
console.log(sex, fullname, memo);

const { sex: gender } = member;
console.log(gender);

// const { fullname, ...rest } = member;
// console.log(fullname);
// console.log(rest);