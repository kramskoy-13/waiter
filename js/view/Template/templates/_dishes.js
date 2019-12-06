import { DISH_TEMPLATE } from "./_dish.js";

export const DISHES_TEMPLATE = ({ name, dishes }) => {
    console.log(name)
    console.log(dishes)
    let insert = '';
    dishes.forEach(dish => {
        insert += `<div>${DISH_TEMPLATE(dish)}</div>`
    })
    return `
    <div class="main__container dishes">
        <nav>
            <h4 class="navigation__sub-menu">
                <div id="categories">Categories</div>
                <div class="current">${name}</div>
            </h4>
        </nav>
        ${insert}
    </div>
    <button class="button block mt-10 m-auto" id="show_more">Show More</button> 
 `
}
