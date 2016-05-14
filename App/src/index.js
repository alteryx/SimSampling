/* global Alteryx */
import { MakeDataItem as makeDataItem, controlDisplayIntermediate, displayTarget, controlDisplaySeed } from './utils/Alteryx';
import DistData from './models/DistData';
import RouletteData from './models/RouletteData';
import renderComboNumericSliders from './views/ComboNumericSliderView';
import renderRoulette from './views/RouletteView';
import './styles/app.css';

var displayControls = [
  ['parametricSampling', 'samplingMode', 'parametric'],
  ['dataSampling', 'samplingMode', 'data'],
  ['div-distToFit', 'samplingStrategy', 'best'],
  ['div-dataKind-raw', 'dataKind', 'raw'],
  ['div-dataKind-binned', 'dataKind', 'binned'],
  ['div-dataKind-manual', 'dataKind', 'manual']
];


Alteryx.Gui.BeforeLoad = function BeforeLoad(manager, AlteryxDataItems) {
  const dataItem = makeDataItem(manager, AlteryxDataItems);
  dataItem('_distribution', { value: DistData.distribution });
  dataItem('_distributions', { value: JSON.stringify(DistData.distributions) });
  dataItem('rouletteData', { value: JSON.stringify(RouletteData) });
  dataItem('jsonRouletteData', { value: '{"20": 8, "30": 6}' });
  if (!window.Alteryx.browser){
    dataItem('displaySeed', {value: true}, 'SimpleBool')
    dataItem('intermediate', {value: false}, 'SimpleBool')
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
  //renderComboNumericSliders(manager, collection, 'combonumericslider');
  if (window.Alteryx.browser) {
    renderRoulette(manager, collection2, 'rouletteChart');
    renderComboNumericSliders(manager, collection, 'combonumericslider');
  } else {
    controlDisplayIntermediate(manager)
    controlDisplaySeed(manager)
    displayControls.forEach(function(d){displayTarget.apply(null, d)})
    renderRoulette(manager, collection2, 'rouletteChart');
    renderComboNumericSliders(manager, collection, 'combonumericslider');
    Alteryx.Gui.manager
      .GetDataItemByDataName("dataKind")
      .BindUserDataChanged(function(d){
        if (d === 'manual') window.dispatchEvent(new Event('resize'));
      })
    Alteryx.Gui.manager
      .GetDataItemByDataName("samplingMode")
      .BindUserDataChanged(function(d){
         window.dispatchEvent(new Event('resize'));
      })
  }
};

if (window.Alteryx.browser) {
  Alteryx.Gui.BeforeLoad(Alteryx.Gui.manager, '');
  Alteryx.Gui.AfterLoad(Alteryx.Gui.manager);
}
