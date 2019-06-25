import { AuthActionTypes } from '../Actions/AuthActions';

const defaultAuthState = {
    isLoggedIn: false,
    userData: null
}

const AuthReducer = (state = { ...defaultAuthState }, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userData: action.userData
            };

        default:
            return { ...state };
    }
}

export default AuthReducer;