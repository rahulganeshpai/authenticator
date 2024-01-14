import axios from "axios";
import generateEnv from "../config/config";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=utf-8";

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

/**
 * Class - Service
 * @description
 * Class having implementation details for service operations
 */
class Service {
  async post(req: any) {
    const { url, headers, payload } = req;
    const result = axios.post(url, payload, { headers: headers });
    return result;
  }
  async get(req: any) {
    const { url, headers } = req;
    const result = axios.get(url, { headers: headers });
    return result;
  }
  prepare_payload(payload: any, type: string) {
    let request = {};
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    switch (type) {
      case "create_user": {
        const username = payload.username;
        delete payload.username;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/userpass/users/${username}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "fetch_usercredentials": {
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/userpass/login/${payload.username}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "create_newrole": {
        const role = payload.role;
        delete payload.role;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${role}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "fetch_roleid": {
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${payload.role}/role-id`,
          headers: headers,
        };
        break;
      }
      case "create_secret": {
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/auth/approle/role/${payload.role}/secret-id`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "fetch_group": {
        const group_name = payload.name;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/identity/group/name/${group_name}`,
          headers: headers,
        };
        break;
      }
      case "add_memberstogroup": {
        const group_id = payload.id;
        delete payload.id;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/identity/group/id/${group_id}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "create_kvsecrets": {
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data${payload.path}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "read_kvsecrets": {
        let url = null;
        payload.version ?? false
          ? (url = `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data/db?version=${payload.version}`)
          : (url = `${VAULT_ADDR}:${VAULT_PORT}/v1/kv/data/db`);
        request = {
          url: url,
          headers: headers,
        };
        break;
      }
      default: {
        break;
      }
    }
    return request;
  }
}

/**
 * Instance - Service
 * @description
 * Instance of Service Class
 */
const service = new Service();
export default service;
