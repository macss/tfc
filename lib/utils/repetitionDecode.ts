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

  if (chunks) {
    output = chunks.map(chunk => {
      const sum = chunk.split('').reduce((a,c) => a + Number(c), 0)
      return sum > 1 ? 1 : 0
    }).join('')
  }

  return {
    input: code,
    output,
    errors: 0,
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
    errors: 0
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