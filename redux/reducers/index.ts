import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";
import { semesterReducer } from "./semesterReducer";
import { calendarReducer } from "./calendarReducer";
import { restaurantReducer } from "./restaurantReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MigrationManifest, PersistedState, persistReducer,
} from "redux-persist";
import { themeReducer } from "./themeReducer";
import { EventState } from "../types/event";
import { UserState } from "../types/user";
import { SemesterState } from "../types/semester";
import { ThemeState } from "../types/theme";
import { RestaurantState } from "../types/restaurant";
import createMigrate from "redux-persist/es/createMigrate";

export type RootState = {
  events: EventState,
  user: UserState,
  semester: SemesterState,
  theme: ThemeState,
  restaurant: RestaurantState,
}

type RootPersistState = RootState & PersistedState;

/**
 * Migração para arrumar alguns erros de tipo e de lógica no estado.
 */
function repair0(state: PersistedState): RootPersistState | undefined {
  if (!state) { return state; }
  const { events, ...etc } = state as RootPersistState;
  return {
    ...etc,
    events: {
      ...events,
      events: events.events.map((ev) => {
        return {
          ...ev,
          details: ev.details.map((det) => {
            return {
              ...det,
              local: det.local || "",
            };
          }),
        };
      }),
    },
  };
}

const migrations: MigrationManifest = {
  0: repair0,
};

const persistConfig = {
  version: 0,
  key: "root",
  storage: AsyncStorage,
  whitelist: ["events", "user", "semester", "theme", "restaurant"],
  migrate: createMigrate(migrations, { debug: __DEV__ }),
};

const combined = combineReducers({
  events: eventReducer,
  user: userReducer,
  semester: semesterReducer,
  cards: calendarReducer,
  theme: themeReducer,
  restaurant: restaurantReducer,
});

export const reducers = persistReducer(persistConfig, combined);
