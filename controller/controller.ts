import { RequestHandler } from "express";
import user from "../modules/user";
import group from "../modules/group";
import utils from "../modules/utils";
import api from "../api/api";
import secrets from "../modules/secrets";
import approle from "../modules/approle";
// import store from "../modules/store";

let message = null;

/**
 * Controller - Welcome
 * @description
 * Controller for Welcome Page
 */
const welcome: RequestHandler = async (_, res) => {
  try {
    // await store.strore_contents();
    // const data = await store.read_contents();
    // console.log(data);
    res.status(200).send("Welcome to Authenticator");
  } catch (error: any) {
    res.status(500).send(error);
  }
};

/**
 * Controller - Create User
 * @description
 * Controller for creating new user
 */
const create_user: RequestHandler = async (req, res) => {
  try {
    const new_user = user.create_user(req.body);
    const result = await api().post([new_user]);
    utils.check_statuserror(result.status)
      ? (message = result.message)
      : (message = "Success");
    res.status(result.status).send(message);
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
    const credentials: any = user.fetch_usercredentials(req.body);
    const result = await api().post([credentials]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Fetch Group
 * @description
 * Controller for fetching group details
 */
const fetch_group: RequestHandler = async (req, res) => {
  try {
    // result.message.data.data.id
    const get_group: any = group.fetch_group(req.body);
    const result = await api().get([get_group]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Add Members to Group
 * @description
 * Controller for adding Members to group
 */
const add_members: RequestHandler = async (req, res) => {
  try {
    // fetch group info
    const fetch_group_api = group.fetch_group(req.body);
    const fetch_group_result = await api().get([fetch_group_api]);
    req.body.id = fetch_group_result.message.data.data.id;

    // fetch member info
    const fetch_memeber: any = user.fetch_usercredentials(req.body);
    const fetch_memeber_result = await api().post([fetch_memeber]);
    req.body.member_entity_ids = [
      fetch_memeber_result.message.data.auth.entity_id,
    ];

    // add member to group
    const add_memberstogroup = group.add_memberstogroup(req.body);
    const result = await api().post([add_memberstogroup]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Create Statics Secrets
 * @description
 * Controller having details for creating statics secrets details
 */
const create_staticsecrets: RequestHandler = async (req, res) => {
  try {
    const create_newsecret: any = secrets.create_kvsecrets(req.body);
    const result = await api().post([create_newsecret]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Create Statics Secrets
 * @description
 * Controller having details for creating statics secrets details
 */
const fetch_staticsecrets: RequestHandler = async (req, res) => {
  try {
    const fetch_newsecret: any = secrets.read_kvsecrets(req.body);
    const result = await api().get([fetch_newsecret]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
  } catch (error: any) {
    res.status(500).send(`${error}`);
  }
};

/**
 * Controller - Create AppRole
 * @description
 * Controller having details for creating approle details
 */
const create_approle: RequestHandler = async (req, res) => {
  try {
    const new_role: any = approle.create_newrole(req.body);
    const new_roleresult = await api().post([new_role]);
    console.log(new_roleresult);
    // const role_id: any = approle.fetch_roleid(req.body);
    // const role_idresult = await api().get([role_id]);
    // result.message.data.data.role_id
    // console.log(role_idresult);
    const new_secret: any = approle.create_secret(req.body);
    const result = await api().post([new_secret]);
    utils.check_statuserror(result.status)
      ? (message = `${result.message}`)
      : (message = result.message.data);
    res.status(result.status).send(message);
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
    fetch_group: fetch_group,
    add_members: add_members,
    create_staticsecrets: create_staticsecrets,
    fetch_staticsecrets: fetch_staticsecrets,
    create_approle: create_approle,
  };
};

export default controller;
