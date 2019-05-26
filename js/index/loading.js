const index = {
    progressBar  : document.getElementById('progressBar'),
    percentage   : document.getElementById('progress-bar__percentage'),
    wrapper      : document.getElementById('wrapper'),
    textContainer: document.getElementById('textContainer'),
    width        : 7.5
};
index.showProgress = function(width) {
    if(this.width >= 100) {

        this.progressBar.style.width = '100%';
        this.percentage.innerText    = '100';
        this.textContainer.parentNode.classList.add('completed');

        setTimeout( () => {
            controller.getLoginHTML(WTR.loginData.loginHTML.signUp);
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
module.exports = index;