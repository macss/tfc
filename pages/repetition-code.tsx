import CodeDisplay from '@lib/components/CodeDisplay'
import repetitionEncode from '@lib/utils/repetitionEncoder'
import textToBytes from '@lib/utils/textToBytes'
import { Box, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

/**
 * Componente utilizado para demonstrar os códigos de repetição,
 * é interativo, o usuário pode injetar erros na mensagem
 */
const RepetitionCode = () => {
  const [byteInput, setByteInput] = useState('')

  return (
    <Box>
      <Typography variant="h6">
        Dígito de Paridade
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        gutterBottom
      >
        Nesta página você pode digitar a sua mensagem e simular uma interferência no código, o código recebido e a mensagem traduzida estão exibidos.
        Neste algorítmo é possível identificar o erro e corrigí-lo, porém a correção só é feita corretamente se apenas 1 dos 3 bits tiver sido alterado, se 2 bits forem alterados a
        mensagem recebida é lida incorretamente, se os 3 bits da sequência forem alterados o erro não é identificado. O código de repetição utilizado tem fator de repetição de 3.
      </Typography>

      <TextField 
        onChange={e => setByteInput(textToBytes(e.target.value))}
        label="Mensagem"
        helperText="Digite a mensagem a ser codificada"
        placeholder="Digite sua mensagem"
        fullWidth
      />
      
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        gutterBottom
      >
        Para simular um erro basta clicar em uma célula para inverter o seu estado.
      </Typography>

      <CodeDisplay 
        code={repetitionEncode(byteInput)}
        editable
        codeType="repetition"
      />
    </Box>
  )
}

export default RepetitionCode