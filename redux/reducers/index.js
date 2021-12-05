import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";
import { semesterReducer } from "./semesterReducer";
import { calendarReducer } from "./calendarReducer";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {persistReducer, persistCombineReducers} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["events","user", "semester"]
}

const combined = combineReducers({
  events: eventReducer,
  user: userReducer,
  semester: semesterReducer,
  cards: calendarReducer
});

export const reducers = persistReducer(persistConfig, combined);