import BasePage from "../BasePage"
import SideNavbar from "./Components/SideNavbar"

export default class GaragePage extends BasePage{
    constructor(page){
        super(page, '/panel/garage')
        this.addCarButton = page.getByRole('button', {name: 'Add car'})
        this.addCarPopup = page.getByRole('heading', { name: 'Add a car' })
        this.brandInput = page.getByLabel('Brand')
        this.modelInput = page.getByLabel('Model')
        this.carKmInput = page.getByLabel('Mileage')
        this.addButton = page.getByRole('button', { name: 'Add' })
        this.logo = page.getByText('.car-group .car_name')
    }

    async openProfileTab(){
        await this.sideNavbar.profileButton.click()
        return new SideNavbar(this._page)
    }
}