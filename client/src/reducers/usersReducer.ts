import { GET_USERS, GET_USER } from "../actions/usersAction";

const INIT_STATE = { users: [], user: {} };

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}