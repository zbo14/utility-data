const _ = require('lodash')

_.mixin({
  isNonEmptyArray: arr => _.isArray(arr) && !_.isEmpty(arr),
  isNonEmptyObject: obj => _.isPlainObject(obj) && !_.isEmpty(obj),
  isPositiveInteger: num => _.isInteger(num) && num > 0,
  isPositiveNumber: num => _.isNumber(num) && num > 0
})

module.exports = _
