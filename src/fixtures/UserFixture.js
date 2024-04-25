import {expect as baseExpect, request as baseRequest, test as base} from "@playwright/test";
import { USER_SEMEN_STORAGE_STATE_PATH } from "../constats"


export const test = base.extend({
    request: async ( {}, use)=>{
        const req = await request.newContext({
            storageState: USER_SEMEN_STORAGE_STATE_PATH
        })
        await use(req)

        await req.dispose()
    },
})

export const expect = baseExpect

export const request = baseRequest