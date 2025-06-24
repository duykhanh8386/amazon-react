import { get } from "../utils"

export const getCategory = async()=>{
    const result = await get('categories');
    return result;
}