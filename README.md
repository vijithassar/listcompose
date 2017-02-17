# listcompose.js

JavaScript function composition through arrays

# Overview

JavaScript code can be written in a [functional style](https://en.wikipedia.org/wiki/Functional_programming). This relies on:

1. [array iteration methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods), which traverse an array while operating on it
2. [function composition](https://en.wikipedia.org/wiki/Function_composition), in which JavaScript's [first class functions](https://en.wikipedia.org/wiki/First-class_function) are used as the inputs and outputs to other functions such that small, clean, stable pieces of functionality can be combined to create powerful aggregates

Typically we write function compositions as follows:

```javascript
// compose functions f and g
var composition = function(x) {
  return f(g(x));
};
composition(x);
```

But wait, why not compose functions based on list iteration instead? Let's make our functional JavaScript behave even more like a Lisp...

# Installation

Install via [npm](https://www.npmjs.com/package/listcompose):

```javascript
npm install listcompose
```

Or just include as a script tag:

```html
<script type="text/javascript" src="path/to/listcompose.js"></script>
```

# Usage

Compositions are based on an input array of functions. So instead of the usual syntax...

```javascript
var composition = function(x) {
  return f(g(x));
};
```

...we can use an array:

```javascript
var composition = listcompose([g, f]);
```

# Callbacks

It's easy enough to write your own reducer and/or coerce input arguments to an array using ES6 spreads or Array.prototype.slice. But by *assuming* that all functions intended for composition will be present in an array provided to the first argument, we are then able to use input arguments for purposes other than simply collecting the functions. In this case, the optional second argument is a callback which operates on the composition at each step of the composition.

Callback functions take two arguments: first, an input function representing the current partial state of composition, and secondly the index representing the current position in the initial input array. The callback will itself become part of the composition, so it must always return a function.

This results in slightly different behavior than simply running [array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on the input array, because the callback function is able to access the result of the composition *at each iteration stage*. This allows you *conditionally extend compositions based on the behavior of the composition*.

This can be particularly useful as an intermediate validation stage for enforcing contracts between the composed functions. For example, to reliably coerce measurements from strings ("3 hours" or "200 kilograms") into structured data no matter what an individual function might decide to output:

```javascript
var composition = listcompose([g, f], function(current, index) {
    var measurement,
        unit,
        validated;
    if (typeof current() === 'string') {
        // convert substrings to desired data types
        measurement = +current().split(' ')[0];
        unit = current().split(' ')[1];
        // always return a function
        validated = function() {
            // structure substrings
            var structured;
            structured = {
                measurement: measurement,
                unit: unit
            };
            return structured;
        };
        return validated;
    } else {
        return current;
    }
});
```
