import CodeDisplay from '@lib/components/CodeDisplay'
import hammingEncode from '@lib/utils/hammingEncoder'
import parityEncode from '@lib/utils/parityEncoder'
import repetitionEncode from '@lib/utils/repetitionEncoder'
import textToBytes from '@lib/utils/textToBytes'
import { Typography, Box, Divider, TextField, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'

/**
 * Página inicial do aplicativo, exibe um breve histórico a respeito dos algorítmos,
 * assim como um comparativo
 */
const Home: NextPage = () => {
  const [rawBytes, setRawBytes] = useState('')

  return (
    <Box>
      <Typography variant="h6">
        Introdução
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          O conceito de algorítmos de correção de erros surgiu no glorioso trabalho de Claude Shannon, &quot;Uma teoria matemática da comunicação&quot; publicado no ano de 1948. 
        Esses códigos funcionam ao adicionar algum tipo de redundância à mensagem transmitida de forma que o receptor, mesmo sem saber o conteúdo original da mensagem consiga 
        identificar a presença ou não de erros, alguns algorítmos mais sofisticados conseguem, além de encontrar o erro, corrigí-lo. <br />
        
          Durante os anos diversos códigos deste tipo foram desenvolvidos, dentre eles estão o código de paridade, código de repetição e o código de hamming. Neste website,  você
        poderá ver, de forma interativa, como cada um dos algorítmos citados funciona, além de poder interferir na mensagem enviada a fim de simular um erro de transmissão.

      </Typography>

      <Typography variant="h6">
        Dígito de Paridade
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
        Texto
      </Typography>

      <Typography variant="h6">
        Repetição
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          Texto
      </Typography>

      <Typography variant="h6">
        Código de Hamming
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          Texto
      </Typography>

      <Typography variant="h6">
        Playground
      </Typography>
      <Divider />
      <br />
      <TextField 
        label="Mensagem"
        helperText="Digite a mensagem a ser codificada"
        placeholder="Digite sua mensagem"
        fullWidth
        onChange={e => setRawBytes(textToBytes(e.target.value))}
      />
      <br /><br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Bytes não codificados
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={rawBytes}
            hideLabels
            codeType="raw"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Dígito de Paridade
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={parityEncode(rawBytes)}
            hideLabels
            codeType="parity"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Código de Repetição
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={repetitionEncode(rawBytes)}
            hideLabels
            codeType="repetition"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Código de Hamming
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={hammingEncode(rawBytes)}
            hideLabels
            codeType="hamming"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
