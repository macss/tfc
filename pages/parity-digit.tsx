import CodeDisplay from '@lib/components/CodeDisplay'
import parityEncode from '@lib/utils/parityEncoder'
import textToBytes from '@lib/utils/textToBytes'
import React, { useState } from 'react'
import { Box, Divider, TextField, Typography } from '@mui/material'

/**
 * Componente utilizado para demonstrar os códigos de paridade,
 * é interativo, o usuário pode injetar erros na mensagem
 */
const ParityDigit = () => {
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
        Neste algorítmo somente um número par de erros é identificado e o erro não é corrigido.
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
        code={parityEncode(byteInput)}
        editable
        codeType="parity"
      />
    </Box>
  )
}

export default ParityDigit