import bytesToText from "./bytesToText";
import { DecoderResponse } from "./decoder";

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

export function repetitionResponseToText(response: DecoderResponse) {
  return {
    message: bytesToText(response.output),
    errors: 0
  }
}

export default function repetitionDecode(code: string) {
  return repetitionResponseToText(repetitionDecoder(code))
}