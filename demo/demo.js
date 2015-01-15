"use strict";
var $___46__46___;
var assert = ($___46__46___ = require("../."), $___46__46___ && $___46__46___.__esModule && $___46__46___ || {default: $___46__46___}).assert;
'use strict';
var t = require('tcomb');
t.options.onFail = function(message) {
  console.error(message);
};
var n1 = assert.type(1, t.Num);
var n2 = assert.type('a', t.Num);
var m1 = assert.type('a', $traceurRuntime.genericType(t.maybe, t.Str));
var m2 = assert.type(null, $traceurRuntime.genericType(t.maybe, t.Str));
var m3 = assert.type(1, $traceurRuntime.genericType(t.maybe, t.Str));
var arr1 = assert.type(['a'], $traceurRuntime.genericType(t.list, t.Str));
var arr2 = assert.type([1], $traceurRuntime.genericType(t.list, t.Str));
function sum(a, b) {
  assert.argumentTypes(a, t.Num, b, t.Num);
  return assert.returnType((a + b), t.Num);
}
Object.defineProperty(sum, "parameters", {get: function() {
    return [[t.Num], [t.Num]];
  }});
sum(1, 2);
sum(1, 'a');
var Person = function Person(name, surname) {
  assert.argumentTypes(name, t.Str, surname, t.Str);
  this.name = name;
  this.surname = surname;
};
($traceurRuntime.createClass)(Person, {}, {});
Object.defineProperty(Person, "parameters", {get: function() {
    return [[t.Str], [t.Str]];
  }});
var p1 = assert.type(new Person('Giulio', 'Canti'), Person);
var p2 = assert.type(new Person('Giulio'), Person);
var t1 = assert.type([1, 'a'], $traceurRuntime.genericType(t.tuple, t.Str, t.Num));
var t2 = assert.type([1, 2], $traceurRuntime.genericType(t.tuple, t.Str, t.Num));
var d1 = assert.type({a: 1}, $traceurRuntime.genericType(t.dict, t.Str, t.Num));
var d2 = assert.type({a: 'b'}, $traceurRuntime.genericType(t.dict, t.Str, t.Num));
var Align = t.enums.of('left center right', 'Align');
var e1 = assert.type('left', Align);
var e2 = assert.type('justify', Align);
var Positive = t.subtype(t.Num, function(n) {
  return n >= 0;
}, 'Positive');
var sn1 = assert.type(1, Positive);
var sn2 = assert.type(-1, Positive);
var sn3 = assert.type('a', Positive);
var StrOrNum = t.union([t.Str, t.Num], 'StrOrNum');
var u1 = assert.type('a', StrOrNum);
var u2 = assert.type(1, StrOrNum);
var TPerson = t.struct({
  name: t.Str,
  surname: t.Str
});
var tp1 = assert.type(new TPerson({
  name: 'Giulio',
  surname: 'Canti'
}), TPerson);
var tp2 = assert.type(1, TPerson);
//# sourceURL=demo.ats