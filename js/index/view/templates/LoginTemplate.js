//const Template = require('./Template');

import Template from "./Template.js";
 
export default class LoginTemplate extends Template {
    constructor(parent, txt_header, txt_btn){
        super(parent);
        this.txt_header = txt_header;
        this.txt_btn = txt_btn;
    }
    create() {
        if(!this.parent) { 
            console.log(`parent selector wasn't found at ${this.constructor.name}`); return;
        }; 
        
        this.parent.innerHTML = `
        <div class="login__wrapper">
         <div class="initial-login__wrapper">
             <div class="initial-login__container scale-down">
                 <h1 class="initial-login__logo">Waiter</h1>
                 <h4 class="h4">${this.txt_header}</h4>
                 <form id="signInForm" class="initial-login">
                     <div class="initial-login__container_inner">
                         <div class="initial-login__input-wrapper">
                             <label class="initial-login__label" for="email">Your Login (email/username)</label>
                             <input type="text" name="email" id="email" autocomplete="current-password"/>
                             <div class="initial-login__notification" id="notify-email">!</div>
                         </div>
                         <div class="initial-login__input-wrapper">
                             <label class="initial-login__label" for="password">Your Password</label>
                             <input type="password" name="password" id="password" autocomplete="current-password"/>
                             <div class="initial-login__notification" id="notify-password">!</div>
                         </div>
                         <div class="initial-login__submit">
                             <input type="submit" class="btn btn-submit" value="LogIn"/>
                         </div>
                     </div>
                 </form>
             </div>
             <div class="initial-login__change-option">${this.txt_btn}</div></div>
         </div>
     </div>
     `;

        this.listeners.forEach( obj => {
            const selector = document.querySelector(obj.selector)
            if(!selector) { console.log(`selector ${selector} wasn't found.`); return; }
            selector.addEventListener(obj.listener, obj.callback)
        });
        
        setTimeout( () => {
            let container = document.querySelector('.initial-login__container');
            container.classList.remove('scale-down');
        },300);

    };
}

//module.exports = LoginTemplate;