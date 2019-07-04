class ToggleButton {
    
    constructor(text, selector, func) {
        this.text = text;
        this.selector = selector;
        this.func = func;
        init()
    }
    init() {
        let elem = document.querySelector(this.selector)
            elem.addEventListener("click", this.reactOnClick)
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