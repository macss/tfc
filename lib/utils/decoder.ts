export type DecoderResponse = {
  errors: number
  fixedError: boolean
  errorPosition?: number
  input: string
  output: string
}