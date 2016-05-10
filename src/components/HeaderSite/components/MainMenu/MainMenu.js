import React, { Component } from 'react';
import styles from '../../HeaderSite.scss';

export default class MainMenu extends Component {
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
          {label: 'last month', action:'dataFrom:6h' },
          {label: 'last week', action:'dataFrom:1h' },
          {label: 'last 24 hrs', action:'dataFrom:10m' },
          {label: 'last 1 hour', action:'dataFrom:30s' },
          {label: 'last 10 minutes', action:'dataFrom:5s' },
        ]
    }
  ]

  }


  handlerAction(item){
	if(item == undefined) return;
	
 	let action_name = item.action.split(":")[0];
 	let params = item.action.split(":");
 	params.shift(1);
	switch(action_name) {
		case "dataFrom":
          argusComponents.dataFrom = params[0];
          this.data[2].label = item.label + ":";
        break;
	}
	this.setState({index:0});	
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
