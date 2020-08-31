import {
    CHANGE_ROLE,
} from "../actions/roleAction";

const initialState = { role: 'admin' };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ROLE:
            return { role: action.role };
        default:
            return { ...state };
    }
};

export default counterReducer;
