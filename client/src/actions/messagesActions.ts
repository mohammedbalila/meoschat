import { apiUrl, parseJwt } from "../Globals";

export const GET_MESSAGES = "GET_MESSAGES";

export const getUserMessages = () => (dispatch: any) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
        return dispatch({ type: GET_MESSAGES, payload: [] });
    }
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    fetch(`${apiUrl}messages/`, { headers })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch({
            payload: data.user,
            type: GET_MESSAGES,
        })
    });
};


