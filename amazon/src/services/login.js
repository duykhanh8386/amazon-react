import { get, patch, post } from "../utils"

export const getAccount = async()=>{
  const response = await get("account");
  return response;
}
export const createAccount =async (option)=>{
    const result = await post("account",option);
    return result;
}
export const editAccount =async (id,option)=>{
    const result = await patch(`account/${id}`,option);
    return result;
}