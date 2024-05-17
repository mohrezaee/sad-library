import React from 'react'
import {TextField, Box} from '@mui/material'

type SearchBarProps = {
    onSearch: (searchTerm: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value)
    }

    return (
        <Box my={2}>
            <TextField
                label="Search Books"
                variant="outlined"
                fullWidth
                onChange={handleSearchChange}
            />
        </Box>
    )
}
