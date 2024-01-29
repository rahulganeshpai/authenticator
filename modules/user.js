"use strict";

import service from "./service";
import utils from "./utils";

/**
 * Class - User
 * @description
 * Class for operations on User
 */
class User {
  create_user(payload) {
    return service.post(utils.prepare_payload(payload, "create_user"));
  }
  fetch_usercredentials(payload) {
    return service.post(
      utils.prepare_payload(payload, "fetch_usercredentials")
    );
  }
}

/**
 * Instance - User
 * @description
 * Instance of User Class
 */
const user = new User();
export default user;
