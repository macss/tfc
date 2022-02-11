import bytesToText from "./bytesToText"
import { DecoderResponse } from "./decoder"

/**
 * Função que decodifica um código de digito de paridade,
 * caso encontre um erro acusará a presença do mesmo mas não irá
 * corrigí-lo.
 * 
 * Só identifica uma quantidade impar  de erros
 * 
 * @param code sequência codificada com digito de paridade
 * @returns sequencia de bits decodificada
 */
export function parityDecoder(code: string): DecoderResponse[] {
  if (code.length % 16 !== 0)
    throw new Error('Invalid code size')

  const chunks = code.match(/.{1,16}/g)

  if (chunks)
    return chunks.map(chunk => {
      const parity = chunk.split('').reduce((a,c) => a + Number(c), 0) % 2

      return {
        input: chunk,
        output: chunk.slice(1),
        errors: parity !== 0 ? 1 : 0,
        fixedError: false
      }
    })

  return [{
    input: code,
    output: '',
    errors: 0,
    fixedError: false
  }]
}

/**
 * Função que utiliza a resposta do decoder para transformar em texto ASCII
 * 
 * @param responses lista de respostas fornecida pelo decoder
 * @returns texto em ASCII
 */
export function parityResponsesToText(responses: DecoderResponse[]) {
  const fullOutput = responses.map(response => response.output).join('')
  const errorCount = responses.reduce((a,c) => c.errors + a, 0)
  const bytes = fullOutput.match(/.{8}/g)

  if (bytes) 
    return {
      message: bytesToText(bytes.join('')),
      errors: errorCount
    }

  return {
    message: '',
    errors: 0
  }
}

/**
 * Função que combina as duas funções anteriores
 * 
 * @see {@link parityDecoder}
 * @see {@link parityResponsesToText}
 * 
 * @param code texto a ser decodificado
 * @returns texto em ASCII
 */
export default function parityDecode(code: string) {
  const responses = parityDecoder(code)
  return parityResponsesToText(responses)
}