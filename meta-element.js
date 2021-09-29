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

    let retVal;

    // local first?
    if (prop in instance) {
      retVal = instance[prop];

    // DTL queries (me.find() => DTL.findBy{Suffix}(screen|container, textMatch, matchOpts))
    } else if (prop in DTL) {
      retVal = DTL[prop];

    // DTL (rest)
    } else if (prop in DTL) {
      retVal = DTL[prop];

    // fireEvent
    } else if (prop in DTL.fireEvent) {
      retVal = DTL.fireEvent[prop];

    // DOM?
    } else if (prop in instance.element) {
      retVal = instance.element[prop];
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

      element: null, // raw dom element?

      ...this.constructor.parseArgs(queryObj)
    };

    // can container reference also be a MetaElement?

    // 1. no container
    //    - screen.getBy*(textMatch, matchOpts)
    // 2. with container
    //    - DTL.getBy*(container, textMatch, matchOpts)


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
        // get() {
        //   return container
        //     ? querySource[aliasFnName](container, this.#meta.textMatch, this.#meta.matchOptions)
        //     : querySource[aliasFnName](this.#meta.textMatch, this.#meta.matchOptions);
        // },
        get() {
          return () => querySource[aliasFnName](...fnArgs);
        },
      });
    });

    return new Proxy(this, proxyHandler);
  }
}
