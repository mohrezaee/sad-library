import userReducer from "./UserSlice";
import { configureStore } from '@reduxjs/toolkit'
import UtilSlice from "./UtilSlice";
import BasketSlice from "./BasketSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        util: UtilSlice,
        basket: BasketSlice,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector