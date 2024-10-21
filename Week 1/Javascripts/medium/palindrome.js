/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let val = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let start = 0, end = val.length - 1;

  while (start <= end) {
      if (val[start] !== val[end]) {
          return false;
      }
      start++;
      end--;
  }
  return true;
}

module.exports = isPalindrome;
