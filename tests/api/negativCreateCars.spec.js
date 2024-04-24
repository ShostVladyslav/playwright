import{ test, expect, request as apiRequest} from "../../src/fixtures/UserFixture.js"
import {MODELS} from "../../src/pageObjects/data/Models.js"
import {BRANDS} from "../../src/pageObjects/data/Brands.js"

test.describe("Cars API", ()=>{
    test.describe("Error creating cars", ()=>{

        test("Empty request body", async ({request})=>{

            await test.step('Check create car with empty brand and model', async ()=>{
                   
                    const response = await request.post('/api/cars', {
                    })
                    const body = await response.json()
                        const expected ={
                            "status": "error",
                            "message": "Car brand id is required"
                        }
                expect(response.status()).toBe(400)
                expect(body).toEqual(expected)
            })
        })

        test("Empty model id", async ({request})=>{
            const brand = BRANDS.BMW          

            await test.step(`Check create car with brand "${brand.title}" and without model id`, async()=>{
                    const requestBody = {
                        "carBrandId": brand.id,
                        "mileage": Math.floor(Math.random()*100)
                    }
                        const response = await request.post('/api/cars',{
                            data: requestBody
                        })
                    const body = await response.json()
                        const expected ={
                            "status": "error",
                            "message": "Car model id is required"
                        }
                expect(response.status()).toBe(400)
                expect(body).toEqual(expected)
            })
        })

        test("Not valid model id", async ({request})=>{
            const brand = BRANDS.Ford          
            const model = "XX2"

            await test.step(`Check create car with brand "${brand.title}" and not valid model`, async()=>{
                    const requestBody = {
                        "carBrandId": brand.id,
                        "carModelId": model,
                        "mileage": Math.floor(Math.random()*100)
                    }
                    const response = await request.post('/api/cars',{
                        data: requestBody
                    })
                    const body = await response.json()
                        const expected ={
                            "status": "error",
                            "message": "Invalid car model type"
                        }
                expect(response.status()).toBe(400)
                expect(body).toEqual(expected)
                })
            }
        )
        test("With negative mileage", async ({request})=>{
            const brand = BRANDS.Audi          
            const model = MODELS[1].TT

            await test.step(`Check create car with brand "${brand.title}", model "${model.title}" and negative mileage`, async()=>{
                    const requestBody = {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random()*-100),
                        
                    }
                    const response = await request.post('/api/cars',{
                        data: requestBody
                    })
                    const body = await response.json()
                        const expected ={
                            "status": "error",
                            "message": "Mileage has to be from 0 to 999999"
                        }
                expect(response.status()).toBe(400)
                expect(body).toEqual(expected)
                })
            }
        )

        test("With new parameter", async ({request})=>{
            const brand = BRANDS.Audi          
            const model = MODELS[1].TT

            await test.step(`Create car with brand "${brand.title}", model "${model.title}" and new parameter "4x4"`, async()=>{
                    const requestBody = {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random()*100),
                        "4x4" : true
                    }
                    const response = await request.post('/api/cars',{
                        data: requestBody
                    })
                    const body = await response.json()
                        const expected ={
                            "status": "error",
                            "message": '"4x4" is not allowed'
                        }
                expect(response.status()).toBe(400)
                expect(body).toEqual(expected)
                })
            }
        )
    })
})