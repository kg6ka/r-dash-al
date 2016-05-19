import React, { PropTypes, Component } from 'react';
import styles from './AnomaliesList.scss';
import Reactable from 'reactable';

const Table = Reactable.Table;

class AnomaliesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anomalies: [],
    };
  }

  componentWillReceiveProps(props) {
    if (props.anomalies.length !== this.props.anomalies.length) {
      this.setState({
        anomalies: props.anomalies,
      });
    }
  }

  render() {
    return (
      <div className={styles.anomalies}>
        <header>Anomalies</header>
        <Table className="table" data={this.state.anomalies} sortable={true} filterable={[{
          column: 'category',
          filterFunction: (contents, filter) => contents.indexOf(filter) > -1,
        },
        {
          column: 'vehicleId',
          filterFunction: (contents, filter) => contents.indexOf(filter) > -1,
        }]}
          />
      </div>
    );
  }
}

export default AnomaliesList;

