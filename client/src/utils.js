//HIGHER ORDER FUNCTION
//Higher-order functions are functions that operate on other functions, either by taking them as arguments
//or by returning them.


 export const catchErrors = (fn) => {
    return function(...args) {
      return fn(...args)
        .catch((err) => {
        console.error(err);
      })
    }
  };



  /** TRACK LIST
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms)=> {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(((ms % 60000) / 1000));
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}