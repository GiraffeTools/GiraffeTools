import React, { Fragment } from 'react';

import LinkContainer from '../containers/linkContainer';


const Links = ({ links }) => (
	<Fragment>
    {
			links.map(link => (
				<LinkContainer
					{...link}
					key={link.id}
				/>
			)
		)}
	</Fragment>
);

export default Links;
