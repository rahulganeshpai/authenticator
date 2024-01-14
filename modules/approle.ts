import service from "../modules/service";

/**
 * Class - AppRole
 * @description
 * Class having implementation details for AppRole operations
 */
class AppRole {
  create_newrole(payload: any) {
    return service.post(service.prepare_payload(payload, "create_newrole"));
  }
  fetch_roleid(payload: any) {
    return service.post(service.prepare_payload(payload, "fetch_roleid"));
  }
  create_secret(payload: any) {
    return service.post(service.prepare_payload(payload, "create_secret"));
  }
}

/**
 * Instance - AppRole
 * @description
 * Instance of AppRole Class
 */
const approle = new AppRole();
export default approle;
