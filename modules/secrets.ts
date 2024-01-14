import generateEnv from "../config/config";
import service from "../modules/service";

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

/**
 * Class - Secrets
 * @description
 * Class having implementation details for Secrets operations
 */
class Secrets {
  create_kvsecrets(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data${payload.path}`,
      headers: headers,
      payload: payload,
    };
    return service.post(request);
  }
  read_kvsecrets(payload: any) {
    let url = null;
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    payload.version ?? false
      ? (url = `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data/db?version=${payload.version}`)
      : (url = `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data/db`);
    const request = {
      url: url,
      headers: headers,
    };
    return service.get(request);
  }
}

/**
 * Instance - Secrets
 * @description
 * Instance of Secrets Class
 */
const secrets = new Secrets();
export default secrets;
