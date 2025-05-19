import express, { Router } from "express";

import { prisma } from "@repo/DB/client";
import { middleware } from "../middleware";
const router: Router = express.Router();

export default router;
