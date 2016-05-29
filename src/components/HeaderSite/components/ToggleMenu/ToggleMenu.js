import React, { Component } from 'react';
import styles from '../../HeaderSite.scss';
import { Link } from 'react-router';
import cx from 'classnames';

export default class ToggleMenu extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        label: 'Main',
        url: '/dashboard',
      }, {
        label: 'Reports',
        url: '',
        items: [
          { label: 'Logs', url: '' },
          { label: 'Events', url: 'anomalies' },
          { label: 'Histogram Graph', url: '' },
        ],
      }, {
        label: 'Configuration',
        url: '/',
        items: [
          { label: 'Group Parameters', url: '' },
          { label: 'Group Config', url: '' },
          { label: 'Ruleset Edit', url: '' },
          { label: 'Firmware Upload', url: '' },
        ],
      }, {
        label: 'Admin',
        url: '/',
        items: [
          { label: 'CRUD', url: '' },
          { label: 'Alerts and Reports', url: '' },
          { label: 'App Config', url: '' },
          { label: 'User Management', url: '' },
          { label: 'Logout', url: '' },
        ],
      },
    ];
    this.state = {
      isOpen: false,
    };
  }

  menuToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderSubMenu(list, stepClass) {
    return (
      <ul className={stepClass}>
        { list.map((item, i) =>
            <li key={i} onClick={::this.menuToggle}>
              <Link to={item.url} activeClassName={styles.currentUrl}>
                { item.label }
              </Link>
            </li>
          )}
      </ul>
    );
  }

  render() {
    const currClasses = cx({
      [styles.menuToggleIcon]: true,
      [styles.open]: this.state.isOpen,
    });
    return (
      <div className={styles.toggleMenu}>
        <div className={currClasses} onClick={::this.menuToggle}></div>
        <div className={styles.toggleMenuContent}>
          <ul className={styles.menuToggle}>
            { this.data.map((link, i) =>
              <li key={i} onClick={::this.menuToggle}>
                <Link to={ link.url } activeClassName={styles.currentUrl}>
                  { link.label }
                  </Link>
                { link.items ? this.renderSubMenu.call(this, link.items, 'child') : null }
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
