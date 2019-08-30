//TODO: SERVER SHOULD HANDLE SIGN IN AND SIGN UP ROUTES TO INDEX.HTML PAGE

import { controller } from './controller/Controller.js';

const WTR            = {};
      WTR.Controller = controller;
      WTR.index      = {
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
WTR.index.showProgress = function (width) {
    if (this.width >= 100) {
        this.progressBar.style.width = '100%';
        this.percentage.innerText = '100';
        this.textContainer.parentNode.classList.add('completed');

        setTimeout(() => {
            WTR.Controller.setAppStateToLoaded();
            WTR.Controller.getSignInHTML();
        }, 1000)
    }
    else {
        this.progressBar.style.width = this.width + '%';
        this.percentage.innerText = this.width;
        this.width += Math.floor(Math.random() * (10 - 1)) + 1;

        setTimeout(() => {
            this.showProgress(this.width);
        }, Math.floor(Math.random() * (100 - 50)) + 50)
    }
};

setTimeout(function () {
    if (WTR.Controller.checkIfAppAlreadyLoaded()) {
        WTR.index.width = 100;
        return WTR.index.showProgress()
    }
    return WTR.index.showProgress(WTR.index.width);
}, 1500);



