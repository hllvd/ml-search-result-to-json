export function extractProductId(url: string) {
  const regex = /MLB\d+/
  const match = url.match(regex)
  if (!match) throw new Error("Invalid URL")
  return match[0]
}
