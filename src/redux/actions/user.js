import { AUTHENTICATION_SUCCESS } from "../types"

export const onRegisterSuccess = (data) => {
    return{
        type : AUTHENTICATION_SUCCESS,
        payload : data
    }
}