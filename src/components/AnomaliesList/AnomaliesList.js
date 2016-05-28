import React, { PropTypes, Component } from 'react';
const { array, func, object } = PropTypes;
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
import cx from 'classnames';

const columns = ['ID',
  'Confidence',
  'Blocked',
  'Date',
  'Time',
  'Bus',
  'Msg.Id',
  'Data',
  'Category',
  'Vehicle Id',
  'Ruleset',
];

export default class AnomaliesList extends Component {
  static propTypes = {
    anomalies: array,
    openMapsPopup: func,
    filters: object,
    addFilter: func,
    clearFilter: func,
  };

  constructor(props) {
    super(props);
    const perPage = 16;
    this.state = {
      anomalies: props.anomalies || [],
      openIdx: {
        id: null,
        isShow: false,
      },
      quantity: props.anomalies.length,
      currPage: 0,
      perPage,
      pages: Math.ceil(props.anomalies.length / perPage),
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
    const pages = Math.ceil(quantity / this.state.perPage);
    const currPage = this.state.currPage;

    this.setState({
      anomalies: props.anomalies,
      quantity,
      pages,
      currPage: currPage > pages ? pages - 1 : currPage,
    });
  }

  editingData = (data) => {
    const filters = this.props.filters;

    return data
      .map((el, idx) => {
        const side = window.innerWidth / 96;
        const likelihood = el.likelihood || 4;
        const style = `display:inline-block;background-color:${this.colors[likelihood]};width:10px;height:10px;margin-right:.5em`;
        const confidence =
          `<div style="display: block;">
            <div style=${style}></div>
            ${likelihood}
          </div>`;
        return {
          ID: idx + 1,
          Confidence: confidence,
          Blocked: el.blocked ? `<img src=${blocked} alt="stop" height=${side} width=${side}>` : '',
          Date: moment(el.timestamp).format('DD/MM/YYYY'),
          Time: moment(el.timestamp).format('HH:mm:ss.ms'),
          Bus: el.source,
          'Msg.Id': el.messageId,
          Data: el.data.map(i => {
            const hex = i.toString(16);
            if (hex.toString().length < 2) {
              return `0${hex}`;
            }
            return hex;
          }).join('-').toUpperCase(),
          Category: el.cause,
          'Vehicle Id': el.vehicleId,
          Ruleset: el.rulesetId,
          signals: el.signals,
        };
      })
      .reduce((data, item) => {
        let isOk = true;
        for (const key in filters) {
          if (item[key].toString().search(filters[key]) === -1) {
            isOk = false;
            break;
          }
        }

        return isOk ? [...data, item] : data;
      }, []);
  }

  moreInfo(data) {
    let id = data;
    if (id === this.state.openIdx.id) {
      id = null;
    }

    this.setState({
      openIdx: {
        id,
        isShow: false,
      },
    });
  }

  handleChange(event) {
    this.setState({
      perPage: event.target.value,
      currPage: 0,
    });
  }

  drawPagination(quantity) {
    const { perPage, currPage } = this.state;
    const pages = Math.ceil(quantity / perPage);
    return (
      <div className={styles.pagination}>
        <div className={styles.leftSide}>
          <span style={{ fontSize: '1.5em', marginRight: '.5em' }}>
            1-{ pages }
          </span>
            out of { quantity }
        </div>
        <div className={styles.rightSide}>
          <div className={styles.perpage}>
            Rows per page
            <div className={styles.page}>
              <input type="text" value={ perPage } onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <span className={styles.clear}>
            <img src={ trash } alt="trash" style={{ width: '1em' }} />
            Clear filters
          </span>
          <div className={styles.paginator}>
            <div onClick={ ::this.backFive } className={styles.forFive}>
              <img src={ leftArrow } alt="left arrow" style={{ width: '.5em' }} />
              <img src={ leftArrow } alt="left arrow" style={{ width: '.5em' }} />
            </div>
            <div onClick={ ::this.drawPrevPage } className={styles.pager}>
              <img src={ leftArrow } alt="left arrow" style={{ width: '.5em' }} />
            </div>
            <div className={styles.page}>{ currPage + 1 }</div>
            of { pages }
            <div onClick={ ::this.drawNextPage } className={styles.pager}>
              <img src={ rightArrow } alt="right arrow" style={{ width: '.5em' }} />
            </div>
            <div onClick={ ::this.forwardFive } className={styles.forFive}>
              <img src={ rightArrow } alt="right arrow" style={{ width: '.5em' }} />
              <img src={ rightArrow } alt="right arrow" style={{ width: '.5em' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  backFive() {
    let nextPage = this.state.currPage - 5;
    if (nextPage < 0) {
      nextPage = 0;
    }
    this.setState({
      currPage: nextPage,
    });
  }

  forwardFive() {
    let nextPage = this.state.currPage + 5;
    if (nextPage > this.state.pages) {
      nextPage = this.state.pages;
    }
    this.setState({
      currPage: nextPage,
    });
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

  filterColumn(event) {
    this.props.setFilter(event.target.name, event.target.value);
  }
  clearFilter (event) {
    this.props.clearFilter();
  }
  renderSearch () {
    const isEmpty = Object.keys(this.props.filters).length === 0;
    return (
      <tr>
        <td>
          <img src={ filter } onClick={this.clearFilter.bind(this)} alt="filter" style={{ width: '1em' }} />
        </td>
        {columns.map(item => {
          if (isEmpty) {
            return (
              <td>
                <input
                  type="search"
                  name={item}
                  value=""
                  className={styles.searchInput}
                  onChange={this.filterColumn.bind(this)}/>
              </td>)
          } else {
            return (
              <td>
                <input
                  type="search"
                  name={item}
                  className={styles.searchInput}
                  onChange={this.filterColumn.bind(this)}/>
              </td>)
          }
        })}
      </tr>
    );
  }
  showAllSignals() {
    this.setState({
      openIdx: {
        id: this.state.openIdx.id,
        isShow: !this.state.openIdx.isShow,
      },
    });
  }

  signalValuesRender(item) {
    return (<div className={styles.singleSignal}>
      <div>
        <img
          className={styles.signalIcon}
          src={ signal }
          alt="signal"
          />
        CamZoomActiveState = {item.name}
      </div>
      <div>
        <img
          className={styles.prevIcon}
          src={ previous }
          alt="previous"
          />
        Previous Value = <span style={{ color: 'red' }}>{item.value}</span>
      </div>
    </div>);
  }

  render() {
    const { openIdx, currPage, perPage } = this.state;
    const anomalies = this.editingData(this.state.anomalies);
    const start = currPage * perPage;
    const end = start + this.state.perPage;

    return (
      <div className={styles.content}>
        <div className={styles.header}>Anomalies list</div>
        <div className={styles.anomalies}>
          { this.drawPagination(anomalies.length) }
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
              { this.renderSearch() }
            </thead>
            <tbody>
              { anomalies.slice(start, end).map((i, idx) =>
                [<tr key={ idx } onClick={ this.moreInfo.bind(this, idx) }>
                  <td className={ openIdx.id === idx ? styles.openArrow : styles.hideArrow }>></td>
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
                <tr className={ openIdx.id === idx ? styles.moreInfo : styles.hideInfo }>
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
                      <div className={cx({
                        [styles.camZoom]: true,
                        [styles.camZoomOne]: !openIdx.isShow,
                      })}>
                        { (openIdx.id === idx && openIdx.isShow) ?
                          i.signals.map((item) => this.signalValuesRender(item)) :
                          this.signalValuesRender(i.signals[0]) }
                      </div>
                    </div>
                    <a href="#" onClick={ this.showAllSignals.bind(this, i) }>Show all</a>
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
