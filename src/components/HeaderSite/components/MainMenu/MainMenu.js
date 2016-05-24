import React, { Component, PropTypes } from 'react';
import styles from '../../HeaderSite.scss';

export default class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.data = [{
      label: 'germany',
      url: '#home',
      icon: 'Germany.png',
      items: [
        {label: 'Germany', action: '', icon: 'Germany.png'},
        {label: 'Israel', action: '', icon: 'Germany.png'},
      ],
    }, {
      label: 'last 10 minutes:',
      url: '#contact-us',
      icon: 'data.png',
      items: [
        {label: 'last month', action: '6h'},
        {label: 'last week', action: '1h'},
        {label: 'last 24 hrs', action: '10m'},
        {label: 'last 1 hour', action: '30s'},
        {label: 'last 10 minutes', action: '5s'},
      ]
    }
    ];
  }

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
              <a  onClick={ ::this.changeItemMenu.bind(this, i) }>
                {item.name}
              </a>
            </li>
        )}
      </ul>
    </li>;
  }

  changeItemMenu(index) {
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
                    {link.label}
                  </a>
                  { this.renderSubMenu(link.items,'child') }
              </li>
          )}
      </ul>;
  }
}
