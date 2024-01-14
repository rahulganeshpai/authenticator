import service from "../modules/service";

/**
 * Class - User
 * @description
 * Class for operations on User
 */
class User {
  create_user(payload: any) {
    return service.post(service.prepare_payload(payload, "create_user"));
  }
  fetch_usercredentials(payload: any) {
    return service.post(
      service.prepare_payload(payload, "fetch_usercredentials")
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
