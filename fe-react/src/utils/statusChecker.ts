export function statusChecker(status: string): {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
} {
  const isLoading = status === "loading"
  const isError = status === "error"
  const isSuccess = status === "success"
  return { isError, isLoading, isSuccess }
}
