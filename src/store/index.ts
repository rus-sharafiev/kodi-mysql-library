import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'

// RTK apis
import { api } from './api/api'
import bottomSheetReducer from './reducers/bottomSheetSlice'

// --------------------------------------------------------------------------------

export const store = configureStore({
    reducer: {
        bottomSheet: bottomSheetReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM({ serializableCheck: false }).concat([
        api.middleware,
    ])
})

setupListeners(store.dispatch)

export type RootStore = typeof store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector