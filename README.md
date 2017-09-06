# node-encrypt
Simple node crypto encryption wrapper using init vectors and defaulting to aes-256-cbc

## Installation
npm install node-encrypt --save

## Usage
```js
var ne = require('node-encrypt');

ne.encrypt({ text: 'foo', key: 'f66de9e326b4a7defaa0b1e0f015a140' }, (err, ciphertext) {
  if (err) return (err);
  console.log(ciphertext);
})

// or use the environment variable ENCRYPTION_KEY to store the key
ne.encrypt({ text: 'foo' }, (err, ciphertext) {
  console.log(ciphertext);
})

// decrypt like this
ne.decrypt({ cipher: 'zXAkwFWwTUqxLEscQhnyDQ==--H9eRMjuw1bMZ/k+ki08' }, (err, plaintext) {
  console.log(plaintext);
})

```
