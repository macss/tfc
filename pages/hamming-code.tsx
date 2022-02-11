import CodeDisplay from '@lib/components/CodeDisplay'
import hammingEncode from '@lib/utils/hammingEncoder'
import textToBytes from '@lib/utils/textToBytes'
import { useState } from 'react'
import { Box, Divider, TextField, Typography } from '@mui/material'

/**
 * Componente utilizado para demonstrar os códigos de hamming,
 * é interativo, o usuário pode injetar erros na mensagem
 */
const HammingCode = () => {
  const [byteInput, setByteInput] = useState('')

  return (
    <Box>
      <Typography variant="h6">
        Código de Hamming
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
        Neste algorítmo é possível identificar e corrigir erros de 1 bit, erros de 2 bits são identificáveis mas não corrigíveis, erros de 3 ou mais bits podem ser
        identificados ou não.
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
        code={hammingEncode(byteInput)}
        editable
        codeType="hamming"
      />
    </Box>
  )
}

export default HammingCode
