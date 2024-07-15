import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const peristConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(peristConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware to prevent errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
