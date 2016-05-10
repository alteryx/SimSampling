import { render } from 'react-dom';
import React from 'react';

import RouletteStore from '../stores/RouletteStore';
import Roulette from '../components/Roulette';

export default function RenderRoulette(manager, collection, id = 'app') {
  const store = new RouletteStore(manager, collection);
  render(
    <Roulette store={store} />,
    document.getElementById(id)
  );
}
