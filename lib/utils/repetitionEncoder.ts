export default function repetitionEncode(code: string, repetition: number = 3) {
  return code.split('').map(c => c.repeat(repetition)).join('')
}