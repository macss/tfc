import Copyright from '@lib/components/Copyright'
import { Box, Container, Paper } from '@mui/material'
import React from 'react'
import TopAppbar from './TopAppbar'

const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <TopAppbar />
        <Container sx={{
          mt: 2,
          mb: 8
        }}>
          <Paper sx={{p:2}}>
            {children}
          </Paper>
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