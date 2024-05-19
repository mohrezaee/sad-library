import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Rating,
    CardActions,
    Button,
} from '@mui/material'
import {BookType} from '../dataproviders/BookDataprovider'
import AddIcon from '@mui/icons-material/Add'
import {useDispatch, useSelector} from 'react-redux'
import {addToBasket} from '../redux/BasketSlice'
import {useNotification} from '@refinedev/core'
import {RootState} from '../redux/store'

type BookItemProps = {
    book: BookType
}

export const BookItem: React.FC<BookItemProps> = ({book}) => {
    const dispatch = useDispatch()
    const basket = useSelector((state: RootState) => state.basket)
    const {open} = useNotification()
    function add() {
        if (open) {
            for (const bookItem of basket) {
                if (bookItem.id == book.id) {
                    open({
                        message: 'this item already exists',
                        type: 'error',
                    })
                    return
                }
            }
            dispatch(addToBasket(book))
            open({
                message: `add ${book.name} to basket`,
                type: 'success',
            })
        }
    }

    return (
        <Card>
            <CardMedia
                component="img"
                image={book.image ?? 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'}
                alt={book.name}
                height={'400px'}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {book.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {book.writers.join(', ')}
                </Typography>
                <Box>
                    <Rating value={book.rating} readOnly />
                </Box>
            </CardContent>
            <CardActions onClick={add}>
                <Button startIcon={<AddIcon />}>ADD</Button>
            </CardActions>
        </Card>
    )
}
