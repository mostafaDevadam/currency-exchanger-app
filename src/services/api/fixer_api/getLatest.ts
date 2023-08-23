import { API } from "../../../common/constant"
import { METHOD, callFixerAPI } from "../callAPI"


export const getLatest = async () => {
    const result = await callFixerAPI(METHOD.get, API.fixerAPI.latest + '?access_key=' + API.fixerAPI.access_key)
    console.log("result latest : ", result)

}
