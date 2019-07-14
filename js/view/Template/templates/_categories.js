export const CATEGORIES_TEMPLATE = ({ categories }) => {
    let insert = '';
    categories.forEach(category => { 
        const icon = category.icon();
        const id = category.name.replace(/ /g, '_');
        insert += `
        <div class="categories__container_item" id="${id}">
            ${icon}
            <div class="name">${category.name}</div>
            <div class="select hidden">Select</div>
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