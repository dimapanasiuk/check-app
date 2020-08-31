import {
    CHANGE_ROLE,
} from "../actions/roleAction";

const initialState = { data: 0 };

export type TState = typeof initialState;

const counterReducer = (state: TState = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ROLE:
            return { data: action.testData };
        default:
            return { ...state };
    }
};

export default counterReducer;
