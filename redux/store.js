import { createStore } from "redux";
import { reducers } from "./reducers/index";
import { persistStore } from "redux-persist";

// TODO configureStore
export const store = createStore(reducers, {});
export const persistor = persistStore(store);
