/* eslint no-param-reassign: ["error", { "props": false }] */

import { observer } from 'mobx-react';
import React from 'react';
// import './ComboNumericSlider.scss'
import './NumericSlider.css';

function ComboNumericSlider({ state }) {
  const handleChange = (e) => {
    const v = +e.target.value;
    if (state.max < v || v < state.min) {
      state.min = parseFloat((v * 0.5).toFixed(1));
      state.max = parseFloat((v * 1.5).toFixed(1));
    }
    state.value = v;
  };
  return (
    <div className="alteryx-numeric-slider">
      <div className="comboslider-controls">
        <label htmlFor="" className="pull-left">{state.label}</label>
        <input
          type="number"
          className="pull-right"
          value={state.value}
          onChange={handleChange}
        />
      </div>
      <div className="comboslider-slider">
        <input
          type="range"
          {...state}
          onChange={handleChange}
        />
        <span className="param-min pull-left">
          {state.min}
        </span>
        <span className="param-max pull-right">
          {state.max}
        </span>
      </div>
    </div>
  );
}

ComboNumericSlider.propTypes = {
  state: React.PropTypes.object.isRequired,
};

export default observer(ComboNumericSlider);
