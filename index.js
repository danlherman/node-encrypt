var crypto = require ('crypto')

var missingKeyError = new Error('Missing encryption key! (environment variable ENCRYPTION_KEY or in key: parameter of encrypt call)')
var badKeyError = new Error('Bad encryption key!')

exports.encrypt = ({ text, key, algorithm = 'aes-256-cbc' }, callback) => {
  key = typeof(key) == 'undefined' ? process.env.ENCRYPTION_KEY : key
  if (key == undefined) return callback(missingKeyError, null)
  crypto.randomBytes(16, (err, iv) => {
    if (err) return callback(err)

    var cipher = crypto.createCipheriv(algorithm, key, iv)
    var ciphertext = ''

    ciphertext += cipher.update(text, 'utf-8', 'binary')
    ciphertext += cipher.final('binary')
    ciphertext = new Buffer(ciphertext, 'binary')

    var cipherBundle = [ciphertext.toString('base64'), iv.toString('base64')].join('--')

    callback(null, cipherBundle)
  })
}

exports.decrypt = ({ cipher, key, algorithm = 'aes-256-cbc' }, callback) => {
  key = key == undefined ? process.env.ENCRYPTION_KEY : key
  if (key == undefined) return callback(missingKeyError, null)
  var parts = cipher.split('--', 2)
  var ciphertext = new Buffer(parts[0], 'base64')
  var iv = new Buffer(parts[1], 'base64')

  var decipher = crypto.createDecipheriv(algorithm, key, iv)
  var plaintext = ''

  plaintext += decipher.update(ciphertext)
  try {
    plaintext += decipher.final()
  } catch (err) {
    return callback(badKeyError, null)
  }

  callback(null, plaintext)
}

exports.newKey = () => {
  return crypto.randomBytes(16).toString('hex')
}

exports.hash = ({ text, salt, algorithm = 'sha256' }, callback) => {
  salt = salt == undefined ? process.env.HASH_SALT : salt
  if (salt == undefined) salt = ''
  newHash = crypto.createHash(algorithm).update(salt + text).digest('hex')
  callback(null, newHash)
}

