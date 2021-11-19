import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";
import { semesterReducer } from "./semesterReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {persistReducer, persistCombineReducers} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const combined = combineReducers({
  events: eventReducer,
  user: userReducer,
  semester: semesterReducer,
});

export const reducers = persistReducer(persistConfig, combined);