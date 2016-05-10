import { observer } from 'mobx-react';
import { isObservable, extendObservable, observable, toJSON } from 'mobx';
import React, { Component } from 'react';
import d3 from 'd3';
import d3Kit from 'd3kit';
// import persistentStore from '../stores/Storage'

import './Roulette.scss';

const chartDefaults = {
  margin: { top: 30, right: 20, bottom: 30, left: 20 },
  initialWidth: 'auto',
  initialHeight: 300,
};

const chartConstructor = (store) => (skeleton) => {
  const S = { x: d3.scale.ordinal(), y: d3.scale.ordinal() };
  const A = { x: d => d.x, y: d => d.y };
  const L = skeleton.getLayerOrganizer();
  L.create(['cells', 'x-axis', 'y-axis']);
  function getData() {
    const dat = L.get('cells').selectAll('.active').data();
    return (
      d3.nest()
        .key(d => d.x)
        .rollup(d => d3.max(d, d_ => d_.y) + 1)
        .map(dat)
    );
  }
  const visualize = d3Kit.helper.debounce(() => {
    const data = skeleton.data();
    const opts = skeleton.options();
    const W = skeleton.getInnerWidth();
    const H = skeleton.getInnerHeight();
    // W = Math.min(W, H); H = Math.min(W, H)
    S.x.rangeBands([0, W]).domain(data.map(A.x));
    S.y.rangeBands([H, 0]).domain(data.map(A.y));
    // create grid
    const grid = L.get('cells').selectAll('rect').data(data);
    grid.enter().append('rect')
      .classed('cell', true)
    grid.exit().remove();
    if (!store.jsonRouletteData) {
      L.get('cells').selectAll('rect').classed("active", false);
    }
    // activate grid cells based on initial state
    if (store.jsonRouletteData) {
      Object.keys(store.jsonRouletteData).forEach(k => {
        const active = grid
          .filter(d => d.x === +k && d.y < store.jsonRouletteData[k]);
        active.classed('active', true);
      });
    }

    grid.attr({
      x: d => S.x(A.x(d)),
      y: d => S.y(A.y(d)),
      width: S.x.rangeBand(),
      height: S.y.rangeBand(),
    });


    const xAxis = d3.svg.axis()
        .scale(S.x)
        .outerTickSize(0)
        .orient('bottom');
    L.get('x-axis')
        .attr('transform', `translate(${[-S.x.rangeBand() / 2, H]})`)
        .transition()
        .call(xAxis);
    L.get('x-axis').select('.domain')
        .attr('transform', `translate(${[S.x.rangeBand() / 2, 0]})`);

    const yAxis = d3.svg.axis().scale(S.y).orient('left');
    L.get('y-axis')
       .attr('transform', `translate(${[0, S.y.rangeBand() / 2]})`)
       .transition()
       .call(yAxis);
    L.get('y-axis').select('.domain')
        .attr('transform', `translate(${[0, -S.y.rangeBand() / 2]})`);


    // activate cells on click
    // TODO: 10 is hardcoded. make it data dependent
    grid.on('click', function filterGrid(d) {
      console.log("Clicked");
       /* HACK-ALERT-START */
      const activeKeys = Object.keys(toJSON(store.jsonRouletteData));
      if (d.x.toString().indexOf(activeKeys) >= 0){
        store.jsonRouletteData[d.x] = d.y + 1;
      } else {
        extendObservable(store.jsonRouletteData, { [`${d.x}`] : d.y + 1 })
        Alteryx.Gui.manager.GetDataItemByDataName("jsonRouletteData").setValue(
          JSON.stringify(toJSON(store.jsonRouletteData))
        )
        //persistentStore.set('active', JSON.stringify(toJSON(store.active)))
      }
      console.log(store.jsonRouletteData)
       /* HACK-ALERT-END */
      const cells = grid.filter(d2 => d2.x === d.x);
      const activeCells = cells
        .filter(function filterActive() { return d3.select(this).classed('active'); })
        .data()
        .map(d_ => d_.y);
      if (d3.select(this).data()[0].y === d3.max(activeCells)) {
        d3.select(this).classed('active', false);
        if (d.x.toString().indexOf(activeKeys) >= 0){
          store.jsonRouletteData[d.x] = d.y;
        } else {
          extendObservable(store.jsonRouletteData, { [`${d.x}`] : d.y })
          Alteryx.Gui.manager.GetDataItemByDataName("jsonRouletteData").setValue(
            JSON.stringify(toJSON(store.jsonRouletteData))
          )
          //persistentStore.set('active', JSON.stringify(toJSON(store.active)))
        }
      } else {
        console.log('transitioning...')
        cells.transition()
          .ease('exp')
          .delay((d2, i) => d2.y <= d.y ? i / 10 * 500 : (10 - i) / 10 * 500)
          .attr('class', (d2, i) => d2.y <= d.y ? 'active cell' : 'cell')
      }
    });
  }, 10);
  skeleton
    .resizeToFitContainer('width')
    .autoResize('width')
    .on('data', visualize)
    .on('resize', visualize)
    .on('options', visualize);
};



const rouletteChart = (store) => 
 d3Kit.factory.createChart(
   chartDefaults, [], chartConstructor(store)
 );

@observer
class D3Component extends Component {
  componentDidMount() {
    console.log("Component did mount...")
    const el = this.refs.roulette;
    this.chart = new this.props.chart(el)
      .data(this.data)
      .options({store: this.props.store});
  }
  componentDidUpdate() {
    console.log("Component updated...")
    this.chart
      .data(this.data)
      .options({store: this.props.store});
  }
  render() {
    console.log("Rerendering...")
    const { store } = this.props;
    this.data = store.data;
    return <div ref="roulette"></div>;
  }
}

const NumInput = observer(({ store, k, cls, label }) => {
  const style = cls === 'pull-right' ? { marginRight: 15 } : { marginLeft: 15 };
  const handleChange = (e) => {
    store[k] = e.target.value;
    /* HACK-ALERT-START 
    Object.keys(toJSON(store.active)).forEach(k => store.active[k.toString()] = 0)
    Alteryx.Gui.manager.GetDataItemByDataName("active").setValue("{}")
    persistentStore.set("active", JSON.stringify(store.active));
    console.log(toJSON(store.active))
    HACK-ALERT-END */
  };
  return (
    <div className={`col-xs-3 ${cls}`} style={style}>
      <input style={{width: "100%"}}
        type="number"
        value={store[k]}
        onChange={handleChange}
        step={10}
      />
      <label>{label}</label>
    </div>
  );
});

@observer
class Roulette extends Component {
  render() {
    const { store } = this.props;
    const store2 = store.rouletteData;
    return (
      <div className="col-xs-12">
        <D3Component chart={rouletteChart(store)} store={store} />
        <div className="row">
          <NumInput k="lower" label="Lower" cls="" store={store2} />
          <NumInput k="upper" label="Upper" cls="pull-right" store={store2} />
        </div>
        <div className="row">
          <NumInput k="gridHeight" label="Height" cls="" store={store2} />
          <NumInput k="binSize" label="Num Bins" cls="pull-right" store={store2} />
        </div>
      </div>
    );
  }
}

export default Roulette;
