import PopupTemplate from "./PopupTemplate.js";

class PopupSPTemplate extends PopupTemplate {
    
	selectPlace(places) {
			let arr        = places,
				arr_length = arr.length,
				fragment   = document.createDocumentFragment(),
				ul 		   = document.querySelector('.popup__container_list'),
				li,
				i = 0,
                liList;
			
			for(; i < arr_length; i++) {
				li = document.createElement('li');
				li.innerHTML = arr[i];
				li.addEventListener('click', (event) => {
                    console.log("click listener fires at selectPlace")
                    liList = document.querySelectorAll('li');
                    liList.forEach(li => li.className = '');
                    if(!event.target.className) {
                        event.target.className = 'selected';
					}
				});
				fragment.appendChild(li);
			}

			ul.appendChild(fragment);
            
            const showList = document.getElementById("showList");
            if(!showList) { console.error(`#showList button selector was not found at [PopupSPTemplate class]`); return }

			showList.addEventListener('click', () => {
                console.log("selectPlace fires at [PopupSPTemplate class]")
                let hiddenElements = document.querySelectorAll('.popup__container .hidden');
                hiddenElements.forEach( elem => elem.classList.remove('hidden'));
                let paragraph = document.querySelector('.popup__container p'),
                    button = document.querySelectorAll('.popup__container button'); 
                button.forEach( elem => elem.classList.add("bounce"));
                paragraph.classList.add("hidden")
            }, {once: true});
    };

    // getBackToLogin(event) {
    //     if(!event.target.id || event.target.id !== 'back') return;
        
    //     document.removeEventListener('click', showBackToLogin);
        
    //     document.addEventListener('click', documentListeners.loginChecker);
    //     document.addEventListener('click', documentListeners.loginToggler);
    //     document.addEventListener('submit', documentListeners.loginSubmitter);
        
    //     self.getLoginHTML(loginParamsObj.signUp)
    // };
}

export default PopupSPTemplate;