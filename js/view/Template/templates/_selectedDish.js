export const SELECTED_DISH_TEMPLATE = ({ ingredients, id, img, price, name, description }) => {
    let insert = '';
   
    if (ingredients) {
        ingredients.forEach(ing => insert += `<li>${ing}</li>`)
    }

    return `
    <div class="main__container one item dishes">

        <nav class="navigation__sub-menu">
            <div id="categories">Categories</div>
            <div id="dishes">Dishes</div>
            <div class="current">${name}</div>
        </nav>

        <div class="main__container_item" id="${id}">
            <div class="image" style="background-image: url('${img}')"></div>
            <div class="dots">
                <div>Name</div>
                <div class="dots-holder"></div>
                <div>${name}</div>
            </div>
            <div class="dots">
                <div>Price</div>
                <div class="dots-holder"></div>
                <div>${price} UAH</div>
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
            <div class="sub-item description">${description}</div>
        </div>

    </div>
 `
}