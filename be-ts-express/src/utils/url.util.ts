export const minimalPathUrl = (url): string => {
  const parsedUrl = new URL(url)
  const { protocol, hostname, pathname } = parsedUrl
  const urlWithPathName = `${protocol}//${hostname}${pathname}`
  return urlWithPathName
}

export const searchUrlGenerator = ({
  baseUrl,
  searchTerm,
}: {
  baseUrl: string
  searchTerm: string
}): string => {
  const searchTermParsed = searchTerm
    .split(" ")
    .filter((e) => e)
    .join("-")
  return `${baseUrl}/${searchTermParsed}`
}
