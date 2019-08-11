import { GET_MESSAGES} from "../actions/messagesActions";

const INIT_STATE = { messages: [] };

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        default:
            return state;
    }
}