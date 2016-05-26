import React, { Component, PropTypes } from 'react';
import styles from '../../HeaderSite.scss';

export default class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      country: 0,
      last: 0,
    };
    this.data = [{
      label: 'germany',
      url: '#home',
      icon: 'Germany.png',
      type: 'country',
      items: [
        {label: 'Germany', action: '', icon: 'Germany.png'},
        {label: 'Israel', action: '', icon: 'Germany.png'},
      ],
    }, {
      label: 'last 10 minutes:',
      url: '#contact-us',
      icon: 'data.png',
      type: 'last',
      items: [
        {label: 'last month', action: '1m'},
        {label: 'last week', action: '1w'},
        {label: 'last 24 hrs', action: '1d'},
        {label: 'last 1 hour', action: '1h'},
        {label: 'last 10 minutes', action: '10m'},
      ]
    }
    ];
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

  componentWillReceiveProps(props) {
    if (props.tags.length !== this.props.tags.length) {
      this.setState({
        index: 0,
      });
    }
  }

  renderTagMenu(data) {
    if(!data.length) return;
    return <li className={styles['polo 2016']}>
      <a className='polo 2016'>
        <img src='/assets/images/menu-icons/polo-logo.png' />
        {this.props.tags[this.state.index].name}
      </a>
      <ul className={styles.child}>
        {data.map((item,i) =>
            <li key={i} >
              <a  onClick={ ::this.changeItemMenu.bind(this, item, i) }>
                {item.name}
              </a>
            </li>
        )}
      </ul>
    </li>;
  }

  changeItemMenu(item, index) {
    this.props.changeTag(item.tagId);
    history.replaceState(null, '', `/${this.props.currentName}/${item.tagId}`);
    this.setState({
      index,
    });
  }

  render() {
    return  <ul className={styles.mainMenu}>
      { this.renderTagMenu(this.props.tags) }
          {this.data.map((link,i)=>
              <li key={i} >
                  <a  className={link.label}>
                    <img src={`/assets/images/menu-icons/${link.icon}`}/>
                    { link.items[this.state[link.type]].label }
                  </a>
                  { this.renderSubMenu(link.items, 'child', link.type) }
              </li>
          )}
      </ul>;
  }
}
