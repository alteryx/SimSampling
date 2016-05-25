import ObservableStore from './ObservableStore';
import { jStat } from 'jstat';
import { computed, toJSON } from 'mobx';

const DIST_DATA_FN = dist => p => {
  if (dist != "binomial"){
    const nCount = 1000
    const xmin = jStat[dist].inv.apply(null, [0.001].concat(p))
    const xmax = jStat[dist].inv.apply(null, [0.999].concat(p))
    return d3.range(xmin, xmax, (xmax - xmin)/nCount).map(d => (
      { x: d, y: jStat[dist].pdf.apply(null, [d].concat(p)) }
    ))
  } else {
    const xmin = 0;
    const xmax = p[0];
    const nCount = p[0]
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
