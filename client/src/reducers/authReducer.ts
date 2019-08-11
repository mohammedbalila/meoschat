import { LOGIN, SIGNUP, CHECK_LOGIN, GET_CURRENT_USER, AUTH_ERR } from "../actions/authActions";

const INIT_STATE = { user: null, authStatus: false, message: "" };

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SIGNUP:
            return {
                ...state,
                message: action.payload,
            }
        case CHECK_LOGIN:
            return {
                ...state,
                authStatus: action.payload,
            };
        case AUTH_ERR:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}