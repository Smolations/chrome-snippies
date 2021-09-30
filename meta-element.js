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
  get(instance, prop, proxy) {
    console.groupCollapsed('Queryable proxyHandler get()');
    console.log('instance: %o', instance);
    console.log('prop: %o', prop);
    console.log('proxy: %o', proxy);

    const element = instance.query() || {};
    let retVal;

    // local first?
    if (prop in instance) {
      console.debug('-> local');
      retVal = instance[prop];

    // fireEvent
    } else if (prop in DTL.fireEvent) {
      console.debug('-> fireEvent');
      retVal = () => DTL.fireEvent[prop](instance.query());

    // DTL
    } else if (prop in DTL) {
      console.debug('-> DTL');
      retVal = DTL[prop];

    // DOM?
    } else if (prop in element) {
      console.debug('-> DTL');
      retVal = element[prop];
    }

    console.log('retVal: %o', retVal);
    console.groupEnd();
    return retVal;
  },
};


// assign instance getters based on this?
class MetaElement {
  static parseArgs(specObj) {
    const parsed = {};
    const {
      ...query
    } = specObj;

    const [[querySuffix, queryArgs]] = [...Object.entries(query)];
    const opts = Array.isArray(queryArgs) ? queryArgs : [queryArgs];
    const [textMatch, matchOpts] = opts;

    parsed.suffix = querySuffix.replace(/^\w/, (c) => c.toUpperCase());
    parsed.textMatch = textMatch;
    parsed.matchOpts = matchOpts;

    return parsed;
  }

  // rename?
  #meta = {};


  constructor(queryObj, options = {}) {
    const { container } = options;
    const querySource = container ? DTL : DTL.screen;

    // defaults overridden by method call
    this.#meta = {
      suffix: '', // PascalCase of constructor object key (e.g. 'Text' for findByText)
      textMatch: null, // string/regex/fn
      matchOpts: {},
      ...this.constructor.parseArgs(queryObj)
    };

    // set up query aliases
    [
      'query', 'queryAll',
      'get', 'getAll',
      'find', 'findAll',
    ].forEach((alias) => {
      const aliasFnName = `${alias}By${this.#meta.suffix}`;
      const fnArgs = [this.#meta.textMatch, this.#meta.matchOpts];

      container && fnArgs.unshift(container);

      Object.defineProperty(this, alias, {
        get() {
          return () => querySource[aliasFnName](...fnArgs);
        },
      });
    });

    for (let [event, fn] of Object.entries(DTL.fireEvent)) {
      Object.defineProperty(this, event, {
        get() {
          return (evtOpts = {}) => {
            // why isn't this working?!
            console.log('fireEvent[%o](%o, %o)', event, this.query(), evtOpts);
            return DTL.fireEvent[event](this.query(), evtOpts);
          };
        },
      });
    }

    return new Proxy(this, proxyHandler);
  }


  type(text) {
    const element = this.query();
    this.change(element, { target: { value: String(text) }});
  }
}
