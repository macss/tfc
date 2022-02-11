import bytesToText from "./bytesToText";
import { DecoderResponse } from "./decoder";

/**
 * Função que decodifica um código em Hamming, caso detecte um erro de um 
 * único bit ela irá corrigir, para um erro de 2 bits a função irá dizer 
 * que um erro foi encontrado mas não conseguirá identificá-lo e corrigí-lo
 * 
 * @param code string codificada em hamming
 * @returns uma lista com a tradução do decoder considerando sequências de 16 bits
 */
export function hammingDecoder(code: string): DecoderResponse[] {
  const chunks = code.match(/.{16}/g)

  if (chunks)
    return chunks.map(chunk => {
      const response: DecoderResponse = {
        input: chunk,
        output: '',
        errors: 0,
        fixedError: false
      }


      const bits = chunk.split('')
      const activeBits = bits.reduce((a, c, i) => {
        if (c === '1')
          a.push(i)
        
        return a
      }, [] as number[])

      const errorPosition = activeBits.reduce((a, c) => a ^ c, 0)
      const parityError = bits.reduce((a,c) => a + Number(c), 0) % 2 !== 0

      if (parityError) {
        bits[errorPosition] = bits[errorPosition] === '1' ? '0' : '1'
        response.errors = 1
        response.fixedError = true
        response.errorPosition = errorPosition
      } else if (errorPosition !== 0 && !parityError) {
        response.errors = 2
      }

      response.output = bits[3] + bits[5] + bits[6] + bits[7] + bits[9] + bits[10] + bits[11] + bits[12] + bits[13] + bits[14] + bits[15]//chunk.slice(5,8) + chunk.slice(9)

      return response

    })

  return [{
    input: code,
    output: '',
    errors: 0,
    fixedError: false
  }]
}

/**
 * Função que recebe a resposta do decoder e transforma em texto ASCII
 * 
 * @param responses lista com todas as respostas do decoder
 * @returns texto traduzido em ASCII
 */
export function hammingResponsesToText(responses: DecoderResponse[]) {
  const fullOutput = responses.map(response => response.output).join('')
  const errorCount = responses.reduce((a,c) => c.errors + a, 0)

  const bytes = fullOutput.match(/.{8}/g)

  if (bytes)
    return {
      errors: errorCount,
      message: bytesToText(bytes.join(''))
    }

  return {
    errors: 0,
    message: ''
  }
}

/**
 * Função de utilidade que combina as duas funções anterirores em uma
 * 
 * @see {@link hammingDecoder}
 * @see {@link hammingResponsesToText}
 * 
 * @param code código a ser decodificado 
 * @returns texto em ASCII
 */
export default function hammingDecode(code: string) {
  const responses = hammingDecoder(code)
  return hammingResponsesToText(responses)
}