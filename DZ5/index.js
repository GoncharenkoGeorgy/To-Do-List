class Helper {

  constructor() {
    this.type = 'object';
    let features = {
      configurable: false,
      enumerable: false,
      writable: false
    }
    Object.defineProperties(Object.getPrototypeOf(this), {
      isEmpty: features,
      isObject: features,
      isDeepClone: features,
      isEqual: features,
      findValue: features,
      hasKey: features,
    })
  }

  isEmpty(obj) {
    if (this.isObject(obj)) {
      if (Object.keys(obj) === undefined || Object.keys(obj) === null || Object.keys(obj).length == 0) {
        console.log('true');
      } else {
        console.log('false')
      }
    }
  }

  isObject(obj) {
    if (typeof obj !== this.type && Array.isArray) {
      console.log('Передан не объект');
      return false;
    } else {
      console.log('Передан объект');
      return true;
    }
  }

  isDeepClone(obj) {
    if (this.isObject(obj)) {
      //const copyObj = lodashClonedeep(obj);
      const copyObj = (JSON.parse(JSON.stringify(obj)));

      console.log(copyObj);
      return copyObj;
    }
  }

  isEqual(obj1, obj2) {
    if (this.isObject(obj1, obj2)) {
      const stringifyObj1 = JSON.stringify(obj1);
      const stringifyObj2 = JSON.stringify(obj2);

      if (stringifyObj1 === stringifyObj2) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  }

  findValue(obj, key) {
    if (this.isObject(obj)) {
      getValue(obj, key);
      function getValue(obj, key) {
        for (let value in obj) {
          if (value === key) {
            console.log(`Искомое значеник ${key}`, obj[value]);
            return;
          }
          if (typeof (obj[value]) === 'object') {
            getValue(obj[value], key);
          }
        }
      }
    }
  }

  hasKey(obj, key) {
    if (this.isObject(obj)) {
      if (JSON.stringify(obj).indexOf(`${key}`) > -1) {
        console.log(true);
      }
      else {
        console.log(false);
      }
    }
  }

}

const helper = new Helper();

const obj1 = { property: "value" };
const obj2 = {
  property: "value",
  nextLevel: {
    secondProperty: "secondValue",
    thirdLevel: {
      thirdProperty: "thirdValue",
    }
  }
};

const a = [1, 2, 4];
const isObject = helper.isObject(a);

const b = 5;
const isEmpty = helper.isEmpty(b);

const isEmpty1 = helper.isEmpty(obj1);
const isEmpty2 = helper.isEmpty(obj1);
const isObject1 = helper.isObject(obj1, obj2);
const isObject2 = helper.isObject(obj2);
const isDeepClone = helper.isDeepClone(obj1);
const isDeepClone2 = helper.isDeepClone(obj2);
helper.isEqual(obj1, obj2);
helper.isEqual(obj1, isDeepClone);

const findValue = helper.findValue(obj2, 'nextLevel');
const findValue1 = helper.findValue(obj2, 'thirdLevel');
helper.hasKey(obj2, "thirdLevel");
helper.hasKey(obj2, "nextLevel");
helper.hasKey(obj1, "nextLevel");
helper.hasKey(obj1, "property");