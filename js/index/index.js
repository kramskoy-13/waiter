//TODO: SERVER SHOULD HANDLE SIGN IN AND SIGN UP ROUTES TO INDEX.HTML PAGE
const model      = new Model();

const view       = new View();

const controller = new Controller();

document.addEventListener("DOMContentLoaded", function() {

    const Index = {

        progressBar   : document.getElementById('progressBar'),
        percentage    : document.getElementById('progress-bar__percentage'),
        wrapper       : document.getElementById('wrapper'),
        textContainer : document.getElementById('textContainer'),
        width         : 7.5

    };

    setTimeout(function() {
        Index.textContainer.parentNode.classList.remove('initial');
    }, 250);

    setTimeout(function() {
        Index.textContainer.parentNode.classList.add('loaded');
    }, 500);

    //////////////////////////////////////////////
    //// SHOW PROGRESS BAR AT THE BEGINNING /////
    ////////////////////////////////////////////

    const LoginHTML = {
        signUp : 'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.',
        signIn : 'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.'
    };

    /// LOADING BAR START /////
    Index.showProgress = function(width) {
        if(this.width >= 100) {
            this.progressBar.style.width = '100%';
            this.percentage.innerText = 100;
            this.textContainer.parentNode.classList.add('completed');
            setTimeout(function () {
                controller.getLoginHTML(LoginHTML.signUp);
            }, 1000)
        }
        else {
            this.progressBar.style.width = this.width + '%';
            this.percentage.innerText = this.width;
            this.width += Math.floor(Math.random() * (10 - 1)) + 1;
            setTimeout(function() {
                Index.showProgress(Index.width);
            }, Math.floor(Math.random() * (100 - 50)) + 50)
        }
    };

    setTimeout(function() {
        return Index.showProgress(Index.width);
    }, 1500);
    /// LOADING BAR END /////

    //////////////////////////////////////////////
    ////// CHANGE SIGN IN && SIGN UP LOGIC //////
    ////////////////////////////////////////////

    window.addEventListener('popstate', function(event) {
        controller.getLoginHTML(event.state);
    });

    document.addEventListener('click', function (event) {
        if(!event.target.id) return;
        if(event.target.id !== 'signUp' && event.target.id !== 'signIn') return;
        event.target.parentNode.classList.add('bounce-animate');

        history.pushState(LoginHTML[event.target.id], '', event.target.id);

        setTimeout(function () {
            controller.getLoginHTML(LoginHTML[event.target.id]);
        }, 500);
    });

    const UserSignIn = {
        email        : '',
        password     : ''
    };

    document.addEventListener('input', function(event) {
        if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
        UserSignIn[event.target.id] = event.target.value;
    });

    document.addEventListener('submit', function(event) {

        event.preventDefault();

        for(let key in UserSignIn) {
            if(UserSignIn.hasOwnProperty(key)) {
                window[key].nextElementSibling.classList.remove('error');
                window[key].nextElementSibling.innerHTML = '!';
            }
        }

        controller.validateUserInfo(UserSignIn);
    });
    //////////////////////////////////////////////
    ///////// OPEN AND CLOSE ERROR TAB //////////
    ////////////////////////////////////////////
	document.addEventListener('click', function(event){
		if(!event.target.classList.contains('initial-login__notification')) {
			let elem = document.querySelectorAll('.initial-login__notification');
			if(elem.length > 0) { elem.forEach(function(elem) {
					elem.classList.remove('opened');
				})
			}
			return
		};
		event.target.classList.toggle('opened');
	})
});

