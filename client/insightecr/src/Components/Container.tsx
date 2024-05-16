import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



interface BasicContainerProps {
    header: React.ComponentType<{ title: string }>;
    title: string; 
    component: React.ComponentType<{}>;
}

// export default function BasicContainer({component: Component}){
const BasicContainer: React.FC<BasicContainerProps> = ({header: Header, title, component:Component}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth = 'sm'>
                <Box sx={{bgcolor: '#E8E8FD'}}>
                    <Header title = {title} />
                    <Component />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default BasicContainer;