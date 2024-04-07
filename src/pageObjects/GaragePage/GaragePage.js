
export default class GaragePage{
    constructor(page){
        this._page = page
        this._btnMyProfile = page.locator('button', {hasText: 'My profile'})
        this._btnSettings = page.locator('a[routerlink="settings"]')
        this._RemoveMyAccount = page.locator('button', {hasText: 'Remove my account'})
        this._Remove = page.locator('button[class="btn btn-danger"]', {hasText: 'Remove'})


    }

    async openMyProfileMenu(){
        await this._btnMyProfile.click()
    } 
    
    async goToSettings(){
        await this._btnSettings.click()
    }

    async removeMyAccount(){
        await this._RemoveMyAccount.click()
    }
    
    async Remove(){
        await this._Remove.click()
    }
}