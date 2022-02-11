/**
 * Resposta padrão dos decodificadores, utilizada para unificar a forma que as respostas são lidas
 */
export type DecoderResponse = {
  /**
   * Quantidade de erros encontrada
   */
  errors: number
  /**
   * É verdadeiro quando um erro é corrigido
   */
  fixedError: boolean
  /**
   * Posição do erro, caso seja identificada
   */
  errorPosition?: number
  /**
   * Sequência de bits que foi inserida como entrada
   */
  input: string
  /**
   * Resposta do decoder
   */
  output: string
}