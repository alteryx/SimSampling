/**
 * Create an object that can be passed to setStringList
 *
 * This function can accept an Array or an Object
 *
 * @param x
 * @return {Object} an object that can be passed to setStringList
 */
function createUIObject(x) {
  function a2ui(d) {
    return { uiobject: d, dataname: d };
  }
  function o2ui(d) {
    return { uiobject: x[d], dataname: d };
  }
  const f = (x.constructor === Array) ? a2ui : o2ui;
  const y = (x.constructor === Array) ? x : Object.keys(x);
  return y.map(f);
}

function makeDataItem(manager, AlteryxDataItems) {
  return function f(id, props, type = 'SimpleString') {
    let value;
    let dtype;
    if (props.values) {
      dtype = props.values.constructor === Array
        ? 'MultiStringSelector'
        : 'StringSelector';
    } else {
      dtype = type;
    }
    const di = manager.GetDataItem(id);
    const newItem = di || new AlteryxDataItems[dtype]({ id, dataname: id });
    if (dtype === 'StringSelector' || dtype === 'MultiStringSelector') {
      const data = createUIObject(props.values);
      newItem.setStringList(data);
      value = props.value ? props.value : data[0].dataname;
    } else {
      value = props.value;
    }
    manager.AddDataItem(newItem);
    if (value) newItem.setValue(value);
    return newItem;
  };
}

function syncDataItems(x, y) {
  const manager = window.Alteryx.Gui.manager;
  const xData = manager.GetDataItem(x);
  const yData = y.map(d => manager.GetDataItem(d));
  const xDataVal = {};
  function setVal() {
    y.forEach((k, i) => { xDataVal[k] = yData[i].getValue(); });
    xData.setValue(JSON.stringify(xDataVal));
  }
  yData.forEach((d) => d.BindUserDataChanged(setVal));
}

function displayTarget(targetId, di, cond, resize = false){
  let condition;
  if (typeof cond == 'undefined'){
    condition = function(v){return v}
  } else if (typeof cond == 'string'){
    condition = function(v){return v === cond}
  } else {
    condition = cond;
  }
  const dataItem = Alteryx.Gui.manager.GetDataItemByDataName(di)
  const targetDiv = document.getElementById(targetId)
  function display(v){
    targetDiv.style.display = condition(v) ? 'block' : 'none'
    console.log("Resizing ", v)
    window.dispatchEvent(new Event('resize'));
  }
  dataItem.BindUserDataChanged(display)
  display(dataItem.value)
}

function controlDisplayIntermediate(manager){
  const targetDiv = document.getElementById('isIntermediate')
  const intermediate =  manager.GetDataItemByDataName("intermediate")
  if (manager.incomingMetaInfo && manager.incomingMetaInfo[1]){
    intermediate.setValue(true);
    targetDiv.style.display = 'none';
  } else {
    intermediate.setValue(false);
  }
}

function hasField(manager, i, name){
  if (!manager.incomingMetaInfo) return false;
  if (!manager.incomingMetaInfo[i]) return false;
  const fields = [].concat(manager.incomingMetaInfo[i].MetaInfo.RecordInfo.Field).map(d => d["@name"])
  return fields.indexOf(name) >= 0;
}

function controlDisplaySeed(manager){
  const targetDiv = document.getElementById('display-seed')
  const displaySeed = manager.GetDataItemByDataName("displaySeed")
  if (hasField(manager, 1, 'seed')){
    displaySeed.setValue(false)
    targetDiv.style.display = 'none';
  } else {
    displaySeed.setValue(true)
  }
}

export { createUIObject, makeDataItem, syncDataItems, displayTarget, controlDisplayIntermediate, controlDisplaySeed };
