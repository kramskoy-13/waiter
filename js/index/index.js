//TODO: SERVER SHOULD HANDLE SIGN IN AND SIGN UP ROUTES TO INDEX.HTML PAGE
const model      = new Model(),
      view       = new View(),
      controller = new Controller(),

      index = {
          progressBar  : document.getElementById('progressBar'),
          percentage   : document.getElementById('progress-bar__percentage'),
          wrapper      : document.getElementById('wrapper'),
          textContainer: document.getElementById('textContainer'),
          width        : 7.5
      };

    setTimeout(function() {
        index.textContainer.parentNode.classList.remove('initial');
    }, 250);

    setTimeout(function() {
        index.textContainer.parentNode.classList.add('loaded');
    }, 500);

    //////////////////////////////////////////////
    //// SHOW PROGRESS BAR AT THE BEGINNING /////
    ////////////////////////////////////////////

    const loginHTML = {
        signUp : 'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.',
        signIn : 'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.'
    };

    /// LOADING BAR START /////
    index.showProgress = function(width) {
        if(this.width >= 100) {

            this.progressBar.style.width = '100%';
            this.percentage.innerText = '100';
            this.textContainer.parentNode.classList.add('completed');

            setTimeout(function () {
                controller.getLoginHTML(loginHTML.signUp);
            }, 1000)
        }
        else {

            this.progressBar.style.width = this.width + '%';
            this.percentage.innerText = this.width;
            this.width += Math.floor(Math.random() * (10 - 1)) + 1;

            setTimeout(function() {
                index.showProgress(index.width);
            }, Math.floor(Math.random() * (100 - 50)) + 50)
        }
    };

    setTimeout(function() {
        return index.showProgress(index.width);
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

    const userSignIn = {
        email    : '',
        password : ''
    };

    document.addEventListener('input', function(event) {
        if(event.target.tagName.toUpperCase() !== 'INPUT' || !event.target.id) return;
        userSignIn[event.target.id] = event.target.value;
    });

    document.addEventListener('submit', function(event) {

        event.preventDefault();

        for(let key in userSignIn) {
            if(userSignIn.hasOwnProperty(key)) {
                window[key].nextElementSibling.classList.remove('error');
                window[key].nextElementSibling.innerHTML = '!';
            }
        }

        controller.validateUserInfo(userSignIn);
    });



