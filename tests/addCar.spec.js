import {test, expect} from '../src/fixtures/userGaragePage.js' 


test.describe.only('Garage (fixtures)', () => {
    test('add car', async ({garagePage}) =>{
        const brand = 'Ford'
        const model = 'Fiesta'

        await expect(garagePage.addCarButton).toBeVisible()
        await garagePage.addCarButton.click()
        await expect(garagePage.addCarPopup).toBeVisible();
        await garagePage.brandInput.selectOption(brand);
        await garagePage.modelInput.selectOption(model);
        await garagePage.carKmInput.fill('4455');
        await garagePage.addButton.click();    
    
    })
})
