import generateEnv from "../config/config";
import service from "../modules/service";

/**
 * Class - Group
 * @description
 * Class having implementation details for Group operations
 */

const { VAULT_ADDR, VAULT_PORT, VAULT_TOKEN } = generateEnv();

class Group {
  fetch_group(payload: any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const group_name = payload.name;
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/identity/group/name/${group_name}`,
      headers: headers,
    };
    return service.get(request);
  }
  add_memberstogroup(payload:any) {
    const headers = {
      "X-Vault-Token": `${VAULT_TOKEN}`,
    };
    const group_id = payload.id;
    delete payload.id;
    const request = {
      url: `${VAULT_ADDR}:${VAULT_PORT}/v1/identity/group/id/${group_id}`,
      headers: headers,
      payload: payload,
    };
    return service.post(request);
  }
}

/**
 * Instance - Group
 * @description
 * Instance of Group Class
 */
const group = new Group();
export default group;
