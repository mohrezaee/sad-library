import {Stack, Typography} from '@mui/material'
import {useShow} from '@refinedev/core'
import {NumberField, Show, TextFieldComponent as TextField} from '@refinedev/mui'

export const UserShow = () => {
    const {queryResult} = useShow({})
    const {data, isLoading} = queryResult

    const record = data?.data

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {'ID'}
                </Typography>
                <NumberField value={record?.id ?? ''} />
                <Typography variant="body1" fontWeight="bold">
                    {'Name'}
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    {'Username'}
                </Typography>
                <TextField value={record?.username} />
            </Stack>
        </Show>
    )
}
