import { MLUser } from "../../../models/dto/ml-user.models"
import { fetchMl } from "../fetcher-api.ml.service"

const getMe = async (userId) => {
  const options = {
    userId,
    method: "GET",
  }
  const r = await fetchMl("/users/me", options)
  return r
}

const getSeller = async ({
  sellerId,
  userId,
}: {
  sellerId: string
  userId: string
}): Promise<MLUser> => {
  const options = {
    userId,
    method: "GET",
  }
  const r = await fetchMl(`/users/${sellerId}`, options)
  return r
}

export { getMe, getSeller }
