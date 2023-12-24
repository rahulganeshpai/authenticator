import express from "express";
import handler from "../handler/handler";

const router = express.Router();
const welcome = router.get("/", handler().welcome_handler);

/**
 * Function - routes
 * @description
 * Function containing all routes
 */
const routes = () => {
  return {
    welcome_route: welcome,
  };
};

export default routes;
