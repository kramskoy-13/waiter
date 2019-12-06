import { search } from "../../svg/search.js";

export const SEARCH_TEMPLATE = () => {
    return `
        <div class="search__wrapper">
            <input type="text" class="search__input" name="search" value="" />
            <div class="search__item">
                ${ search() }
            </div>  
        </div>
    `
}