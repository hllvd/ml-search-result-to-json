import { AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"

const httpGet = async (url: string) => {
  const r = await axios.get(url)
  return r.data
}

const httpPost = async <T>(
  url: string,
  body: unknown,
  header?: any
): Promise<AxiosResponse<T>> => {
  const defaultHeader = {
    "Content-Type": " application/x-www-form-urlencoded",
    accept: "application/json",
  }
  const config: AxiosRequestConfig = {
    headers: header ? { ...defaultHeader, ...header } : defaultHeader,
  }
  return (await axios.post(url, body, config)).data
}

export { httpGet, httpPost }
