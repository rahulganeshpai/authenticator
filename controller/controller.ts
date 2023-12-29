import { RequestHandler } from "express";
import user from "../modules/user";
import utils from "../utils/utils";

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
    let message = null;
    const new_user: any = await user.create_user(req.body);
    utils.check_statuserror(new_user.status)
      ? (message = new_user.message)
      : (message = "Success");
    res.status(new_user.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
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
