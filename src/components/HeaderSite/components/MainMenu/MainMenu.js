import React, { Component, PropTypes } from 'react';
const { func, string, number, array } = PropTypes;
import styles from '../../HeaderSite.scss';
import logo from '../../images/menu-icons/polo-logo.png';
import Israel from '../../images/menu-icons/Israel.png';
import Germany from '../../images/menu-icons/Germany.png';
import dataImg from '../../images/menu-icons/data.png';

export default class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  static propTypes = {
    changeTag: func,
    currentName: string,
    currentTag: number,
    tags: array,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      country: 0,
      last: 4,
    };
    this.data = {
      country: {
        label: 'country',
        url: '#home',
        type: 'country',
        items: [
          { label: 'Germany', action: '', icon: Germany },
          { label: 'Israel', action: '', icon: Israel },
        ],
      },
      filter: {
        label: 'last 10 minutes:',
        url: '#contact-us',
        type: 'last',
        items: [
          { label: 'last month', action: '1m' },
          { label: 'last week', action: '1w' },
          { label: 'last 24 hrs', action: '1d' },
          { label: 'last 1 hour', action: '1h' },
          { label: 'last 10 minutes', action: '10m' },
        ],
      },
    };
  }

  componentWillReceiveProps(props) {
    if (props.tags.length !== this.props.tags.length) {
      this.setState({
        index: 0,
      });
    }
  }

  handlerAction(item, type, index) {
    if (item === undefined) return;
    if (type === 'last') {
      location.hash = item.action;
    }
    this.setState({
      [type]: index,
    });
  }

  changeItemMenu(item, index) {
    this.props.changeTag(item.tagId);
    history.replaceState(null, '', `/${this.props.currentName}/${item.tagId}`);
    this.setState({
      index,
    });
  }

  renderTagMenu(data) {
    return (
      <li className={styles['polo 2016']}>
        <a className="polo 2016">
          <img alt="logo" src={ logo } />
          {this.props.tags[this.state.index].name}
        </a>
        <ul className={styles.child}>
          { data.map((item, i) =>
            <li key={i} >
              <a onClick={ ::this.changeItemMenu.bind(this, item, i) }>
                {item.name}
              </a>
            </li>
          ) }
        </ul>
      </li>
    );
  }

  renderSubMenu(list, stepClass, type) {
    return (
      <ul className={styles[stepClass]}>
        { list.map((item, i) =>
          <li key={i} >
            <a onClick={ this.handlerAction.bind(this, item, type, i) } >
              { item.label }
            </a>
          </li>
        )}
      </ul>
    );
  }

  renderDropdown(data) {
    const icon = data.label === 'country'
      ? data.items[this.state.country].icon
      : dataImg;
    return (
      <li>
        <a className={data.label}>
          <img
            alt="icon"
            src={ icon }
          />
          { data.items[this.state[data.type]].label }
        </a>
        { this.renderSubMenu(data.items, 'child', data.type) }
      </li>
    );
  }

  render() {
    return (
      <ul className={styles.mainMenu}>
        { this.renderDropdown(this.data.country) }
        { this.props.tags.length ? this.renderTagMenu(this.props.tags) : null }
        { this.renderDropdown(this.data.filter) }
      </ul>
    );
  }
}
