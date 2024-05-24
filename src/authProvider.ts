import {AuthBindings} from '@refinedev/core'
import {UserDataprovider} from './dataproviders/UserDataprovider'
import {store} from './redux/store'
import {logout, setUser} from './redux/UserSlice'

export const TOKEN_KEY = 'refine-auth'

export const authProvider: AuthBindings = {
    login: async ({username, password}) => {
        if (username && password) {
            const users = await UserDataprovider.users

            const user = users.find(
                (user) => user.username === username && user.password === password,
            )

            if (user) {
                store.dispatch(setUser({login: true, name: user.username, id: user.id}))
                const redirect = user.username === 'admin' ? 'books' : ''
                return {
                    success: true,
                    redirectTo: '/' + redirect,
                }
            }
        }

        return {
            success: false,
            error: {
                name: 'LoginError',
                message: 'Invalid username or password',
            },
        }
    },
    logout: async () => {
        store.dispatch(logout())
        return {
            success: true,
            redirectTo: '/login',
        }
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            return {
                authenticated: true,
            }
        }
        return {
            authenticated: false,
            redirectTo: '/login',
        }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        // const token = localStorage.getItem(TOKEN_KEY);
        // if (token) {
        // const user = await UserDataprovider.getOne<UserType>({ id: token });
        // if (user) {
        return {
            id: 'user.id',
            name: 'admin',
            avatar: 'https://i.pravatar.cc/300', // You can customize the avatar field
        }
        // }
        // }
        // return null;
    },
    onError: async (error) => {
        console.error(error)
        return {error}
    },
}
