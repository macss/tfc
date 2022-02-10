export default function parityEncode(code: string) {
  const chunks = code.match(/.{1,15}/g)

  if (chunks)
    return chunks.map(chunk => {
      const parity = chunk.split('').reduce((a, c) => a + Number(c), 0)

      return (`${parity % 2}${chunk}000000000000000`.slice(0,16))
    }).join('')
  
  return ''
}