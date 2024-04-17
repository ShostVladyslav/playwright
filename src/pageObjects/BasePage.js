import Header from '../pageObjects/GaragePage/Components/Header.js'
import Main from './HomePage/Components/Main.js'


export default class BasePage {
    constructor(page, url) {
        this._page = page
        this._url = url
        this.header = new Header(page)
        this.main = new Main(page)
    }

    get page (){
        return this._page
    }

    async navigate(){
        await this._page.goto(this._url)
    }
}