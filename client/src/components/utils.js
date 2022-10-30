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
  }