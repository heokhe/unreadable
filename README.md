# unreadable
Turn your name into an extremely unreadable JS expression.

# Usage
```js
import unreadable from '@hkh12/unreadable';

unreadable('hi') // A valid but unreadable JavaScript expression
eval(unreadable('hi')) // 'hi'
unreadable('Hello') // It only accepts a-z (lowercased), 0-9, and spaces
```