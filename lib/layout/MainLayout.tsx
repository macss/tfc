import Copyright from '@lib/components/Copyright'
import Link from '@lib/components/Link'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Dígito de Paridade',
    path: '/parity-digit'
  },
  {
    name: 'Repetição',
    path: '/repetition-code'
  },
  {
    name: 'Código de Hamming',
    path: '/hamming-code'
  },
  {
    name: 'Sobre',
    path: '/about'
  }
]

const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" noWrap>
              Algorítmos de Correção de Erro
            </Typography>
            <Box sx={{ flexGrow: 1, ml: 4 }}>
              {
                routes.map(route => (
                  <Button color="inherit" sx={{ my: 2, mx: 2 }} LinkComponent={Link} href={route.path} key={route.name}>
                    {route.name}
                  </Button>
                ))
              }
              
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
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