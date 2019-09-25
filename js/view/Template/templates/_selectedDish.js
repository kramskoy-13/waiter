import { SHOPPING_CART_TEMPLATE } from "./_shopping-cart.js";

export const SELECTED_DISH_TEMPLATE = ({ dish, flag }) => {

    let insert = '';
   
    if (dish.ingredients) {
        dish.ingredients.forEach(ing => insert += `<li>${ing}</li>`)
    }

    return `
    <div class="main__container one item dishes">
        
        <nav>
            <h4 class="navigation__sub-menu">
                <div id="categories">Categories</div>
                <div id="dishes">Dishes</div>
                <div class="current">${dish.name}</div>
            </h4>
        </nav>

        <div class="main__container_item dish_item" id="${dish.id}">
            <div class="image item" style="background-image: url('${dish.img}')"></div>
            <div class="dots">
                <div>Name</div>
                <div class="dots-holder"></div>
                <div>${dish.name}</div>
            </div>
            <div class="dots">
                <div>Price</div>
                <div class="dots-holder"></div>
                <div>${dish.price} UAH</div>
            </div>
            <div class="dots sub-menu">
                <div>Ingredients</div>
                <div class="dots-holder"></div>
                <div class="sub-pointer">+</div>
            </div>
            <ul class="sub-item ingredients">${insert}</ul>
            <div class="dots sub-menu">
                <div>Description</div>
                <div class="dots-holder"></div>
                <div class="sub-pointer">+</div>
            </div>
            <div class="sub-item description">${dish.description}</div>
              <button class="button flex-ctr ${flag ? 'visited' : ''}" id="cart-button">
                ${ SHOPPING_CART_TEMPLATE && SHOPPING_CART_TEMPLATE(0) }
                ${flag ? 'Already in Cart' : 'Add to Cart'}
            </button>
        </div>
        

    </div>
 `
}