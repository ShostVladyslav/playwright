import{ test, expect, request as apiRequest} from "../../src/fixtures/UserFixture.js"
import { MODELS } from "../../src/pageObjects/data/Models.js"
import { BRANDS } from "../../src/pageObjects/data/Brands.js"

test.describe("Cars API", ()=>{
    test.describe("Create and delete all cars", ()=>{
        test("Create cars", async({request})=>{
            for (const brand of Object.values(BRANDS)){
                
                for (const model of Object.values(MODELS[brand.id])){
                    
                    await test.step(`Create car with brand "${brand.title}" and model "${model.title}"`, async()=>{
                        const requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random()*100)
                        }
                        const response = await request.post('/api/cars',{
                            data: requestBody
                        })
                        const body = await response.json()
                        const expected ={
                            "id": expect.any(Number),
                            "carBrandId": requestBody.carBrandId,
                            "carModelId": requestBody.carModelId,
                            "initialMileage": requestBody.mileage,
                            "updatedMileageAt": expect.any(String),
                            "carCreatedAt": expect.any(String),
                            "mileage": requestBody.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        }
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(expected)
                    })
                }
            }
        })
        test("Deleted all cars", async({request})=>{
            const carsResponse = await request.get('/api/cars')
            const cars = await carsResponse.json()

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
            )
        })
    })
})
