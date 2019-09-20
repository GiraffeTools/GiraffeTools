import React, {useState} from 'react';

import Code from './code';

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
    <div
      className={'codeWindow ' + (open ? 'withSidebar' : 'closed')}
    >
      <div
        // #TODO replace this with react-icons/fa
        className={'codeButton fas ' + (open ? 'fa-angle-down' : 'fa-angle-up')}
        onClick={() => toggle(!open)}
      />
      <nav className="codeNav">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {languages.map((language) => (
            <a
              className={"codeNavItem nav-item nav-link " + (language === currentTab ? "bla" : "")}
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
      <div className="tab-content navTabContent">
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
  );
};

export default CodeEditor;
