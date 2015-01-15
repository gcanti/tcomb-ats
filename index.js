'use strict';

require('traceur/bin/traceur-runtime');
var t = require('tcomb');
var assert = t.assert;
var Type = t.Type;

//
// patch $traceurRuntime
//

$traceurRuntime.type = {
  'void': t.Nil,
  'any': t.Any,
  'string': t.Str,
  'number': t.Num,
  'boolean': t.Bool
};

var slice = Array.prototype.slice;

$traceurRuntime.genericType = function (combinator, type) {
  if (combinator === Array) { combinator = t.list; }
  if (combinator === t.list || combinator === t.maybe) {
    return combinator(type);
  }
  if (combinator === t.tuple || combinator === t.union) {
    return combinator(slice.call(arguments, 1));
  }
  if (combinator === t.dict) {
    return t.dict.apply(null, slice.call(arguments, 1));
  }
  t.fail('unknown combinator ' + combinator);
};

//
// assert public api
//

assert.argumentTypes = function () {
  for (var i = 0, len = arguments.length; i < len ; i = i + 2) {
    assert.type(arguments[i], arguments[i + 1]);
  }
};

assert.returnType = assert.type = function check(value, type) {
  if (Type.is(type)) {
    return type(value);
  }
  assert(value instanceof type, 'Invalid argument `value` = `%s` supplied to `%s`', value, type.name);
  return value;
};

t.__esModule = true;
module.exports = t;
