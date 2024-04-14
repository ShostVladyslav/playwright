import {test, expect} from '@playwright/test';
import HomePage from '../src/pageObjects/HomePage/HomePage.js';
import GaragePage from '../src/pageObjects/GaragePage/GaragePage.js';
import {USERS} from '../src/pageObjects/data/Users.js'


test.describe('Signup form validation', ()=>{
    let popup
    test.describe('Positive test registration', ()=>{
        test.beforeEach(async({page})=>{
            const homePage = new HomePage(page)
            await homePage.navigate()
            popup = await homePage.openSignupPopup()
        })
        test.afterEach(async({page})=>{
            const garagePage = new GaragePage(page)
            await garagePage.openMyProfileMenu()
            await garagePage.goToSettings()
            await garagePage.removeMyAccount()
            await garagePage.Remove()
            
            await expect(page).toHaveURL("")
        })
        test("User registration", async({page})=>{
            await test.step('User registration and check autologin', async()=>{
                await popup.nameInput.pressSequentially(USERS.Semen.name, {delay: 100})
                await popup.lastNameInput.pressSequentially(USERS.Semen.lastName, {delay: 100})
                await popup.emailInput.pressSequentially(USERS.Semen.email, {delay: 100})
                await popup.passwordInput.pressSequentially(USERS.Semen.password, {delay: 100})
                await popup.repeatPasswordInput.pressSequentially(USERS.Semen.password, {delay: 100})
                await popup.btnRegister.click()
                await expect(page).toHaveURL("/panel/garage")       
            }) 
        })
    })
    test.describe("Check validation fields", ()=>{
        test.beforeEach(async({page})=>{
            const homePage = new HomePage(page)
            await homePage.navigate()
            popup = await homePage.openSignupPopup()
        })
        test('Validation Name field', async()=>{
            await test.step(`Check the border color and check the "Name required" message`, async()=>{
                await popup.nameInput.focus()
                await popup.nameInput.blur()
                await expect(popup.nameErrorMessage).toBeVisible()
                await expect(popup.nameErrorMessage).toHaveText('Name required')
                await expect(popup.nameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            
            await test.step('Check message "Name is invalid"', async()=>{
                await popup.nameInput.fill(' test')
                await expect(popup.nameErrorMessage).toHaveText('Name is invalid')
            })
            
            await test.step(`Check message "Name is invalid' & 'Name has to be from 2 to 20 characters long'`, async()=>{
                await popup.nameInput.fill(' ')
                await expect(popup.nameErrorMessage).toHaveText('Name is invalid'+'Name has to be from 2 to 20 characters long')
            })
        })
        test("Validation Last name field", async()=>{
            await test.step('Check the border color and check the "Last name required" message', async()=>{
                await popup.lastNameInput.focus()
                await popup.lastNameInput.blur()
            
                await expect(popup.lastNameErrorMessage).toBeVisible()
                await expect(popup.lastNameErrorMessage).toHaveText('Last name required')
                await expect(popup.lastNameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
                        
            await test.step('Check message "Last name is invalid"', async()=>{
                await popup.lastNameInput.fill(' test')
                await expect(popup.lastNameErrorMessage).toHaveText('Last name is invalid')
            })
            
            await test.step(`Check message "Last name is invalid' & 'Last name has to be from 2 to 20 characters long'`, async()=>{
                await popup.lastNameInput.fill(' ')
                await expect(popup.lastNameErrorMessage).toHaveText('Last name is invalid'+'Last name has to be from 2 to 20 characters long')
            })           
        })
        test("Validation Email field", async()=>{
            await test.step('Check the border color and check the "Email required" message', async()=>{
                await popup.emailInput.focus()
                await popup.emailInput.blur()

                await expect(popup.emailErrorMessage).toBeVisible()
                await expect(popup.emailErrorMessage).toHaveText('Email required')
                await expect(popup.emailErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            await test.step('Check message "Email is incorrec"', async()=>{
                await popup.emailInput.fill(' test')
                await expect(popup.emailErrorMessage).toHaveText('Email is incorrect')
            })
            
        })
        test("Validation Password field", async()=>{
            await test.step('Check the border color and check the "Password required" message', async()=>{
                await popup.passwordInput.focus()
                await popup.passwordInput.blur()
                await expect(popup.passwordErrorMessage).toBeVisible()
                await expect(popup.passwordErrorMessage).toHaveText('Password required')
                await expect(popup.passwordErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            await test.step('Check validation message for field "Password"', async()=>{
                await popup.passwordInput.fill('!@# !Password')
                await expect(popup.passwordErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and \
                                                            contain at least one integer, one capital, and one small letter')
            })
        })
        test("Validation Re-enter password field", async()=>{
            await test.step('Check the border color and check the "Re-enter password required" message', async()=>{
                await popup.repeatPasswordInput.focus()
                await popup.repeatPasswordInput.blur()

                await expect(popup.repeatPasswordErrorMessage).toBeVisible()
                await expect(popup.repeatPasswordErrorMessage).toHaveText('Re-enter password required')
                await expect(popup.repeatPasswordErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            await test.step('Check validation message for field "Re-enter password"', async()=>{
                await popup.repeatPasswordInput.fill('!@# !Password')
                await expect(popup.repeatPasswordErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and \
                                                                contain at least one integer, one capital, and one small letter')
            })

            await test.step('Check error message "Passwords do not match" for field "Re-enter password"', async()=>{
                await popup.passwordInput.fill('Password1')
                await popup.repeatPasswordInput.fill('Password123')

                await expect(popup.repeatPasswordErrorMessage).toHaveText('Passwords do not match')
            })
        })
        test("disabled button Register", async()=>{
            await test.step('Check disabled button "Register"', async()=>{
                await popup.nameInput.fill(USERS.Semen.name)
                await popup.lastNameInput.fill(USERS.Semen.lastName)
                await popup.emailInput.fill(USERS.Semen.email)
                await popup.passwordInput.fill(USERS.Semen.password)
                await popup.repeatPasswordInput.fill(USERS.Semen.password + '123')
                await popup.repeatPasswordInput.blur()

                await expect(popup.btnRegister).toBeDisabled()
            })
        })
    })
})