(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  function Controller() {

    this.getLoginHTML = (params) => {
        view.getLoginHTML(params);
    };

    this.validateUserInfo = (obj) => {
       let formInfo = model.validateUserInfo(obj);
       if(formInfo.length > 0 ) { return view.showFormErrors(formInfo) }

       view.setLoading();

       view.removeDocumentEvListener('click', ['toggleErrorTab', 'toggleLoginMarkup']);
       //IMITATE SERVER RESPONSE DELAY
        setTimeout(function(){
            view.removeLoading();
			view.selectPlace();//HERE THE RECEIVED FROM A SERVER OBJECT SHOULD BE USED
        }, 1500)
    };

}

module.exports = new Controller();


},{}],2:[function(require,module,exports){
//TODO: SERVER SHOULD HANDLE SIGN IN AND SIGN UP ROUTES TO INDEX.HTML PAGE
const WTR        = {},
      loginData  = require('./loginData'),
      controller = require('./controller');

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


// WTR.globals.model      = new Model();
// WTR.globals.view       = new View();
// WTR.globals.view       = new View(loginHTML, userSignIn, { loginChecker : toggleErrorTab, loginToggler : toggleLoginMarkup, loginSubmitter : submitLogin });
// WTR.globals.controller = new Controller();

WTR.index = {
        progressBar  : document.getElementById('progressBar'),
        percentage   : document.getElementById('progress-bar__percentage'),
        wrapper      : document.getElementById('wrapper'),
        textContainer: document.getElementById('textContainer'),
        width        : 7.5
    };

    setTimeout( () => {
        WTR.index.textContainer.parentNode.classList.remove('initial');
    }, 250);

    setTimeout( () => {
        WTR.index.textContainer.parentNode.classList.add('loaded');
    }, 500);

    //////////////////////////////////////////////
    //// SHOW PROGRESS BAR AT THE BEGINNING /////
    ////////////////////////////////////////////

    /// LOADING BAR START /////
    WTR.index.showProgress = function(width) {
        if(this.width >= 100) {

            this.progressBar.style.width = '100%';
            this.percentage.innerText    = '100';
            this.textContainer.parentNode.classList.add('completed');

            setTimeout( () => {
                controller.getLoginHTML(loginData.loginHTML.signUp);
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
    /// LOADING BAR END /////

    //////////////////////////////////////////////
    ////// CHANGE SIGN IN && SIGN UP LOGIC //////
    ////////////////////////////////////////////
    // window.addEventListener('popstate', function(event) {
    //     controller.getLoginHTML(event.state);
    // });

    document.addEventListener('click', toggleLoginMarkup);

    function toggleLoginMarkup(event){
        console.log('clikced toggleLoginMarkup')
        if(!event.target.id) return;
        if(event.target.id !== 'signUp' && event.target.id !== 'signIn') return;
        // event.target.parentNode.classList.add('bounce-animate');
        event.target.parentElement.previousElementSibling.classList.add('scale-down');
        // history.pushState(loginHTML[event.target.id], '', event.target.id);
        setTimeout(function () {
            controller.getLoginHTML(loginHTML[event.target.id]);
        }, 500);
    }

    document.addEventListener('click', toggleErrorTab);

    function toggleErrorTab(event) {
        console.log('clikced toggleErrorTab')
        if(!event.target.classList.contains('initial-login__notification')) {
            let elem = document.querySelectorAll('.initial-login__notification');
            if(elem.length > 0) { elem.forEach(function(elem) {
                elem.classList.remove('opened');
            })
            }
            return
        }
        event.target.classList.toggle('opened');
    }

    document.addEventListener('input', function(event) {
        if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
        userSignIn[event.target.id] = event.target.value;
    });
	
    document.addEventListener('submit', submitLogin);

	function submitLogin(event) {
		event.preventDefault();
		for(let key in userSignIn) {
            if(userSignIn.hasOwnProperty(key)) {
                window[key].nextElementSibling.classList.remove('error');
                window[key].nextElementSibling.innerHTML = '!';
            }
        }
        controller.validateUserInfo(userSignIn);
	}


},{"./controller":1,"./loginData":3}],3:[function(require,module,exports){
const loginData = {};

loginData.loginHTML = {
	signUp : {
		txt_btn: 'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.',
		txt_h4: 'Welcome to Waiter! Please, sign up in order to be served.'
	},
	signIn : {
		txt_btn: 'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.',
		txt_h4: 'Nice to meet you again! Please, sign in to be served.'
	} 
};

loginData.userSignIn = {
    email    : '',
    password : ''
};

module.exports = loginData;
},{}]},{},[2]);
