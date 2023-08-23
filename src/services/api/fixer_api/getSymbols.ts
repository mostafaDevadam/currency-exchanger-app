import { API } from "../../../common/constant"
import { METHOD, callFixerAPI } from "../callAPI"
import axios from 'axios';


export const getSymbols = async () => {
    const date = '2023-08-18'
    const result = await callFixerAPI(METHOD.get, API.fixerAPI.symbols + '?access_key=' + API.fixerAPI.access_key + '&date=' + date + '/')
    console.log('result symbols: ', result)
    //
    // const url = API.fixerAPI.symbols + '?access_key=' + API.fixerAPI.access_key + '&date=2023-08-18/'
    //const l = await callFixerAPI(METHOD.get, url)
    //console.log('res symbols l:', l.data)
    return result
}
