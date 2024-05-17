import React from 'react'
import {FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material'
import { CategoryType } from '../dataproviders/CategoryDataprovider'

type CategoryFilterProps = {
    categories: CategoryType[]
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
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                    <MenuItem key={'clearable'} value={''}>
                        No category
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
