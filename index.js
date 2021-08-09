const ONE = '+!!{}'
const ZERO = '+[]'
const NAME = '((((typeof ("")[+[]]))[+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}])+((+{}+"")[+!!{}])+(((typeof +!!{}))[+!!{}+!!{}])+(((typeof ("")[+[]]))[+!!{}+!!{}+!!{}]))' // === "name"
const EMPTY = '""'
const SPACE = '" "'
const INFINITY = `${EMPTY}${ONE}/${ZERO}` // "" + 0 / 1 === "Infinity"

const wrap = thing => `(${thing})`
const digit = n => n === 0 ? ZERO : ONE.repeat(n)
// i don't like zero-based indexes
const at = (thing, index) => `(${thing})[${digit(index - 1)}]`
const safeDigit = n => wrap(`''+(${digit(n)})`)
const typeOf = thing => wrap(`typeof ${thing}`)
const functionName = fn => wrap(`${fn.name}[${NAME}]`)

const NAN = `+{}+${EMPTY}`; // "NaN"
const STRING = typeOf(EMPTY); // "string"
const NUMBER = typeOf(ZERO); // "number"
const UNDEFINED = typeOf(at(EMPTY, 1)); // ""[0] === undefined
const OBJECT = typeOf('{}'); // "object"

const LETTERS = {
  a: at(NAN, 2),
  b: at(NUMBER, 4),
  c: at(OBJECT, 5),
  d: at(UNDEFINED, 9),
  e: at(UNDEFINED, 4),
  f: at(UNDEFINED, 5),
  g: at(STRING, 6),
  h: at(functionName(hasOwnProperty), 1),
  i: at(UNDEFINED, 6),
  j: at(OBJECT, 3),
  k: at(functionName(WeakMap), 4),
  l: at(functionName(valueOf), 3),
  m: at(NUMBER, 3),
  n: at(UNDEFINED, 7),
  o: at(OBJECT, 1),
  p: at(functionName(hasOwnProperty), 10),
  q: at(functionName(queueMicrotask), 1),
  r: at(NUMBER, 6),
  s: at(STRING, 1),
  t: at(OBJECT, 6),
  u: at(UNDEFINED, 1),
  v: at(functionName(valueOf), 1),
  w: at(functionName(hasOwnProperty), 5),
  x: at(functionName(Proxy), 4),
  y: at(INFINITY, 8),
  z: at(wrap(`''.fontsize[${NAME}]`), 7),
  0: safeDigit(0),
  1: safeDigit(1),
  2: safeDigit(2),
  3: safeDigit(3),
  4: safeDigit(4),
  5: safeDigit(5),
  6: safeDigit(6),
  7: safeDigit(7),
  8: safeDigit(8),
  9: safeDigit(9),
  ' ': SPACE
};

/**
 * Converts the input string (a-z, 0-9, spaces) to an unreadable JavaScript expression.
 * @param {string} input 
 * @returns {string}
 */
export default function unreadable(input) {
  let output = ''
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char in LETTERS) {
      output += LETTERS[char];
    } else {
      throw new Error(`unknown character "${char}"; unreadable currently supports a-z, 0-9 and spaces`)
    }

    if (i < input.length - 1) output += '+'
  }
  return wrap(output)
}
