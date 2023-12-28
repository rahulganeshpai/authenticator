import { Router } from "express";
import controller from "../controller/controller";

const router = Router();
const { welcome_handler, create_user } = controller();

router.get("/", welcome_handler);
router.post("/createuser", create_user);

export default router;
