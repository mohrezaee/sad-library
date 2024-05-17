import {Box, TextField} from '@mui/material'
import {Edit} from '@refinedev/mui'
import {useForm} from '@refinedev/react-hook-form'

export const UserEdit = () => {
    const {
        saveButtonProps,
        register,
        formState: {errors},
    } = useForm({})

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: 'flex', flexDirection: 'column'}}
                autoComplete="off"
            >
                <TextField
                    {...register('name', {
                        required: 'This field is required',
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={'Name'}
                    name="name"
                />
                <TextField
                    {...register('username', {
                        required: 'This field is required',
                    })}
                    error={!!(errors as any)?.username}
                    helperText={(errors as any)?.username?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={'Username'}
                    name="username"
                />
                <TextField
                    {...register('password', {
                        required: 'This field is required',
                    })}
                    error={!!(errors as any)?.password}
                    helperText={(errors as any)?.password?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="password"
                    label={'Password'}
                    name="password"
                />
            </Box>
        </Edit>
    )
}
