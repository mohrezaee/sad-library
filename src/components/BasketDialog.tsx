import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    DialogActions,
    Button,
    Stack,
    Typography,
    Divider,
} from '@mui/material'
import {blue} from '@mui/material/colors'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import {removeFromBasket} from '../redux/BasketSlice'
import {useNotification} from '@refinedev/core'
import { useNavigate } from 'react-router-dom'

export interface SimpleDialogProps {
    open: boolean
    onClose: () => void
}

export function BasketDialog({open, onClose}: SimpleDialogProps) {
    const books = useSelector((state: RootState) => state.basket)
    const user = useSelector((state: RootState) => state.user)
    const {open: notify} = useNotification()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClose = () => {
        onClose()
    }
    function remove(id: string) {
        dispatch(removeFromBasket(id))
    }
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>Your Books</DialogTitle>
            <Divider />
            <List sx={{pt: 0}}>
                {books.map((book) => (
                    <ListItem
                        key={book.id}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => remove(book.id)}
                            >
                                <DeleteOutlineIcon color="error" />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: blue[100], color: blue[600]}} src={book.image} />
                        </ListItemAvatar>
                        <ListItemText primary={book.name} secondary={book.price + ' $'} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Stack direction={'row'} p="16px" justifyContent={'space-between'}>
                <Typography>Total</Typography>
                <Typography>{books.reduce((acc, obj) => acc + obj.price, 0)}</Typography>
            </Stack>
            <DialogActions>
                <Button
                    onClick={() => {
                        if (user.login) {
                            navigate('/buy')
                        } else {
                            if (!notify) {
                                return
                            }
                            notify({
                                message: 'You have to login first.',
                                type: 'error',
                            })
                        }
                    }}
                >
                    Buy
                </Button>
            </DialogActions>
        </Dialog>
    )
}
