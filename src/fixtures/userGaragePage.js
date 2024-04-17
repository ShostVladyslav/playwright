import {expect as baseExpect, test as base} from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { USER_SEMEN_STORAGE_STATE_PATH } from "../constats.js";


export const test = base.extend({
    garagePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: USER_SEMEN_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)
    }
})

export const expect = baseExpect

// export const test = base.extend({
//     garagePage: async ({page}, use)=>{
//         const homePage = new HomePage(page)
//         await homePage.navigate()
//         const SignInPopup = await homePage.openSignInPopup()
//         await SignInPopup.emailInput.fill(USERS.Semen.email)
//         await SignInPopup.passwordInput.fill(USERS.Semen.password)
//         await SignInPopup.btnLogin.click()

//         await expect(page).toHaveURL(/garage/)
//         const garagePage = new GaragePage(page)

//         await use(garagePage)
//     }
// })
