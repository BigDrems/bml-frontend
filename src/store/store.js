import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import speciesFilterReducer from './slices/speciesFilterSlice';
import speciesExplorerReducer from './slices/speciesExplorerSlice';
import userManagementReducer from './slices/userManagementSlice';

const rootReducer = combineReducers({
  speciesFilter: speciesFilterReducer,
  speciesExplorer: speciesExplorerReducer,
  userManagement: userManagementReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['speciesFilter'] // only speciesFilter will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
