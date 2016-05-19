import React, { Component, PropTypes } from 'react';
import styles from '../../HeaderSite.scss';

export default class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {index:0}
    this.data  = [{
        label: 'germany',
        url: '#home',
        icon: 'Germany.png',
        items:[
          {label: 'Germany', action:'', icon: 'Germany.png', },
          {label: 'Israel', action:'', icon: 'Germany.png', }
        ]
    }, {
        label: 'polo 2016',
        url: '#about',
        icon: 'polo-logo.png',
		items:[
          {label: 'Polo 2016', action:'' },
          {label: 'Golf 2016', action:'' }
        ]
    }, {
        label: 'last 10 minutes:',
        url: '#contact-us',
        icon: 'data.png',
        items:[
          {label: 'last month', action:'6h' },
          {label: 'last week', action:'1h' },
          {label: 'last 24 hrs', action:'10m' },
          {label: 'last 1 hour', action:'30s' },
          {label: 'last 10 minutes', action:'5s' },
        ]
    }
  ]

  }


  handlerAction(item){
	  if(item == undefined) return;

    this.context.router.push(`/anomalies/${item.action}`);
  }

  renderSubMenu(list,stepClass) {
    if(!list) return;

    return <ul className={styles[stepClass]}>
            {list.map((item,i)=>
              <li key={i} >
                <a onClick={(event)=>this.handlerAction(item)} >
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
