import { observer } from 'mobx-react';
import React, { Component } from 'react';

@observer
class D3Component extends React.Component {
  componentDidMount(){
    const el = this.refs.areachart
    this.chart = new this.props.chart(el).data(this.data)
  }
  componentDidUpdate(){
    this.chart.data(this.data)
  }   
  render(){
    this.data = this.props.store.data
    return (
      <div> 
        <b>{this.props.store.dist}</b>
        <div ref='areachart'></div>
      </div>
    )
  }
}

export default D3Component
