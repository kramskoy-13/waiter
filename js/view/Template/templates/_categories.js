export const CATEGORIES_TEMPLATE = ({ categories }) => {
    let insert = '';
    categories.forEach(category => { 
        const icon = category.icon();
        insert += `
        <div class="categories__container_item" id="${category.id}">
            ${icon}
            <div class="name">${category.name}</div>
            <div class="select">Select</div>
        </div>
        `
    })
    return `
    <div class="categories__container two">
        <h4 class="h4">Categories</h4>
        ${insert}
    </div>
 `
}