import BaseComponent from '../Components/BaseComponent.js'

export default class SideNavbar extends BaseComponent {
    constructor(page) {
        super(page, page.locator('sidebar'));
        this.profileButton = page.locator('.sidebar .-profile')
    }
}