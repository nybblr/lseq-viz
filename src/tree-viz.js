import React, {
  useState,
} from 'react';
import * as d3h from 'd3-hierarchy';
import * as d3s from 'd3-shape';

import { isBoundTriple } from 'lseqtree/lib/triple.js';

const [nodeWidth, nodeHeight] = [50, 100];
const layout = d3h.tree()
  .nodeSize([nodeWidth, nodeHeight]);

const path = d3s.linkVertical().x(d => d.x).y(d => d.y);

let TreeViz = ({ tree }) => {
  const data = d3h.hierarchy(tree.root);
  const root = layout(data);

  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  root.each(({x, y}) => {
    x0 = Math.min(x0, x);
    x1 = Math.max(x1, x);
    y0 = Math.min(y0, y);
    y1 = Math.max(y1, y);
  });

  let treeWidth = x1 - x0 + nodeWidth;
  let treeHeight = (root.height + 1) * nodeHeight;
  let dy = nodeHeight / 2;
  let dx = nodeWidth / 2 - x0;

  let [, setBoo] = useState(0);
  window.rerender = () => setBoo(b => b+1);

  return (
    <svg className="tree"
      width={treeWidth}
      height={treeHeight}
    >
      <g transform={`translate(${dx},${dy})`}>
        <g className="links">
          { root.links().map(link =>
            <path
              className="link"
              d={path(link)}
            />
          )}
        </g>

        <g className="nodes">
          { root.descendants().map(node =>
            <g
              className={`node site-${
                node.data.t &&
                node.data.t.s &&
                !isBoundTriple(node.data.t)
                  ? node.data.t.s
                  : 'reserved'
              }`}
              transform={`translate(${node.x},${node.y})`}
            >
              <circle className="base" />
              <text className="content">{node.data.e || ''}</text>
              <text className="position">{
                node.data === tree.root
                  ? ''
                  : `${node.data.t.p}`
              }</text>
            </g>
          )}
        </g>
      </g>
    </svg>
  );
};

export default TreeViz;
