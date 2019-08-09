export const DISHES_TEMPLATE = ({ name, dishes }) => {
    let insert = '';
    dishes.forEach(dish => {
        insert += `
        <div class="main__container_item" id="${dish.id}">
            <div class="image" style="background-image: url('${dish.img}')"></div>
            <div class="name">${dish.name}</div>
            <div class="price">${dish.price}UAH</div>
            <div class="select">Select</div>
        </div>
        `
    })
    return `
    <div class="main__container dishes">
        <h4 class="navigation__sub-menu">
            <div id="categories">Categories</div>
            <div class="current">${name}</div>
        </h4>
        ${insert}
    </div>
 `
}