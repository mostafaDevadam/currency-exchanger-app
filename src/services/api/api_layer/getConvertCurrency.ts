import { API } from "../../../common/constant"
import { METHOD, callLayerAPI } from "../callAPI"


//    // https://api.apilayer.com/currency_data/convert?to=USD&from=EUR&amount=25
export const getConvertCurrency = async (from: string = "EUR", to: string = "USD", amount: any = 25) => {
    const result = await callLayerAPI(METHOD.get, API.apiLayer.convert + '?to=' + to + '&from=' + from + '&amount=' + amount)
    console.log('result api-layer getConvertCurrency: ', result)
    return result
}
