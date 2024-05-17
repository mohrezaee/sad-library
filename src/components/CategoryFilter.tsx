import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material'

type CategoryFilterProps = {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    const handleCategoryChange = (event: any) => {
        onCategoryChange(event.target.value as string)
    }

    return (
        <Box my={2}>
            <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

