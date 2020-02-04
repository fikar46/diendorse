import {localStorageKey} from './constant'
let token;

export const getToken =()=>{
  if(token){
        return token
  }else{
        var auth = JSON.parse(localStorage.getItem(localStorageKey));
        return token = auth.token
  }
}
export const getHeaderAuth =()=>{
    getToken();
    console.log(token)
    if(token){
        const headers = {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        }
        return headers
    }
}