export const FlatThat = (obj: any, acc: any = []) => {
  for (const [key, value] of Object.entries(obj)) {
    Object.entries(value as any).forEach((arr) => {
      arr.unshift(key)
      acc.push(arr)
    })
  }
  return acc
}
