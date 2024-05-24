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
import {Utils} from '../utils/Utils'
import { BookType } from './BookDataprovider'
import { UserType } from './UserDataprovider'

export type OrderType = {
    id: string
    books: BookType[]
    user: UserType
    total: number
    createdAt: Date
}

export class OrderDataprovider implements DataProvider {
    private static orders: BookType[]
    private static lastID: number
    private static resource = 'orders'
    constructor() {
        try {
            OrderDataprovider.orders = Utils.getFromLocalStorate(OrderDataprovider.resource)
        } catch (error) {
            OrderDataprovider.orders = JSON.parse(JSON.stringify([]))
        }
        OrderDataprovider.lastID = OrderDataprovider.orders.length
        Utils.saveToLocalStorate(OrderDataprovider.resource, OrderDataprovider.orders)
    }
    async getList<TData>(params: GetListParams): Promise<GetListResponse<TData>> {
        OrderDataprovider.orders = Utils.getFromLocalStorate(OrderDataprovider.resource)
        const filter = params.filters
        console.log(filter)
        return {
            data: OrderDataprovider.orders as TData[],
            total: OrderDataprovider.orders.length,
        }
    }

    async getOne<TData>(params: GetOneParams): Promise<GetOneResponse<TData>> {
        OrderDataprovider.orders = Utils.getFromLocalStorate(OrderDataprovider.resource)
        const book = OrderDataprovider.orders.find((item) => item.id === params.id)
        if (!book) {
            throw new Error('book not found')
        }
        return {data: book as TData}
    }
    async create<TData, TVariables>(
        params: CreateParams<TVariables>,
    ): Promise<CreateResponse<TData>> {
        const newID = OrderDataprovider.lastID + 1
        const book: OrderType | any = {
            ...params.variables,
        }
        console.log(params.variables)
        OrderDataprovider.orders = [
            ...OrderDataprovider.orders,
            {...book, id: String(newID), createdAt: new Date()},
        ]
        Utils.saveToLocalStorate(OrderDataprovider.resource, OrderDataprovider.orders)
        OrderDataprovider.lastID += 1
        return {data: OrderDataprovider.orders[OrderDataprovider.orders.length - 1] as TData}
    }

    async update<TData, TVariables>(
        params: UpdateParams<TVariables>,
    ): Promise<UpdateResponse<TData>> {
        const book = OrderDataprovider.orders.find((item) => item.id === params.id) as any
        if (!book) {
            throw new Error('book not found')
        }
        for (const key of Object.keys(params.variables as BookType)) {
            if (key === 'category') {
                book[key] = (params.variables as any).category.map((item) => item.id)
            } else {
                book[key] = (params.variables as any)[key]
            }
        }
        Utils.saveToLocalStorate(OrderDataprovider.resource, OrderDataprovider.orders)
        return {data: book as TData}
    }

    async deleteOne<TData, TVariables>(
        params: DeleteOneParams<TVariables>,
    ): Promise<DeleteOneResponse<TData>> {
        const book = OrderDataprovider.orders.find((item) => item.id === params.id) as any
        if (!book) {
            throw new Error('book not found')
        }
        OrderDataprovider.orders = OrderDataprovider.orders.filter((item) => item.id !== params.id)
        Utils.saveToLocalStorate(OrderDataprovider.resource, OrderDataprovider.orders)
        return {data: {} as TData}
    }
    getApiUrl() {
        return ''
    }
}
