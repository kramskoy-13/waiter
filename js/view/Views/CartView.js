import Template from "../Template/Template.js";
import { SHOPPING_CART_TEMPLATE } from "../Template/templates/_shopping-cart.js";
import { SHOPPING_CART_POPUP_TEMPLATE } from "../Template/templates/_shopping-cart-popup.js";
import PopupTemplate from "../Template/PopupTemplate.js";
import { handleNumbClick, handleNumbInput } from "../Shared/inputHandling.js";

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
        parent.shoppingCartTemplate.initListener({ selector: ".shopping-cart", listener: "click", callback: this.getShoppingCartPopup.bind(this) })
        .create(0); /// <- 0 means number of dishes to show, initially the cart is empty
	};

    getShoppingCartPopup() {
        let wrapper = document.getElementById('wrapper'), 
            parent = this.parent,
            listener = "click",
            template = SHOPPING_CART_POPUP_TEMPLATE,
            cart = parent.getShoppingCartnfo.bind(parent)(),
            category = parent.getCurrentCategory();

        parent.currentPopup = new PopupTemplate({ wrapper, template });
        parent.currentPopup
            .initListener({
                selector: "#close", listener, callback: () => {
                    parent.currentPopup.destroy.bind(parent.currentPopup)();
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
            .create(cart);

        if (cart.totalCount !== 0) {
            parent.currentPopup
                .handleListener({ selector: ".popup__panel_button", listener, action: "add", callback: e => this.handleDishNumberChange.bind(this, e)() })
                .handleListener({ selector: ".cart-input", listener: "focusout", action: "add", callback: e => this.handleDishNumberChange.bind(this, e)() })
                .handleListener({ selector: ".delete-dish", listener, action: "add", callback: this.deleteDishFromCart.bind(this) });
        }

    };

    handleDishNumberChange(e) {
        let target = e.target.closest(".shopping-cart__wrapper"),
            dish = target.__inner_data,
            sumUAH = target.querySelector(".sum"),
            cartInput = target.querySelector(".cart-input"),
            callback = this.parent.addItemToCart.bind(this.parent, dish, cartInput),
            isButton = e.target.tagName === "BUTTON";

        if (isButton) return handleNumbClick.bind(this, cartInput, sumUAH, dish, callback)();

        handleNumbInput.bind(this, sumUAH, dish, callback)();
    };

    updateTotalSumHtml(cart) {
        let sum = document.getElementById("total");
        if(sum) sum.innerHTML = cart.totalPrice;
    };

    updateCartInfo(c) {
        let holder = document.getElementById(this.wrapper),
            cart = holder.querySelector(".shopping-cart"),
            numberIcon = holder.querySelector(".shopping-cart__count"),
            num = c.totalCount;

        numberIcon.innerHTML = num;

        this.updateTotalSumHtml.bind(this, c)();

        if(num && cart.classList.contains("filled") && !numberIcon.classList.contains("hidden")) return;

        let cartHandleClassAction = num === 0 ? "remove" : "add",
            iconHandleClassAction = num === 0 ? "add" : "remove";

        this.parent.shoppingCartTemplate.handleClass({ selector:cart, _class:"filled", action: cartHandleClassAction});
        this.parent.shoppingCartTemplate.handleClass({ selector:numberIcon, _class:"hidden", action: iconHandleClassAction})
    };

    deleteDishFromCart() {
        let selector = ".shopping-cart__wrapper",
            parent = this.parent,
            wrapper = event.target.closest(selector);

        if (!wrapper || !wrapper.__inner_data) return parent.showErrorNotification();
       
        parent.deleteItemFromCart(wrapper.__inner_data.id);

        wrapper.remove() /// <-- add parent addSomeFuncBeforeFire

        let isCartEmpty = document.querySelectorAll(selector).length === 0;

        if (isCartEmpty) {
            parent.getShoppingCartPopup();

            let dish = document.querySelector(".dish_item");
            dish && dish.id && parent.handleSelectedDish(dish.id)
        };
    };
}