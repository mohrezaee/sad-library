// pages/LandingPage.tsx
import React, {useState} from 'react'
import {Container} from '@mui/material'
import {BookType} from '../../dataproviders/BookDataprovider'
import {BookList} from '../../components/BookList'
import {CategoryFilter} from '../../components/CategoryFilter'
import {SearchBar} from '../../components/SearchBar'
import {useList} from '@refinedev/core'
import {CategoryType} from '../../dataproviders/CategoryDataprovider'

export const LandingPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const {data: booksData} = useList<BookType>({resource: 'books'})
    const {data: categoriesData} = useList<CategoryType>({resource: 'categories'})

    const filteredBooks =
        booksData?.data?.filter(
            (book) =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === '' || book.category === selectedCategory),
        ) ?? []
    const categories = categoriesData?.data?.map((item) => item.name)

    return (
        <Container>
            <SearchBar onSearch={setSearchTerm} />
            <CategoryFilter
                categories={categories ?? []}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <BookList books={filteredBooks} />
        </Container>
    )
}
