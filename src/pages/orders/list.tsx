import {Button, Stack, Typography} from '@mui/material'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import {useExport, useList} from '@refinedev/core'
import {DateField, DeleteButton, EditButton, List, ShowButton, useDataGrid} from '@refinedev/mui'
import React from 'react'
import { OrderType } from '../../dataproviders/OrderDataprovider'

export const OrderList = () => {
    const {
        dataGridProps,
        tableQueryResult: {data},
    } = useDataGrid({
        syncWithLocation: true,
    })

    const {triggerExport, isLoading} = useExport<OrderType>({
        resource: 'orders',
        mapData: (item) => {
            return {
                ...item,
                user: JSON.stringify(item.user),
                books: JSON.stringify(item.books),
            }
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
                field: 'user',
                headerName: 'User',
                type: 'number',
                minWidth: 50,
                renderCell: function render({value}) {
                    return value?.name
                },
            },
            {
                field: 'total',
                flex: 1,
                headerName: 'Total',
                minWidth: 200,
            },
            {
                field: 'books',
                flex: 1,
                headerName: 'Books',
                minWidth: 250,
                renderCell: function render({value}) {
                    return value.map((item) => item.name).join(', ')
                },
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
        [],
    )

    return (
        <List>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack>
                    <Typography>Total</Typography>
                    <Typography>{data?.data.reduce((acc, obj) => acc + obj.total, 0)}</Typography>
                </Stack>
                <Button onClick={triggerExport}>Export EXCEL</Button>
            </Stack>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    )
}
