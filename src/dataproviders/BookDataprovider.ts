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
import {defaultBooks} from './defaultBooks'
import {Utils} from '../utils/Utils'

export type BookType = {
    id: string
    name: string
    content: string
    price: number
    shabak: string
    category: string[]
    image: string
    writers: string[]
    translators: string[]
    publisher: string
    createdAt: Date
    rating: number
}

export class BookDataprovider implements DataProvider {
    private static books: BookType[]
    private static lastID: number
    private static resource = 'books'
    constructor() {
        try {
            BookDataprovider.books = Utils.getFromLocalStorate(BookDataprovider.resource)
        } catch (error) {
            BookDataprovider.books = JSON.parse(JSON.stringify(defaultBooks))
        }
        BookDataprovider.lastID = BookDataprovider.books.length
        Utils.saveToLocalStorate(BookDataprovider.resource, BookDataprovider.books)
    }
    async getList<TData>(params: GetListParams): Promise<GetListResponse<TData>> {
        BookDataprovider.books = Utils.getFromLocalStorate(BookDataprovider.resource)
        const filter = params.filters
        console.log(filter)
        return {
            data: BookDataprovider.books as TData[],
            total: BookDataprovider.books.length,
        }
    }

    async getOne<TData>(params: GetOneParams): Promise<GetOneResponse<TData>> {
        BookDataprovider.books = Utils.getFromLocalStorate(BookDataprovider.resource)
        const book = BookDataprovider.books.find((item) => item.id === params.id)
        if (!book) {
            throw new Error('book not found')
        }
        return {data: book as TData}
    }
    async create<TData, TVariables>(
        params: CreateParams<TVariables>,
    ): Promise<CreateResponse<TData>> {
        const newID = BookDataprovider.lastID + 1
        const book: BookType | any = {
            ...params.variables,
            writers: ((params.variables as BookType).writers as unknown as string).split(', '),
            translators: ((params.variables as BookType).translators as unknown as string).split(
                ', ',
            ),
            category: (params.variables as any).category.map((item) => item.id),
        }
        BookDataprovider.books = [
            ...BookDataprovider.books,
            {...book, id: String(newID), createdAt: new Date()},
        ]
        Utils.saveToLocalStorate(BookDataprovider.resource, BookDataprovider.books)
        BookDataprovider.lastID += 1
        return {data: BookDataprovider.books[BookDataprovider.books.length - 1] as TData}
    }

    async update<TData, TVariables>(
        params: UpdateParams<TVariables>,
    ): Promise<UpdateResponse<TData>> {
        const book = BookDataprovider.books.find((item) => item.id === params.id) as any
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
        Utils.saveToLocalStorate(BookDataprovider.resource, BookDataprovider.books)
        return {data: book as TData}
    }

    async deleteOne<TData, TVariables>(
        params: DeleteOneParams<TVariables>,
    ): Promise<DeleteOneResponse<TData>> {
        const book = BookDataprovider.books.find((item) => item.id === params.id) as any
        if (!book) {
            throw new Error('book not found')
        }
        BookDataprovider.books = BookDataprovider.books.filter((item) => item.id !== params.id)
        Utils.saveToLocalStorate(BookDataprovider.resource, BookDataprovider.books)
        return {data: {} as TData}
    }
    getApiUrl() {
        return ''
    }
}
