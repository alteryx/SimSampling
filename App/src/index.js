/* global Alteryx $ */
import { MakeDataItem as makeDataItem, controlDisplayIntermediate, displayTarget, controlDisplaySeed } from './utils/Alteryx';
import DistData from './models/DistData';
import RouletteData from './models/RouletteData';
import renderComboNumericSliders from './views/ComboNumericSliderView';
import renderRoulette from './views/RouletteView';
import './styles/app.css';

var displayControls = [
  //['parametricSampling', 'samplingMode', 'parametric'],
  //['dataSampling', 'samplingMode', 'data'],
  ['parametricSampling', 'activePage', 'parametric'],
  ['dataSampling', 'activePage', 'data'],
  ['landingPage', 'activePage', 'landing'],
  ['div-distToFit', 'samplingStrategy', 'best', true],
  ['div-dataKind-raw', 'dataKind', 'raw'],
  ['div-dataKind-binned', 'dataKind', 'binned'],
  ['div-dataKind-manual', 'dataKind', 'manual', true]
];

/* 
These need to be global in order for the buttons to pick them up as global functions.
It would be nice if they can be namespaced. Something to consider while refactoring.
*/

window.nextPage = function(){
  var v = Alteryx.Gui.manager
    .GetDataItemByDataName("samplingMode")
    .getValue()
  Alteryx.Gui.manager
    .GetDataItemByDataName("activePage")
    .setValue(v)
  window.dispatchEvent(new Event('resize'));
}
window.landingPage = function(){
  Alteryx.Gui.manager
    .GetDataItemByDataName("activePage")
    .setValue('landing')
}


Alteryx.Gui.BeforeLoad = function BeforeLoad(manager, AlteryxDataItems) {
  const dataItem = makeDataItem(manager, AlteryxDataItems);
  dataItem('_distribution', { value: DistData.distribution });
  dataItem('_distributions', { value: JSON.stringify(DistData.distributions) });
  dataItem('rouletteData', { value: JSON.stringify(RouletteData) });
  dataItem('jsonRouletteData', { value: '{}' });
  if (!window.Alteryx.browser){
    dataItem('displaySeed', {value: true}, 'SimpleBool')
    dataItem('intermediate', {value: false}, 'SimpleBool')
    dataItem('activePage', {value: 'landing'})
  }
};


Alteryx.Gui.AfterLoad = function AfterLoad(manager) {
  console.log('After Load ----');
  const collection = [
    { key: '_distributions', type: 'json' },
    { key: '_distribution', type: 'value' },
  ];
  const collection2 = [
    { key: 'rouletteData', type: 'json' },
    { key: 'jsonRouletteData', type: 'json' },
  ];
  if (window.Alteryx.browser) {
    renderRoulette(manager, collection2, 'rouletteChart');
    renderComboNumericSliders(manager, collection, 'combonumericslider');
  } else {
    controlDisplayIntermediate(manager)
    controlDisplaySeed(manager)
    displayControls.forEach(function(d){displayTarget.apply(null, d)})
    renderRoulette(manager, collection2, 'rouletteChart');
    renderComboNumericSliders(manager, collection, 'combonumericslider');
  }
};

if (window.Alteryx.browser) {
  Alteryx.Gui.BeforeLoad(Alteryx.Gui.manager, '');
  Alteryx.Gui.AfterLoad(Alteryx.Gui.manager);
}
