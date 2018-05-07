import PropTypes from 'prop-types';
import React from 'react';
import Field from './field';
import data from './data';

class SetParams extends React.Component {
  constructor(props) {
    super(props);
    this.changeParams = this.changeParams.bind(this);
    this.changeProps = this.changeProps.bind(this);
    this.trainOnly = this.trainOnly.bind(this);
    this.close = this.close.bind(this);
  }
  changeProps(prop, value) {
    const net = this.props.net;
    let layer = net[this.props.selectedLayer];
    layer = JSON.parse(JSON.stringify(layer));
    layer.props[prop] = value;
    this.props.modifyLayer(layer);
  }
  changeParams(para, value) {
    const net = this.props.net;
    let layer = net[this.props.selectedLayer];
    layer = JSON.parse(JSON.stringify(layer));
    layer.params[para] = [value, false];
    this.props.modifyLayer(this.props.adjustParameters(layer, para, value));
  }
  close() {
    this.props.changeSelectedLayer(null);
  }
  trainOnly(e) {
    if (e.target.checked) {
      this.props.trainOnly();
    }
  }
  render() {
    if (this.props.selectedLayer) {
      const params = [];
      const props = [];
      const layer = this.props.net[this.props.selectedLayer];

      let trainOnlyCheckBox = null;
      if (this.props.selectedPhase === 0) {
        trainOnlyCheckBox = (
          <div style={{display: "flex"}}>
            <label className="sidebar-heading" style={{fontSize:"0.85em"}}>
              TRAIN ONLY
            </label>
            <div className="paramsCheckbox">
              <input
                type="checkbox"
                onChange={this.trainOnly}
                id="trainOnlyCheckBox"
              />
              <label htmlFor={"trainOnlyCheckBox"}></label>
            </div>
          </div>
        );
      }

      Object.keys(data[layer.info.type].params).forEach(param => {
        if (param != 'caffe'){
          params.push(
            <Field
              id={param}
              key={param}
              data={data[layer.info.type].params[param]}
              value={layer.params[param][0]}
              disabled={((layer.info.phase === null) && (this.props.selectedPhase === 1) && (data[layer.info.type].learn)) ||
                (layer.params[param][1])}
              changeField={this.changeParams}
            />
          );
        }
      });

      Object.keys(data[layer.info.type].props).forEach(prop => {
        props.push(
          <Field
            id={prop}
            key={prop}
            data={data[layer.info.type].props[prop]}
            value={layer.props[prop]}
            disabled={(layer.info.phase === null) && (this.props.selectedPhase === 1) && (data[layer.info.type].learn)}
            changeField={this.changeProps}
          />
        );
      });


      return (
        <div className="setparams setparamsActive" >

          <div className="setHead">
            <h5 className="sidebar-heading">LAYER SELECTED</h5>
            <h4>{layer.props.name}</h4>
            <span className="glyphicon glyphicon-remove-sign closeSign" onClick={() => this.close()} aria-hidden="true"></span>
          </div>
          <div className="setContain">
            <form className="form-horizontal">
              {props}
            </form>
            <form className="form-horizontal">
              {params}
            </form>
            <br/>
            {trainOnlyCheckBox}
            <br/>
            <button
              type="button"
              className="btn btn-block deleteLayerButton sidebar-heading"
              disabled={(layer.info.phase === null) && (this.props.selectedPhase === 1) && (data[layer.info.type].learn)}
              onClick={() => this.props.deleteLayer(this.props.selectedLayer)}
            >
              DELETE LAYER
            </button>
          </div>
        </div>
      );
    } else {
      let copyTrainButton = null;
      if (this.props.selectedPhase === 1) {
        copyTrainButton = (
          <button
            className="btn btn-primary"
            onClick={this.props.copyTrain}
            style={{ marginLeft: '80px' }}
          >
            Copy train net
          </button>
        );
      }

      return (
        <div className="col-md-3 setparams" >
          <div className="setHead" style={{ color: 'white' }}>
            Settings
          </div>
          <div style={{ padding: '30px' }}>
            select a layer to set its parameters
          </div>
          {copyTrainButton}
        </div>
    );
    }
  }
}

SetParams.propTypes = {
  selectedLayer: PropTypes.string,
  net: PropTypes.object,
  deleteLayer: PropTypes.func,
  modifyLayer: PropTypes.func,
  adjustParameters: PropTypes.func,
  trainOnly: PropTypes.func,
  selectedPhase: PropTypes.number,
  copyTrain: PropTypes.func,
  changeSelectedLayer: PropTypes.func
};

export default SetParams;
