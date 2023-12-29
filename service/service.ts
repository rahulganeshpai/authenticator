import axios from "axios";
import utils from "../utils/utils";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

let status = null;

/**
 * API - POST
 * @description
 * API for HTTP service POST
 */
const post_service = async (req: any) => {
  try {
    const { url, headers, payload } = req;
    const reqX = axios.post(url, payload, { headers: headers });
    const [resX] = await Promise.all([reqX]);
    return utils.generate_statusobject(200, resX)
  } catch (error:any) {
      utils.check_nullundefined(error?.response) === "false"
        ? (status = 500)
        : (status = error.response.status);
    return utils.generate_statusobject(status, error)
  }
};

/**
 * Function - service
 * @description
 * Function containing all services
 */
const service = () => {
  return {
    post: post_service,
  };
};

export default service;
