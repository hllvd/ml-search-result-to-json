import { Request, Response } from "express"

const healthChecker = async (req: Request, res: Response) => res.json({})

export default {
  healthChecker,
}
