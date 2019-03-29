function View() {

    this.showFormErrors = (errors) => {
       errors.forEach( elem => {
            let notification = document.createElement('div');
                notification.innerText = elem.message;
            window[elem.id].nextElementSibling.appendChild(notification)
        });

    };

    this.getSingInHTML = (element) => {
        element.innerHTML = `
           <div class="login__wrapper" id="singInWrapper">
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
								<input type="submit" class="btn btn-submit" value="Sing In"/>
							</div>
						</div>
					</form>
				</div>
				<div class="initial-login__change-option">New to <span class="color-main">Waiter</span>? <div id="signUpLink" class="sing-up-link">Sign Up.</div></div>
			</div>
		</div>
        `;
    };
    this.getSingUpHTML = (element) => {
        element.innerHTML = `
          <div class="login__wrapper" id="signUpWrapper">
			<div class="initial-login__wrapper">
				<div class="initial-login__container">
					<h1 class="initial-login__logo">Waiter</h1>
					<form id="signUpForm" class="initial-login">
						<div class="initial-login__container_inner">
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="name">Your Name</label>
								<input type="text" name="name" id="name"/>
								<div class="initial-login__notification" id="notify-name">!</div>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="email">Your Email</label>
								<input type="text" name="email" id="email"/>
								<div class="initial-login__notification" id="notify-email">!</div>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="password">Your Password</label>
								<input type="password" name="password" id="password"/>
								<div class="initial-login__notification" id="notify-password">!</div>
							</div>
							<div class="initial-login__submit">
								<input type="submit" class="btn btn-submit" value="Sing Up"/>
							</div>
						</div>
					</form>
				</div>
				<div class="initial-login__change-option">Have Already <span class="color-main">Waiter</span> Account? <div id="signInLink" class="sing-up-link">Sign In.</div></div>
			</div>
		</div>
        `
    };
}