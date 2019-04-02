function View() {

    const wrapper         = document.querySelector('#wrapper');

    const shadowContainer = document.createElement('div');
          shadowContainer.className = 'shadow-container__wrapper';
          shadowContainer.innerHTML = `
                    <h1 class="shadow-container__logo initial-login__logo">Waiter</h1>
                    <div class="shadow-container__loading">
                        <div class="shadow-container__dots">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>  
    `;

    this.showFormErrors = (errors) => {
       errors.forEach( elem => {
            let notification = document.createElement('div');
                notification.innerText = elem.message;
			window[elem.id].nextElementSibling.classList.add('error');
            window[elem.id].nextElementSibling.appendChild(notification);
        });

    };

    this.setLoading = () => {
        wrapper.appendChild(shadowContainer);
    };

    this.removeLoading = () => {
        wrapper.removeChild(shadowContainer);
    };

    this.getLoginHTML = (text) => {
        wrapper.innerHTML = `
           <div class="login__wrapper">
			<div class="initial-login__wrapper">
				<div class="initial-login__container">
					<h1 class="initial-login__logo">Waiter</h1>
					<form id="signInForm" class="initial-login">
						<div class="initial-login__container_inner">
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="email">Your Login (email/username)</label>
								<input type="text" name="email" id="email"/>
								<div class="initial-login__notification" id="notify-email">!</div>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="password">Your Password</label>
								<input type="password" name="password" id="password"/>
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
    };

}