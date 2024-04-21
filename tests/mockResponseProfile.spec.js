import {test, expect} from '../src/fixtures/Login.js' 
import { USERS_MOCK_JSON } from './garage/usersMock.js'


test.describe.only('Mock Response', () => {
    test('profile /api/users/profile', async ({garagePage, page}) =>{
        await page.route('/api/users/profile', (route) =>{
            return route.fulfill({
                status: 200,
                body: JSON.stringify(USERS_MOCK_JSON)
                })
            
            })
        
        await garagePage.profileButton.click()
        await expect(page.getByText('User Test Mock')).toBeVisible()

        })

    })
