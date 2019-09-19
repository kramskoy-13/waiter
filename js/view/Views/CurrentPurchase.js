import Template from "../Template/Template.js";
import PopupTemplate from "../Template/PopupTemplate.js";
import { CURRENT_PURCHASE_TEMPLATE } from "../Template/templates/_current-purchase.js";

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

        let sumUAH = document.getElementById("sum"),
        	cartInput = document.getElementById("cart-input");

        parent.currentPopup
            .handleListener({ selector: ".popup__panel_button", listener, callback: this.handleNumbClick.bind(this, cartInput, sumUAH, dish), action: "add" })
            .handleListener({ selector: "#cart-input", listener: "input", callback: this.handleNumbInput.bind(this, cartInput, sumUAH, dish), action: "add" });
        parent.addItemToCart(dish, cartInput);
    };

    handleNumbClick(cartInput, sumUAH, dish) {
        if (!event.target || !event.target.id) return;
        switch (event.target.id) {
            case "add": {
                if (+cartInput.value === 40) return;
                ++cartInput.value;
                break
            } 
            case "subtract": {
                if (+cartInput.value === 1) return;
                --cartInput.value;
                break
            }
            default: return
        }
        sumUAH.innerHTML = (cartInput.value * dish.price).toFixed(2);
        this.parent.addItemToCart.bind(this.parent, dish, cartInput)();
    };

    handleNumbInput(cartInput, sumUAH, dish) {
        let reg = /\D+/g;
        let e = event.target;
            e.value = e.value.replace(reg, "");
        if (+e.value > 40) e.value = 40;
        if (+e.value <= 0) e.value = 1;
        sumUAH.innerHTML = (e.value * dish.price).toFixed(2);
        this.parent.addItemToCart.bind(this.parent, dish, cartInput)();
    };

}