import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "./services/core";
import globalReducer from "./slices/global";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // @ts-expect-error Type 'unknown' is not assignable to type '(GlobalState & PersistPartial) | undefined'.
    global: persistReducer(persistConfig, globalReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
