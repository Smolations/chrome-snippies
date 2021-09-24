// needs DTL stuffs
// load up in callback? maybe not since they need to be
// accessible elements in page object
// - can do document.querySelector(All)
// - can use DTL queries (maybe _always_ async find* functions?)
// - easy element api
//    - ultimately will need api for Page object
// - each one has its own `it` to verify in the document?
// - input elements built-in tests
// - maybe use proxy for element.waitFor, etc (may eliminate need for global objects!!)
//   - maybe also used proxy to auto-pass above to functions if above doesn't work

const proxyHandler = {
  get: function (target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
  get: function(obj, prop) {
    return prop in obj ?
      obj[prop] :
      37;
  },
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  },


  get(target, prop, receiver) {
    console.groupCollapsed('Queryable proxyHandler get()');
    console.log('target: %o', target);
    console.log('prop: %o', prop);
    console.log('receiver: %o', receiver);

    // local first?
    let retVal = target[prop];

    // DTL
    if (prop in DTL) {
      retVal = DTL[prop];

    // fireEvent
    } else if (prop in DTL.fireEvent) {
      retVal = DTL.fireEvent[prop];

    // DOM
    } else if (prop in this.element) {
      retVal = this.element[prop];
    }

    console.log('retVal: %o', retVal);
    console.groupEnd();
    return retVal;
  },
};

class MetaElement {
  constructor() {
    return new Proxy(this, proxyHandler);
  }
}
