document.addEventListener("DOMContentLoaded", function() {

    let progressBar = document.getElementById('progressBar');
    let width = 7.5;
    let percentage = document.getElementById('progress-bar__percentage');

    let wrapper = document.getElementById('wrapper');
    let textContainer 	 = document.getElementById('textContainer');

    setTimeout(function() {
        textContainer.parentNode.classList.remove('initial');
    }, 250);

    setTimeout(function() {
        textContainer.parentNode.classList.add('loaded');
    }, 500);

    let showProgress = function(width) {
        if(width >= 100) {
            progressBar.style.width = '100%';
            percentage.innerText = 100;
            textContainer.parentNode.classList.add('completed');
            setTimeout(function () {
                Controller.getSingInMarkup(wrapper);
            }, 1000)
        }
        else {
            progressBar.style.width = width + '%';
            percentage.innerText = width;
            width += Math.floor(Math.random() * (10 - 1)) + 1;
            setTimeout(function() {
                showProgress(width);
              }, Math.floor(Math.random() * (500 - 50)) + 50)
        }
    };

    setTimeout(function() {
        return showProgress(width);
    }, 1500);

    //////////////////////////////////////////////
    //////// CHANGE SIGN IN SIGN UP LOGIC ///////
    ////////////////////////////////////////////
    //
    // let signUpLink = document.getElementById('signUpLink');
    //     signUpLink.addEventListener('click', getSingUpMarkup);
    //
    // let signInLink = document.getElementById('signUpLink');
    //     signInLink.addEventListener('click', getSingInMarkup);
    document.addEventListener('click', function (event) {
        if(!event.target.id) return;
        if(event.target.id !== 'signUpLink' && event.target.id !== 'signInLink') return;
        switch (event.target.id) {
            case 'signUpLink':
                event.target.parentNode.classList.add('bounce-animate');
                setTimeout(function () {
                    Controller.getSingUpMarkup(wrapper);
                }, 500);
                break;
            case 'signInLink':
                event.target.parentNode.classList.add('bounce-animate');
                setTimeout(function () {
                    Controller.getSingInMarkup(wrapper);
                }, 500);
                break;
            default: return;
        }
    });
    // function getSingUpMarkup() {
    //     let signUpLink = document.getElementById('signUpLink');
    //         signUpLink.parentNode.classList.add('bounce-animate');
    //         setTimeout(function () {
    //             Controller.getSingUpMarkup(wrapper);
    //         }, 500)
    // }
    // function getSingInMarkup() {
    //     let signUpLink = document.getElementById('signUpLink');
    //     signUpLink.parentNode.classList.add('bounce-animate');
    //     setTimeout(function () {
    //         Controller.getSingInMarkup(wrapper);
    //     }, 500)
    // }
});

