import SignUpPopup from '../../pageObjects/HomePage/Components/SignupPopup'
import SignInPopup from '../../pageObjects/HomePage/Components/SignInPopup'
import BasePage from '../BasePage'
import GaragePage from '../GaragePage/GaragePage'

export default class HomePage extends BasePage{
    constructor(page) {
        super(page, '/')
    }
    async openSignInPopup(){
        await this.header.signInButton.click()
        return new SignInPopup(this._page)
    }

    async openSignUpPopup(){
        await this.main.signUpButton.click()
        return new SignUpPopup(this._page)
    }

    async loginAsGuest(){
        await this.header.guestLoginButton.click()
        return new GaragePage(this._page)
    }
}