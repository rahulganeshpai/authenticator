import service from "../modules/service";

/**
 * Class - Transit
 * @description
 * Class for operations on Transit
 */
class Transit {
    create_key(payload: any){
        return service.post(service.prepare_payload(payload, "create_key"));
    }
    encrypt_data(payload:any){
        return service.post(service.prepare_payload(payload, "encrypt_data"));
    }
    decrypt_data(payload:any){
        return service.post(service.prepare_payload(payload, "decrypt_data"));
    }
}

/**
 * Instance - Transit
 * @description
 * Instance of Transit Class
 */
const transit = new Transit();
export default transit;
