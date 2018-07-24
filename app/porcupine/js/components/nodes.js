import React, { Fragment } from 'react';

import NodeContainer from '../containers/nodeContainer';


const Nodes = ({ nodes }) => (
	<Fragment>
    {
			nodes.map(node => (
				<NodeContainer
					{...node}
					key={node.id}
				/>
			)
		)}
	</Fragment>
);

export default Nodes;
