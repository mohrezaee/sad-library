import {createSlice} from '@reduxjs/toolkit'
import {RootState} from './store'
import { BookType } from '../dataproviders/BookDataprovider'

const initialState: BookType[] = []

const basketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers: {
        setBasket(state=[], action) {
            switch(action.type) {
                case 'add':
                    console.log(state)
                    break
                case 'remove':
                    console.log(state)
                    break
            }
            return state
        },
        addToBasket(state=[], action) {
            state.push(action.payload)
            return state
        },
        removeFromBasket(state=[], action) {
            return state.filter(book => book.id !== action.payload)
        }
    },
})

export const {setBasket, addToBasket, removeFromBasket} = basketSlice.actions
export const basket = (state: RootState) => state.basket

export default basketSlice.reducer
