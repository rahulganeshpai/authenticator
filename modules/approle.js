"use strict";

import service from "./service";
import utils from "./utils";

/**
 * Class - AppRole
 * @description
 * Class having implementation details for AppRole operations
 */
class AppRole {
  create_newrole(payload) {
    return service.post(utils.prepare_payload(payload, "create_newrole"));
  }
  fetch_roleid(payload) {
    return service.post(utils.prepare_payload(payload, "fetch_roleid"));
  }
  create_secret(payload) {
    return service.post(utils.prepare_payload(payload, "create_secret"));
  }
}

/**
 * Instance - AppRole
 * @description
 * Instance of AppRole Class
 */
const approle = new AppRole();
export default approle;
