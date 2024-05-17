import React from 'react'
import {FormControl, Box, Autocomplete, TextField} from '@mui/material'
import {CategoryType} from '../dataproviders/CategoryDataprovider'

type CategoryFilterProps = {
    categories: CategoryType[]
    selectedCategory: CategoryType[]
    onCategoryChange: (category: CategoryType[]) => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    const handleCategoryChange = (value: CategoryType[]) => {
        onCategoryChange(value)
    }

    return (
        <Box my={2}>
            <FormControl fullWidth variant="outlined">
                <Autocomplete
                    multiple={true}
                    value={selectedCategory as any}
                    onChange={(e, value) => handleCategoryChange(value)}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                />
            </FormControl>
        </Box>
    )
}
