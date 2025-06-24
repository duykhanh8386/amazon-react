import { get } from "../utils"

export const getListProduct =async ()=>{
    const response = await get('products');
    return response
}
export const getProduct = async(id)=>{
    const response = await get(`products/${id}`)
    return response
}