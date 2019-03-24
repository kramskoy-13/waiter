

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

    Index.showProgress = function(width) {
        if(this.width >= 100) {
            this.progressBar.style.width = '100%';
            this.percentage.innerText = 100;
            this.textContainer.parentNode.classList.add('completed');
            setTimeout(function () {
                controller.getSingInHTML(this.wrapper);
            }, 1000)
        }
        else {
            this.progressBar.style.width = this.width + '%';
            this.percentage.innerText = this.width;
            this.width += Math.floor(Math.random() * (10 - 1)) + 1;
            setTimeout(function() {
                Index.showProgress(Index.width);
              }, Math.floor(Math.random() * (500 - 50)) + 50)
        }
    };

    setTimeout(function() {
        return Index.showProgress(Index.width);
    }, 1500);

    //////////////////////////////////////////////
    ////// CHANGE SIGN IN to SIGN UP LOGIC //////
    ////////////////////////////////////////////

    document.addEventListener('click', function (event) {
        if(!event.target.id) return;
        if(event.target.id !== 'signUpLink' && event.target.id !== 'signInLink') return;
        switch (event.target.id) {
            case 'signUpLink':
                event.target.parentNode.classList.add('bounce-animate');
                setTimeout(function () {
                    controller.getSingUpHTML(Index.wrapper);
                }, 500);
                break;
            case 'signInLink':
                event.target.parentNode.classList.add('bounce-animate');
                setTimeout(function () {
                    controller.getSingInHTML(Index.wrapper);
                }, 500);
                break;
            default: return;
        }
    });

    const UserSignIn = {
        name         : '',
        email        : '',
        password     : ''
    };

    document.addEventListener('submit', function(event) {
        event.preventDefault();
        controller.validateUserInfo(UserSignIn);
    })
});

