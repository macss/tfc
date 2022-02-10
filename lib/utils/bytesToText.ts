export default function bytesToText(bytes: string) {
  if (bytes.length % 8 !== 0)
    throw new Error('Invalid byte size')

  const chunks = bytes.match(/.{1,8}/g)

  if (chunks)
    return chunks.map(chunk => {
      const charCode = Number.parseInt(chunk, 2)

      if (charCode === 0) {
        return ''
      }

      return String.fromCharCode(charCode)
    }).join('')

  return ''
}