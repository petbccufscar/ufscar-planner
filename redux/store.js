import { createStore } from "redux";
import {reducers} from "./reducers/index";
import {persistStore} from "redux-persist";

export const store = createStore(reducers, {});

export const persistor = persistStore(store);