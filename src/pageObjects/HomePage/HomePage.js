import SignupPopup from '../../pageObjects/HomePage/Components/SignupPopup'

export default class HomePage{
    constructor(page){
        this._page = page
        this._signupButton = page.locator('button', {hasText: 'Sign up'})
    }

    async navigate(){
        await this._page.goto("")
    }

    async openSignupPopup(){
        await this._signupButton.click()
            return new SignupPopup(this._page)
    }
}

