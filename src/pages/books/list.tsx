import {DataGrid, GridColDef} from '@mui/x-data-grid'
import {useList} from '@refinedev/core'
import {DateField, DeleteButton, EditButton, List, ShowButton, useDataGrid} from '@refinedev/mui'
import React from 'react'

export const BlogPostList = () => {
    const {dataGridProps} = useDataGrid({
        syncWithLocation: true,
    })

    const {data: categoryData, isLoading: categoryIsLoading} = useList({
        resource: 'categories',
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    })

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                type: 'number',
                minWidth: 50,
            },
            {
                field: 'name',
                flex: 1,
                headerName: 'Name',
                minWidth: 200,
            },
            {
                field: 'category',
                flex: 1,
                headerName: 'Category',
                valueGetter: ({row}) => {
                    const value = row?.category
                    return value
                },
                renderCell: function render({value}) {
                    return categoryIsLoading ? (
                        <>Loading...</>
                    ) : (
                        categoryData?.data
                            ?.filter((item) => value.includes(item.id))
                            .map((i) => i.name)
                            .join(', ')
                    )
                },
            },
            {
                field: 'price',
                flex: 1,
                headerName: 'Price',
                minWidth: 200,
            },
            {
                field: 'createdAt',
                flex: 1,
                headerName: 'Created at',
                minWidth: 250,
                renderCell: function render({value}) {
                    return <DateField value={value} />
                },
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                renderCell: function render({row}) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                            <DeleteButton hideText recordItemId={row.id} />
                        </>
                    )
                },
                align: 'center',
                headerAlign: 'center',
                minWidth: 80,
            },
        ],
        [categoryData, categoryIsLoading],
    )

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    )
}
