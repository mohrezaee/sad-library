import {Container, Box, Card, CardContent, Typography, TextField, Button, Link} from '@mui/material'
import {useLogin, BaseRecord, HttpError, LoginFormTypes, useLink} from '@refinedev/core'
import {useForm} from 'react-hook-form'

export const Register = () => {
    const {mutate, isLoading} = useLogin()
    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({})
    const ActiveLink = useLink()
    const {
        register,
        formState: {errors},
    } = methods
    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100dvh',
                padding: '16px',
                width: '100%',
                maxWidth: '400px',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 0,
                }}
            >
                <Card>
                    <CardContent sx={{p: '32px', '&:last-child': {pb: '32px'}}}>
                        <Typography
                            component="h1"
                            variant="h5"
                            align="center"
                            color="primary"
                            fontWeight={700}
                            mb={4}
                        >
                            Sign up for your account
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={(data) => {
                                return mutate(data)
                            }}
                        >
                            <TextField
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                                id="name"
                                margin="normal"
                                fullWidth
                                label={'Name'}
                                error={!!errors.name}
                                name="name"
                                type="name"
                                autoComplete="name"
                                sx={{
                                    mt: 0,
                                }}
                            />
                            <TextField
                                {...register('phone', {
                                    required: 'Phone is required',
                                })}
                                id="phone"
                                margin="normal"
                                fullWidth
                                label={'Phone'}
                                error={!!errors.phone}
                                name="phone"
                                type="tel"
                                autoComplete="phone"
                                sx={{
                                    mt: 0,
                                }}
                            />
                            <TextField
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                                id="username"
                                margin="normal"
                                fullWidth
                                label={'Username'}
                                error={!!errors.username}
                                name="username"
                                type="username"
                                autoComplete="username"
                                sx={{
                                    mt: 0,
                                }}
                            />
                            <TextField
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                id="password"
                                margin="normal"
                                fullWidth
                                name="password"
                                label={'Password'}
                                error={!!errors.password}
                                type="password"
                                placeholder="●●●●●●●●"
                                autoComplete="current-password"
                                sx={{
                                    mb: 0,
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{mt: '24px'}}
                            >
                                Sign up
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                mt: '24px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                textAlign="center"
                                variant="body2"
                                component="span"
                                fontSize="12px"
                            >
                               Have an account?
                            </Typography>
                            <Link
                                ml="4px"
                                fontSize="12px"
                                variant="body2"
                                color="primary"
                                component={ActiveLink}
                                underline="none"
                                to="/login"
                                fontWeight="bold"
                            >
                                Sign in
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}
