import { observer } from 'mobx-react';
import React, { Component } from 'react';
import d3 from 'd3';

@observer
class D3Component extends React.Component {
  componentDidMount(){
    const el = this.refs[this.props.chartType];
    this.chart = new this.props.chart(el).data(this.data);
  }
  componentDidUpdate(){
    this.chart.data(this.data)
  }
  render(){
    this.data = this.props.store.data
    return (
      <div ref={this.props.chartType}></div>
    )
  }
}

export default D3Component
