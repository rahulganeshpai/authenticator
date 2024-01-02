import utils from "../modules/utils";

let status = null;

/**
 * API - POST
 * @description
 * API for HTTP service POST
 */
const post_service = async (req: any) => {
  try {
    const [result] = await Promise.all(req);
    return utils.generate_statusobject(
      utils.check_statusredirection(result.status),
      result
    );
  } catch (error: any) {
    utils.check_nullundefined(error?.response) === "false"
      ? (status = 500)
      : (status = error.response.status);
    return utils.generate_statusobject(status, error);
  }
};

/**
 * Function - api
 * @description
 * Function containing all APIs
 */
const api = () => {
  return {
    post: post_service,
  };
};

export default api;
