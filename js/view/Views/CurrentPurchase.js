import Template from "../Template/Template.js";
import PopupTemplate from "../Template/PopupTemplate.js";
import { CURRENT_PURCHASE_TEMPLATE } from "../Template/templates/_current-purchase.js";
import { handleNumbClick, handleNumbInput } from "../Shared/inputHandling.js";

export class CurrentPurchase {
	constructor(wrapper, parent) {
		this.wrapper = wrapper;
		this.parent = parent;
	}

	getCurrentPurchasePopup(dish, id) {
		let parent = this.parent,
			template = CURRENT_PURCHASE_TEMPLATE,
			listener = "click",
        	category = parent.getCurrentCategory();
        	
        parent.currentPopup = new PopupTemplate({ wrapper: this.wrapper, template });
        parent.currentPopup
            .initListener({
                selector: "#close", listener, callback: () => {
                    parent.currentPopup.destroy.bind(parent.currentPopup)();
                    parent.handleSelectedDish.bind(parent, id)();
                } 
            })
            .initListener({
                selector: "#categories", listener, callback: () => {
                    parent.currentPopup.destroy.bind(parent.currentPopup)();
                    parent.getCategoriesTemplate.bind(parent)();
                }
            })
            .initListener({
                selector: "#dishes", listener, callback: () => {
                    parent.currentPopup.destroy.bind(parent.currentPopup)();
                    parent.getDishesTemplate.bind(parent, category.name, category.dishes)();
                }
            })
            .create(dish);

        let sumUAH = document.querySelector(".sum"),
            cartInput = document.querySelector(".cart-input");

        parent.currentPopup
            .handleListener({
                selector: ".popup__panel_button",
                listener,
                callback: handleNumbClick.bind(this, cartInput, sumUAH, dish, this.parent.addItemToCart.bind(this.parent, dish, cartInput)),
                action: "add"
            })
            .handleListener({
                selector: ".cart-input",
                listener: "focusout",
                callback: handleNumbInput.bind(this, sumUAH, dish, this.parent.addItemToCart.bind(this.parent, dish, cartInput)),
                action: "add"
            });
        parent.addItemToCart(dish, cartInput);
    };

}