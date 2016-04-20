import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './components/MainMenu/MainMenu';

window.MainMenu = MainMenu;

require('./HeaderSite.css');

class HeaderSiteComponent extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<div class="menu-toggle">=</div>
                <a href="#home" class="logo" ><img src="/assets/images/logo.png"/></a>
                <x-react component="MainMenu" props=""></x-react>
                <div class="error">3</div>
                <a href="#home" class="user" ><img src="/assets/images/avatar.png"/></a>`;
    }

}

document.registerElement('header-site', HeaderSiteComponent);


export default HeaderSiteComponent;


class RunReact extends HTMLElement {
    createdCallback() { 
        ReactDOM.render(React.createElement(
            Function("return " + this.getAttribute('component'))(),
            Function("return " + this.getAttribute('props'))()  
        ),this)
    }
}

document.registerElement('x-react', RunReact);

