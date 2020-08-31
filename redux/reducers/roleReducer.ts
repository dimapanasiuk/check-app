import {
    CHANGE_ROLE,
} from "../actions/roleAction";

const initialState = { role: '' };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ROLE:
            return { data: action.role };
        default:
            return { ...state };
    }
};

export default counterReducer;
