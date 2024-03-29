"use strict";

import utils from "../modules/utils";

let status = null;

/**
 * API - POST
 * @description
 * API for HTTP service POST
 */
const post_service = async (req) => {
  try {
    const [result] = await Promise.all(req);
    return utils.generate_statusobject(
      utils.check_statusredirection(result.status),
      result
    );
  } catch (error) {
    utils.check_nullundefined(error?.response) === "false"
      ? (status = 500)
      : (status = error.response.status);
    return utils.generate_statusobject(status, error);
  }
};

/**
 * API - GET
 * @description
 * API for HTTP service GET
 */
const get_service = async (req) => {
  try {
    const [result] = await Promise.all(req);
    return utils.generate_statusobject(
      utils.check_statusredirection(result.status),
      result
    );
  } catch (error) {
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
    get: get_service,
  };
};

export default api;
