const toString = Object.prototype.toString;
export const isBoolean = (val) => typeof val === "boolean";
export const isFunction = (val) => typeof val === "function";
export const isNumber = (val) => typeof val === "number";
export const isUndefined = (val) => typeof val === "undefined";
export const isString = (val) => typeof val === "string";
export const isObject = (val) => toString.call(val) === "[object Object]";
export const isArray = (val) => toString.call(val) === "[object Array]";
export const isEmpty = (val) => !val && val !== 0;
