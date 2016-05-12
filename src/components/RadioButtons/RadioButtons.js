import React, { Component, PropTypes } from 'react';
import styles from './RadioButtons.scss';

export default class RadioButtons extends Component {
  static propTypes = {
    names: PropTypes.array.isRequired,
    checked: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChange(event) {
    this.setState({
      checked: event.currentTarget.value,
    });
  }

  renderRadioButton(item, idx) {
    return (
      [<input
        id={ `button-${idx}` }
        className={styles.customRadio}
        name="types"
        type="radio"
        value={ item }
        onChange={ ::this.onChange }
        checked={ this.state.checked === item }
      />,
      <label className={styles.radioButton}
        style={ this.props.style } key={ idx } htmlFor={ `button-${idx}` }
      >
        { item }
      </label>]
    );
  }

  render() {
    return (
      <div>
        {this.props.names.map((item, idx) =>
          this.renderRadioButton(item, idx))}
      </div>
    );
  }
}
