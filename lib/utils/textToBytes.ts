/**
 * Função que transforma um texto em uma sequência de bytes
 * 
 * @param text texto a ser convertido
 * @returns sequência de bytes equivalente
 */
export default function textToBytes(text: string) {
  return text.split("").map(c => ("00000000" + c.charCodeAt(0).toString(2)).substr(-8)).join("")
}