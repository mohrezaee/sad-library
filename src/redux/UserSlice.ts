import {createSlice} from '@reduxjs/toolkit'
import { RootState } from './store'

type UserType = {
    name: string,
    phone: string,
    id: string,
    login: boolean,
}
const initialState: UserType = {
    name: '',
    phone: '',
    id: '',
    login: false,
}
function getInitialState(): UserType {
    try {
        const user = JSON.parse(localStorage.getItem('user') || "{}")
        if (user) return user
        else return initialState
    } catch {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    localStorage.setItem('user', JSON.stringify(state))
}

const emptyStorages = () => {
    localStorage.clear()
    sessionStorage.clear()
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser(state, action) {
            for (const key in action.payload) state[key] = action.payload[key]
            saveStateToLocalStorage(state)
            return state
        },
        logout(state) {
            state = initialState
            emptyStorages()
            return state
        },
    },
})

export const {setUser, logout} = userSlice.actions
export const util = (state: RootState) => state.util

export default userSlice.reducer
