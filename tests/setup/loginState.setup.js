import { test as setup } from "@playwright/test";
import HomePage from "../../src/pageObjects/HomePage/HomePage";
import { expect } from "../../src/fixtures/userGaragePage.js";
import { USER_SEMEN_STORAGE_STATE_PATH } from "../../src/constats.js";
import {USERS} from '../../src/pageObjects/data/Users.js'

setup.describe('Setup', ()=> {
    setup("Login and Save", async({page}) => {
        const homePage = new HomePage(page)
        await homePage.navigate()
        const signInPopup = await homePage.openSignInPopup()
        await signInPopup.emailInput.fill(USERS.Semen.email)
        await signInPopup.passwordInput.fill(USERS.Semen.password)
        await signInPopup.btnLogin.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_SEMEN_STORAGE_STATE_PATH
        })
    })
})