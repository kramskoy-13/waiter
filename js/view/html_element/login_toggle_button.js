class ToggleButton {
    
    constructor(text, selector, func) {
        this.text = text;
        this.selector = selector;
        this.func = func;
        this.reactOnClick = this.reactOnClick.bind(this);
    }
    init() {
        let elem = document.querySelector(this.selector);
            if(elem) {
                elem.addEventListener('click', this.reactOnClick)
            }
            else {
                console.log('event listener inside ToggleButton class does not fire due to this.selector is null.')
            }
    }
    reactOnClick(event){
        console.log('clikced toggleLoginMarkup')
        event.target.parentElement.previousElementSibling.classList.add('scale-down');
        setTimeout(function () {
            this.func()
			// controller.getLoginHTML(loginHTML[event.target.id]);
		}, 500);
    }
}

module.exports = ToggleButton;