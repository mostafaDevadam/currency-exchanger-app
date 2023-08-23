import { API } from "../../../common/constant"
import { METHOD, callLayerAPI } from "../callAPI"


export const getFluctuation = async () => { // base, start_date, end_date
    const url = API.apiLayer.fluctuation + '?start_date=2022-01-01&end_date=2022-12-31'
    const result = await callLayerAPI(METHOD.get, url)
    console.log('result api-layer fluctuation: ', result)
    return result

}
