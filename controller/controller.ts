import { RequestHandler } from "express";
import user from "../modules/user";
import utils from "../utils/utils";

let status = null;

/**
 * Controller - Welcome
 * @description
 * Controller for Welcome Page
 */
const welcome: RequestHandler = async (_, res) => {
  try {
    res.status(200).send("Welcome to Authenticator");
  } catch (error: any) {
    res.status(error.esponse.status).send(error);
  }
};

/**
 * Controller - Create User
 * @description
 * Controller for creating new user
 */
const create_user: RequestHandler = async (req, res) => {
  try {
    const new_user: any = await user.create_user(req.body);
    res.status(new_user.message.status).send(new_user.status);
  } catch (error: any) {
    utils.check_nullundefined(error?.response) === "false"
      ? (status = 500)
      : (status = error.response.status);
    res.status(status).send(`${error}`);
  }
};

/**
 * Function - Controller
 * @description
 * Function containing all route controllers
 */
const controller = () => {
  return {
    welcome_handler: welcome,
    create_user: create_user,
  };
};

export default controller;
