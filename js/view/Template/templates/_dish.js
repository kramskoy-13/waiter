export const DISH_TEMPLATE = (dish) => {

    return `
        <div class="main__container_item" id="${dish.id}">
            <div class="image" style="background-image: url('${dish.img}')"></div>
            <div class="name">${dish.name}</div>
            <div class="price">${dish.price}UAH</div>
            <div class="select">Select</div>
        </div>
        `
}