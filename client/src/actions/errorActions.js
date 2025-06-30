import { GET_ERRORS, CLEAR_ERRORS} from './types';

// Returns any errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
}

// Clears errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
}