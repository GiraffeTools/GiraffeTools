import React, {Fragment} from 'react';

import Link from '../../containers/link';

const Links = ({links}) => (
  <Fragment>
    {links && links.map((link) => <Link {...link} key={link.id} />)}
  </Fragment>
);

export default Links;
