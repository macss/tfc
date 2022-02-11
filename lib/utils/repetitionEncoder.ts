/**
 * Função que codifica uma sequência de bytes em código de repetição,
 * a repetição padrão é de 3
 * 
 * @param code sequência de bytes a ser codificada
 * @param repetition quantidade de repetição a ser feita
 * @returns sequência codificada com código de repetição
 */
export default function repetitionEncode(code: string, repetition: number = 3) {
  return code.split('').map(c => c.repeat(repetition)).join('')
}