import React, { Fragment } from 'react';

import PortContainer from '../containers/portContainer';


const Ports  = ({ ports }) => {
  ports = ports.filter(port => port.isVisible == true);;
  if (!ports || ports.length == 0) {
    return (<div/>)
  }
  return (
  	<Fragment>
      {
        ports.map(port => {
          return (
            <PortContainer
              {...port}
              key={port.id}
            />
          )
        })
      }
  	</Fragment>
  );
}

export default Ports;
