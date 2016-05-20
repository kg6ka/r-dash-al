import React, { PropTypes, Component } from 'react';
const { array } = PropTypes;
import styles from './AnomaliesList.scss';
// import Reactable from 'reactable';
import blocked from './images/blocked.svg';
import moment from 'moment';
// var Table = require('rc-table');
// require('./rc-table.css');

// const Table = Reactable.Table;
// const unsafe = Reactable.unsafe;
// const Tr = Reactable.Tr;

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
    if (props.anomalies.length !== this.props.anomalies.length) {
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
          <div style=display:inline-block;background-color:${this.colors[el.likelihood]};width:10px;height:10px;
          ></div>
          <div  style="display: inline-block;"> ${el.likelihood}</div>
        </div>`;
      return {
        ID: idx + 1,
        Confidence: confidence,
        Blocked: el.blocked ? `<img src=${blocked} alt="stop" height=${side} width=${side}>` : '',
        Date: moment(data.timestamp).format('DD/MM/YYYY'),
        Time: new Date(el.timestamp).toTimeString().split(' ')[0],
        Bus: el.source,
        'Msg.Id': el.messageId,
        Data: (el.data) && el.data.join('-'),
        Category: el.cause,
        'Vehicle Id': el.vehicleId,
        Ruleset: el.rulesetId,
      };
    })

moreInfo(){
//     if(event.currentTarget.getAttribute('open') != )
//       event.currentTarget.setAttribute('open','')
}
  render() {
    const anomalies = this.state.anomalies;
    return (
      <div className={styles.content}>
        <div className={styles.header}>Anomalies list</div>
        <div className={styles.anomalies}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th># ID</th>
                <th>Confidence</th>
                <th>Blocked</th>
                <th>Date</th>
                <th>Time</th>
                <th>Bus</th>
                <th>Msg.ID</th>
                <th>Data</th>
                <th>Category</th>
                <th>Vehicle ID</th>
                <th>Ruleset</th>
              </tr>
                <tr>
                <td>$</td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
                <td><input type="search"/></td>
              </tr>
            </thead>
            <tbody>
              {(anomalies != undefined ? this.editingData(anomalies) : []).map((i,idx)=>{
               return <tr key={idx} onClick={this.moreInfo}>
                  <td >></td>
                  <td>{i.ID}</td>
                  <td dangerouslySetInnerHTML={{__html:i.Confidence}}></td>
                  <td dangerouslySetInnerHTML={{__html:i.Blocked}}></td>
                  <td>{i.Date}</td>
                  <td>{i.Time}</td>
                  <td>{i.Bus}</td>
                  <td>{i['Msg.Id']}</td>
                  <td>{i.Data}</td>
                  <td>{i.Category}</td>
                  <td>{i['Vehicle Id']}</td>
                  <td>{i.Ruleset}</td>
                  <td className={styles.moreInfo}>
                    <div>{'MessageId '}<span>PLA_Status</span></div>
                    <div>{'Name | ' }</div>
                    <div>{'Inteval | ' }</div>
                    <div>{'Type | ' }</div>
                    <div>{'ECU | ' }</div>
                    <div>{'Location '}</div>
                    <hr/>
                    <div>{'Signal ... ' }</div>
                  </td>
                </tr>
               })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
