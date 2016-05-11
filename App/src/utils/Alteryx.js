import { makeDataItem, controlDisplayIntermediate, controlDisplaySeed, displayTarget } from './AlteryxUtils.js';
import store from '../stores/Storage';

class DataItem {
  constructor(v, k) {
    this.value = store.get(k) || v;
    this.key = k;
  }
  setValue(v) {
    this.value = v;
    store.set(this.key, v);
  }
  getValue() {
    return this.value;
  }
}

class Manager {
  constructor() {
    this.items = {};
  }
  AddDataItem(name, value) {
    this.items[name] = new DataItem(value, name);
  }
  GetDataItemByDataName(name) {
    return this.items[name];
  }
}

const makeMockDataItem = function makeMockDataItem(manager) {
  return (
    function mockDataItem(key, opts) {
      manager.AddDataItem(key, opts.value);
    }
  );
};

const MakeDataItem = window.Alteryx ? makeDataItem : makeMockDataItem;

window.Alteryx = window.Alteryx || {
  Gui: { manager: new Manager() },
  browser: true,
};

export default { MakeDataItem, controlDisplayIntermediate, controlDisplaySeed, displayTarget };
