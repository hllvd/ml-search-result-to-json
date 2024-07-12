import { AxiosRequestConfig } from "axios"
import axios from "axios"

const httpGet = async (url: string, header?: any) => {
  const defaultHeader = {
    "Content-Type": " application/x-www-form-urlencoded",
    accept: "application/json",
  }
  const config: AxiosRequestConfig = {
    headers: header ? { ...defaultHeader, ...header } : defaultHeader,
  }
  const response = await axios.get(url, config)
  if (response.status > 399)
    throw new HttpResponseError(response.status, response.data)
  return response.data
}

const httpPost = async <T>(
  url: string,
  body: unknown,
  header?: any
): Promise<T> => {
  const defaultHeader = {
    "Content-Type": " application/x-www-form-urlencoded",
    accept: "application/json",
  }
  const config: AxiosRequestConfig = {
    headers: header ? { ...defaultHeader, ...header } : defaultHeader,
  }
  const response = await axios.post(url, body, config)
  if (response.status > 399)
    throw new HttpResponseError(response.status, response.data)
  return response.data
}

export { httpGet, httpPost }
