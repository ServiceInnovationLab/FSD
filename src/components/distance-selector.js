import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const radiusOptions = ['10', '25', '50', '100'];
export default class DistanceSelector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    currentRadius: PropTypes.string.isRequired,
    handleRadiusChange: PropTypes.func.isRequired
  };

  handleChange = function(e) {
    this.props.handleRadiusChange(e.currentTarget.value)
  }

  render() {
    const {
      currentRadius
    } = this.props;

    return (
      <div>
        <label className="small-label d-block">Distance (km)</label>
        <ToggleButtonGroup
          value={currentRadius}
          onChange={this.handleChange}
          exclusive>
          {
            radiusOptions.map(option => {
              return(
                <ToggleButton value={option}
                key={'button-' + option}
                >
                  {option}
                </ToggleButton>
              )
            })
          }
        </ToggleButtonGroup>
      </div>
    )
  }
}
