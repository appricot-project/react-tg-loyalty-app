import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice";
import receiptsReducer from "./receiptsSlice";

const userPersistConfig = {
  key: "user",
  storage,
};

const receiptsPersistConfig = {
  key: "receipts",
  storage,
  whitelist: ["items"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    receipts: persistReducer(receiptsPersistConfig, receiptsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
