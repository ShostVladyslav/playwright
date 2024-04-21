import BasePage from "../BasePage"

export default class GaragePage extends BasePage{
    constructor(page){
        super(page, '/panel/garage')
        this.addCarButton = page.getByRole('button', {name: 'Add car'})
        this.addCarPopup = page.getByRole('heading', { name: 'Add a car' })
        this.brandInput = page.getByLabel('Brand')
        this.modelInput = page.getByLabel('Model')
        this.carKmInput = page.getByLabel('Mileage')
        this.addButton = page.getByRole('button', { name: 'Add' })
        this.profileButton = page.locator('.sidebar .-profile')
        this.logo = page.getByText('.car-group .car_name')


    }
}