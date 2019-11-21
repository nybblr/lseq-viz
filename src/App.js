import React from 'react';

import TreeViz from './tree-viz.js';
import { lseqAlex } from './example.js';

window.lseq = lseqAlex;

let App = () => {
  return (
    <div className="app">
      <TreeViz tree={lseqAlex} />
    </div>
  );
};

export default App;
