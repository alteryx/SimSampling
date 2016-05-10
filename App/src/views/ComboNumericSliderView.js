import { observer } from 'mobx-react';
import { render } from 'react-dom';
import React, { Component } from 'react';

import ObservableStore from '../stores/ObservableStore';
import ComboNumericSlider from '../components/ComboNumericSlider';


@observer
class ComboNumericSliders extends Component {
  render(){
    let { distributions, distribution } = this.props.store
    console.log(distribution)
    return (
      <div>
        {distributions[distribution].map(d =>
          <ComboNumericSlider state={d} key={distribution + d.label} />
        )}
      </div>
    )
  }
}

export default function RenderComboNumericSliders(manager, collection, id = "app"){
  const DistStore = new ObservableStore(manager, collection)
  render(
    <ComboNumericSliders store={DistStore} />,
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