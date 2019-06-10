(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const View = require('../view/View');

class Controller {

    getSignInHTML = () => {
        View.getSignInTemplate();
    };

    getSignUpHTML = () => {
        View.getSignInTemplate();
    };

    validateUserInfo = (obj) => {
        console.log(obj)
    //    let formInfo = model.validateUserInfo(obj);
    //    if(formInfo.length > 0 ) { return view.showFormErrors(formInfo) }

    //    view.setLoading();

    //    view.removeDocumentEvListener('click', ['toggleErrorTab', 'toggleLoginMarkup']);
    //    //IMITATE SERVER RESPONSE DELAY
    //     setTimeout(function(){
    //         view.removeLoading();
	// 		view.selectPlace();//HERE THE RECEIVED FROM A SERVER OBJECT SHOULD BE USED
    //     }, 1500)
    };

}

controller = new Controller();

module.exports = controller;


},{"../view/View":3}],2:[function(require,module,exports){
//TODO: SERVER SHOULD HANDLE SIGN IN AND SIGN UP ROUTES TO INDEX.HTML PAGE

// WTR.loginData = {};

// WTR.loginData.loginHTML = {
// 	signUp : {
// 		txt_btn: 'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.',
// 		txt_h4: 'Welcome to Waiter! Please, sign up in order to be served.'
// 	},
// 	signIn : {
// 		txt_btn: 'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.',
// 		txt_h4: 'Nice to meet you again! Please, sign in to be served.'
// 	} 
// };
// WTR.loginData.userSignIn = {
//     email    : '',
//     password : ''
// };

//   WTR.loginData  = require('./loginData');
// WTR.globals.model      = new Model();
// WTR.globals.view       = new View();
// WTR.globals.view       = new View(loginHTML, userSignIn, { loginChecker : toggleErrorTab, loginToggler : toggleLoginMarkup, loginSubmitter : submitLogin });
// WTR.globals.controller = new Controller();
const WTR            = {};
      WTR.controller = require('./controller/Controller');
      WTR.index      = {
        progressBar  : document.getElementById('progressBar'),
        percentage   : document.getElementById('progress-bar__percentage'),
        wrapper      : document.getElementById('wrapper'),
        textContainer: document.getElementById('textContainer'),
        width        : 7.5
      };
    //   WTR.loginData = {};
    //   WTR.loginData.userSignIn = {
    //     email    : '',
    //     password : ''
    //   };
    setTimeout( () => {
        WTR.index.textContainer.parentNode.classList.remove('initial');
    }, 250);

    setTimeout( () => {
        WTR.index.textContainer.parentNode.classList.add('loaded');
    }, 500);

    //////////////////////////////////////////////
    //// SHOW PROGRESS BAR AT THE BEGINNING /////
    ////////////////////////////////////////////
    WTR.index.showProgress = function(width) {
        if(this.width >= 100) {
            this.progressBar.style.width = '100%';
            this.percentage.innerText    = '100';
            this.textContainer.parentNode.classList.add('completed');

            setTimeout( () => {
                WTR.controller.getSignInHTML();
            }, 1000)
        }
        else {
            this.progressBar.style.width = this.width + '%';
            this.percentage.innerText    = this.width;
            this.width += Math.floor(Math.random() * (10 - 1)) + 1;

            setTimeout( () => {
                this.showProgress(this.width);
            }, Math.floor(Math.random() * (100 - 50)) + 50)
        }
    };

    setTimeout(function() {
        return WTR.index.showProgress(WTR.index.width);
    }, 1500);
    /////////////////////////
    /// LOADING BAR END /////
    ////////////////////////

    //////////////////////////////////////////////
    ////// CHANGE SIGN IN && SIGN UP LOGIC //////
    ////////////////////////////////////////////
    // window.addEventListener('popstate', function(event) {
    //     controller.getLoginHTML(event.state);
    // });

    // document.addEventListener('click', toggleLoginMarkup);

    // function toggleLoginMarkup(event){
    //     console.log('clikced toggleLoginMarkup')
    //     if(!event.target.id) return;
    //     if(event.target.id !== 'signUp' && event.target.id !== 'signIn') return;
    //     // event.target.parentNode.classList.add('bounce-animate');
    //     event.target.parentElement.previousElementSibling.classList.add('scale-down');
    //     // history.pushState(loginHTML[event.target.id], '', event.target.id);
    //     setTimeout(function () {
    //         controller.getLoginHTML(loginHTML[event.target.id]);
    //     }, 500);
    // }

    // document.addEventListener('click', toggleErrorTab);

    // function toggleErrorTab(event) {
    //     console.log('clikced toggleErrorTab')
    //     if(!event.target.classList.contains('initial-login__notification')) {
    //         let elem = document.querySelectorAll('.initial-login__notification');
    //         if(elem.length > 0) { elem.forEach(function(elem) {
    //             elem.classList.remove('opened');
    //         })
    //         }
    //         return
    //     }
    //     event.target.classList.toggle('opened');
    // }

    // document.addEventListener('input', function(event) {
    //     if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
    //     userSignIn[event.target.id] = event.target.value;
    // });
	
    // document.addEventListener('submit', submitLogin);

	// function submitLogin(event) {
	// 	event.preventDefault();
	// 	for(let key in userSignIn) {
    //         if(userSignIn.hasOwnProperty(key)) {
    //             window[key].nextElementSibling.classList.remove('error');
    //             window[key].nextElementSibling.innerHTML = '!';
    //         }
    //     }
    //     controller.validateUserInfo(userSignIn);
	// }


},{"./controller/Controller":1}],3:[function(require,module,exports){
////////////////////////////////
// OUTER MODULES PART STARTS //
//////////////////////////////
// const Controller  = require('../controller/Controller'),
const LoginTemplate = require('./templates/LoginTemplate');
////////////////////////////////
// OUTER MODULES PART ENDS ////
//////////////////////////////

class View {	
	constructor() {
		this.wrapper         = document.getElementById('wrapper');
		this.shadowContainer = document.createElement('div');
		//////////////////////////
		/// LOGIN PART STARTS ///
		////////////////////////
		this.loginSignInTemplate = new LoginTemplate(
			this.wrapper,
			'Nice to meet you again! Please, sign in to be served.',
			'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.'
		);
		this.loginSignInTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignInTemplate.initListener("#signUp", "click", this.getSignUpTemplate.bind(this));

		this.loginSignUpTemplate = new LoginTemplate(
			this.wrapper,
			'Welcome to Waiter! Please, sign up in order to be served.',
			'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.'
		);
		this.loginSignUpTemplate.initListener(".btn.btn-submit", "click", this.submitLoginForm.bind(this));
		this.loginSignUpTemplate.initListener("#signIn", "click", this.getSignInTemplate.bind(this));

		//////////////////////////
		/// LOGIN PART ENDS /////
		////////////////////////

// 		shadowContainer.className = 'shadow-container__wrapper';
// 		shadowContainer.innerHTML = `
// 				  <h1 class="shadow-container__logo initial-login__logo logo-margin">Waiter</h1>
// 				  <div class="shadow-container__loading">
// 					  <div class="shadow-container__dots">
// 						  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
// 					  </div>
// 				  </div>  
//   `;
	}

	addClassbeforeFire(selector, classToAdd) {
		let element = document.querySelector(selector)
		if(element) {
			element.classList.add(classToAdd);
		}
	}

	getSignInTemplate() {
		console.log(`getSignInTemplate function fired on ${this}`);
		this.addClassbeforeFire(".initial-login__container", "scale-down");
		setTimeout( () => {
			this.loginSignInTemplate.create()
		}, 500 )
	};
	getSignUpTemplate() {
		console.log(`getSignUpTemplate function fired on ${this}`);
		this.addClassbeforeFire(".initial-login__container", "scale-down");
		setTimeout( () => {
			this.loginSignUpTemplate.create()
		}, 500 )
	};
	submitLoginForm(event) {
		event.preventDefault();
		console.log(`submitLoginForm function fired on ${this}`);
		const dataObj = {},
			inputArray = document.querySelectorAll("input:not([type='submit'])")
		for(let input of inputArray) {
			dataObj[input.id] = input.value;

			input.nextElementSibling.classList.remove('error');
			input.nextElementSibling.innerHTML = '!';
		}
		controller.validateUserInfo(dataObj)
		// Controller.validateUserInfo(dataObj);
		// for(let key in userSignIn) {
		// 	if(userSignIn.hasOwnProperty(key)) {
		// 		window[key].nextElementSibling.classList.remove('error');
		// 		window[key].nextElementSibling.innerHTML = '!';
		// 	}
		// }
		// controller.validateUserInfo(userSignIn);
	};
	fillLoginDataObject(event) {
		console.log(`fillLoginDataObject function fired on ${this}`);
		if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
		// userSignIn[event.target.id] = event.target.value;
	}
    removeDocumentEvListener = (listener, functions) => {
        functions.forEach( func => {
            if(typeof window[func] === 'function') {
                document.removeEventListener(listener, window[func]);
            }
        });
    };
    //////////////////////////////////////////////
    ///////// OPEN AND CLOSE ERROR TAB //////////
    ////////////////////////////////////////////
    showFormErrors = (errors) => {
        errors.forEach(elem => {
            let notification = document.createElement('div'),
                parentEl       = window[elem.id].nextElementSibling;
            notification.innerText = elem.message;
            parentEl.classList.add('error');
            parentEl.classList.add('opened');
            parentEl.appendChild(notification);
        });
    };

    setLoading = () => {
        wrapper.appendChild(shadowContainer);
    };

    removeLoading = () => {
        wrapper.removeChild(shadowContainer);
    };
	
	selectPlace = () => {
		
		userInputObj.email    = '';
		userInputObj.password = '';
		
		wrapper.innerHTML = `
			<h1 class="initial-login__logo">Waiter</h1>
			<div class="select-place__wrapper">
				<div class="select-place__container">
                    <div class="select-place__container_select">
                    	<p>We have found several places near you. Please, choose one in which you want to be served.
                    		<span class="button">Ok</span>
                    	</p>
						<h4 class="h4">Please, choose a place in which you want to be served.</h4>	
                        <ul class="select-place__container_list"></ul> 
                    </div>
					<button class="select-place__container_button button" id="back">Back</button>
					<button class="select-place__container_button button">Select</button>
                </div>
			</div>
		`;
		
		setTimeout(() => {
			let arr       = ['MC', 'KFC', 'Cafe', 'Place to Eat', 'Restaurant', 'Burger Shop', 'Beer Pab'], //THE REAL ARRAY SHOULD COME FROM A SERVER
				arrLength = arr.length,
				fragment  = document.createDocumentFragment(),
				ul 		  = document.querySelector('.select-place__container_list'),
				li,
				i = 0,
                liList,
				self = this;
			
			for(; i < arrLength; i++) {
				li = document.createElement('li');
				li.innerHTML = arr[i];
				li.addEventListener('click', (event) => {
                    liList = document.querySelectorAll('li');
                    liList.forEach(li => li.className = '');
                    if(!event.target.className) {
                        event.target.className = 'selected';
					}
				});
				fragment.appendChild(li);
			}

			ul.appendChild(fragment);
			
			function showList() {
				let ul = document.querySelector('.select-place__container');
					ul.classList.add('opened');
					document.removeEventListener('click', showList);
			}
			function showBackToLogin(event) {
				if(!event.target.id || event.target.id !== 'back') return;
				
				document.removeEventListener('click', showBackToLogin);
				
				document.addEventListener('click', documentListeners.loginChecker);
				document.addEventListener('click', documentListeners.loginToggler);
				document.addEventListener('submit', documentListeners.loginSubmitter);
				
				self.getLoginHTML(loginParamsObj.signUp)
			}
			document.addEventListener('click', showList);
			document.addEventListener('click', showBackToLogin);
		},0);
	};

    // this.getLoginHTML = (params) => {
    //     wrapper.innerHTML = `
    //        <div class="login__wrapper">
	// 		<div class="initial-login__wrapper">
	// 			<div class="initial-login__container scale-down">
	// 				<h1 class="initial-login__logo">Waiter</h1>
	// 				<h4 class="h4">${params.txt_h4}</h4>
	// 				<form id="signInForm" class="initial-login">
	// 					<div class="initial-login__container_inner">
	// 						<div class="initial-login__input-wrapper">
	// 							<label class="initial-login__label" for="email">Your Login (email/username)</label>
	// 							<input type="text" name="email" id="email" autocomplete="current-password"/>
	// 							<div class="initial-login__notification" id="notify-email">!</div>
	// 						</div>
	// 						<div class="initial-login__input-wrapper">
	// 							<label class="initial-login__label" for="password">Your Password</label>
	// 							<input type="password" name="password" id="password" autocomplete="current-password"/>
	// 							<div class="initial-login__notification" id="notify-password">!</div>
	// 						</div>
	// 						<div class="initial-login__submit">
	// 							<input type="submit" class="btn btn-submit" value="LogIn"/>
	// 						</div>
	// 					</div>
	// 				</form>
	// 			</div>
	// 			<div class="initial-login__change-option">${params.txt_btn}</div></div>
	// 		</div>
	// 	</div>
    //     `;
    //     setTimeout(function(){
    //         let container = document.querySelector('.initial-login__container');
    //         container.classList.remove('scale-down');
    //     },300);
    // };

}

const view = new View()

module.exports = view;
},{"./templates/LoginTemplate":4}],4:[function(require,module,exports){
const Template = require('./Template');

class LoginTemplate extends Template {
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

module.exports = LoginTemplate;
},{"./Template":5}],5:[function(require,module,exports){
class Template {
    constructor(parent) {
        this.parent = parent;
        this.listeners = [];
    }

    create() {
        Function.prototype
    }

    initListener(selector, listener, callback) {
        this.listeners.push({
            selector, listener, callback
        })
    }

    addListener(selector, listener, callback) {
        const slct = document.querySelector(selector);
        if(!slct){
            console.log(`selector ${selector} wasn't found.`); return;
        }
        slct.addEventListener(listener, callback)
    }

    removeListener(selector, listener, callback) {
        const slct = document.querySelector(selector);
        if(!slct){
            console.log(`selector ${selector} wasn't found.`); return;
        }
        slct.removeEventListener(listener, callback)
    }

}

module.exports = Template;
},{}]},{},[2]);
