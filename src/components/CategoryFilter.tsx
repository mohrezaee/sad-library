import React, {useState} from 'react'
import {FormControl, Box, Autocomplete, TextField, Stack, IconButton} from '@mui/material'
import {CategoryType} from '../dataproviders/CategoryDataprovider'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

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
    const [sort, setSort] = useState(0)
    const handleCategoryChange = (value: CategoryType[]) => {
        onCategoryChange(value)
    }
    function sortChange() {
        if(sort===0) {
            setSort(1)
        } else if(sort===-1) {
            setSort(0)
        } else {
            setSort(-1)
        }
    }

    return (
        <Box my={2}>
            <FormControl fullWidth variant="outlined">
                <Stack direction={'row'} spacing={3}>
                    <Autocomplete
                    sx={{flex: 1}}
                        multiple={true}
                        value={selectedCategory as any}
                        onChange={(e, value) => handleCategoryChange(value)}
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                    <IconButton onClick={sortChange}>
                        {sort === 0 ? (
                            <StarOutlineIcon />
                        ) : sort === 1 ? (
                            <TrendingDownIcon />
                        ) : (
                            <TrendingUpIcon />
                        )}
                    </IconButton>
                </Stack>
            </FormControl>
        </Box>
    )
}
