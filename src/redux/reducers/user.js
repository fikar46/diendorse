import { AUTHENTICATION_SUCCESS } from "../types"

const INITIAL_STATE = {
    user : {
        username : 'fikri'
    }
}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case AUTHENTICATION_SUCCESS:
            return {...state, user : action.payload}
        default:
            return state
    }

}