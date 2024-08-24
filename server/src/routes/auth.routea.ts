import { Router, Request, Response } from "express";
const router = Router();

router.post("/register", (req: Request, res: Response) => {
  try {
    const data = req.body;
  } catch (error) {
    res.status(422).json(error);
  }
});

export default router;
