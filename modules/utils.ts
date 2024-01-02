/**
 * Class - Utils
 * @description
 * Class having implementation details for utility operations
 */
class Utils {
  check_nullundefined(value: any) {
    return value ?? "false";
  }
  generate_statusobject(status: number, message: any) {
    return {
      status: status,
      message: message,
    };
  }
  check_statuserror(status: number) {
    return /^[4-5]/.test(status.toString());
  }
  check_statusredirection(status: number) {
    return status === 204 ? (status = 200) : (status = status);
  }
}

/**
 * Instance - Utils
 * @description
 * Instance of Utils Class
 */
const utils = new Utils();
export default utils;
