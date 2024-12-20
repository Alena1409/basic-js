const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!")
  if (arr.every(item => typeof item !== 'string' || !item.startsWith('--'))) return arr;
  const result = [];
  for (let i = 0; i< arr.length; i ++) {
    const value = arr[i];
    if (typeof value === 'number') {
      result.push(value)
    } else if (value === '--double-next') {
      if (i + 1 < arr.length && typeof arr[i + 1] === "number") {
        result.push(arr[i + 1])
      }
    } else if (value === '--double-prev') {
      if (i - 1 >= 0 && typeof arr[i - 1] === "number") {
        result.push(arr[i - 1])
      }
    } else if (value === '--discard-prev') {
      if (i - 1 >= 0 && typeof arr[i - 1] === "number") {
        result.pop()
      }
    } else if (value === '--discard-next') {
      if (i + 1 < arr.length && typeof arr[i + 1] === "number") {
        i++
      }
    }
  }
  return result;
}

module.exports = {
  transform
};
