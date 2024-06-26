import {Autocomplete, Box, TextField} from '@mui/material'
import {Edit, useAutocomplete} from '@refinedev/mui'
import {useForm} from '@refinedev/react-hook-form'
import {Controller} from 'react-hook-form'

export const BlogPostEdit = () => {
    const {
        saveButtonProps,
        refineCore: {queryResult, formLoading},
        register,
        control,
        formState: {errors},
    } = useForm({})

    const blogPostsData = queryResult?.data?.data

    const {autocompleteProps: categoryAutocompleteProps} = useAutocomplete({
        resource: 'categories',
        defaultValue: blogPostsData?.category?.id,
    })

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
                    {...register('shabak', {
                        required: 'This field is required',
                    })}
                    error={!!(errors as any)?.shabak}
                    helperText={(errors as any)?.shabak?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    label={'Shabak'}
                    name="shabak"
                />
                <TextField
                    {...register('price', {
                        required: 'This field is required',
                    })}
                    error={!!(errors as any)?.price}
                    helperText={(errors as any)?.price?.message}
                    margin="normal"
                    fullWidth
                    type="number"
                    InputLabelProps={{shrink: true}}
                    label={'Price'}
                    name="price"
                />

                <TextField
                    {...register('writers')}
                    error={!!(errors as any)?.writers}
                    helperText={(errors as any)?.writers?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    multiline
                    label={'Writers'}
                    name="writers"
                />
                <TextField
                    {...register('translators')}
                    error={!!(errors as any)?.translators}
                    helperText={(errors as any)?.translators?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    multiline
                    label={'Translators'}
                    name="translators"
                />
                <TextField
                    {...register('image')}
                    error={!!(errors as any)?.image}
                    helperText={(errors as any)?.image?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    multiline
                    label={'Image URL'}
                    name="image"
                />
                <Controller
                    control={control}
                    name={'category'}
                    rules={{required: 'This field is required'}}
                    defaultValue={[] as any}
                    render={({field}) => (
                        <Autocomplete
                            multiple
                            {...categoryAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value)
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    categoryAutocompleteProps?.options?.find((p) => {
                                        const itemId =
                                            typeof item === 'object'
                                                ? item?.id?.toString()
                                                : item?.toString()
                                        const pId = p?.id?.toString()
                                        return itemId === pId
                                    })?.name ?? ''
                                )
                            }}
                            isOptionEqualToValue={(option, value) => {
                                const optionId = option?.id?.toString()
                                const valueId =
                                    typeof value === 'object'
                                        ? value?.id?.toString()
                                        : value?.toString()
                                return value === undefined || optionId === valueId
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={'Category'}
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.category?.id}
                                    helperText={(errors as any)?.category?.id?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    )
}
