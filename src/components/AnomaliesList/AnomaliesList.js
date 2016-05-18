import React, { PropTypes, Component } from 'react';
const { array } = PropTypes;
import styles from './AnomaliesList.scss';
import Reactable from 'reactable';
import blocked from './images/blocked.svg';
import moment from 'moment';

const Table = Reactable.Table;
const unsafe = Reactable.unsafe;
const Tr = Reactable.Tr;

export default class AnomaliesList extends Component {
  static propTypes = {
    anomalies: array,
  };

  constructor(props) {
    super(props);
    this.state = {
      anomalies: props.anomalies ? props.anomalies : [],
    };
    this.colors = {
      0: '',
      1: '#ffeeb2',
      2: '#ffe400',
      3: '#f07742',
      4: '#ff7f00',
      5: '#e72530',
    };
  }

  componentWillReceiveProps(props) {
    if (props.anomalies !== this.state.anomalies) {
      this.setState({
        anomalies: props.anomalies,
      });
    }
  }

  editingData = (data) =>
    data.map((el, idx) => {
      const side = window.innerWidth / 96;
      const confidence =
        `<div style="display: block;">
          <div
            style=display:inline-block;background-color:${this.colors[el.likelihood]};width:10px;height:10px;
          ></div>
          <div  style="display: inline-block;"> ${el.likelihood}</div>
        </div>`;
      return {
        ID: idx + 1,
        Confidence: unsafe(confidence),
        Blocked: el.blocked
          ? unsafe(`<img src=${blocked} alt="stop" height=${side} width=${side}>`)
          : '',
        Date: moment(data.timestamp).format('DD/MM/YYYY'),
        Time: new Date(el.timestamp).toTimeString().split(' ')[0],
        Bus: el.source,
        'Msg.Id': el.messageId,
        Data: el.data.join('-'),
        Category: el.cause,
        'Vehicle Id': el.vehicleId,
        Ruleset: el.rulesetId,
      };
    })

  render() {
    const anomalies = this.state.anomalies;
    return (
      <div className={styles.content}>
        <div className={styles.header}>Anomalies list</div>
        <div className={styles.anomalies}>
          <Table
            className={styles.table}
            data={ this.editingData(anomalies) }
            sortable="true"
            /* filterable={
              [{
                column: 'category',
                filterFunction: (contents, filter) => contents.indexOf(filter) > -1,
              }, {
                column: 'vehicleId',
                filterFunction: (contents, filter) => contents.indexOf(filter) > -1,
              }]
            } */
            itemsPerPage={18}
            pageButtonLimit={1}
          />
        </div>
      </div>
    );
  }
}
