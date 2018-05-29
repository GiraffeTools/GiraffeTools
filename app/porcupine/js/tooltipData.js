import PropTypes from 'prop-types';
import React from 'react';

class tooltipData extends React.Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
      }
    change(e) {
        const type = this.props.data.type
        if (type === 'checkbox') {
          this.props.changeField(e.target.checked);
        } else if (type === 'number') {
          this.props.changeField(Number(e.target.value));
        } else {
          this.props.changeField(e.target.value);
        }
    }
    render() {
        const type = this.props.data.type;
        let inputElement;
        if (type === 'checkbox'){
            inputElement = this.props.value ? 'True' : 'False';
        } else{
            inputElement = this.props.value;
        }

        return (
            <div className="tooltipData">
              <p className="tooltipLabel">{this.props.data.name}:</p>
              <p className="tooltipField">{inputElement}</p>
            </div>
        );
    }
}

tooltipData.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    changeField: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    disabled: PropTypes.bool
  };
  
export default tooltipData;
  