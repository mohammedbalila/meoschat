import { apiUrl, parseJwt } from "../Globals";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const AUTH_ERR = "AUTH_ERR";

export const login = (
    { username, password }: { username: string, password: string },
) => (dispatch: any) => {
    const body = {
        password,
        username,
    };
    fetch(`${apiUrl}users/login`, {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    })

        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("auth-token", data.token);

                dispatch({
                    payload: data.user,
                    type: LOGIN,
                });
                return;
            }
            dispatch({
                payload: data.info.message,
                type: AUTH_ERR,
            });
        })
        .catch((err) => dispatch({
            payload: err.message,
            type: AUTH_ERR,
        }));
};

export const signup = ({
    username,
    password,
    dateOfBirth,
}: {
    username: string,
    password: string,
    dateOfBirth: Date,
}) => (dispatch: any) => {
    const body = {
        dateOfBirth,
        password,
        username,
    };

    fetch(`${apiUrl}users/signup`, {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                dispatch({
                    payload: data.message,
                    type: SIGNUP,
                });
                localStorage.setItem("auth-token", data.token);
                return;
            }
            console.log(data);
            dispatch({
                payload: data.message,
                type: AUTH_ERR,
            });

        })
        .catch((err) => dispatch({
            payload: err.message,
            type: AUTH_ERR,
        }));
};

export const checkLogin = () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
        return {
            payload: true,
            type: CHECK_LOGIN,
        };
    }
    return {
        payload: false,
        type: CHECK_LOGIN,
    };
};

export const getCurrentUser = () => (dispatch: any) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
        return dispatch({ type: GET_CURRENT_USER, payload: null });
    }
    const id = parseJwt(token).id;
    console.log(parseJwt(token));
    fetch(`${apiUrl}users/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch({
            payload: data.user,
            type: GET_CURRENT_USER,
        }));
};
