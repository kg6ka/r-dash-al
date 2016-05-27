import React, { PropTypes, Component } from 'react';
const { array, func } = PropTypes;
import styles from './AnomaliesList.scss';
import blocked from './images/blocked.svg';
import signal from './images/signal.svg';
import previous from './images/previous.svg';
import filter from './images/filter.svg';
import trash from './images/trash.svg';
import leftArrow from './images/left_arrow.svg';
import rightArrow from './images/right_arrow.svg';
import moment from 'moment';
import { connect } from 'react-redux';
import { openMapsPopup } from 'redux/modules/mapsPopup';
import { bindActionCreators } from 'redux';

export default class AnomaliesList extends Component {
  static propTypes = {
    anomalies: array,
    openMapsPopup: func,
  };

  constructor(props) {
    super(props);
    this.perPage = 16;
    this.state = {
      anomalies: props.anomalies || [],
      openIdx: null,
      quantity: props.anomalies.length,
      currPage: 0,
      pages: Math.ceil(props.anomalies.length / this.perPage),
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
    if (props.anomalies.length === this.props.anomalies.length) {
      return;
    }

    const quantity = props.anomalies.length;
    const pages = Math.ceil(quantity / this.perPage);
    const currPage = this.state.currPage;

    this.setState({
      anomalies: props.anomalies,
      quantity,
      pages,
      currPage: currPage > pages ? pages - 1 : currPage,
    });
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
        Data: el.data.map(i => {
          const hex = i.toString(16);
          if (hex.toString().length < 2) {
            return `0${hex}`;
          }
          return hex;
        }
        ).join('-').toUpperCase(),
        Category: el.cause,
        'Vehicle Id': el.vehicleId,
        Ruleset: el.rulesetId,
      };
    })

  moreInfo(data) {
    let openIdx = data;
    if (openIdx === this.state.openIdx) {
      openIdx = null;
    }
    this.setState({
      openIdx,
    });
  }

  drawPagination() {
    const { pages, quantity, currPage } = this.state;
    return (
      <div className={styles.pagination}>
        <div className={styles.leftSide}>
          <span style={{ fontSize: '1.5em', marginRight: '.5em' }}>
            1-{ pages }
          </span>
            out of { quantity }
        </div>
        <div className={styles.rightSide}>
          <span className={styles.clear}>
            <img src={ trash } alt="trash" style={{ width: '1em' }} />
            Clear filters
          </span>
          <div className={styles.paginator}>
            <div onClick={ ::this.drawPrevPage } className={styles.pager}>
              <img src={ leftArrow } alt="left arrow" style={{ width: '.5em' }} />
            </div>
            <div className={styles.page}>{ currPage + 1 }</div>
            of { pages }
            <div onClick={ ::this.drawNextPage } className={styles.pager}>
              <img src={ rightArrow } alt="right arrow" style={{ width: '.5em' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  drawNextPage() {
    if (this.state.currPage === this.state.pages) { return; }
    this.setState({
      currPage: this.state.currPage + 1,
    });
  }

  drawPrevPage() {
    if (this.state.currPage <= 0) { return; }
    this.setState({
      currPage: this.state.currPage - 1,
    });
  }

  render() {
    const { anomalies, openIdx, currPage } = this.state;
    const start = currPage * this.perPage;
    const end = start + this.perPage;
    return (
      <div className={styles.content}>
        <div className={styles.header}>Anomalies list</div>
        <div className={styles.anomalies}>
          { this.drawPagination() }
          <div className={styles.tableWraper}>
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
                <td>
                  <img src={ filter } alt="filter" style={{ width: '1em' }} />
                </td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
                <td><input type="search" /></td>
              </tr>
            </thead>
            <tbody>
              { this.editingData(anomalies).slice(start, end).map((i, idx) =>
                [<tr key={ idx } onClick={ this.moreInfo.bind(this, idx) }>
                  <td className={ openIdx === idx ? styles.openArrow : styles.hideArrow }>></td>
                  <td>{i.ID}</td>
                  <td dangerouslySetInnerHTML={{ __html: i.Confidence }}></td>
                  <td dangerouslySetInnerHTML={{ __html: i.Blocked }}></td>
                  <td>{i.Date}</td>
                  <td>{i.Time}</td>
                  <td>{i.Bus}</td>
                  <td>{i['Msg.Id']}</td>
                  <td>{i.Data}</td>
                  <td>{i.Category}</td>
                  <td>{i['Vehicle Id']}</td>
                  <td>{i.Ruleset}</td>
                </tr>,
                <tr className={ openIdx === idx ? styles.moreInfo : styles.hideInfo }>
                  <td colSpan="12" className={styles.detail}>
                    <div className="wrapper">
                      <div className={styles.msgTitle}>Message {i['Msg.Id']}</div>
                      <div className={styles.msgRow}>
                        <div>
                          <span className={styles.namespan}>{'Name  |'}</span>
                          {'  PLA_Status_01' }
                        </div>
                        <div>
                          <span className={styles.namespan}>{'Interval  |'}</span>
                          {'  4ms.' }
                        </div>
                        <div>
                          <span className={styles.namespan}>{'Type  |'}</span>
                          {'  Event periodic' }
                        </div>
                        <div>
                          <span className={styles.namespan}>{'ECU  |'}</span>
                          {'  Tmnt version 4.7.1.04' }
                        </div>
                        <div>
                          <span className={styles.namespan}>{'Location | '}</span>
                          <span
                            className={styles.location}
                            onClick={ this.props.openMapsPopup }
                          >
                            {'Wolfsburg'}
                          </span>
                        </div>
                      </div>
                      <div className={styles.signalTitle}>Signal Values 1<span>/</span>20</div>
                      <div className={styles.camZoom}>
                        <div>
                          <img
                            className={styles.signalIcon}
                            src={ signal }
                            alt="signal"
                          />
                          CamZoomActiveState = 0
                        </div>
                        <div>
                          <img
                            className={styles.prevIcon}
                            src={ previous }
                            alt="previous"
                          />
                          Previous Value = <span style={{ color: 'red' }}>245</span>
                        </div>
                      </div>
                    </div>
                    <a href="#">Show all</a>
                  </td>
                </tr>]
              ) }
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ mapsPopup }) => ({ mapsPopup }),
    dispatch => bindActionCreators({
      openMapsPopup,
    }, dispatch)
)(AnomaliesList);
