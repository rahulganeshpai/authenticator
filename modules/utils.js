"use strict";

import generateEnv from "../config/config";

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

/**
 * Class - Utils
 * @description
 * Class having implementation details for utility operations
 */
class Utils {
  check_nullundefined(value) {
    return value ?? "false";
  }
  generate_statusobject(status, message) {
    return {
      status: status,
      message: message,
    };
  }
  check_statuserror(status) {
    return /^[4-5]/.test(status.toString());
  }
  check_statusredirection(status) {
    return status === 204 ? (status = 200) : (status = status);
  }
  prepare_payload(payload, type) {
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
      case "create_key": {
        const key = payload.name;
        delete payload.name;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/transit/keys/${key}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "encrypt_data": {
        payload.plaintext = Buffer.from(payload.plaintext, "utf8").toString(
          "base64"
        );
        const key = payload.key;
        delete payload.key;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/transit/encrypt/${key}`,
          headers: headers,
          payload: payload,
        };
        break;
      }
      case "decrypt_data": {
        const key = payload.key;
        delete payload.key;
        request = {
          url: `${VAULT_ADDR}:${VAULT_PORT}/v1/transit/decrypt/${key}`,
          headers: headers,
          payload: payload,
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
 * Instance - Utils
 * @description
 * Instance of Utils Class
 */
const utils = new Utils();
export default utils;
