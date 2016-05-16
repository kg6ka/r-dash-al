import React, { Component } from 'react';
import styles from '../../HeaderSite.scss';
import { Link } from 'react-router';

export default class ToggleMenu extends Component {
  constructor(props) {
    super(props);
    this.data  = [
      {
        label: 'Main',
        url: '/dashboard'
      },{
        label: 'Reports',
        url: '',
        items:[
           {label: 'Logs',url: ''}
          ,{label: 'Events',url: 'anomalies'}
          ,{label: 'Histogram Graph',url: ''}      
        ]
      },{
        label: 'Configuration',
        url: '/dashboard',
        items:[
           {label: 'Group Parameters',url: ''}
          ,{label: 'Group Config',url: ''}
          ,{label: 'Ruleset Edit',url: ''}
          ,{label: 'Firmware Upload',url: ''}    
        ]
      },{
        label: 'Admin',
        url: '/dashboard',
        items:[
           {label: 'CRUD',url: ''}
          ,{label: 'Alerts and Reports',url: ''}
          ,{label: 'App Config',url: ''}
          ,{label: 'User Management',url: ''}
          ,{label: 'Logout',url: ''}    
        ]
      }
    ];

  }

  menuToggle(event) {
        var menu_toggle = event.target;
               
    	if(menu_toggle.hasAttribute('open')){
    		document.querySelector('body').classList.add('menu-open');
    	 	menu_toggle.removeAttribute("open");
    	}
		else{
			document.querySelector('body').classList.remove('menu-open');
    	 	menu_toggle.setAttribute("open","");
		}
    }
    


  renderSubMenu(list,stepClass) {
    if(!list) return;

    return <ul className={stepClass}>
            {list.map((item,i)=>
              <li key={i} >
                <Link to={item.url}>
                  {item.label}
                </Link>
              </li>
            )} 
           </ul>; 
  }


  render() {
    return  <div className={styles.toggleMenu}>
        <div className={styles.menuToggleIcon} onClick={this.menuToggle}></div>
        <div className={styles.toggleMenuContent}>
    		<ul className={styles.menuToggle}>{this.data.map((link,i)=>
              <li key={i} >
                  <Link to={link.url}>{link.label}</Link>
                  { this.renderSubMenu(link.items,'child') }
              </li>
          )}
      </ul></div>
	</div>;
  }
}
