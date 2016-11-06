import { autorun, extendObservable, toJS } from 'mobx';
// import store from '../stores/Storage';

class ObservableStore {
  constructor(manager, collection) {
    collection.forEach(d => {
      const item = manager.GetDataItemByDataName(d.key);
      extendObservable(this, {
        [`${d.key}`]: (d.type === 'value' ? item.getValue() : JSON.parse(item.getValue())),
      });
      autorun(() => {
        console.log('Autorunning...');
        item.setValue(
          d.type === 'value' ? toJS(this[d.key]) : JSON.stringify(toJS(this[d.key]))
        );
        // store.set(d.key, item.getValue());
      });
    });
  }
}

export default ObservableStore;
