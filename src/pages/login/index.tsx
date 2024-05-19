import {Card, CardContent, Typography, Box, TextField, Button, Link, Container} from '@mui/material'
import {useForm} from 'react-hook-form'
import {BaseRecord, HttpError, LoginFormTypes, useLink, useLogin} from '@refinedev/core'

export const Login = () => {
    const {mutate, isLoading} = useLogin()
    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({})
    const ActiveLink = useLink()
    const {
        register,
        handleSubmit,
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
                            Sign in to your account
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit((data) => {
                                return mutate(data)
                            })}
                        >
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
                            <Box
                                component="div"
                                sx={{
                                    mt: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link
                                    variant="body2"
                                    color="primary"
                                    fontSize="12px"
                                    component={ActiveLink}
                                    underline="none"
                                    to="/forgot-password"
                                >
                                    {'Forgot password?'}
                                </Link>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{mt: '24px'}}
                            >
                                Sign in
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
                                Don’t have an account?
                            </Typography>
                            <Link
                                ml="4px"
                                fontSize="12px"
                                variant="body2"
                                color="primary"
                                component={ActiveLink}
                                underline="none"
                                to="/register"
                                fontWeight="bold"
                            >
                                Sign up
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}
