export const minimalPathUrl = (url): string => {
  const parsedUrl = new URL(url)
  const { protocol, hostname, pathname } = parsedUrl
  const urlWithPathName = `${protocol}//${hostname}${pathname}`
  return urlWithPathName
}
