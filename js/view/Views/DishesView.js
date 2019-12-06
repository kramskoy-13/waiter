import Template from "../Template/Template.js";
import { DISHES_TEMPLATE } from "../Template/templates/_dishes.js";
import { DISH_TEMPLATE } from "../Template/templates/_dish.js";
import { SELECTED_DISH_TEMPLATE } from "../Template/templates/_selectedDish.js";

export class DishesView {

	constructor(wrapper, parent) {
		this.wrapper = wrapper;
        this.parent = parent;
        this.itemSelector = ".main__container_item";
        this.selectItem = parent.selectItem.bind(parent, this.itemSelector);
	} 
     
	getDishesTemplate(name, dishes) {
        let parent = this.parent, 
            template = DISHES_TEMPLATE,
            listener = "click",
            selector = this.itemSelector,
            callback = this.selectItem;
        
        parent.currentMainTemplate = new Template({ wrapper: this.wrapper, template });
        parent.currentMainTemplate
            .initListener({ selector: "#categories", listener, callback: parent.getCategoriesTemplate.bind(parent) }) 
            .initListener({ selector, listener, callback }) // show select item
            .initListener({
                selector: "#show_more", listener, callback: e => {
                    parent.currentMainTemplate.handleListener({ selector, listener, callback, action: "remove" })
                    parent.fetchMoreDishes.bind(parent)();
                }
            }) 
            .initListener({ selector: ".select", listener, callback: this.handleSelectedDish.bind(this)  }) // handle selected item
            .initListener({selector: ".footer__display_row", listener, callback: this.changeNumberOfItemsToShow.bind(this) })
            .create({ name, dishes });

        parent.currentMainTemplate
            .handleClass({ selector: `#${parent.highlightedSpanNum}`, _class: "selected", action: "add" })
            .handleClass({ selector: ".main__container", _class: parent.highlightedSpanNum, action: "add" })

        document.querySelector(".navigation__sub-menu").scrollIntoView({ block: "center", behavior: "smooth" })
    };

    /// TABS AT FOOTER TO SWITCH NUMBER OF SHOWED ITEMS: 1-2-3 ///

    changeNumberOfItemsToShow(event) {
        if ( !event.target ||  this.parent.currentMainTemplateMark !== "dishes" ) return;
        let target = event.target.closest(".footer__display_row");
        if (!target || !target.id) return;

        this.parent.removeSelectedClass();

        target.classList.add("selected");

        this.parent.highlightedSpanNum = target.id;
        let container = document.querySelector(".main__container");
            container.className = "main__container dishes"; // <-- refresh container from previous styles
            container.classList.add(this.parent.highlightedSpanNum);
    };

    showMoreDishes(newDishes) {
        let listener = "click",
            parent = this.parent,
            callback = this.selectItem,
            selector = this.itemSelector;

        newDishes.forEach((d, index, arr) => { 
            let l = arr.length - 1;

            parent.currentMainTemplate.appendElement({ tag: "div", parentSelector: ".main__container", text: DISH_TEMPLATE(d) })

            if (index === l) {
                parent.currentMainTemplate
                    .handleListener({ selector, listener, callback, action: "add" })
                    .handleListener({ selector: ".select", listener, callback: this.handleSelectedDish.bind(this), action: "add" })
            }
        })         
    };

	// USER SELECT AN ITEM //

    handleSelectedDish(e) {
        console.log("handleSelectedDish")
        let target = e; 	
        if (typeof e !== "string") {
            target = e.target.closest(".aim");
            if (!target || !target.id) return;
            target = target.id
        }
        let template = SELECTED_DISH_TEMPLATE,
        	parent = this.parent;
        /// REMOVE HIGHLIGHTED SPAN FROM FOOTER ///
        parent.currentMainTemplateMark = "dish"; 
        parent.removeSelectedClass();

        let category = parent.getCurrentCategory(),
        	dish = category.dishes.filter(d => d.id === target)[0],
			alreadyInCart = parent.checkDishInCart(dish.id),
            cartCallback = alreadyInCart ? parent.getShoppingCartPopup.bind(parent) : parent.getCurrentPurchasePopup.bind(parent, dish, target);

        parent.currentMainTemplate = new Template({ wrapper: "main", template });
        parent.currentMainTemplate
            .initListener({
                selector: ".sub-pointer", listener: "click", callback: event => {
                    let { target } = event,
                    	closest = target.closest(".sub-menu");
                    closest && closest.classList.toggle("open");
                }
            }) 
            .initListener({ selector: "#categories", listener: "click", callback: parent.getCategoriesTemplate.bind(parent) }) 
            .initListener({ selector: "#dishes", listener: "click", callback: parent.getDishesTemplate.bind(parent, category.name, category.dishes) }) 
            .initListener({ selector: "#cart-button", listener: "click", callback: cartCallback }) 
            .create({ dish, flag: alreadyInCart }) 
    };
} 