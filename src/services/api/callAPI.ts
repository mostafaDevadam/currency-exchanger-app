import axios from "axios"
import { API } from "../../common/constant"

export enum METHOD {
    get = "GET",
    post = "POST",
    patch = "PATCH",
    delete = "DELETE",
}
export type PARAMS = {
    access_key?: string,
    from?: any,
    to?: any,
    base?: any,
    symbols?: any,
}


export const callFixerAPI = async (method: METHOD, url: string) => {
    let res
    res = await axios({
        method: method,
        url: API.fixerAPI.base + url,
    })
    console.log("res fixer api: ", res)
    return res.data
}


export const callLayerAPI = async (method: METHOD, url: string) => {
    let res = await axios({
        method: method,
        url: API.apiLayer.base + url,
        headers: {
            apikey: API.apiLayer.api_key,
        }
    })
    console.log("res api layer: ", res)
    return res.data
}
