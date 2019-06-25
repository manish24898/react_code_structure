import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CombinedReducers from '../Reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const persistedReducer = persistReducer(persistConfig, CombinedReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export const dispatchAction = store.dispatch; 