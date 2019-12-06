import Template from "../Template/Template.js";
import { SEARCH_TEMPLATE } from "../Template/templates/_search.js";

export class SearchView {

    constructor(wrapper, parent) {
        this.wrapper = wrapper;
        this.parent = parent;
        this.searchWrapper = null;
        this.searchInput = null;
        this.searchICon = null;
        this.footerRows = null;
        this.footerContainer = null;
        this.currentDishes = null;
        this.sortDishes = this.sortDishes.bind(this);
        this.deactivateSearchField = this.deactivateSearchField.bind(this)
    }

    getSearchTemplate() {
        let parent = this.parent,
            wrapper = this.wrapper,
            template = SEARCH_TEMPLATE;
        parent.searchTemplate = new Template({ wrapper, template });
        parent.searchTemplate
            .initListener({ selector: ".search__wrapper", listener: "click", callback: this.activateSearchField.bind(this) })
            .create();

        this.footerContainer = document.getElementById("footer");
        this.searchWrapper = this.footerContainer.querySelector(".search__wrapper");
        this.searchInput = this.footerContainer.querySelector(".search__input");
        this.footerRows = this.footerContainer.querySelectorAll(".footer__display_row");
        this.searchICon = this.footerContainer.querySelector(".search__item");
    };

    activateSearchField(event) {
        if (!event.target || this.parent.currentMainTemplateMark !== "dishes") return;
        console.log("activateSearchField")
        this.parent.searchTemplate
            .handleListener({ selector: "#categories", listener: "click", callback: this.deactivateSearchField, action: "add" })
            .handleListener({ selector: ".select", listener: "click", callback: this.deactivateSearchField, action: "add" })

        this.searchWrapper.classList.add("focused");
        this.footerContainer.classList.add("shifted");

        [...this.footerRows].forEach(r => r.classList.add("shifted"));

        this.searchInput.focus();
        this.searchInput.addEventListener("input", this.sortDishes);

        this.currentDishes = document.querySelectorAll(".main__container_item");
    };

    deactivateSearchField() {
        console.log("deactivateSearchField")
        this.searchWrapper.classList.remove("focused");
        this.footerContainer.classList.remove("shifted");
        [...this.footerRows].forEach(r => r.classList.remove("shifted"));
  
        this.searchInput.removeEventListener("input", this.sortDishes);

        this.currentDishes = null;
    };

    sortDishes(event) {
        let value = event.target.value;

        [...this.currentDishes].forEach(d => d.parentElement.classList.remove("disp-none"));

        if (!value) return;

        let arrayIdsToHide = this.parent.getSortedDishes(event.target.value);

        arrayIdsToHide.forEach( id => {
            let element = document.getElementById(id);
            if (element) element.parentElement.classList.add("disp-none");
        })
    };
}