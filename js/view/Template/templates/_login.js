export const LOGIN_TEMPLATE = ({ header, button }) => {
    return `
    <div class="waiter__wrapper">
     <div class="initial-login__wrapper">
         <div class="initial-login__container scale-down">
             <h1 class="initial-login__logo logo">Waiter</h1>
             <h4 class="h4">${header}</h4>
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
         <div class="initial-login__change-option">${button}</div></div>
     </div>
 </div>
 `
}