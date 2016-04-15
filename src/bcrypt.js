import bcryptjs from 'bcryptjs'

/**
 * Gets the bcrypt hash of a value.
 * @param {string} value - The value to hash
 * @return {string} The bcrypt hash
 */
export function bcrypt (value, options = {}) {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(options.saltRounds || 10, (err, salt) => {
      if (err) return reject(err)

      bcryptjs.hash(value, salt, (err, hash) => {
        if (err) reject(err)
        else resolve(hash)
      })
    })
  })
}

export function bcryptSync (value, options = {}) {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  const salt = bcryptjs.genSaltSync(options.saltRounds || 10)
  const hash = bcryptjs.hashSync(value, salt)

  return hash
}

/**
 * Checks if a value is valid compared to a bcrypt hash.
 * @param {string} value - The value to compare
 * @param {string} hash - The bcrypted hash
 * @return {boolean} Whether the value is valid
 */
export function bcryptCompare (value, hash = '') {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  return new Promise((resolve, reject) => {
    bcryptjs.compare(value, hash, (err, res) => {
      if (err) reject(err)
      else resolve(Boolean(res))
    })
  })
}

export function bcryptCompareSync (value, hash = '') {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  return Boolean(bcryptjs.compareSync(value, hash))
}
