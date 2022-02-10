import CodeDisplay from '@lib/components/CodeDisplay'
import parityEncode from '@lib/utils/parityEncoder'
import textToBytes from '@lib/utils/textToBytes'
import React, { useState } from 'react'

const ParityDigit = () => {
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
        code={parityEncode(byteInput)}
        codeType="parity"
      />
      <br />
      <CodeDisplay 
        code={parityEncode(byteInput)}
        editable
        codeType="parity"
      />
    </div>
  )
}

export default ParityDigit