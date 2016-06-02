import ObservableStore from './ObservableStore';
import { jStat } from 'jstat';
import { computed, toJSON } from 'mobx';

const distDataFnDiscrete = dist => p => {
  const distObj = jStat[dist];
  const nCount = 1000;

  let xmin = 0;
  while(distObj.cdf(xmin, p) < 0.001) {
    xmin++;
  }

  let xmax = 0;
  while(distObj.cdf(xmax, p) <= 0.999) {
    xmax++;
  }

  return d3.range(xmin, xmax, (xmax - xmin)/nCount).map(d => (
//    { x: d, y: distObj.pdf.apply(null, [d].concat(p)) }
    //{ x: d, y: distObj.pdf(...[d].concat(p)) }
    { x: d, y: distObj.pdf(d, p) }
  ));
};

function isDiscrete(dist){
  return ['binomial', 'poisson', 'geometric'].indexOf(dist) >= 0
}

const DIST_DATA_FN = dist => p => {
  if (!isDiscrete(dist)){
    const nCount = 1000
    const xmin = jStat[dist].inv.apply(null, [0.001].concat(p))
    const xmax = jStat[dist].inv.apply(null, [0.999].concat(p))
    return d3.range(xmin, xmax, (xmax - xmin)/nCount).map(d => (
      { x: d, y: jStat[dist].pdf.apply(null, [d].concat(p)) }
    ))
  } else {
    if (dist == 'geometric'){
      dist = 'negbin'
      p = [1, p[0]]
      console.log(p)
    }
    const xmin = 0;
    const xmax = dist == 'binomial' ? (p[0] + 1) : dist == 'negbin' ? 1/p[1] + 6*Math.sqrt((1 - p[1])/p[1]) : p[0] + 6*Math.sqrt(p[0]);
    const nCount = xmax
    return d3.range(xmin, xmax, (xmax - xmin)/nCount).map(d => (
      { x: d, y: jStat[dist].pdf.apply(null, [d].concat(p)) }
    ))
  }
}

class DistStore extends ObservableStore {
  constructor(manager, collection){
    super(manager, collection)
  }
  @computed get data(){
    let dist = this._distribution
    let dists = this._distributions
    //console.log(toJSON(dists))
    let params = dists[dist].slice().map(d => d.value)
    console.log(jStat)  
    return DIST_DATA_FN(dist)(params)
  }
}

export default DistStore;
