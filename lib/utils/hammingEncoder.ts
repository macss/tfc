export default function hammingEncode(code: string) {
  const chunks = code.match(/.{1,11}/g)

  if (chunks)
    return chunks.map(chunk => {
      const miniChunk = `${chunk}00000000000`.slice(0,11).split('').map(c => Number(c))

      // Brute forcing the parity checks
      const p1 = ( miniChunk[0] + miniChunk[1] + miniChunk[3] + miniChunk[4] + miniChunk[6] + miniChunk[8] + miniChunk[10]) % 2
      const p2 = ( miniChunk[0] + miniChunk[2] + miniChunk[3] + miniChunk[5] + miniChunk[6] + miniChunk[9] + miniChunk[10]) % 2
      const p3 = ( miniChunk[1] + miniChunk[2] + miniChunk[3] + miniChunk[7] + miniChunk[8] + miniChunk[9] + miniChunk[10]) % 2
      const p4 = ( miniChunk[4] + miniChunk[5] + miniChunk[6] + miniChunk[7] + miniChunk[8] + miniChunk[9] + miniChunk[10]) % 2

      const p5 = (p1 + p2 + p3 + p4 + miniChunk.reduce((a,c) => a + c, 0)) % 2

      return `${p5}${p1}${p2}${miniChunk[0]}${p3}${chunk.slice(1,4)}${p4}${chunk.slice(4)}0000000000000000`.slice(0,16)
    }).join('')

  return ''
}