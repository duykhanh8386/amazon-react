import { get } from "../utils"
export const getFooter =async ()=>{
    const response = await get('dataFooter');
    return response
}