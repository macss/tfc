import CodeDisplay from '@lib/components/CodeDisplay'
import repetitionEncode from '@lib/utils/repetitionEncoder'
import textToBytes from '@lib/utils/textToBytes'
import React, { useState } from 'react'

/**
 * Componente utilizado para demonstrar os códigos de repetição,
 * é interativo, o usuário pode injetar erros na mensagem
 */
const RepetitionCode = () => {
  const [input, setInput] = useState('')
  const [byteInput, setByteInput] = useState('')

  return (
    <div>
      <input 
        value={input}
        onChange={e => {
          const { value } = e.target
          const bytes = textToBytes(value)
          setInput(value)
          setByteInput(bytes)
        }}
      />
      <p>
        Raw Byte: {byteInput}
      </p>
      <CodeDisplay 
        code={repetitionEncode(byteInput)}
        codeType="repetition"
      />
      <br />
      <CodeDisplay 
        code={repetitionEncode(byteInput)}
        editable
        codeType="repetition"
      />
    </div>
  )
}

export default RepetitionCode