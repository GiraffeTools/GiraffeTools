import PropTypes from 'prop-types';
import React from 'react';
import PaneHeader from './paneHeader';
import PaneElement from './paneElement';
import nodes from '../static/assets/nipype.json';

class PaneGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  render() {
    const category = this.props.category;
    const divName = category.join('');
    let currentNodes = nodes;
    category.forEach(function (c) {
      currentNodes = currentNodes['categories'][c];
    })

    const subGroups   = currentNodes.categories === undefined ? [] : Object.keys(currentNodes.categories);
    const subElements = currentNodes.nodes      === undefined ? [] : Object.keys(currentNodes.nodes);

    const subgroupList = subGroups.map(function (group) {
      return (
        <PaneGroup
          key = {category.concat(group).join('') + '_key'}
          category = {category.concat(group)}
        />
      )}
    )

    const nodeList = subElements.map(function(element){
      return (
        <PaneElement
          key = {currentNodes['nodes'][element]['title']['name'].toString()}
          category = {category}
          id  = {currentNodes['nodes'][element]['title']['name'].toString()}
        >
          {currentNodes['nodes'][element]['title']['name'].toString()}
        </PaneElement>
      )
    })

    return (
      <div className="panel panel-default">
        <PaneHeader
          name={divName}
          color={currentNodes['colour']}
        />
        <div id={divName} className="panel-collapse collapse" role="tabpanel">
          <div className="panel-group" role="tablist" aria-multiselectable="true">
            {subgroupList}
            {nodeList}
          </div>
        </div>
      </div>
    );
  }
}


PaneGroup.propTypes = {
  // id: PropTypes.string.isRequired,
  // children: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  // nodes: PropTypes.array.isRequired,
  // colourSpacing: PropTypes.number,
  // colourIndex: PropTypes.number
}

export default PaneGroup;
