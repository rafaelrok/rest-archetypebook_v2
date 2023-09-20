import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useHistory, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { requestBackendLogin } from '../../util/request';
import { getTokenData } from '../../util/auth';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthContext';
import Alert from '@mui/material/Alert';
import { saveAuthData } from '../../util/storage';

type CredentialsDTO = {
    username: string;
    password: string;
};

type LocationState = {
    from: string;
}

const theme = createTheme();

const SignIn = () => {
    const location = useLocation<LocationState>();
    const { from } = location.state || { from: { pathname: '/' } };
    const { setAuthContextData } = useContext(AuthContext);
    const [hasError, setHasError] = useState(false);
    const { register, handleSubmit } = useForm<CredentialsDTO>();
    const history = useHistory();

    const onSubmit = (formData: CredentialsDTO) => {
        requestBackendLogin(formData)
            .then(response => {
                saveAuthData(response.data) 
                setHasError(false);
                setAuthContextData({
                    authenticated: true,
                    tokenData: getTokenData()
                })
                history.replace(from);
            })
            .catch(err => {
                setHasError(true);
                console.log('ERROR', err);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {hasError && (
                        <Alert variant="outlined" severity="error">
                            Erro ao efetuar login!
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            {...register('username', {
                                required: 'Campo obrigatório',
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: 'Usuário inválido'
                                }
                            })}
                            margin="normal"
                            required={true}
                            fullWidth
                            id="username"
                            label="Usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            {...register('password', {
                                required: 'Campo obrigatório'
                            })}
                            margin="normal"
                            required={true}
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembrar-me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Não tem uma conta? Registre-se"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;