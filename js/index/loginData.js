const loginData = {};

loginData.loginHTML = {
	signUp : {
		txt_btn: 'Have Already <span class="color-main">Waiter</span> Account? <div id="signIn" class="sing-up-link">Sign In.',
		txt_h4: 'Welcome to Waiter! Please, sign up in order to be served.'
	},
	signIn : {
		txt_btn: 'New to <span class="color-main">Waiter</span>? <div id="signUp" class="sing-up-link">Sign Up.',
		txt_h4: 'Nice to meet you again! Please, sign in to be served.'
	} 
};

loginData.userSignIn = {
    email    : '',
    password : ''
};

module.exports = loginData;