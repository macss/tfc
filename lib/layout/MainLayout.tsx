import Copyright from '@lib/components/Copyright'
import { Box, Container } from '@mui/material'
import React from 'react'
import TopAppbar from './TopAppbar'

const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <TopAppbar />
        <Container sx={{
          mt: 4,
          mb: 8
        }}>
            {children}
        </Container>
        <Box 
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            p: 2,
            backgroundColor: theme => theme.palette.background.paper
          }}
        >
          <Copyright />      
        </Box>
      </Box>
    </>
  )
}

export default MainLayout