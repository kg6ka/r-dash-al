import React, { Component, PropTypes } from 'react';
import styles from '../../HeaderSite.scss';

export default class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.data = [{
      label: 'germany',
      url: '#home',
      icon: 'Germany.png',
      items: [
        { label: 'Germany', action: '', icon: 'Germany.png' },
        { label: 'Israel', action: '', icon: 'Germany.png' },
      ],
    }, {
      label: 'polo 2016',
      url: '#about',
      icon: 'polo-logo.png',
      items: [
        { label: 'Polo 2016', action: '' },
        { label: 'Golf 2016', action: '' },
      ],
    }, {
      label: 'last 10 minutes:',
      url: '#contact-us',
      icon: 'data.png',
      items: [
        { label: 'last month', action: '1m' },
        { label: 'last week', action: '1w' },
        { label: 'last 24 hrs', action: '1d' },
        { label: 'last 1 hour', action: '1h' },
        { label: 'last 10 minutes', action: '10m' },
      ],
    },
  ];}

  handlerAction(item) {
    if (item === undefined) return;
    location.hash = item.action;
    this.data[2].label = `${item.label}:`;
  }

  renderSubMenu(list, stepClass) {
    return (
      <ul className={styles[stepClass]}>
        { list.map((item, i) =>
          <li key={i} >
            <a onClick={ this.handlerAction.bind(this, item) } >
              {item.label}
            </a>
          </li>
        )}
      </ul>
    );
  }

  render() {
    return (
      <ul className={styles.mainMenu}>
        { this.data.map((link, i) =>
          <li key={i} >
            <a className={link.label}>
              <img alt="icon" src={`/assets/images/menu-icons/${link.icon}`} />
              {link.label}
            </a>
            { link.items ? this.renderSubMenu(link.items, 'child') : null }
          </li>
        )}
      </ul>
    );
  }
}
