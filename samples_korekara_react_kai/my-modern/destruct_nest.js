const member = {
  fullname: '佐藤理央',
  address: {
    prefecture: '静岡県',
    city: '藤枝市'
  }
};
const { address, address: { city } } = member;
console.log(address);
console.log(city);