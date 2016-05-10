import React, { Component } from 'react';
import styles from '../../HeaderSite.scss';


export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.data  = [{
        label: 'germany',
        url: '#home',
        icon: 'Germany.png'
    }, {
        label: 'polo 2016',
        url: '#about',
        icon: 'polo-logo.png'
    }, {
        label: 'last 24 hrs:',
        url: '#contact-us',
        icon: 'data.png',
        items:[
          {label: 'last 24 hrs:', action:'' },
          {label: 'last 12 hrs:', action:'' },
          {label: 'last 5 hrs:', action:'' },
          {label: 'last 1 hrs:', action:'' },
        ]
    }
  ]}

  renderSubMenu(list,stepClass) {
    if(!list) return;

    return <ul className={styles[stepClass]}>
            {list.map((item,i)=>
              <li key={i} >
                <a href={item.url}>
                  {item.label}
                </a>
              </li>
            )}
           </ul>;
  }


  render() {
    return  <ul className={styles.mainMenu}>
          {this.data.map((link,i)=>
              <li key={i} >
                  <a href={link.url} className={link.label}>
                    <img src={`/assets/images/menu-icons/${link.icon}`}/>
                    {link.label}
                  </a>
                  { this.renderSubMenu(link.items,'child') }
              </li>
          )}
      </ul>;
  }
}
