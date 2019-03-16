const View = {

    getSingInForm(element) {
        element.innerHTML = `
           <div class="login__wrapper" id="singInWrapper">
			<div class="initial-login__wrapper">
				<div class="initial-login__container">
					<h1 class="initial-login__logo">Waiter</h1>
					<form id="signInForm" class="initial-login">
						<div class="initial-login__container_inner">
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="login">Your Login (email/username)</label>
								<input type="text" name="login" id="login"/>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="password">Your Password</label>
								<input type="password" name="password" id="password"/>
							</div>
							<div class="initial-login__submit">
								<input type="submit" class="btn btn-submit" value="SEND"/>
							</div>
						</div>
					</form>
				</div>
				<div class="initial-login__change-option">New to <span class="color-main">Waiter</span>? <div id="signUpLink" class="sing-up-link">Sign Up.</div></div>
			</div>
		</div>
        `;
    },
    getSingUpForm(element) {
        element.innerHTML = `
          <div class="login__wrapper" id="signUpWrapper">
			<div class="initial-login__wrapper">
				<div class="initial-login__container">
					<h1 class="initial-login__logo">Waiter</h1>
					<form id="signUpForm" class="initial-login">
						<div class="initial-login__container_inner">
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="login">Your Name</label>
								<input type="text" name="login" id="login"/>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="login">Your Email</label>
								<input type="text" name="login" id="login"/>
							</div>
							<div class="initial-login__input-wrapper">
								<label class="initial-login__label" for="password">Your Password</label>
								<input type="password" name="password" id="password"/>
							</div>
							<div class="initial-login__submit">
								<input type="submit" class="btn btn-submit" value="SEND"/>
							</div>
						</div>
					</form>
				</div>
				<div class="initial-login__change-option">Have Already <span class="color-main">Waiter</span> Account? <div id="signInLink" class="sing-up-link">Sign In.</div></div>
			</div>
		</div>
        `
    }

};