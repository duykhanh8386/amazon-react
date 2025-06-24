const API_DOMAIN = 'http://localhost:3002/'
export const get = async(path)=>{
    const response = await fetch(API_DOMAIN+path);
    const result = await response.json();
    return result;
}