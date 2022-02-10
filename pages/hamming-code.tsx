import CodeDisplay from '@lib/components/CodeDisplay'
import hammingEncode from '@lib/utils/hammingEncoder'
import textToBytes from '@lib/utils/textToBytes'
import { useState } from 'react'

const HammingCode = () => {
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
        code={hammingEncode(byteInput)}
        codeType="hamming"
      />
      <br />
      <CodeDisplay 
        code={hammingEncode(byteInput)}
        editable
        codeType="hamming"
      />
    </div>
  )
}

export default HammingCode
