import {
    CreateParams,
    CreateResponse,
    DataProvider,
    DeleteOneParams,
    DeleteOneResponse,
    GetListParams,
    GetListResponse,
    GetOneParams,
    GetOneResponse,
    UpdateParams,
    UpdateResponse,
} from '@refinedev/core'
import {defaultUsers} from './defaultUsers'
import {Utils} from '../utils/Utils'

export type UserType = {
    id: string
    name: string
    username: string
    password: string
}

export class UserDataprovider implements DataProvider {
    static users: UserType[]
    static lastID: number
    private static resource = 'users'
    constructor() {
        try {
            UserDataprovider.users = Utils.getFromLocalStorate(UserDataprovider.resource)
        } catch (error) {
            UserDataprovider.users = JSON.parse(JSON.stringify(defaultUsers))
        }
        UserDataprovider.lastID = UserDataprovider.users.length
        Utils.saveToLocalStorate(UserDataprovider.resource, UserDataprovider.users)
    }
    async getList<TData>(params: GetListParams): Promise<GetListResponse<TData>> {
        UserDataprovider.users = Utils.getFromLocalStorate(UserDataprovider.resource)
        return {
            data: UserDataprovider.users as TData[],
            total: UserDataprovider.users.length,
        }
    }

    async getOne<TData>(params: GetOneParams): Promise<GetOneResponse<TData>> {
        UserDataprovider.users = Utils.getFromLocalStorate(UserDataprovider.resource)
        const user = UserDataprovider.users.find((item) => item.id === params.id)
        if (!user) {
            throw new Error('user not found')
        }
        return {data: user as TData}
    }
    async create<TData, TVariables>(
        params: CreateParams<TVariables>,
    ): Promise<CreateResponse<TData>> {
        const newID = UserDataprovider.lastID + 1
        UserDataprovider.users = [
            ...UserDataprovider.users,
            {...(params.variables as UserType), id: String(newID)},
        ]
        UserDataprovider.lastID += 1
        Utils.saveToLocalStorate(UserDataprovider.resource, UserDataprovider.users)
        return {data: UserDataprovider.users[UserDataprovider.users.length - 1] as TData}
    }

    async update<TData, TVariables>(
        params: UpdateParams<TVariables>,
    ): Promise<UpdateResponse<TData>> {
        const user = UserDataprovider.users.find((item) => item.id === params.id) as any
        if (!user) {
            throw new Error('user not found')
        }
        for (const key of Object.keys(params.variables as UserType)) {
            user[key] = (params.variables as any)[key]
        }
        Utils.saveToLocalStorate(UserDataprovider.resource, UserDataprovider.users)
        return {data: user as TData}
    }

    async deleteOne<TData, TVariables>(
        params: DeleteOneParams<TVariables>,
    ): Promise<DeleteOneResponse<TData>> {
        const user = UserDataprovider.users.find((item) => item.id === params.id) as any
        if (!user) {
            throw new Error('user not found')
        }
        UserDataprovider.users = UserDataprovider.users.filter((item) => item.id !== params.id)
        Utils.saveToLocalStorate(UserDataprovider.resource, UserDataprovider.users)
        return {data: {} as TData}
    }
    getApiUrl() {
        return ''
    }
}
