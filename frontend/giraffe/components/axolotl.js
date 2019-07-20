import React from 'react';
import Radium from 'radium';

import SeparatorWithOpenCircle from './separatorWithOpenCircle';
import styles from '../styles/axolotl.js';
import componentStyles from '../styles/components.js';

const Axolotl = () => (
  <div className="d-flex justify-content-begin">
    <div className="col-6" style={[styles.collage]}>
      <img
        src="/static/img/rec_axolotl_collage.svg"
        style={[styles.porcupineCollage]}
      />
    </div>
    <div className="col-4 text-left" style={[styles.toolText]}>
      <h3 style={[styles.porcupine]}>Axolotl</h3>
      <SeparatorWithOpenCircle
        color="secondary"
        thickness={'1px'}
        styleOverwrite={{...styles.componentStyles, width: '60%'}}
      />
      <div style={[styles.innerToolText]}>
        <b>A</b>
        {'xolotl e'}
        <b>X</b>
        {'ecutes '}
        <b>O</b> <b>LOT</b> <b>L</b>
        <p>
          Axolotl is the work-in-progress execution platform of GiraffeTools
          workflows
        </p>
      </div>
      <a
        className="btn btn-lg"
        style={[styles.getStarted]}
        role="button"
        href="/axolotl/TimVanMourik/GiraffePlayground/master"
        id="tool-button"
      >
        Get started!
      </a>
    </div>
  </div>
);

export default Radium(Axolotl);
