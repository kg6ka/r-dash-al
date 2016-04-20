import React, { Component } from 'react';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.data  = [{
        label: 'home',
        url: '#home',
    }, {
        label: 'about',
        url: '#about'
    }, {
        label: 'contact-us',
        url: '#contact-us'
    },{
        label: 'info',
        url: '#info'
    }];
    
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
    return  <ul className="main-menu">
          {this.data.map((link,i)=>
              <li key={i} >
                  <a href={link.url} > {link.label} </a>
                  { this.renderSubMenu(link.items,'child') }
              </li>
          )}
      </ul>;
  }
}
