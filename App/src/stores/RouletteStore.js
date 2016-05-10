import ObservableStore from './ObservableStore';
import d3 from 'd3';
import { computed, toJSON } from 'mobx';

class RouletteStore extends ObservableStore {
  constructor(manager, collection){
    super(manager, collection)
  }
  @computed get data() {
    const d = this.rouletteData;
    const grid = d3.range(d.gridHeight);
    const bins = d3.range(d.lower, d.upper, d.binSize);
    const expandGrid = (x, y) =>
      d3.merge(x.map(x_ => y.map(y_ => ({ x: x_, y: y_ }))));
    return expandGrid(bins, grid);
  }
}

export default RouletteStore;
