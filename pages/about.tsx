import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'

/**
 * Componente para exibir informações a respeito do autor e do site
 */
const About = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, flexDirection: 'column'}}>
        <Avatar 
          src="https://media-exp1.licdn.com/dms/image/C5603AQGPBodTih2ZSw/profile-displayphoto-shrink_800_800/0/1517098900329?e=1649894400&v=beta&t=P0GoucivaQn8BwJLINIYZq2ttlXNk3Q5yDxwl3irxPQ"
          alt="Marco Antônio"
          sx={{
            height: 256,
            width: 256
          }}
        />
        <Typography variant="h5">
          Marco Antônio Chaves Soares
        </Typography>
        <Typography variant="body1">
          Bacharelando em Engenharia Elétrica
        </Typography>
      </Box>
      <br /> <br />
      <Box>
        <Typography variant="body2">
          Este website foi desenvolvido como material de apoio ao meu trabalho de conclusão de curso na Univesidade Federal de São João Del-Rei. A ideia era mostrar alguns
          conceitos dos algorítmos de detecção e correção de erros de uma forma mais visual e palpável. Todo o código está disponibilizado no meu Github. 
        </Typography>
      </Box>
    </Box>
  )
}

export default About