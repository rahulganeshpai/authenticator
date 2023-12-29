import service from "../service/service";
import generateEnv from "../config/config";

/**
 * Class - User
 * @description
 * Class for operations on User
 */
class User {
  async create_user(payload: any) {
    const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();
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
    return await service().post(request);
  }
}

const user = new User();
export default user;
