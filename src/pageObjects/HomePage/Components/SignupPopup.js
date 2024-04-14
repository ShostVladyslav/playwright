
export default class SignupPopup {
    _signupNameSelector = '#signupName'
    _signupLastNameSelector = '#signupLastName'
    _signupEmailSelector = '#signupEmail'
    _signupPasswordSelector = '#signupPassword'
    _signupRepeatPasswordSelector = '#signupRepeatPassword'
    _signupRepeatPasswordSelector = '#signupRepeatPassword'
    _invalidMessage = '.invalid-feedback'

    constructor(page){ 
        this._page = page,
        this.container = page.locator('app-signup-modal')

        this.nameInput = this.container.locator(this._signupNameSelector)
        this.nameErrorMessage = this.container.locator(`${this._signupNameSelector} + ${this._invalidMessage}`)

        this.lastNameInput = this.container.locator(this._signupLastNameSelector)
        this.lastNameErrorMessage = this.container.locator(`${this._signupLastNameSelector} + ${this._invalidMessage}`)

        this.emailInput = this.container.locator(this._signupEmailSelector)
        this.emailErrorMessage = this.container.locator(`${this._signupEmailSelector} + ${this._invalidMessage}`)

        this.passwordInput = this.container.locator(this._signupPasswordSelector)
        this.passwordErrorMessage = this.container.locator(`${this._signupPasswordSelector} + ${this._invalidMessage}`)

        this.repeatPasswordInput = this.container.locator(this._signupRepeatPasswordSelector)
        this.repeatPasswordErrorMessage = this.container.locator(`${this._signupRepeatPasswordSelector} + ${this._invalidMessage}`)
        this.btnRegister = this.container.locator('button', {hasText: 'Register'} )
    }
}
