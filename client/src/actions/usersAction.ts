import { apiUrl } from "../Globals";

export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";

export const getUsers = () => (dispatch: any) => {
    fetch(`${apiUrl}users/`,)
    .then((res) => res.json())
    .then((data) => {
        dispatch({
        payload: data.users,
        type: GET_USERS,
    })
});
}

export const getUser = (id: string) => (dispatch: any) => {
    fetch(`${apiUrl}users/${id}`,)
    .then((res) => res.json())
    .then((data) => {
        dispatch({
        payload: data.user,
        type: GET_USER,
    })
});
}