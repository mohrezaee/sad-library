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
import {defaultCategories} from './defaultCategories'
import {Utils} from '../utils/Utils'

export type CategoryType = {
    id: string
    name: string
}

export class CategoryDataprovider implements DataProvider {
    private static categories: CategoryType[]
    private static lastID: number
    private static resource = 'categories'
    constructor() {
        try {
            CategoryDataprovider.categories = Utils.getFromLocalStorate(
                CategoryDataprovider.resource,
            )
        } catch (error) {
            CategoryDataprovider.categories = JSON.parse(JSON.stringify(defaultCategories))
        }
        CategoryDataprovider.lastID = CategoryDataprovider.categories.length
        Utils.saveToLocalStorate(CategoryDataprovider.resource, CategoryDataprovider.categories)
    }
    async getList<TData>(params: GetListParams): Promise<GetListResponse<TData>> {
        CategoryDataprovider.categories = Utils.getFromLocalStorate(CategoryDataprovider.resource)
        return {
            data: CategoryDataprovider.categories as TData[],
            total: CategoryDataprovider.categories.length,
        }
    }

    async getOne<TData>(params: GetOneParams): Promise<GetOneResponse<TData>> {
        CategoryDataprovider.categories = Utils.getFromLocalStorate(CategoryDataprovider.resource)
        const category = CategoryDataprovider.categories.find((item) => item.id === params.id)
        if (!category) {
            throw new Error('category not found')
        }
        return {data: category as TData}
    }
    async create<TData, TVariables>(
        params: CreateParams<TVariables>,
    ): Promise<CreateResponse<TData>> {
        const newID = CategoryDataprovider.lastID + 1
        CategoryDataprovider.categories = [
            ...CategoryDataprovider.categories,
            {...(params.variables as CategoryType), id: String(newID)},
        ]
        CategoryDataprovider.lastID += 1
        Utils.saveToLocalStorate(CategoryDataprovider.resource, CategoryDataprovider.categories)
        return {
            data: CategoryDataprovider.categories[
                CategoryDataprovider.categories.length - 1
            ] as TData,
        }
    }

    async update<TData, TVariables>(
        params: UpdateParams<TVariables>,
    ): Promise<UpdateResponse<TData>> {
        const category = CategoryDataprovider.categories.find((item) => item.id === params.id) as any
        if (!category) {
            throw new Error('category not found')
        }
        for (const key of Object.keys(params.variables as CategoryType)) {
            category[key] = (params.variables as any)[key]
        }
        Utils.saveToLocalStorate(CategoryDataprovider.resource, CategoryDataprovider.categories)
        return {data: category as TData}
    }

    async deleteOne<TData, TVariables>(
        params: DeleteOneParams<TVariables>,
    ): Promise<DeleteOneResponse<TData>> {
        const category = CategoryDataprovider.categories.find((item) => item.id === params.id) as any
        if (!category) {
            throw new Error('category not found')
        }
        CategoryDataprovider.categories = CategoryDataprovider.categories.filter(
            (item) => item.id !== params.id,
        )
        Utils.saveToLocalStorate(CategoryDataprovider.resource, CategoryDataprovider.categories)
        return {data: {} as TData}
    }
    getApiUrl() {
        return ''
    }
}
