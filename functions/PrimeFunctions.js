function prime(ln, hn) {
  var result = [];
  for (let i = ln; i <= hn; i++) {
    let flag = 0;

    // looping through 2 to user input number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }

    // if number greater than 1 and not divisible by other numbers
    if (i > 1 && flag == 0) {
      result.push(i);
    }
  }
  //result.pop();
  return result;
}

function prime_second(ln, hn) {
  function isPrime(num) {
    if (num % 2 == 0) {
      return false;
    }

    let n = Math.sqrt(num);

    for (var i = 3; i <= n; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  }

  function print(ln, hn) {
    var arr = [];
    if (ln <= 2) {
      arr.push(2);
    }
    if (ln % 2 == 0) {
      ln += 1;
    }
    for (var i = ln; i < hn; i += 2) {
      if (isPrime(i)) {
        if (i >= ln) {
          arr.push(i);
        }
      }
    }
    return arr;
  }
  return print(ln, hn);
}

module.exports = { prime, prime_second };
