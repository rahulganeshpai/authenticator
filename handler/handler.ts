import { RequestHandler } from "express";

/**
 * Welcome Data
 * @description
 * Handler for Welcome Page
 */
const welcome: RequestHandler = async (_, res) => {
  try {
    res.status(200).send("Welcome to Authenticator");
  } catch (error: any) {
    res.status(error.esponse.status).send(error);
  }
};

const handler = () => {
  return {
    welcome_handler: welcome,
  };
};

export default handler;
