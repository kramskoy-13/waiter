import Template from "../Template/Template.js";
import { CATEGORIES_TEMPLATE } from "../Template/templates/_categories.js";

///////////////////////
/////// ICONS ////////
/////////////////////

import { cocktails_alc } from "../svg/cocktails_alc.js";
import { cocktails_alc_free } from "../svg/cocktails_alc_free.js";
import { dessert } from "../svg/dessert.js";
import { first_course } from "../svg/first_course.js";
import { fish } from "../svg/fish.js";
import { meat } from "../svg/meat.js";
import { salads } from "../svg/salads.js";

export class CategoriesView {

    constructor(wrapper, parent) {
        this.wrapper = wrapper;
        this.parent = parent;
    }

    getCategoriesTemplate() {

        const config = {
            0: salads,
            1: cocktails_alc,
            2: cocktails_alc_free,
            3: dessert,
            4: first_course,
            5: fish,
            6: meat
        },
        template = CATEGORIES_TEMPLATE,
        listener = "click",
        selector = ".main__container_item",
        parent = this.parent;

        let categories = parent.getSelectedPlaceData();

        if (!categories || !categories.data) return parent.showErrorNotification("No categories data has been provided");
            categories = categories.data.map(item => {
                return {
                    name: item.name,
                    icon: config[item.category],
                    id: item.id
                }
            });

        parent.currentMainTemplate = new Template({ wrapper: "main", template });
        parent.currentMainTemplate
            .initListener({ selector, listener, callback: parent.selectItem.bind(parent, selector) })
            .initListener({
                selector: ".select", listener, callback: event => {
                    let { target } = event,
                        aim = target.className == "main__container_item aim" ? target.id : target.closest(".main__container_item.aim").id;
                    parent.getSelectedPlaceData().data.forEach(c => {
                        if (c.id && c.id == aim) return parent.setCurrentCategory(c);
                    })
                    let category = parent.getCurrentCategory();
                    
                    parent.getDishesTemplate(category.name, category.dishes)
                }
            })
            .create({ categories });
        /// REMOVE HIGHLIGHTED SPAN FROM FOOTER ///
        parent.removeSelectedClass();
    };

}
