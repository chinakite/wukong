function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
module.exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
module.exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
module.exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
module.exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
module.exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
module.exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
module.exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
module.exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
module.exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
module.exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
module.exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
module.exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
module.exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
module.exports.isPrimitive = isPrimitive;

module.exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
