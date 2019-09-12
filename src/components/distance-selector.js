import React, { Component } from 'react';
import PropTypes from 'prop-types';

const radiusOptions = ['10', '25', '50', '100'];
export default class DistanceSelector extends Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    updateSearchParams: PropTypes.func.isRequired
  };

  render() {
    const {
      initialValue,
      updateSearchParams,
    } = this.props;

    return (<div className="radio-group">
      <fieldset className="radius-fieldset">
        <legend>Distance (km):</legend>
          {radiusOptions.map(radius => {
            return (
              <label className="radius-label" key={radius}>
                <button
                  className={radius === initialValue ? 'radius-button--selected' : 'radius-button'}
                  type="button"
                  name="radius"
                  value={radius}
                  onClick={()=> updateSearchParams({radius: radius})
                  }
                >{radius}</button>
              </label>
            );
          })}
      </fieldset>
    </div>)
  }
}
