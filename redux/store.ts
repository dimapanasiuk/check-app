import rootReducer from "./reducers/rootReducer";
import { createStore, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

export interface State {
    tick: string;
}

const makeStore: MakeStore<State> = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper<State>(makeStore, { debug: true });




