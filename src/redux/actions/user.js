import { AUTHENTICATION_SUCCESS, ON_LOG_OUT } from "../types"

export const onRegisterSuccess = (data) => {
    return{
        type : AUTHENTICATION_SUCCESS,
        payload : data
    }
}

export const onLogout = () => {
    return{
        type : ON_LOG_OUT
    }
}