import bytesToText from "./bytesToText";
import { DecoderResponse } from "./decoder";

/**
 * Função que decodifica um código de repetição, o fator de repetição
 * utilizado é de 3
 * 
 * @param code sequência a ser decodificada
 * @returns sequência decodificada
 */
export function repetitionDecoder(code: string): DecoderResponse {
  const chunks = code.match(/.{3}/g)

  let output = ''
  let errors = 0

  if (chunks) {
    output = chunks.map(chunk => {
      const sum = chunk.split('').reduce((a,c) => a + Number(c), 0)
      if (chunk[0] !== chunk[1] || chunk[0] !== chunk[2] || chunk[1] !== chunk[2]) {
        errors++
      }
      return sum > 1 ? 1 : 0
    }).join('')
  }

  return {
    input: code,
    output,
    errors,
    fixedError: false
  }
}

/**
 * Função que transforma a resposta do decoder em texto ASCII
 * 
 * @param response resposta obtida pelo decoder
 * @returns texto em ASCII
 */
export function repetitionResponseToText(response: DecoderResponse) {
  return {
    message: bytesToText(response.output),
    errors: response.errors
  }
}

/**
 * Função que combina as duas funções anteriores
 * 
 * @see {@link repetitionDecoder}
 * @see {@link repetitionResponseToText}
 * 
 * @param code sequência de bytes a ser decodificada
 * @returns texto em ASCII
 */
export default function repetitionDecode(code: string) {
  return repetitionResponseToText(repetitionDecoder(code))
}