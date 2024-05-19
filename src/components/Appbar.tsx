import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {AppBar, Toolbar, IconButton, Typography, Button} from '@mui/material'
import React, {useState} from 'react'
import {BasketDialog} from './BasketDialog'

export function Appbar() {
    const [cartOpen, setCartOpen] = useState(false)
    return (
        <AppBar position="static">
            <BasketDialog open={cartOpen} onClose={() => setCartOpen(false)} />
            <Toolbar>
                <IconButton
                    onClick={() => setCartOpen(true)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <ShoppingCartIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Sad Library
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}
