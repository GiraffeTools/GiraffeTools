import React, { useState } from 'react';
import {StyleRoot} from 'radium';

import Code from './code';
import styles from '../../styles/codeEditor';

require('../../scss/code.scss');

const CodeEditor = (props) => {

  const [open, toggle] = useState(false);
  const {
    setActiveTab,
    nodes,
    links,
    languages,
    activeTab,
    grammars,
  } = props;
  const currentTab = activeTab || languages[0];

  return (
    <StyleRoot
      style={[
        styles.codeWindow,
        !open && styles.codeWindow.closed,
        open && styles.codeWindow.withSidebar,
      ]}
    >
      <div>
        <div
          style={[styles.codeButton]}
          // #TODO replace this with react-icons/fa
          className={'fas ' + (open ? 'fa-angle-down' : 'fa-angle-up')}
          onClick={() => toggle(!open)}
        />
        <nav style={[styles.codeNav]}>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {languages.map((language) => (
              <a
                style={[
                  styles.codeNavItem,
                  language === currentTab && styles.codeNavItem.active,
                ]}
                className="nav-item nav-link"
                key={`nav-${language}-tab`}
                id={`nav-${language}-tab`}
                data-toggle="tab"
                role="tab"
                aria-controls={`nav-${language}`}
                aria-selected="true"
                onClick={() => setActiveTab(language)}
              >
                {language}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div>
        <div style={[styles.navTabContent]} className="tab-content">
          {languages.map((language) => (
            <div
              key={`nav-${language}-panel`}
              className={
                'tab-pane' + (language === currentTab ? ' show active' : '')
              }
              id={`nav-${language}`}
              role="tabpanel"
              aria-labelledby={`nav-${language}-tab`}
            >
              <Code
                grammar={grammars.find((g) => g.language == language)}
                nodes={nodes}
                links={links}
              />
            </div>
          ))}
        </div>
      </div>
    </StyleRoot>
  );
}

export default CodeEditor;
