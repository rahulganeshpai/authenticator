import api from "../api/api";
import generateEnv from "../config/config";
import service from "../modules/service";

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

/**
 * Class - User
 * @description
 * Class for operations on User
 */
class User {
  create_user(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const username = payload.username;
    delete payload.username;
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/userpass/users/${username}`,
      headers: headers,
      payload: payload,
    };
    return service.post(request);
    // return api().post(request);
  }
  async fetch_credentials(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/userpass/login/${payload.username}`,
      headers: headers,
      payload: payload,
    };
    return await api().post(request);
  }
}

/**
 * Instance - User
 * @description
 * Instance of User Class
 */
const user = new User();
export default user;
