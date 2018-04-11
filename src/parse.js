const _ = require('./util')
const stringify = require('json-stringify-safe')

/**
 * An Entry contains energy usage and billing information for a given month/year.
 *
 * @typedef {Object} Entry
 * @property {integer} year
 * @property {integer} month
 * @property {number} kwh
 * @property {number} bill
 * @property {number} savings
 */

const validate = entry => {
  if (!_.isNonEmptyObject(entry)) {
    return 'expected non-empty object for entry, got ' + stringify(entry)
  }
  if (!_.isPositiveInteger(entry.year)) {
    return 'expected positive integer for entry.year, got ' + stringify(entry.year)
  }
  if (!_.isPositiveInteger(entry.month) || entry.month > 12) {
    return 'expected positive integer <= 12 for entry.month, got ' + stringify(entry.month)
  }
  if (!_.isPositiveNumber(entry.kwh)) {
    return 'expected positive number for entry.kwh, got ' + stringify(entry.kwh)
  }
  if (!_.isPositiveNumber(entry.bill)) {
    return 'expected positive number for entry.bill, got ' + stringify(entry.bill)
  }
  if (!_.isNumber(entry.savings)) {
    return 'expected number for entry.savings, got ' + stringify(entry.savings)
  }
  return null
}

const validateMany = (entries, cb) => {
  if (!_.isNonEmptyArray(entries)) {
    return cb(new Error('expected non-empty array for entries, got ' + stringify(entries)))
  }
  let errMsg
  for (let i = 0; i < entries.length; i++) {
    errMsg = validate(entries[i])
    if (errMsg) return cb(new Error(errMsg))
  }
  try {
    entries.sort((a, b) => {
      if (a.year < b.year) {
        return -1
      }
      if (a.year > b.year) {
        return 1
      }
      if (a.month < b.month) {
        return -1
      }
      if (a.month > b.month) {
        return 1
      }
      throw new Error(`got duplicate entries for ${a.month}/${a.year}`)
    })
    cb(null, entries)
  } catch (err) {
    cb(err)
  }
}

/**
 * parse generates an array of entries from a JSON string.
 *
 * @function parse
 * @param  {string}  json
 * @param  {function} cb
 */

module.exports = (json, cb) => {
  try {
    const entries = JSON.parse(json)
    validateMany(entries, cb)
  } catch (err) {
    cb(new Error('Invalid JSON: ' + err.message))
  }
}
