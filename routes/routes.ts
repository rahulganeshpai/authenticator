import { Router } from "express";
import controller from "../controller/controller";

const router = Router();
const {
  welcome_handler,
  create_user,
  fetch_credentials,
  fetch_group,
  add_members,
  create_staticsecrets,
  fetch_staticsecrets,
  create_approle,
  create_transitkey,
  encryption,
  decryption
} = controller();

router.get("/", welcome_handler);
router.post("/createuser", create_user);
router.post("/fetchcredentials", fetch_credentials);
router.post("/fetchgroup", fetch_group);
router.post("/addgroupmembers", add_members);
router.post("/createstaticsecrets", create_staticsecrets);
router.post("/fetchstaticsecrets", fetch_staticsecrets);
router.post("/newrole", create_approle);
router.post("/createkey", create_transitkey);
router.post("/encryption", encryption);
router.post("/decryption", decryption);

export default router;
