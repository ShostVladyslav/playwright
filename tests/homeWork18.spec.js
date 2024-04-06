import {expect, test} from '@playwright/test'
test.describe('check SignUP form', ()=>{  
    
    test.beforeEach(async ({page})=>{
        await page.goto("")
        await page.locator('button', {hasText: 'Sign up'}).click()
    })

    test.describe('positive test registration', ()=>{
        test.afterEach('Delete user',async ({page}) => {
            
            await page.locator('button', {hasText: 'My profile'}).click()
            await page.locator('a[routerlink="settings"]').click()
            await page.locator('button', {hasText: 'Remove my account'}).click()
            await page.locator('button[class="btn btn-danger"]', {hasText: 'Remove'}).click()

            await expect(page).toHaveURL("")
        });

        test("user registration", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const fildName = popup.locator('#signupName')
            const lastName = popup.locator('#signupLastName')
            const email = popup.locator('#signupEmail')
            const password = popup.locator('#signupPassword')
            const repeatPassword = popup.locator('#signupRepeatPassword')
            const btnRegister = page.locator('button', {hasText: 'Register'} )
            
            await test.step ("User registration", async()=>{
                await fildName.pressSequentially('TestName', {delay: 100})
                await lastName.pressSequentially('TestLastName', {delay: 100})
                await email.pressSequentially('aqa-test@email.com', {delay: 100})
                await password.pressSequentially('Password1', {delay: 100})
                await repeatPassword.pressSequentially('Password1', {delay: 100})
                await btnRegister.click()
                await expect(page).toHaveURL("/panel/garage")
            })
        })
    })

    test.describe('check registration fields', ()=>{
        test("field Name", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const name = popup.locator('#signupName')
            const nameErrorMessage = popup.locator('#signupName + .invalid-feedback')
            
            await test.step(`Check the border color and check the "Name required" message`, async()=>{
                await name.focus()
                await name.blur()

                await expect(nameErrorMessage).toBeVisible()
                await expect(nameErrorMessage).toHaveText('Name required')
                await expect(nameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            await test.step('Check message "Name is invalid"', async()=>{
                await name.fill(' test')
                await expect(nameErrorMessage).toHaveText('Name is invalid')
            })

            await test.step(`Check message "Name is invalid' & 'Name has to be from 2 to 20 characters long'`, async()=>{
                await name.fill(' ')
                await expect(nameErrorMessage).toHaveText('Name is invalid'+'Name has to be from 2 to 20 characters long')
            })  
    })

        test("field Last name", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const lastName = popup.locator('#signupLastName')
            const lastNameErrorMessage = popup.locator('#signupLastName + .invalid-feedback')

            await test.step('Check the border color and check the "Last name required" message', async()=>{
                await lastName.focus()
                await lastName.blur()

                await expect(lastNameErrorMessage).toBeVisible()
                await expect(lastNameErrorMessage).toHaveText('Last name required')
                await expect(lastNameErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            
            await test.step('Check message "Last name is invalid"', async()=>{
                await lastName.fill(' test')
                await expect(lastNameErrorMessage).toHaveText('Last name is invalid')
            })

            await test.step(`Check message "Last name is invalid' & 'Last name has to be from 2 to 20 characters long'`, async()=>{
                await lastName.fill(' ')
                await expect(lastNameErrorMessage).toHaveText('Last name is invalid'+'Last name has to be from 2 to 20 characters long')
            })           
        })

        test("field Email", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const email = popup.locator('#signupEmail')
            const emailErrorMessage = popup.locator('#signupEmail + .invalid-feedback')

            await test.step('Check the border color and check the "Email required" message', async()=>{
                await email.focus()
                await email.blur()

                await expect(emailErrorMessage).toBeVisible()
                await expect(emailErrorMessage).toHaveText('Email required')
                await expect(emailErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })
            await test.step('Check message "Email is incorrec"', async()=>{

                await email.fill(' test')
                await expect(emailErrorMessage).toHaveText('Email is incorrect')
            })

        })

        test("field Password", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const password = popup.locator('#signupPassword')
            const passwordErrorMessage = popup.locator('#signupPassword + .invalid-feedback')

            await test.step('Check the border color and check the "Password required" message', async()=>{
                await password.focus()
                await password.blur()

                await expect(passwordErrorMessage).toBeVisible()
                await expect(passwordErrorMessage).toHaveText('Password required')
                await expect(passwordErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            await test.step('Check validation message for field "Password"', async()=>{
                await password.fill('!@# !Password')
                await expect(passwordErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and \
                                                                contain at least one integer, one capital, and one small letter')
            })

        })

        test("field Re-enter password", async({page})=>{
            const popup = page.locator('app-signup-modal')
            const password = popup.locator('#signupPassword')
            const repeatPassword = popup.locator('#signupRepeatPassword')
            const repeatPasswordErrorMessage = popup.locator('#signupRepeatPassword + .invalid-feedback')

            await test.step('Check the border color and check the "Re-enter password required" message', async()=>{
                await repeatPassword.focus()
                await repeatPassword.blur()

                await expect(repeatPasswordErrorMessage).toBeVisible()
                await expect(repeatPasswordErrorMessage).toHaveText('Re-enter password required')
                await expect(repeatPasswordErrorMessage).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            })

            await test.step('Check validation message for field "Re-enter password"', async()=>{
                await repeatPassword.fill('!@# !Password')
                await expect(repeatPasswordErrorMessage).toHaveText('Password has to be from 8 to 15 characters long and \
                                                                contain at least one integer, one capital, and one small letter')
            })

            await test.step('Check error message "Passwords do not match" for field "Re-enter password"', async()=>{
                await password.fill('Password1')
                await repeatPassword.fill('Password123')

                await expect(repeatPasswordErrorMessage).toHaveText('Passwords do not match')
            })


        })

        test("disabled button Register", async({page})=>{
           
            const popup = page.locator('app-signup-modal')
            const fildName = popup.locator('#signupName')
            const lastName = popup.locator('#signupLastName')
            const email = popup.locator('#signupEmail')
            const password = popup.locator('#signupPassword')
            const repeatPassword = popup.locator('#signupRepeatPassword')
            const btnRegister = page.locator('button', {hasText: 'Register'} )
            
            await test.step('Check disabled button "Register"', async()=>{
                await fildName.fill('TestName')
                await lastName.fill('TestLastName')
                await email.fill('aqa-test@email.com')
                await password.fill('Password1')
                await repeatPassword.fill('Password112')
                
                await repeatPassword.blur()

                await expect(btnRegister).toBeDisabled()
            })
        })

    })
})