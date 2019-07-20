import React, {Fragment} from 'react';

import Node from '../../containers/node';

const Nodes = ({nodes}) => (
  <Fragment>
    {nodes && nodes.map((node) => <Node {...node} key={node.id} />)}
  </Fragment>
);

export default Nodes;
