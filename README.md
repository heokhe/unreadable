# unreadable
Turn your name into an extremely unreadable JS expression.

# Usage
```js
import unreadable from '@hkh12/unreadable';

unreadable('hi') // '(((""+Math)[+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}+!!{}])+(((typeof ("")[+[]]))[+!!{}+!!{}+!!{}+!!{}+!!{}]))'
eval(unreadable('hi')) // 'hi'
unreadable('Hello') // It only accepts a-z (lowercased), 0-9, and spaces
```