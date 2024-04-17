import BaseComponent from '../Components/BaseComponent.js'

export default class Header extends BaseComponent {
    constructor(page) {
        super(page, page.locator('header'));
        this.signInButton =  page.locator('button', {hasText: 'Sign In'})
        this.guestLoginButton = page.locator('.header-link.-guest')
    }
}