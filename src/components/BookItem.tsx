import React from 'react'
import {Card, CardMedia, CardContent, Typography, Box, Rating} from '@mui/material'
import {BookType} from '../dataproviders/BookDataprovider'

type BookItemProps = {
    book: BookType
}

export const BookItem: React.FC<BookItemProps> = ({book}) => {
    return (
        <Card>
            <CardMedia
                component="img"
                image={book.image ?? 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'}
                alt={book.name}
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
        </Card>
    )
}
