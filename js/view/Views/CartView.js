import Template from "../Template/Template.js";
import { SHOPPING_CART_TEMPLATE } from "../Template/templates/_shopping-cart.js";
import { SHOPPING_CART_POPUP_TEMPLATE } from "../Template/templates/_shopping-cart-popup.js";
import PopupTemplate from "../Template/PopupTemplate.js";

export class CartView {
	constructor(wrapper, parent) {
		this.wrapper = wrapper;
		this.parent = parent;
	}

	getShoppingCartTemplate(){
		let parent = this.parent,
			wrapper = this.wrapper,
			template = SHOPPING_CART_TEMPLATE;

 		parent.shoppingCartTemplate = new Template({ wrapper, template });
        parent.shoppingCartTemplate.initListener({ selector: ".shopping-cart", listener: "click", callback: parent.getShoppingCartnfo.bind(parent) })
        .create(0); /// <- 0 means number of dishes to show, initially the cart is empty
	};

	showShoppingCartPopup(cartInfo) {
		let wrapper = document.getElementById('wrapper'),
			template = SHOPPING_CART_POPUP_TEMPLATE;
		parent.currentPopup = new PopupTemplate({ wrapper, template });
		parent.currentPopup
		.initListener({
            selector: "#close", listener: "click", callback: () => {
                parent.currentPopup.destroy.bind(parent.currentPopup)();
            } 
        })
		.create(cartInfo);
	};

    updateCartInfo(num) {
        let holder = document.getElementById(this.wrapper),
        	cart = holder.querySelector(".shopping-cart"),
        	numberIcon = holder.querySelector(".shopping-cart__count");

        numberIcon.innerHTML = num;

        if(num && cart.classList.contains("filled") && !numberIcon.classList.contains("hidden")) return;

        let cartHandleClassAction = num === 0 ? "remove" : "add";
        let iconHandleClassAction = num === 0 ? "add" : "remove";

        this.parent.shoppingCartTemplate.handleClass({ selector:cart, _class:"filled", action: cartHandleClassAction});
        this.parent.shoppingCartTemplate.handleClass({ selector:numberIcon, _class:"hidden", action: iconHandleClassAction})
    };
}