import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Header() {


    return (
        <React.Fragment>
            <Toolbar sx={{
                backgroundColor: '#d6d6d6',
                border: '1px solid #e0e0e0',
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    Archtype Book
                </Typography>
                <Button
                    href="/auth"
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    href='/auth/register'
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Sign up
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}