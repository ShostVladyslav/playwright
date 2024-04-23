import {expect as baseExpect, test as base} from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import HomePage from "../pageObjects/HomePage/HomePage.js";
import { USERS } from "../pageObjects/data/Users.js";

export const test = base.extend({
    garagePage: async ({page}, use)=>{
        const homePage = new HomePage(page)
        await homePage.navigate()
        const SignInPopup = await homePage.openSignInPopup()
        await SignInPopup.emailInput.fill(USERS.Semen.email)
        await SignInPopup.passwordInput.fill(USERS.Semen.password)
        await SignInPopup.btnLogin.click()

        await expect(page).toHaveURL(/garage/)
        const garagePage = new GaragePage(page)

        await use(garagePage)
    }
})

export const expect = baseExpect
