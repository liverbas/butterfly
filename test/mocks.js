'use strict';

// Mocks
const mocks = {
  arr: ['a','b','c','d'], // >= 4 elements, all should be truthy
  obj: {a:1,b:2,c:3,d:4}, // >= 4 values, all should be truthy
  string: 'This is a string.',
  reverseString: function (string) {
    if (typeof string === 'string') return string.split('').reverse().join('');
  }
};

mocks.stringifiedArrElms = mocks.arr.join('');
mocks.objKeysArr = Object.keys(mocks.obj);
mocks.objValuesArr = mocks.objKeysArr.map(function (key) {
  return mocks.obj[key];
});
mocks.stringifiedObjValues = mocks.objValuesArr.join('');
mocks.reversedString = mocks.reverseString(mocks.string);

module.exports = mocks;
