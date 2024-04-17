
export default class SignInPopup {
    _signInEmailSelector = '#signinEmail'
    _signInPasswordSelector = '#signinPassword'
    _signInRemeberMeSelector = '#remember'


    constructor(page){ 
        this._page = page,
        this.container = page.locator('app-signin-modal')

        this.emailInput = this.container.locator(this._signInEmailSelector)
        this.passwordInput = this.container.locator(this._signInPasswordSelector)
        this.rememberMe = this.container.locator(this._signInRemeberMeSelector)
        this.btnLogin = this.container.locator('button', {hasText: 'Login'} )
    }
}
