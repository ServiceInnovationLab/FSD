import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default class MapListToggle extends Component {
  static propTypes = {
    showMap: PropTypes.bool.isRequired,
    toggleShowMap: PropTypes.func.isRequired,
  };


  render() {
    const {
      showMap,
      toggleShowMap
    } = this.props;

    return (
      <ToggleButtonGroup
        value={showMap}
        onChange={toggleShowMap}
        exclusive
      >
        <ToggleButton value={true}>
          Map
        </ToggleButton>
        <ToggleButton value={false}>
          List
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }
}
