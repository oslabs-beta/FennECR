import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function BasicContainer({component: Component}){
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth = 'sm'>
                <Box sx={{bgcolor: '#E8E8FD'}}>
                    <Component />
                </Box>
            </Container>
        </React.Fragment>
    );
}