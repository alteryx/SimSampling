import { observer } from 'mobx-react';
import { render } from 'react-dom';
import React, { Component } from 'react';

import distMappings from '../models/DistMappings';

import ObservableStore from '../stores/ObservableStore';
import DistStore from '../stores/DistStore';

import ComboNumericSlider from '../components/ComboNumericSlider';
import AreaChart from '../components/AreaChart';
import D3Component from '../components/D3Component'



@observer
class ComboNumericSliders extends Component {
  render(){
    let { store } = this.props
    console.log(store._distribution)
    return (
      <div>
        <D3Component store={store} chart={AreaChart} />,
        {store._distributions[store._distribution].map(d =>
          <ComboNumericSlider state={d} key={store._distribution + d.label} />
        )}
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