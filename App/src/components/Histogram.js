import d3 from 'd3';
import d3Kit from 'd3kit';

import './AreaChart.scss';

const chartDefaults = {
  margin: { top: 20, right: 20, bottom: 20, left: 30 },
  initialWidth: "auto",
  initialHeight: 250
}

const chartConstructor = (skeleton) => {
  const S = { x: d3.scale.ordinal(), y: d3.scale.linear() }
  const A = { x: (d) => d.x, y: (d) => d.y }
  
  const L = skeleton.getLayerOrganizer()
  L.create(['x-axis', 'y-axis', 'bars'])
  const visualize = d3Kit.helper.debounce(() => {
    const data = skeleton.data()
    const W = skeleton.getInnerWidth()
    const H = skeleton.getInnerHeight()
    S.x.rangeRoundBands([0, W], 0.1).domain(data.map(A.x))
    S.y.range([H, 0]).domain([0, d3.max(data, A.y)])
    
    const bars = L.get("bars").selectAll("rect").data(data)
    bars.enter().append("rect")
    bars.attr({
      x: d => S.x(A.x(d)),
      y: d => S.y(A.y(d)),
      width: S.x.rangeBand(),
      height: d =>  H - S.y(A.y(d)),
      fill: 'steelblue'
    })
    bars.exit().remove()
      
    const xAxis = d3.svg.axis()
      .scale(S.x)
      .orient('bottom')
      .ticks(4)
    L.get('x-axis')
      .attr("transform", `translate(0, ${H})`)
      .transition('x-axis')
      .call(xAxis)
    const yAxis = d3.svg.axis()
      .scale(S.y.nice())
      .ticks(5)
      .orient('left')
      .tickSize(-W)
    L.get('y-axis')
      .transition('y-axis')
      .call(yAxis)
  }, 10)
  skeleton
    .resizeToFitContainer("width")
    .autoResize('width')
    .on('resize', visualize)
    .on('data', visualize)
    .on('options', visualize);
}



const HistChart = d3Kit.factory.createChart(
  chartDefaults, [], chartConstructor
)

export default HistChart;
