var ne = require('../index.js')

const key = 'f66de9e326b4a7defaa0b1e0f015a140'
const hashSalt = '77e701df2dc630eb141d3e24ff81f0d9'
const fooCipher = 'zXAkwFWwTUqxLEscQhnyDQ==--H9eRMjuw1bMZ/k+ki08jjg=='
const fooHash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
const fooSaltHash = 'ee643c115a7062742e9a65b1f485469cd8e1b5ec99a20f37f4eca670d7878b88'

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

  describe ('hash', () => {
    it ('creates a hash with a salt', () => {
      ne.hash ({ text: 'foo', salt: hashSalt }, (err, hash) => {
        expect (hash).toBe(fooSaltHash)
      })
    })
    it ('creates a hash without a salt', () => {
      ne.hash ( { text: 'foo' }, (err, hash) => {
        expect (hash).toBe(fooHash)
      })
    })
    it ('creates a hash with a salt from env var HASH_SALT', () => {
      process.env.HASH_SALT = hashSalt
      ne.hash ( { text: 'foo' }, (err, hash) => {
        expect (hash).toBe(fooSaltHash)
      })
    })
  })
})

