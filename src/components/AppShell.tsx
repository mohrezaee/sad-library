import {Box} from '@mui/material'
import {Appbar} from './Appbar'
import { Outlet } from 'react-router-dom'

export function AppShell() {
    return (
        <Box>
            <Appbar />
            <Outlet />
        </Box>
    )
}
