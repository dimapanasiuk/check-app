import {
    CHANGE_ROLE,
} from "../actions/roleAction";

const initialState = { role: 'admin', login: '' };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ROLE:
            return { role: action.role, login: action.login };
        default:
            return { ...state };
    }
};

export default counterReducer;
