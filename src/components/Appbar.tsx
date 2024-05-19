import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {AppBar, Toolbar, IconButton, Typography, Button, Stack} from '@mui/material'
import React, {useState} from 'react'
import {BasketDialog} from './BasketDialog'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import {useNavigate} from 'react-router-dom'
import {useLogout} from '@refinedev/core'

export function Appbar() {
    const [cartOpen, setCartOpen] = useState(false)
    const {mutate: logout} = useLogout()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    return (
        <AppBar position="sticky">
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
                {user.login ? (
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Typography>{user.name}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                logout()
                            }}
                            color="inherit"
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <Button variant="outlined" onClick={() => navigate('/login')} color="inherit">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
