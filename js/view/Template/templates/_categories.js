export const CATEGORIES_TEMPLATE = ({ categories }) => {
    let insert = '';
    categories.forEach(category => { 
        const icon = category.icon(); // <== const categories in View at getCategoriesTemplate method
        insert += `
        <div class="main__container_item" id="${category.id}">
            ${icon}
            <div class="name">${category.name}</div>
            <div class="select">Select</div>
        </div>
        `
    })
    return `
    <div class="main__container two">
        <h4 class="h4 big mt-30">Categories</h4>
        ${insert}
    </div>
 `
}