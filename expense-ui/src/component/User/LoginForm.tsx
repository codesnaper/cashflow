import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormValidation } from '../../hooks/FormValidation';
import { UserLogin } from '../../modal/UserLogin';
import { LocalizationContext } from '../../context';
import { CircularProgress } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { LoginCredential } from '../../modal/response/User';

interface LoginFormProps {
    loginLoader: boolean,
    errorHelperText?: string,
    isError?: boolean,
    loginCallback: (credential: LoginCredential, rememberFlag: boolean) => void,
}
export default function LoginForm(props: LoginFormProps) {
    const localization = React.useContext(LocalizationContext);
    const [rememberFlag, setRememberFlag] = React.useState<boolean>(false);

    const { handleSubmit, handleChange, data: credential, errors } = useFormValidation<LoginCredential>({
        validations: {
            username: {
                pattern: {
                    value: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                    message: `${localization.getString?.('Login.invalidEmail', localization.getLanguage?.(), false)}`,
                },
            },
            password: {
                required: {
                    value: true,
                    message: `${localization.getString?.('Login.invalidPassword', localization.getLanguage?.(), false)}`,
                },
            },
        },
        onSubmit: () => { props.loginCallback(credential, rememberFlag) }
    });

    return (<>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AdbIcon />
                </Avatar>
                <Typography component="h5" variant="h5">
                    Expense-Management
                </Typography>
                {props.isError && <>
                    <Typography sx={{paddingTop: '20px'}} color={red[700]} component="span" variant='caption'>
                        {props.errorHelperText} 
                    </Typography>
                </>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        error={errors.username || props.isError ? true : false}
                        helperText={errors.username}
                        fullWidth
                        data-testid="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange('username')}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={errors.password || props.isError ? true : false}
                        helperText={errors.password}
                        name="password"
                        label="Password"
                        type="password"
                        data-testid="password"
                        onChange={handleChange('password')}
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" checked={rememberFlag} onClick={() => setRememberFlag(!rememberFlag)} />}
                        label="Remember me"
                    />
                    <Button
                        data-testid="signInCta"
                        type="submit"
                        fullWidth
                        disabled={props.loginLoader}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                        {props.loginLoader && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: grey[50],
                                }}
                            />
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" test-id="fo" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    </>)
}