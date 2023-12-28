/**
 * Class - Utils
 * @description
 * Class having implementation details for utility operations
 */
class Utils {
  check_nullundefined(value: any) {
    return value ?? "false";
  }
}

const utils = new Utils();
export default utils;
