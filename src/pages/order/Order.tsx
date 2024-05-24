import {
    Stack,
    List,
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Typography,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Button,
} from '@mui/material'
import {blue} from '@mui/material/colors'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {removeFromBasket} from '../../redux/BasketSlice'
import {useCreate, useOne} from '@refinedev/core'
import {useNavigate} from 'react-router-dom'

export function Order() {
    const books = useSelector((state: RootState) => state.basket)
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.user)
    const {data: user} = useOne({resource: 'users', id: currentUser.id})
    const dispatch = useDispatch()
    function remove(id: string) {
        dispatch(removeFromBasket(id))
    }
    const {mutate: createOrder} = useCreate()
    function order() {
        createOrder({
            resource: 'orders',
            values: {books, user: user?.data, total},
            dataProviderName: 'orders',
        })
        navigate('/landing')
    }
    const total = books.reduce((acc, obj) => acc + obj.price, 0)
    return (
        <Container>
            <Stack>
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
                                <Avatar
                                    sx={{bgcolor: blue[100], color: blue[600]}}
                                    src={book.image}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={book.name} secondary={book.price + ' $'} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Stack direction={'row'} p="16px" justifyContent={'space-between'}>
                    <Typography>Total</Typography>
                    <Typography>{total}</Typography>
                </Stack>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Post</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Physical" />
                        <FormControlLabel value="male" control={<Radio />} label="PDF" />
                    </RadioGroup>
                </FormControl>

                <Button onClick={order} variant="contained">
                    ORDER
                </Button>
            </Stack>
        </Container>
    )
}
