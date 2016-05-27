import { observer } from 'mobx-react';
import { render } from 'react-dom';
import React, { Component } from 'react';

import distMappings from '../models/DistMappings';

import ObservableStore from '../stores/ObservableStore';
import DistStore from '../stores/DistStore';

import ComboNumericSlider from '../components/ComboNumericSlider';
import AreaChart from '../components/AreaChart';
import D3Component from '../components/D3Component';
import D3Component2 from '../components/D3Component2'
import Histogram from '../components/Histogram';


const dummyData = {
  data: d3.range(10).map((d, i) => ({x: i, y: Math.random()*100})),
  dist: 'hello'
}

function isDiscrete(dist){
  return ['binomial', 'poisson', 'geometric'].indexOf(dist) >= 0
}

@observer
class Chart extends Component {
  render(){
    let { store } = this.props;
    if (isDiscrete(store._distribution)){
      return <D3Component2 store={store} chart={Histogram} chartType='histogram' />
    } else {
      return <D3Component store={store} chart={AreaChart} chartType='areachart' />
    }
  }
}

const NumInput = function({value, cls, label, handleChange }){
  return (
    <div className={`col-xs-3 ${cls}`}>
       <label>{label}</label>
      <input style={{width: "100%"}}
        type="number"
        value={value}
        onChange={handleChange}
        step={10}
      />
    </div>
  );
};


@observer
class ComboNumericSliders extends Component {
  render(){
    let { store } = this.props
    console.log(store._distribution)
    console.log("Rerendering...")
    return (
      <div>
        <Chart store={store} />
        <p className='ayx-section-header'>Enter Parameters and Bounds</p>
        {store._distributions[store._distribution].map(d =>
          <ComboNumericSlider state={d} key={store._distribution + d.label} />
        )}
        <div className="row">
          <NumInput value={store._bounds[0]} cls='pull-left2' label='Lower Bound' 
            handleChange={e => store._bounds[0] = e.target.value}        
          />
          <NumInput value={store._bounds[1]} cls='pull-right2' label='Upper Bound' 
            handleChange={e => store._bounds[1] = e.target.value}  
          />
        </div>
      </div>
    )
  }
}

export default function RenderComboNumericSliders(manager, collection, id = "app"){
  const distStore = new DistStore(manager, collection)
  /* REFACTOR: updates value of _distribution in store */
  if (!window.Alteryx.browser){
    Alteryx.Gui.manager
      .GetDataItemByDataName("distribution")
      .BindUserDataChanged(v => distStore._distribution = distMappings[v])
  }
 
  render(
    <ComboNumericSliders store={distStore} />,
    document.getElementById(id)
  )
  if (window.Alteryx.browser){
    //setTimeout(() => distStore._distribution = 'binomial', 5000)
  }
}

/*
import DropDown from '../gui/plugin-widgets/DropDown/DropDown';
<DropDown
  value={distribution}
  options={[
    {label: "Normal", value: "normal"}, 
    {label: "Exponential", value: "exponential"}
  ]}
  onChange={v => this.props.store.distribution = v}
/>
*/