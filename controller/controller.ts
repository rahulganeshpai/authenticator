import { RequestHandler } from "express";
import user from "../modules/user";
import utils from "../utils/utils";

let message = null;

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
    utils.check_statuserror(new_user.status)
      ? (message = new_user.message)
      : (message = "Success");
    res.status(new_user.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Fetch Credentials
 * @description
 * Controller for fetching user credentials
 */
const fetch_credentials: RequestHandler = async (req, res) => {
  try {
    const credentials: any = await user.fetch_credentials(req.body);
    utils.check_statuserror(credentials.status)
      ? (message = `${credentials.message}`)
      : (message = credentials.message.data);
    res.status(credentials.status).send(message);
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
    fetch_credentials: fetch_credentials,
  };
};

export default controller;
