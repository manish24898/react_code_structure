import { CommonActionTypes } from '../Actions/CommonActions';


const defaultCommonState = {
    drawerOpen: false
};

const CommonReducer = (state = { ...defaultCommonState }, action) => {
    switch (action.type) {
        case CommonActionTypes.TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen
            };

        default:
            return { ...state };
    }
}

export default CommonReducer;