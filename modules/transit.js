"use strict";

import service from "./service";
import utils from "./utils";

/**
 * Class - Transit
 * @description
 * Class for operations on Transit
 */
class Transit {
    create_key(payload){
        const prepare_payload = utils.prepare_payload(payload, "create_key");
        return service.post(prepare_payload);
    }
    encrypt_data(payload){
        const prepare_payload = utils.prepare_payload(payload, "encrypt_data");
        return service.post(prepare_payload);
    }
    decrypt_data(payload){
        const prepare_payload = utils.prepare_payload(payload, "decrypt_data");
        return service.post(prepare_payload);
    }
}

/**
 * Instance - Transit
 * @description
 * Instance of Transit Class
 */
const transit = new Transit();
export default transit;
