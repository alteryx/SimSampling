/* global Alteryx */
import { MakeDataItem as makeDataItem, controlDisplayIntermediate, displayTarget } from './utils/Alteryx';
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
  //dataItem('distribution', { value: DistData.distribution });
  //dataItem('distributions', { value: JSON.stringify(DistData.distributions) });
  dataItem('rouletteData', { value: JSON.stringify(RouletteData) });
  dataItem('jsonRouletteData', { value: '{"20": 5, "30": 6}' });
};


Alteryx.Gui.AfterLoad = function AfterLoad(manager) {
  console.log('After Load ----');
  const collection = [
    { key: 'distributions', type: 'json' },
    { key: 'distribution', type: 'value' },
  ];
  const collection2 = [
    { key: 'rouletteData', type: 'json' },
    { key: 'jsonRouletteData', type: 'json' },
  ];
  //renderComboNumericSliders(manager, collection, 'combonumericslider');
  //controlDisplayIntermediate(manager)
  displayControls.forEach(function(d){displayTarget.apply(null, d)})
  renderRoulette(manager, collection2, 'rouletteChart');
  Alteryx.Gui.manager.GetDataItemByDataName("dataKind").BindUserDataChanged(function(d){
    if (d === 'manual') window.dispatchEvent(new Event('resize'));
  })
};

if (window.Alteryx.browser) {
  Alteryx.Gui.BeforeLoad(Alteryx.Gui.manager, '');
  Alteryx.Gui.AfterLoad(Alteryx.Gui.manager);
}
