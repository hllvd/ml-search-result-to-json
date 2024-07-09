import { Request, Response } from "express"
const logSearchResult = async (req: Request, res: Response) => {
  console.log("here")
  const r = "ok"
  console.log(r)
  res.status(200).json({ r })
}

export default { logSearchResult }
