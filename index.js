/* eslint-disable no-use-before-define */

const ONE = '+!!{}';
const ZERO = '+[]';
const getNumber = n => (n === 0 ? ZERO : Array.from({ length: n }, () => ONE).join(''));

const at = (thing, index) => `(${thing})[${getNumber(index - 1)}]`;
const getTypeof = thing => `(typeof ${thing})`;

const EMPTY = '""';
const NAN = `+{}+${EMPTY}`;
const STRING = getTypeof(EMPTY);
const NUMBER = getTypeof(ONE);
const UNDEFINED = getTypeof(at(EMPTY, 1));
const OBJECT = getTypeof('{}');

const LETTERS = {
  a: at(NAN, 2),
  b: at(NUMBER, 4),
  c: at(OBJECT, 5),
  d: at(UNDEFINED, 9),
  e: at(UNDEFINED, 4),
  f: at(UNDEFINED, 5),
  g: at(STRING, 6),
  h: at(`${EMPTY}+Math`, 12), // [object Math]
  i: at(UNDEFINED, 6),
  j: at(OBJECT, 3),
  k: () => at(functionName(WeakMap), 4),
  l: () => at(functionName(valueOf), 3),
  m: at(NUMBER, 3),
  n: at(UNDEFINED, 7),
  o: at(OBJECT, 1),
  p: () => at(functionName(hasOwnProperty), 10),
  q: () => at(functionName(queueMicrotask), 1),
  r: at(NUMBER, 6),
  s: at(STRING, 1),
  t: at(OBJECT, 6),
  u: at(UNDEFINED, 1),
  v: () => at(functionName(valueOf), 1),
  w: () => at(functionName(hasOwnProperty), 5),
  x: () => at(functionName(Proxy), 4),
  y: () => at(functionName(Proxy), 5)
};

function functionName(f) {
  return `${f.name}[${unreadable('name')}]`;
}

export default function unreadable(string) {
  if (typeof string !== 'string' || !/^[a-z0-9 ]*$/.test(string)) {
    throw new Error('unreadable only accepts strings of a-z (lowercased), 0-9 and spaces.');
  }
  return `(${string.split('').map(letter => {
    if (l === ' ') return '" "';
    let l = LETTERS[letter];
    if (!l) {
      // Then it's definitely a digit.
      return `(${getNumber(+l)})`;
    }
    if (typeof l === 'function') l = l();
    return `(${l})`;
  }).join('+')})`;
}
