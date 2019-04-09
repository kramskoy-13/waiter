function View() {

    const wrapper         = document.querySelector('#wrapper');

    const shadowContainer = document.createElement('div');
          shadowContainer.className = 'shadow-container__wrapper';
          shadowContainer.innerHTML = `
                    <h1 class="shadow-container__logo initial-login__logo logo-margin">Waiter</h1>
                    <div class="shadow-container__loading">
                        <div class="shadow-container__dots">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>  
    `;

    this.removeDocumentEvListener = (listener, func) => {
        document.removeEventListener(listener, this[func]);
    };
    //////////////////////////////////////////////
    ///////// OPEN AND CLOSE ERROR TAB //////////
    ////////////////////////////////////////////
    this.showFormErrors = (errors) => {

       document.addEventListener('click', this.toggleErrorTab);

       errors.forEach( elem => {
            let notification = document.createElement('div');
                notification.innerText = elem.message;
			window[elem.id].nextElementSibling.classList.add('error');
            window[elem.id].nextElementSibling.appendChild(notification);
        });

    };

    this.toggleErrorTab = (event) => {
        if(!event.target.classList.contains('initial-login__notification')) {
            let elem = document.querySelectorAll('.initial-login__notification');
            if(elem.length > 0) { elem.forEach(function(elem) {
                elem.classList.remove('opened');
            })
            }
            return
        }
        event.target.classList.toggle('opened');
    };

    this.setLoading = () => {
        wrapper.appendChild(shadowContainer);
    };

    this.removeLoading = () => {
        wrapper.removeChild(shadowContainer);
    };
	
	this.selectPlace = () => {
			
		wrapper.innerHTML = `
			<h1 class="initial-login__logo">Waiter</h1>
			<div class="select-place__wrapper">
				<div class="select-place__container">
                    <div class="select-place__container_select">
                    	<p>We have found several places near you. Please, select one in which you want to be served.
                    		<span class="button">Ok</span>
                    	</p>	
                        <ul class="select-place__container_list"></ul> 
                    </div>
					<button class="select-place__container_button button">Select</button>
                </div>
			</div>
		`;
		
		setTimeout(function(){
			let arr       = ['MC', 'KFC', 'Cafe', 'Place to Eat', 'Restaurant', 'Burger Shop', 'Beer Pab'], //THE REAL ARRAY SHOULD COME FROM A SERVER
				arrLength = arr.length,
				fragment  = document.createDocumentFragment(),
				ul 		  = document.querySelector('.select-place__container_list'),
				li,
				i = 0,
                liList;
			
			for(; i < arrLength; i++) {
				li = document.createElement('li');
				li.innerHTML = arr[i];
				li.addEventListener('click', (event) => {
                    liList = document.querySelectorAll('li');
                    liList.forEach(li => li.className = '');
                    if(!event.target.className) {
                        event.target.className = 'selected';
					}
				});
				fragment.appendChild(li);
			}

			ul.appendChild(fragment);
			
			function showList() {
				let ul = document.querySelector('.select-place__container');
					ul.classList.add('opened');
					document.removeEventListener('click', showList)
			}
			
			document.addEventListener('click', showList)
		},0);
	};

    this.getLoginHTML = (text) => {
        wrapper.innerHTML = `
           <div class="login__wrapper">
			<div class="initial-login__wrapper">
				<div class="initial-login__container scale-down">
					<h1 class="initial-login__logo">Waiter</h1>
					<form id="signInForm" class="initial-login">
						<div class="initial-login__container_inner">
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="email">Your Login (email/username)</label>
								<input type="text" name="email" id="email" autocomplete="current-password"/>
								<div class="initial-login__notification" id="notify-email">!</div>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="password">Your Password</label>
								<input type="password" name="password" id="password" autocomplete="current-password"/>
								<div class="initial-login__notification" id="notify-password">!</div>
							</div>
							<div class="initial-login__submit">
								<input type="submit" class="btn btn-submit" value="LogIn"/>
							</div>
						</div>
					</form>
				</div>
				<div class="initial-login__change-option">${text}</div></div>
			</div>
		</div>
        `;
        setTimeout(function(){
            let container = document.querySelector('.initial-login__container');
            container.classList.remove('scale-down');
        },300);
    };

}