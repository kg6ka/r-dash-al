import React, { Component } from 'react';
import styles from '../../HeaderSite.scss';


export default class ToggleMenu extends Component {
  constructor(props) {
    super(props);
    this.data  = [
      {
        label: 'Main',
        url: '/dashboard'
      },{
        label: 'Reports',
        url: '/reports',
        items:[
           {label: 'Logs',url: '#home'}
          ,{label: 'Events',url: '#home'}
          ,{label: 'Histogram Graph',url: '#home'}      
        ]
      },{
        label: 'Configuration',
        url: '/dashboard',
        items:[
           {label: 'Group Parameters',url: '#home'}
          ,{label: 'Group Config',url: '#home'}
          ,{label: 'Ruleset Edit',url: '#home'}
          ,{label: 'Firmware Upload',url: '#home'}    
        ]
      },{
        label: 'Admin',
        url: '/dashboard',
        items:[
           {label: 'CRUD',url: '#home'}
          ,{label: 'Alerts and Reports',url: '#home'}
          ,{label: 'App Config',url: '#home'}
          ,{label: 'User Management',url: '#home'}
          ,{label: 'Logout ({{userName}})',url: '#home'}    
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
                <a href={item.url}>
                  {item.label}
                </a>
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
                  <a href={link.url}>{link.label}</a>
                  { this.renderSubMenu(link.items,'child') }
              </li>
          )}
      </ul></div>
	</div>;
  }
}
