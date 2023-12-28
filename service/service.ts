import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

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
    return { status: "success", message: resX };
  } catch (error) {
    return { status: "error", message: `Error: ${error}` };
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
