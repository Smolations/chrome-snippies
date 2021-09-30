


const pageProxyHandler = {
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
};

// mini proxies (proxy components)  ?
// const dtlHandler = {};
// const cdnHandler = {};
// const elementsHandler = {};

// OR....more classes?
// class PageStylesheet {}

this.anchor = new MetaElement({
  // required?
  selector: 'div > a',

  // selector suffixes
  text: 'Save Ramps',
  role: 'textbox',
  role: ['textbox', { options }],
  altText: 'foo',
});


this.el = new MetaElement(
  { text: ['Save Ramps', options] },
  { metaElementOpts },
    // container: { role: ['list', options] }
);


// custom action?
this.planPicker.open();

// fireEvent
this.someButton.click();
this.someInput.type();

// other dom stuffs
this.someInput.select();
this.someInput.selectAll();
this.someElement.focus()

// DTL
this.someElement.within() // ?
this.someElement.get()
this.someElement.query()
await this.someElement.find()
await this.someElement.findAll()
await this.someElement.waitFor()
  // OR
  await this.someElement.waitForGet()

// how to know when to use byText, byRole, etc

// get* throws
// query* returns null/[]
// find* returns promise that rejects on error

// kent's tips:
// - expectations for inDocument; get* will throw without expectation,
//   but should be put in one regardless
// - always query from `screen`



class MyPage extends Page {
  constructor() {
    super(); // can pass { libs: [...] } for additional libs from CDN

    this.sel('someButton', '.someSelector');
    this.sel('someTextInput', '.someOtherSelector');
  }


  doAThing() {
    this.describe('gonna do a thing now', () => {
      it('presses a button maybe', () => {
        this.fireEvent.click(this.e.someButton);
        expect('something').toBe('something');
      });
      it('enters text maybe', () => {
        this.type(this.e.someTextInput, 'gtfo');
        expect(this.e.someTextInput.value).toBe('gtfo');
      });
    });
  }
}

// load Page snippet, then load MyPage snippet, then in the console:
const myPage = new MyPage();
myPage.doAThing();




// expect().___
0: "not"
1: "rejects"
2: "resolves"
3: "toBe"
4: "toBeCloseTo"
5: "toBeDefined"
6: "toBeFalsy"
7: "toBeGreaterThan"
8: "toBeGreaterThanOrEqual"
9: "toBeInstanceOf"
10: "toBeLessThan"
11: "toBeLessThanOrEqual"
12: "toBeNaN"
13: "toBeNull"
14: "toBeTruthy"
15: "toBeUndefined"
16: "toContain"
17: "toContainEqual"
18: "toEqual"
19: "toHaveLength"
20: "toHaveProperty"
21: "toMatch"
22: "toMatchObject"
23: "lastCalledWith"
24: "toBeCalled"
25: "toBeCalledWith"
26: "toHaveBeenCalled"
27: "toHaveBeenCalledTimes"
28: "toHaveBeenCalledWith"
29: "toHaveBeenLastCalledWith"
30: "toThrow"
31: "toThrowError"


// DTL.___

// and get*/getAll*, query*/queryAll*
11: "findByAltText"
12: "findByDisplayValue"
13: "findByLabelText"
14: "findByPlaceholderText"
15: "findByRole"
16: "findByTestId"
17: "findByText"
18: "findByTitle"

0: "buildQueries"
1: "configure"
2: "createEvent"
19: "fireEvent"
36: "getConfig"
37: "getDefaultNormalizer"
38: "getElementError"
39: "getMultipleElementsFoundError"
40: "getNodeText"
41: "getQueriesForElement"
42: "getRoles"
43: "getSuggestedQuery"
44: "isInaccessible"
45: "logDOM"
46: "logRoles"
47: "makeFindQuery"
48: "makeGetAllQuery"
49: "makeSingleQuery"
50: "prettyDOM"
51: "prettyFormat"
52: "queries"
71: "queryHelpers"
72: "screen"
73: "waitFor"
74: "waitForElementToBeRemoved"
75: "within"
76: "wrapAllByQueryWithSuggestion"


// roles
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
//
// alert
// application
// timer
// article
// banner
// button
// cell
// checkbox
// comment
// complementary
// contentinfo
// dialog
// document
// feed
// figure
// form
// grid
// gridcell
// heading
// list
// listbox
// listitem
// main
// mark
// meter
// navigation
// region
// img
// row
// rowgroup
// search
// suggestion
// switch
// tab
// table
// tabpanel
// textbox
