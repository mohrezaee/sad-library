import React from 'react'
import {Grid} from '@mui/material'
import {BookType} from '../dataproviders/BookDataprovider'
import {BookItem} from './BookItem'

type BookListProps = {
    books: BookType[]
}

export const BookList: React.FC<BookListProps> = ({books}) => {
    return (
        <Grid container spacing={3}>
            {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <BookItem book={book} />
                </Grid>
            ))}
        </Grid>
    )
}
