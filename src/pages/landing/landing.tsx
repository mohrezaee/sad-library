import React, {useState} from 'react'
import {Box, Container} from '@mui/material'
import {BookType} from '../../dataproviders/BookDataprovider'
import {BookList} from '../../components/BookList'
import {CategoryFilter} from '../../components/CategoryFilter'
import {SearchBar} from '../../components/SearchBar'
import {Appbar} from '../../components/Appbar'
import {useList} from '@refinedev/core'
import {CategoryType} from '../../dataproviders/CategoryDataprovider'

export const LandingPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<CategoryType[]>([])
    const {data: booksData} = useList<BookType>({resource: 'books'})
    const {data: categoriesData} = useList<CategoryType>({resource: 'categories'})

    const filteredBooks =
        booksData?.data?.filter(
            (book) =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory.length === 0 || containCategory(book)),
        ) ?? []
    function containCategory(book: BookType) {
        for (const cat of book.category) {
            if (selectedCategory.map((item) => item.id).includes(cat)) {
                return true
            }
        }
        return false
    }
    const categories = categoriesData?.data

    return (
        <Box>
            <Container>
                <SearchBar onSearch={setSearchTerm} />
                <CategoryFilter
                    categories={categories ?? []}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <BookList books={filteredBooks} />
            </Container>
        </Box>
    )
}
