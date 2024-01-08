import generateEnv from "../config/config";
import service from "../modules/service";

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

/**
 * Class - AppRole
 * @description
 * Class having implementation details for AppRole operations
 */
class AppRole {
  create_newrole(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const role = payload.role;
    delete payload.role;
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${role}`,
      headers: headers,
      payload: payload,
    };
    return service.post(request);
  }
  fetch_roleid(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${payload.role}/role-id`,
      headers: headers,
    };
    return service.get(request);
  }
  create_secret(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${payload.role}/secret-id`,
      headers: headers,
      payload: payload,
    };
    return service.post(request);
  }
}

/**
 * Instance - AppRole
 * @description
 * Instance of AppRole Class
 */
const approle = new AppRole();
export default approle;
