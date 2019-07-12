export const CATEGORIES_TEMPLATE = ({ categories }) => {
    let insert = '';
    categories.forEach(category => { 
        const icon = category.icon();
        const id = category.name.replace(/ /g, '_');
        insert += `<div class="categories__container_item" id="${id}">${icon}</div>`
    })
    return `
    <div class="categories__container two">
        ${insert}
    </div>
 `
}