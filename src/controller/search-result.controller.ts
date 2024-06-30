import { Request, Response } from "express"
const searchResult = async (req: Request, res: Response) => {
  res.status(200).json({})
}

export default { searchResult }
