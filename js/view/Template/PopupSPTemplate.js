import PopupTemplate from "./PopupTemplate.js";

class PopupSPTemplate extends PopupTemplate {
    constructor({ wrapper, template, flag }) {
        super({ wrapper, template });
        this.flag = flag || null;
    }
	showList(places) {
        let arr = places,
            arr_length = arr.length,
            fragment = document.createDocumentFragment(),
            ul = document.querySelector('.popup__container_list'),
            li,
            i = 0,
            liList;

        for (; i < arr_length; i++) {
            li = document.createElement('li');
            li.innerHTML = arr[i];
            li.id = arr[i].replace(/ /g, "_").toLowerCase();
            li.addEventListener('click', (event) => {
                liList = document.querySelectorAll('li');
                liList.forEach(li => li.className = '');
                if (!event.target.className) {
                    event.target.className = 'selected';
                    this.selectedPlace = event.target.id;
                }
                console.log("showList click listener")
            });
            fragment.appendChild(li);
        }

        fragment.children[0].className = 'selected';
        //this.selectedPlace = fragment.children[0].id;
        ul.appendChild(fragment);

        const showList = document.getElementById("showList");
        if (!showList) return console.error(`#showList`);

        showList.addEventListener('click', () => {
            console.log("PopupSPTemplate selectPlace")
            let hiddenElements = document.querySelectorAll('.popup__container .hidden');
            hiddenElements.forEach(elem => elem.classList.remove('hidden'));
            let paragraph = document.querySelector('.popup__container p'),
                button = document.querySelectorAll('.popup__container button');
            button.forEach(elem => elem.classList.add("bounce"));
            paragraph.classList.add("hidden")
        }, { once: true });

        if (this.flag) { setTimeout(() => showList["click"].call(showList), 0) }
        return this
    };
}

export default PopupSPTemplate;