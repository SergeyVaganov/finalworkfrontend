import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReduser from './slices/authSlice'
import infoReduser from './slices/infoSlice'
import caruselReduser from './slices/caruselSlice'
import histoReduser from './slices/hustoSlice'
import docReduser from './slices/documentsSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authSt']
}

const rootReducer = combineReducers({
    authSt: authReduser,
    infoSt: infoReduser,
    caruselSt: caruselReduser,
    histogrammSt: histoReduser,
    docSt: docReduser
})

const persisedReduser = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persisedReduser,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export const persistor = persistStore(store)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





