"use strict";

import axios from "axios";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

/**
 * Class - Service
 * @description
 * Class having implementation details for service operations
 */
class Service {
  async post(req) {
    const { url, headers, payload } = req;
    const result = axios.post(url, payload, { headers: headers });
    return result;
  }
  async get(req) {
    const { url, headers } = req;
    const result = axios.get(url, { headers: headers });
    return result;
  }
}

/**
 * Instance - Service
 * @description
 * Instance of Service Class
 */
const service = new Service();
export default service;
