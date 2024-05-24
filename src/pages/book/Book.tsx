import {Box, Button, Chip, Rating, Stack, Typography} from '@mui/material'
import {useList, useNotification, useOne} from '@refinedev/core'
import {useParams} from 'react-router-dom'
import {BookType} from '../../dataproviders/BookDataprovider'
import AddIcon from '@mui/icons-material/Add'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {addToBasket} from '../../redux/BasketSlice'
import {CategoryType} from '../../dataproviders/CategoryDataprovider'

export function Book() {
    const {id} = useParams()
    const {data: book} = useOne<BookType>({
        resource: 'books',
        dataProviderName: 'books',
        id,
        queryOptions: {enabled: !!id},
    })
    const basket = useSelector((state: RootState) => state.basket)
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const {open} = useNotification()
    const {data: categoryData, isLoading: categoryIsLoading} = useList<CategoryType>({
        resource: 'categories',
        queryOptions: {
            enabled: !!id,
        },
    })
    function add() {
        if (open) {
            for (const bookItem of basket) {
                if (bookItem.id == book?.data.id) {
                    open({
                        message: 'this item already exists',
                        type: 'error',
                    })
                    return
                }
            }
            dispatch(addToBasket(book?.data))
            open({
                message: `add ${book?.data.name} to basket`,
                type: 'success',
            })
        }
    }
    return (
        <Stack direction={'row'}>
            <Box component={'img'} src={book?.data.image} height={'92vh'} />
            <Stack p={8} flex={1}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack>
                        <Typography variant="h2">{book?.data.name}</Typography>
                        <Typography mb={'8px'} variant="h3" color="text.secondary">
                            {book?.data.writers.join(', ')}
                        </Typography>
                        <Rating
                            value={book?.data.rating}
                            readOnly={!user.login}
                            onChange={() => {
                                if (open)
                                    open({
                                        message: `your rating has been saved.`,
                                        type: 'success',
                                    })
                            }}
                            sx={{mb: 4}}
                        />
                        {categoryIsLoading ? (
                            <>Loading...</>
                        ) : (
                            <Stack direction={'row'} spacing={2}>
                                {categoryData?.data
                                    ?.filter((item) => book?.data.category.includes(item.id))
                                    .map((i) => (
                                        <Chip label={i.name} sx={{fontSize: 'large'}}/>
                                    ))}
                            </Stack>
                        )}
                    </Stack>
                    <Stack spacing={2} alignItems={'flex-start'}>
                        <Typography variant="h3">{book?.data.price} $</Typography>
                        <Button
                            sx={{ml: 'auto', alignSelf: 'center'}}
                            variant="outlined"
                            onClick={add}
                            startIcon={<AddIcon />}
                        >
                            ADD
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
