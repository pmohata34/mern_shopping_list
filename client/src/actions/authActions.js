import axios from "axios";
import { returnErrors } from "./errorActions";

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from "./types";

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, "AUTH_ERROR")
            );
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from localStorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    //If token, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config; 
}