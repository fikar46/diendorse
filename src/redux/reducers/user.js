import { AUTHENTICATION_SUCCESS, ON_LOG_OUT } from "../types"

const INITIAL_STATE = {
    user : null
}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case AUTHENTICATION_SUCCESS:
            return {...state, user : action.payload}
        case ON_LOG_OUT :
            return INITIAL_STATE
        default:
            return state
    }

}