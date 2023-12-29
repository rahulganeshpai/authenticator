import { Router } from "express";
import controller from "../controller/controller";

const router = Router();
const { welcome_handler, create_user, fetch_credentials } = controller();

router.get("/", welcome_handler);
router.post("/createuser", create_user);
router.post("/fetchcredentials", fetch_credentials);

export default router;
