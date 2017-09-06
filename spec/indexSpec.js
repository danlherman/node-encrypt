var ne = require('../index.js')

const key = 'f66de9e326b4a7defaa0b1e0f015a140'
const fooCipher = 'zXAkwFWwTUqxLEscQhnyDQ==--H9eRMjuw1bMZ/k+ki08jjg=='

describe ('Encryption / Decryption', () => {

  describe ('encrypt', () => {
    it ('encrypts foo with key specified', () => {
      ne.encrypt ({ text: 'foo', key: key }, (err, ciphertext) => {
        expect (err).toBe(null)
      })
    })
    it ('returns missing key error if key is missing', () => {
      ne.encrypt ({ text: 'foo' }, (err, ciphertext) => {
        expect (err.toString().slice(0, 29)).toBe('Error: Missing encryption key')
      })
    })
    it ('encrypts with key not specified but environment var available', () => {
      process.env.ENCRYPTION_KEY = key
      ne.encrypt ( { text: 'foo' }, (err, ciphertext) => {
        expect (err).toBe(null)
      })
    })
  })

  describe ('decrypt', () => {
    it ('decrypts foo with key specified', () => {
      ne.decrypt ({ cipher: fooCipher, key: key }, (err, plaintext) => {
        expect (plaintext).toBe('foo')
      })
    })
    it ('decrypt fails with bad key specified', () => {
      ne.decrypt ( { cipher: fooCipher, key: 'f66de9e326b4a7defaa0b1xxxxxxxxxx' }, (err, plaintext) => {
        expect (err.toString()).toBe('Error: Bad encryption key!')
      })
    })
  })
})

// cipher = ne.encrypt({text: 'foo', key: }, (err, ciphertext) => {
//   if (err) console.log(err)
//   console.log(ciphertext)
//   ne.decrypt({cipher: ciphertext, key: 'f66de9e326b4a7defaa0b1e0f015a140'}, (err, plaintext) => {
//     if (err) console.log(err)
//     console.log(`Decrypted value: ${plaintext}`)
//   })
// })
//
