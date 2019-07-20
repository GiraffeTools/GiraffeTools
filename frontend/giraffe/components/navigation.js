import React, {Fragment, useState} from 'react';
import Container from 'react-bootstrap/Container';

import NavMenu from '../containers/navMenu';
import styles from '../styles/navigation.js';

const Navigation = () => {
  const [open, toggleNavigation] = useState(false);
  return (
    <Container>
      <img
        style={styles.navTriangle}
        src={'/static/img/nav_triangle.svg'}
        onClick={() => toggleNavigation(!open)}
        aria-controls="collapse-menu"
        aria-expanded={open}
      />

      <Container
        style={{
          ...styles.navMenu,
          ...styles.navMenu[open ? 'open' : 'closed'],
        }}
      >
        <NavMenu />
      </Container>
    </Container>
  );
};
export default Navigation;
