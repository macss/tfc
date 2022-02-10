export default function textToBytes(text: string) {
  return text.split("").map(c => ("00000000" + c.charCodeAt(0).toString(2)).substr(-8)).join("")
}