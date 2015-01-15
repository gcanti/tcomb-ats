An assert library for AtScript based on  [tcomb](http://gcanti.github.io/tcomb/) type combinators.

# Setup

```
npm install tcomb-ats
```

Add the following keys to your traceur options:

```js
{
  "types": true,
  "typeAssertions": true,
  "typeAssertionModule": "path/to/tcomb-ats",
  "annotations": true // if you also want annotations
}
```

Set `"typeAssertions": false` in production.


# Demo

```
git clone https://github.com/gcanti/tcomb-ats.git
cd tcomb-ats
npm install
gulp
```

Open `./example/index.html` in a browser.

# Syntax

## Primitives

```js
var t = require('tcomb-ats');
var Str = t.Str;

// strings
var s: Str = 'a'; // ok
var s: Str = null; // throws (tcomb's primitives are not nullable)
var s: Str = 1; // throws

// numbers
var Num = t.Num;
var n: Num = 1; // ok

// booleans
var Bool = t.Bool;
var b: Bool = true; // ok

// you can use other irreducible types provided by tcomb
// or define your own, see tcomb documentation
```

## Nullable types

Use the `maybe<T>` combinator:

```js
var s: maybe<Str> = 'a'; // ok
var s: maybe<Str> = null; // ok
```

## Functions

```js
function sum(a: Num, b: Num): Num {
  return a + b;
}

sum(1, 2); // ok
sum(1, 'a'); // throws
```

## Lists

Use the `list<T>` combinator:

```js
var list = t.list;

var a: list<Str> = ['a']; // ok
var b: list<Str> = [1]; // throws

// you can also use the `Array<T>` syntax
var c: Array<Str> = ['a'];
```

## Classes

```js
class Person {
  constructor(name: Str, surname: Str) {
    this.name = name;
    this.surname = surname;
  }
}

var p1: Person = new Person('Giulio', 'Canti'); // ok
var p2: Person = new Person('Giulio'); // throws
```

## Tuples

Use the `tuple` combinator:

```js
var tuple = t.tuple;

var t: tuple<Str, Num> = [1, 'a']; // ok
var t: tuple<Str, Num> = [1, 2]; // throws
```

## Dicts

Use the `dict` combinator:

```js
var dict = t.dict;

var d: dict<Str, Num> = {a: 1}; // ok
var d: dict<Str, Num> = {a: 'b'}; // throws
```

## Enums

Use the `enums` combinator:

```js
var Align = t.enums.of('left center right');

var e: Align = 'left'; // ok
var e: Align = 'justify'; // throws
```

## Subtypes

Use the `subtype` combinator:

```js
var Positive = t.subtype(Num, function (n) {
  return n >= 0;
});

var n: Positive = 1; // ok
var n: Positive = -1; // throws
var n: Positive = 'a'; // throws
```

## Unions

Use the `union` combinator:

```js
var StrOrNum = t.union([Str, Num]);

var u: StrOrNum = 'a'; // ok
var u: StrOrNum = 1; // ok
var u: StrOrNum = true; // throws
```

## tcomb's structs

```js
var Person = t.struct({
  name: t.Str,
  surname: t.Str
});

var p: Person = new Person({
  name: 'Giulio',
  surname: 'Canti'}
); // ok
var p: Person = 1; // throws
```

# License

The MIT License (MIT)
