import { Router } from "express";
import controller from "../controller/controller";

const router = Router();
const {
  welcome_handler,
  create_user,
  fetch_credentials,
  fetch_group,
  add_members,
} = controller();

router.get("/", welcome_handler);
router.post("/createuser", create_user);
router.post("/fetchcredentials", fetch_credentials);
router.post("/fetchgroup", fetch_group);
router.post("/addgroupmembers", add_members);

export default router;
