export const AuthActionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
};

export const loginSuccess = (userData) => {
    return {
        type: AuthActionTypes.LOGIN_SUCCESS,
        userData
    };
}