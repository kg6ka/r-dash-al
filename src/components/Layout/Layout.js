import React from 'react';

require('./Layout.css');

class LayoutComponent extends HTMLElement {

    createdCallback() {
        console.log("LayoutComponent");
//         this.innerHTML = this.template();
    }

    template() {
        return `<div class="section-top">

                </div>
                <div class="section-col">

                </div>
                <div class="section-top">

                </div>
                <div class="section-top">

                </div>`;
    }

}

document.registerElement('x-layout', LayoutComponent);


export default LayoutComponent;

