import { Router } from "express";

const router = Router();

router.get("/simulate", (_req, res) => {
  res.json({
    message: "POS simulated. Call /api/resource & /api/verify for tip flow.",
  });
});

export default router;
